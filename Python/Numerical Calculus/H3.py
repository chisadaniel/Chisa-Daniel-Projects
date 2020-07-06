import random
import numpy as np

print("Bonus part: I computed L,U components storing L, U in a single list for each component.")
print("Regarding with computing A*X=B means L*Y=B and U*X=Y, I computed only Y from L*Y=B.\n")
n = int(input("Please enter n:"))
eps = float(input("Please enter eps:"))
A = np.zeros(shape=(n, n), dtype=float)

# function for printing in a nice way a component L/U in matrix form
def show(vector, n):
    for i in range(n):
        print(vector[i * n:i * n + n:1])

# function that constructs initial L U components
def initialize(n):
    L = [0*x for x in range(n*n)]
    for i in range(n):
        line = L[i*n:i*n+n:1]
        for j in range(i+1):
            L[i*n+j] = -50000
            line[j] = -50000
        #print(line)
    U = [0*x for x in range(n*n)]
    for i in range(n):
        line = U[i*n:i*n+n:1]
        for j in range(i+1):
            U[i*n+j] = -60000
            U[i*n+i] = 1
            line[j] = -60000
    return L, U

# function that checks either a value from component L/U is unknown
def nan(number):
    if number == -50000 or number == -60000 or number == 0:
        return False
    else:
        return True

# function that computes unknown variables from a certain line column
def process_line_column(line, col, p, j, n, A, L, U, eps):
    var_in_l = -1000
    var_in_u = -1000
    unknown = 0
    s = 0           # stores the sum of products of value elements
    coeficient = 0  # coeficient of the unknown variable from coeficient*x=A[i][j]
    ok = 0          # stops computing of s when an unknown is found
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
    if var_in_u == -1000 and var_in_l != -1000:  # meaning no unknown variable in U line, the var is in L
        coeficient = col[var_in_l]
        right_member = A[p, j] - s
        if right_member == 0:
            unknown = 0
        else:
            if abs(coeficient) > eps:
                unknown = right_member / coeficient
                y = p*n + var_in_l
                L[y] = unknown

    elif var_in_l == -1000 and var_in_u != -1000:  # meaning no unknown variable in L line, the unknown var is in U
        coeficient = line[var_in_u]
        right_member = A[p, j] - s
        if right_member == 0:
            unknown = 0
        else:
            if abs(coeficient) > eps:
                unknown = right_member / coeficient
                y = j*n+var_in_u
                U[y] = unknown

    return L, U

#function that sends every pair (line, column) from L and U to process_line_column for finding unknown variables
def solve(n, A, L, U, eps):
    for k in range(n):
        for j in range(n):
            line = L[k * n:k * n + n:1]
            column = U[j * n:j * n + n:1]
            L, U = process_line_column(line, column, k, j, n, A, L, U, eps)
    return L, U

# auxiliary function for compute the product L*U, useful in checking if initial A is equal with L*U components
def multiply(line1, line2, n):
    A = np.zeros(shape=(n, n), dtype=float)
    for i in range(n):
        line = line1[i * n:i * n + n:1]
        for j in range(n):
            column = line2[j * n:j * n + n:1]
            element = 0
            for p in range(n):
                element = element + line[p] * column[p]
            A[i][j] = element
    return A

# function that compute L*Y useful in checking if Y found is right.
def multiply_vector_column(vector,column,n):
    result = list()
    for i in range(n):
        line = vector[i * n:i * n + n:1]
        line_sum = 0
        for j in range(n):
            line_sum = line_sum + line[j] * column[j]
        result.append(line_sum)
    return result

# function that generates a matrix A until it has valid L U components
def try_solve(n, eps):
    # get initial forms of  L,U matrix
    L, U = initialize(n)
    A = np.zeros(shape=(n, n), dtype=float)
    ok = 0
    count = 0
    while ok == 0:
        L, U = initialize(n)

        print("did a loop...", count, " be patient the result will come soon :)")
        count = count + 1
        for i in range(n):
            for j in range(n):
                A[i][j] = random.randint(-200, 200) #-200,200
        L, U = solve(n, A, L, U, eps)

        if -50000 not in L and -60000 not in U:  # check that L and U has no more unknowns
            ok = 1
    return A, L, U

# function that computes Y from L*Y = B
def y_compute(l, n, eps):

    b = np.zeros(shape=(n), dtype=float)            # init b vector
    for i in range(n):
        b[i] = random.randint(1500, 3000)
    y = list()                                      # init Y vector
    for i in range(n):
        y.append(-987654321)

    # L*y = b  Compute y vector
    for i in range(n):
        line = l[i*n:i*n+n:1]
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

    return y, b


a, l, u = try_solve(n, eps)
y, b = y_compute(l, n, eps)

print("MATRIX A:\n", a)
print("L component:", l)                       # print L component  You can write: show(l,n) for a matrix shape view
print("U component:", u)                       # print U component  You can write: show(u,n) for a matrix shape view
print("\n\nComputing L*Y=B ...")
print("From L*y=b =>Y vector:\n", y)           # print computed Y
print("Here is the vector B:\n", b)            # print B


print("All done! If you like to see matrix A, L, U, Y, see above!")
# print IF initial A is equal with product LU
print("\n\nComputing L,U components of A is done.  IS L*U = A ?: ", np.allclose(multiply(l, u, n), a))
# print IF L*Y=B for checking if computed Y is right
print("\nIS computed Y vector correct? Check: L*Y = b? :", np.allclose(multiply_vector_column(l, y, n), b))
