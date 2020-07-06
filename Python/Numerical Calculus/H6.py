from time import process_time

#Function that initialize the matrix a list of dictionaries
def init_matrix(n):
    matrix = []
    for i in range(n):
        dic = {}
        matrix.append(dic)
    return matrix


#Function that reads the matrix from file and returns the matrix in form of list of dictionaries
def read_matrix_from_file(path):
    f = open(path, "r+")
    dim = f.readline()
    n = int(dim)
    matrix = init_matrix(n)
    for line in f:
        if dim not in line and len(line) > 5:
            value, i, j = ([x for x in line.split(',')])
            dic = matrix[int(i)]
            dic[int(j)] = float(value)
    return matrix


#Function that reads b vector
def read_b_vector(path):
    b = []
    f = open(path, "r")
    n = int(f.readline())
    for i in range(n):
        value = float(f.readline())
        b.append(value)
    return b


#Function that checks if the imported matrix has or not zeros on main diagonal
def check_diagonal_elements(matrix):
    has_zeros = False
    for row_index in range(len(matrix)):
        row = matrix[row_index]
        if row_index in row:
            if row[row_index] == 0:
                has_zeros = True
        else:
            print("missing element on matrix diagonal at ", row_index, row_index)
    return has_zeros

#Function that computes the final norm ||A*x_GS - b|| _oo
def compute_infinite_norm(matrix, x_c, b):
    infinite_norm_max = 0
    for i in range(len(matrix)):
        line = matrix[i]
        line_result = 0.0
        for j, value in line.items():
            line_result = line_result + value*x_c[j]
        c = line_result-b[i]
        if abs(c) > infinite_norm_max:
            infinite_norm_max = abs(c)
    return infinite_norm_max


#Function that computes the new x_c vector and dx, function called in iterative_method
def compute_new_xc_and_dx(matrix, x_p, b):
    x_c = [0]*len(matrix)
    norm = 0.0
    for row_index in range(len(matrix)):
        row = matrix[row_index]
        bi = b[row_index]
        for column_index, value in row.items():
            if column_index != row_index:
                bi = bi - (value*x_p[column_index])
        x_c_element_at_row_index = bi/row[row_index]
        norm = norm + x_c_element_at_row_index - x_p[row_index]
        x_c[row_index] = x_c_element_at_row_index

    return x_c, abs(norm)


#Function that implements algorithm from homework documentation
def iterative_method(matrix, p, b):
    eps = 10**-p
    x_c = [0] * len(b)
    k = 0
    dx = 10000
    k_max = 10003
    while dx >= eps and dx < 10 ** 10 and k < k_max:
        x_c, dx = compute_new_xc_and_dx(matrix, x_c, b)
        k += 1
    if dx < eps:
        return True, x_c                    # meaning system has solution
    else:
        return False, x_c                   # meaning system is divergent


def workspace():
    print("Homework 4")
    p = 10

    # Computing solution x_GS of first system
    a_1 = read_matrix_from_file("a_1.txt")                                      # read matrix from file
    b_1 = read_b_vector("b_1.txt")                                              # read vector b from file
    if check_diagonal_elements(a_1) is False:                                   # check if main diagonal elements != 0
        flag, x_gs = iterative_method(a_1, p, b_1)                              # solving the current system
        if flag is True:                                                        # means system has solution
            infinite_norm = compute_infinite_norm(a_1, x_gs, b_1)               # computing norm
            print("System 1 some values from X_gs: ", "first 3:", x_gs[:3], "middle 3:", x_gs[2500:2503], "last 3:", x_gs[54318:54321])
            print("System 1 norm: ", infinite_norm)
        else:                                                                   # means system is divergent
            print("\nSystem 1 is divergent")
    else:
        print("\nDiagonal of first system matrix has null elements")

    # Computing solution x_GS of second system
    t1 = process_time()                                                         # for this system number 2, I count the
    a_2 = read_matrix_from_file("a_2.txt")                                      # the process time seconds to compare
    b_2 = read_b_vector("b_2.txt")                                              # them with bonus implementation process
    if check_diagonal_elements(a_2) is False:                                   # time
        flag, x_gs = iterative_method(a_2, p, b_2)
        if flag is True:
            infinite_norm = compute_infinite_norm(a_2, x_gs, b_2)
            print("\nSystem 2 some values from  X_gs: ", "first 3:", x_gs[:3], "middle 3:", x_gs[10109:10112], "last 3:",x_gs[20199:20202])
            print("System 2 norm: ", infinite_norm)
        else:
            print("\nSystem 2 is divergent")
    else:
        print("\nDiagonal of second system matrix has null elements")
    t2 = process_time()
    print("\nProcess time:", t2 - t1)

    # Computing solution x_GS of system 3
    a_3 = read_matrix_from_file("a_3.txt")
    b_3 = read_b_vector("b_3.txt")
    if check_diagonal_elements(a_3) is False:
        flag, x_gs = iterative_method(a_3, p, b_3)
        if flag is True:
            infinite_norm = compute_infinite_norm(a_3, x_gs, b_3)
            print("\nSystem 3 some values from  X_gs: ", "first 3:", x_gs[:3], "middle 3:", x_gs[21603:21605], "last 3:",x_gs[43207:43210])
            print("System 3 norm: ", infinite_norm)
        else:
            print("\nSystem 3 is divergent")
    else:
        print("\nDiagonal of third system matrix has null elements")

    # Computing solution x_GS of system 4
    a_4 = read_matrix_from_file("a_4.txt")
    b_4 = read_b_vector("b_4.txt")
    if check_diagonal_elements(a_4) is False:
        flag, x_gs = iterative_method(a_4, p, b_4)
        if flag is True:
            infinite_norm = compute_infinite_norm(a_4, x_gs, b_4)
            print("\nSystem 4 some values from  X_gs: ", "first 3:", x_gs[:3], "middle 3:", x_gs[5047:5050], "last 3:", x_gs[10098:10101])
            print("System 4 norm: ", infinite_norm)
        else:
            print("\nSystem 4 is divergent")
    else:
        print("\nDiagonal of 4 system matrix has null elements")

    # Computing solution x_GS of system 5
    a_5 = read_matrix_from_file("a_5.txt")
    b_5 = read_b_vector("b_5.txt")
    if check_diagonal_elements(a_5) is False:
        flag, x_gs = iterative_method(a_5, p, b_5)
        if flag is True:
            infinite_norm = compute_infinite_norm(a_5, x_gs, b_5)
            print("\nSystem 5 some values from  X_gs: ", "first 3:", x_gs[:3], "middle 3:", x_gs[1007:1010], "last 3:", x_gs[2017:2020])
            print("System 5 norm: ", infinite_norm)
        else:
            print("\nSystem 5 is divergent")
    else:
        print("\nDiagonal of 5 system matrix has null elements")


workspace()