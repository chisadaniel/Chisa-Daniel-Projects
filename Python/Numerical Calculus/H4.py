from time import process_time

'''
Stores the matrix in form of list of dictionaries 
[i {j column: value}]

      [ 0 1 2 3 ]              line 0->           [ { 0:0,   1:1,    2:2,   3:3 }
 A =  [ 4 5 6 7 ]  =>   list:  line 1->             { 0:4,   1:5,    2:6,   3:7 }           
      [ 8 9 1 1 ]              line 2->             { 0:8,   1:9,    2:1,   3:1 }   
      [ 3 4 2 2 ]              line 3->             { 0:3,   1:4,    2:2,   3:2 } ]
                                                        
                                            column:    0       1      2       3
'''


#Function that initialize the matrix a list of dictionaries
def init_matrix():
    matrix = []
    for i in range(2020):
        dic = {}
        matrix.append(dic)
    return matrix

#Function that reads the matrix from file and returns the matrix in form of list of dictionaries
def read_matrix_from_file(path):
    matrix = init_matrix()
    f = open(path, "r")
    for line in f:
        if len(line) > 5:
            value, i, j = ([x for x in line.split(',')])
            dic = matrix[int(i)]
            dic[int(j)] = float(value)
    return matrix

#----------------------------------------------------- NEW ADDED -------------------------------------------------------
#Function that reads negate matrix
def read_negate_matrix(path):
    matrix = init_matrix()
    f = open(path, "r")
    for line in f:
        if len(line) > 5:
            value, i, j = ([x for x in line.split(',')])
            dic = matrix[int(i)]
            dic[int(j)] = -float(value)
    return matrix

#Function that construct Identity matrix
def get_identity_matrix():
    matrix = init_matrix()
    for i in range(len(matrix)):
        for j,val in matrix[i].items():
            if i == j:
                val = 1
            else:
                val = 0
    return matrix

#Function that checks if zeros matrix
def check_if_zeros_matrix(matrix):
    for i in range(len(matrix)):
        for j, val in matrix[i].items():
            if val != 0:
                return False
    return True

#Function that  checks if identity matrix
def check_if_identity_matrix(matrix):
    for i in range(len(matrix)):
        for j,val in matrix[i].items():
            if i == j and val == 1:
                pass
            elif val != 0:
                return False
    return True
#-----------------------------------------------------END NEW ADDED ----------------------------------------------------

#Function that reads a matrix column by column useful in product computing
def read_matrix_from_file_column_form(path):
    matrix = init_matrix()
    f = open(path, "r")
    for line in f:
        if len(line) > 5:
            value, i, j = ([x for x in line.split(',')])
            dic = matrix[int(j)]
            dic[int(i)] = float(value)
    return matrix

#Utility function for print in a nice way a matrix
def print_matrix(matrix):
    for i in range(len(matrix)):
        dic = matrix[i]
        print("line:", i)
        for key, value in dic.items():
            print("j:", key, "val:", value, " ")


#Function that sum 2 matrices
def sum_matrices(matrix1, matrix2):
    matrix_sum = init_matrix()
    for i in range(len(matrix1)):
        line_1 = matrix1[i]
        line_2 = matrix2[i]
        line_3 = matrix_sum[i]
        for column, value in line_1.items():
            line_3[column] = value
        for column, value in line_2.items():
            if column in line_3:
                value_that_exist = line_3[column]
                line_3[column] = value_that_exist + value
            else:
                line_3[column] = value
    return matrix_sum, check_if_zeros_matrix(matrix_sum)

#Function that checks if matrix given as parameter is equal with the matrix from the file given as path
def check_correctness(matrix, path, eps):
    original_matrix = read_matrix_from_file(path)
    # Assume it's True
    correct = True
    # Check at first line
    line_begin1 = matrix[0]
    line_begin2 = original_matrix[0]
    for column in range(2020):
        if column in line_begin1 and column in line_begin2:
            if abs(line_begin1[column]-line_begin2[column]) > eps:
                correct = False
    # Check at the middle
    line_mid1 = matrix[1010]
    line_mid2 = original_matrix[1010]
    for column in range(2020):
        if column in line_mid1 and column in line_mid2:
            if abs(line_mid1[column] - line_mid2[column]) > eps:
                correct = False
    # Check at the end
    line_end1 = matrix[2019]
    line_end2 = original_matrix[2019]
    for column in range(2020):
        if column in line_end1 and column in line_end2:
            if abs(line_end1[column] - line_end2[column]) > eps:
                correct = False
    return correct


#Function that multiply 2 matrices
#For every line_i in matrix1 parse every column_j in matrix2 if stored index i of an element from column_j
#is found in line_i then multiply them and add result to line_column_multiplied
def multiply_matrices(matrix1, matrix2):
    matrix_product = init_matrix()
    for i in range(len(matrix1)):
        line_i = matrix1[i]
        if len(line_i) != 0:
            matrix_product_line_i = matrix_product[i]
            for j in range(len(matrix2)):
                column_j = matrix2[j]
                if len(column_j) != 0:
                    line_column_multiplied = 0
                    for index, value in column_j.items():
                        if index in line_i:
                            line_column_multiplied = line_column_multiplied + value * line_i[index]
                    if line_column_multiplied != 0:
                        matrix_product_line_i[j] = line_column_multiplied

    return matrix_product, check_if_identity_matrix(matrix_product)


def workspace():
    print("Homework 3")
    # Compute a+b
    matrix_a = read_matrix_from_file("a.txt")                                   # read matrix a
    matrix_b = read_matrix_from_file("b.txt")                                   # read matrix b
    t1_start = process_time()                                                   # start time processing for summing
    matrix_sum, zeros_matrix = sum_matrices(matrix_a, matrix_b)                 # computing sum a+b
    t1_stop = process_time()                                                    # stop time processing for summing
    if zeros_matrix:                                                      # NEW checks if resulted matrix is zero matrix
        print("Matrix A + Matrix B = O[", len(matrix_sum), "]")
    else:
        result = check_correctness(matrix_sum, "aplusb.txt", 0.000001)          # checking correctness of computed sum
        print("Matrix A + Matrix B == aplusb (from file)? Result:", result)
    print("Summed 2 matrices in: ", t1_stop-t1_start, "s")

    # Compute a*b
    matrix_b_column_form = read_matrix_from_file_column_form("b.txt")           # read matrix b in columns form
    t2_start = process_time()                                                   # start time processing for product
    matrix_product, identity_matrix = multiply_matrices(matrix_a, matrix_b_column_form)          # computing product a*b
    t2_stop = process_time()                                                    # stop time processing for product
    if identity_matrix:                                               # NEW checks if resulted matrix is identity matrix
        print("Matrix A * Matrix B = I[", len(matrix_product), "]")
    else:
        result = check_correctness(matrix_product, "aorib.txt", 0.000001)       # check correctness of computed product
        print("Matrix A * Matrix B == aorib (from file)? Result:", result)
    print("Multiplied 2 matrices in: ", t2_stop-t2_start, "s")

    #----------------------------------------NEW ADDED------------------------------------------------------------------
    #Proving A+B=O
    print("\n\n Proving zero matrix and identity matrix results: ")
    negate_matrix_a = read_negate_matrix("a.txt")
    resulted_matrix, zeros_matrix=sum_matrices(matrix_a, negate_matrix_a)
    if zeros_matrix:
        print("Matrix A + (-1)*A = O_", len(matrix_sum))
    #Proving A*B=I
    identity_matrix = get_identity_matrix()
    resulted_matrix2, identity_matrix = multiply_matrices(identity_matrix, matrix_b_column_form)
    if identity_matrix:
        print("I * Matrix B = I_", len(matrix_product))


workspace()

