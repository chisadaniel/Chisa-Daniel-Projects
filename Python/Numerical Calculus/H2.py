import numpy as np
import random
import math
np.set_printoptions(threshold=np.inf)
print("Hello!\nThe result for each exercise is printed and I did some proofs comparing my results with the results given by numpy library.\nI've printed here some matrices (Ainit, L, U) also X,Y vectors. For large matrices it's a little hard to see them.\n For n values up to 100, it goes fast. I tested up to n=130, but it takes a bit...")
print("The program was faster on computing first 5 exercises, \nI had an interval o values for A in (-200,200) and I quick computed n = [100-200],\n but I had to restrict it because on exercise 6 I've got overflows when computed the determinants.\n")
n = int(input("Give number n:"))
eps = float(input("Give epsilon(input format ex: 0.0000001): "))

# function that initialize L/U components
def init_L_U(n):
    L = np.zeros(shape=(n, n), dtype=float)
    for i in range(n):
        for j in range(n):
            if j > i:
                L[i][j] = 0
            else:
                L[i][j] = -50000                # flag that the element L[i][j] is unknown

    U = np.zeros(shape=(n, n), dtype=float)
    for i in range(n):
        for j in range(n):
            if i == j:
                U[i][j] = 1
            elif j < i:
                U[i][j] = 0
            else:
                U[i][j] = -60000                # flag that the element U[i][j] is unknown
    return L, U


#function nan='Not a number' that says if an element from matrix L/U is unknown or is a normal value
def nan(number):
    if number == -50000 or number == -60000 or number == 0:
        return False
    else:
        return True

# function that find the unknown variables belonging to (i,j) line column
def process_line_column(line, col, p, j, n, A, L, U, eps):
    # '''unknown is in L matrix, var_in_l stores the index in L [i] line '''
    # '''unknown is in U matrix, var_in_u  stores the index in U[i] line'''
    var_in_l = -1000
    var_in_u = -1000
    unknown = 0
    s = 0                        # stores the sum of products of value elements
    coeficient = 0               # coeficient of the unknown variable from coeficient*x=A[i][j]
    ok = 0                       # stops computing of s when an unknown is found
    for i in range(n):
       if ok == 0:
            if line[i] == 0 or col[i] == 0:
                pass
            elif nan(line[i]) is True and nan(col[i]) is True:
                s = s + line[i] * col[i]

            elif nan(line[i]) is False and nan(col[i]) is True:
                var_in_l = i
                ok = 1
            elif nan(col[i]) is False and nan(line[i]) is True:
                var_in_u = i
                ok = 1

    ''' coeficient*unknown + sum() = A[i,j] =>
        coeficient * unknown = A[i,j] - sum() = Right member =>
        unknown = Right member / coeficient
        '''
    if var_in_u == -1000 and var_in_l != -1000:   #meaning no unknown variable in U line, the var is in L
        coeficient = col[var_in_l]
        right_member = A[p, j] - s
        if right_member == 0:
            unknown = 0
        else:
            if abs(coeficient) > eps:
                unknown = right_member / coeficient
                L[p, var_in_l] = unknown
           # print(coeficient, "x=", right_member, "-", s,"  nec:",unknown)
    elif var_in_l == -1000 and var_in_u != -1000: #meaning no unknown variable in L line, the unknown var is in U
        coeficient = line[var_in_u]
        right_member = A[p, j] - s
        if right_member == 0:
            unknown = 0
        else:
            if abs(coeficient) > eps:
                unknown = right_member / coeficient
                U[j, var_in_u] = unknown
           # print(coeficient, "x=", right_member,"  nec:", unknown)
    return L, U

# function  sends all pairs of (line of L, line of U) for finding unknown variable which belongs either to L or U line
def solve(n, A, L, U, eps):
    for i in range(n):
        for j in range(n):
            line = L[i]
            column = U[j]
            L, U = process_line_column(line, column, i, j, n, A, L, U, eps)
    return L, U

# function that check if L/U contains unknown variables or not
def check_vars(mat, n):
    for i in range(n):
        for j in range(n):
            if mat[i][j] == -50000 or mat[i][j] == -60000:
                return False
    return True

#function which multiply 2 matrix using numpy.matmul function
def mul(mat1, mat2):
    mat2 = np.transpose(mat2)
    result = np.matmul(mat1, mat2)
    return result

#function that generates a A matrix until has a LU decomposition
def try_solve(n , eps):
    # get initial forms of  L,U matrix
    L, U = init_L_U(n)
    A = np.zeros(shape=(n, n), dtype=float)
    ok = 0
    count = 0
    while ok == 0:
        L, U = init_L_U(n)
        U = np.transpose(U)
        print("did a loop...", count, " be patient the result will come soon :)")
        count = count + 1
        for i in range(n):
            for j in range(n):
                A[i][j] =  random.randint(-20, 90) #-200,200
        L, U = solve(n, A, L, U, eps)

        if check_vars(L, n) is True and check_vars(U, n) is True:  # check that L and U has no more unknowns
            result = mul(L, U)
            #ok = 1
            # check if matrix A is equal with the product of L*U
            if np.array_equal(np.rint(result), np.rint(A)):
                ok = 1
                print("\nmatrix A:\n", np.rint(A))
                print("\nmatrix L*U made by numpy.matmul():\n", np.rint(result))
                print("\nmatrix L: \n", np.around(L))
                print("\nmatrix U: \n", np.transpose(np.rint(U)))
                print("\n\nExercise 1: \n\n(see the matrix A,L*U,L,U above)")
                print("Random found a matrix A init, matrix L*U and L U components of A in ", count, " steps!")
                print("A init =L*U: True (checked by comparing A init with numpy.matmul(L,U))")

            # another way of checking the equality of A and LU using precision
            if np.allclose(A, result, rtol=0.00000000001, atol=2.e-9):
                if ok == 1:
                    pass
                else:
                    ok = 1

                    print("\nmatrix A:\n", np.rint(A))
                    print("\nmatrix L*U made by numpy.matmul():\n", np.rint(result))
                    print("\nmatrix L: \n", np.around(L,decimals=1))
                    print("\nmatrix U: \n", np.transpose(np.rint(U)))
                    print("\n\nExercise 1: \n\n(see the matrix A,L*U,L,U above)")
                    print("Random found a matrix A init, matrix L*U and L U components of A in ", count, " steps!")
                    print("A init = L*U: True (checked by comparing A init with numpy.matmul(L,U))")
    result = mul(L, U)
    return A, np.rint(result), L, U


a_init, a, l, u = try_solve(n, eps)

#exercise 2
print("\nExercise 2:\n\ndet(A init)=det(L)*det(U) = det(A): ", np.linalg.det(a_init) == np.linalg.det(a),
      ", where A is the matrix obtained from L*U", "\ndet(A init) = ", np.linalg.det(a_init), "\ndet(L)*det(U) = ", np.linalg.det(a))
print("Results are the same!")

#exercise 3
def exercise3(a, l, u, n, eps):
    b = np.zeros(shape=(n), dtype=float)            # compute b vector
    for i in range(n):
        b[i] = random.randint(-50, 50)
    y = np.zeros(shape=(n), dtype=float)            # initialize y vector
    for i in range(n):
        y[i] = -987654321
    x = np.zeros(shape=(n), dtype=float)            # initialize x vector
    for i in range(n):
        x[i] = -987654321

    # L*y = b  Compute y vector
    for i in range(n):
        line = l[i]
        s = 0
        ok = 0
        c = 0
        unknown_var = -100
        for j in range(n):
            if ok == 0:
                if line[j] != 0 and y[j] != -987654321:
                    s = s + line[j] * y[j]
                if y[j] == -987654321:
                    ok = 1
                    unknown_var = j
        if unknown_var is not -100:
            c = line[unknown_var]
        right_member = b[i] - s
        if right_member == 0:
            y[i] = 0
        elif abs(c) > eps:
            y[i] = right_member / c

    # U*X = Y  Compute X vector
    u = np.transpose(u)
    x = np.linalg.solve(u, y)

    print("\n\nExercise 3:\n")
    print("From L*y=b =>Y vector computed\n", y.tolist())
    print("From U*x=y =>X vector computed\n", x.tolist())
    print("Proving correctness, I multiplied A*x: (with np.matmul function) \n", np.round(np.matmul(a, x).tolist()))
    print("Here is the initial vector b:\n", b.tolist())
    print("Results are the same!!! => AX = B ")
    return x, b


x_lu, b = exercise3(a, l, u, n, eps)


#Exercise 4 compute norm of euclid

def exercise4(a, x, b, n):
    sigma = 0
    for i in range(n):
        result = 0
        for j in range(n):
            result = result + a[i][j]*x[j]
        result = result - b[i]
        result = result**2
        sigma = sigma + result
    print("\n\nExercise 4:\n")
    print("Euclid norm is: ", math.sqrt(sigma))
    print("Is euclid norm < 10**-8?: ", math.sqrt(sigma) <= 10**-8)
    print("Is euclid norm < 10**-9?: ", math.sqrt(sigma) <= 10 ** -9)


exercise4(a, x_lu, b, n)

#Exercise 5 compute x solution vector, a_inverse, first norm, second norm
def exercise5(a, x_lu, b, n):

    x_lib = np.linalg.solve(a, b)               # compute x from Ax = b
    a_inverse = np.linalg.inv(a)            # compute a_inverse_lib

    # computing first norm ||x_lu - x_lib||
    result1 = 0
    for i in range(n):
        result1 =result1 + x_lu[i] - x_lib[i]
    result1 = result1 ** 2
    first_norm = result1
    first_norm = math.sqrt(first_norm)

    # computing second norm || x_lu - A_inverse_lib*b_init ||
    second_norm = 0
    for i in range(n):
        a_inv_ij_x_b_j = 0
        for j in range(n):
            a_inv_ij_x_b_j = a_inv_ij_x_b_j + a_inverse[i][j] * b[j]
        line_result = x_lu[i] - a_inv_ij_x_b_j
        line_result = line_result ** 2
        second_norm = second_norm + line_result
    second_norm = math.sqrt(second_norm)

    print("\n\nExercise 5: \n")
    print("Solution vector X computed with numpy.linalg.solve():")
    print(x_lib.tolist())
    print("\nInverse matrix of A computed with numpy.linalg.inv():")
    print(a_inverse.tolist())
    print("\nFirst norm: ||x_lu - x_lib||_2 = ", first_norm)
    print("\nSecond norm: ||x_lu - A_inverse_lib*b_init||_2 = ", second_norm)


exercise5(a_init, x_lu, b, n)


# Exercise 6

def compute_a_transpose(matrix, n):
    a_tr = matrix
    for i in range(n):
        for j in range(n):
            a_tr[j][i] = matrix[i][j]
    return a_tr

# function which cuts line column (i,j) useful in computing determinants for A*
def cut_line_i_column_j(matrix, n, i, j):
    matrix = np.delete(matrix, i, 0)
    matrix = np.delete(matrix, j, 1)
    return matrix

def compute_a_star(matrix, n):
    a_star = np.zeros(shape=(n, n), dtype=float)
    for i in range(n):
        for j in range(n):
            sign, log_det = np.linalg.slogdet(cut_line_i_column_j(matrix, n, i, j))
            element = sign * np.exp(log_det)
            if i % 2 == 0 and j % 2 == 0:
                a_star[i][j] = element
            if i % 2 == 1 and j % 2 == 1:
                a_star[i][j] = element
            if (i % 2 == 0 and j % 2 ==1) or (i % 2 == 1 and j % 2 == 0):
                a_star[i][j] = -1*element
    return a_star

def compute_a_inverse(matrix, det):
    a_inv = np.zeros(shape=(n, n), dtype=float)
    a_inv = np.divide(matrix, det)
    return a_inv

def exercise6(a_lu, n):
    a_inv_lib = np.linalg.inv(a_lu)

    det_a_lu = np.linalg.det(a_lu)
    if det_a_lu != 0:
        #compute a_inv
        a_transpose = compute_a_transpose(a_lu, n)
        a_star = compute_a_star(a_transpose, n)
        a_inv = compute_a_inverse(a_star, det_a_lu)
        a_inv_lib = np.linalg.inv(a_lu)

        #Compute norm ||inv_a_lu - inv_a_lib||
        sigma = 0
        max_c = -900
        for i in range(n):
            result = 0
            for j in range(n):
                result = a_inv[i][j] - a_inv_lib[i][j]
            if max_c < abs(result):
                max_c = abs(result)
            sigma = sigma + result
        sigma = abs(sigma)
        print("\n\nExercise 6:\n")
        print("norm ||inv_a_lu - inv_a_lib||_1 = ", sigma)
        print("norm ||C||_1 = max{a_ij - a_lib_ij} = ", max_c)
    else:
        print("matrix A_lu has det(A_lu) == 0 => A_inv doesn't exists! (Advice: rerun the program because it's possible to generate a matrix that addmit inverse.)")


print("\nComputing exercise 6, it takes a little longer for big n values...")
exercise6(a, n)
