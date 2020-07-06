import random
import numpy as np
import math
def init_matrix(n):
    matrix = []
    for i in range(n):
        dic = {}
        matrix.append(dic)
    return matrix


def print_matrix(matrix):
    for i in range(len(matrix)):
        dic = matrix[i]
        print("line:", i)
        for key, value in dic.items():
            print("j:", key, "val:", value, " ")

def get_rare_matrix(n):
    matrix = init_matrix(n)
    for line in range(n):
        current_line = matrix[line]
        current_line[line] = random.uniform(1, 15)              # diagonal not contains null elements
        number_of_elements_in_line = random.randint(10, 50)
        if number_of_elements_in_line > n - line and n-line > 1:
            number_of_elements_in_line = n - line
        for i in range(number_of_elements_in_line):
            if line < n - 3:
                column = random.randint(line+1, n-1)
                value = random.uniform(-20, 7)
                current_line[column] = value
                d = matrix[column]
                d[line] = value
    return matrix

def check_if_is_symmetric(matrix1):
    symmetric = True
    eps=0.000001;
    for i in range(len(matrix1)):
        line = matrix1[i]
        for key, value in line.items():
            if key > i:
                sym_line = matrix1[key]
                if abs(value -sym_line[i])>eps:
                    symmetric = False
    return symmetric


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

def compute_euclid_norm(vector):
    sum = 0
    for value in vector:
        sum = sum + value**2
    norm = math.sqrt(sum)
    return norm

def compute_initial_vector(n):
    initial = np.zeros((n,), dtype=float)
    for i in range(len(initial)):
        initial[i] = random.uniform(-700, 900) #-10,10
    vector_norm = compute_euclid_norm(initial)
    for value in initial:
        value = 1/vector_norm*value
    return initial

def compute_matrix_mult_vector(mat, vec):
    result_vector = np.zeros((len(mat),), dtype=float)
    for i in range(len(mat)):
        line = mat[i]
        sum = 0
        for key, value in line.items():
            sum = sum + vec[key]*value
        result_vector[i] = sum
    return result_vector

def compute_dot_product(vec1, vec2):
    dot_product = 0
    dot_product = sum([vec1[i]*vec2[i] for i in range(len(vec1))])
    #for i in range(len(vec1)):
    #    dot_product = dot_product + vec1[i]*vec2[i]
    return dot_product

def compute_new_v(w):
    w_norm = compute_euclid_norm(w)
    l = [1/w_norm*el for el in w]
    #for i in range(len(w)):
    #    w[i] = 1/w_norm*w[i]
    return l#w

def compute_norm_w_minus_lambda_dot_v(w, lambdaa, v):
    suma = 0
    suma = sum([(w[i]-lambdaa*v[i])**2 for i in range(len(w))])
    #for i in range(len(w)):
    #    element = w[i] - lambdaa*v[i]
    #    sum = sum + element**2
    #print(math.sqrt(suma))
    return math.sqrt(suma)


def power_method(mat, n):
    eps = 10**-9
    k_max = 1000000
    v = compute_initial_vector(n)
    w = compute_matrix_mult_vector(mat, v)
    lambdaa = compute_dot_product(w, v)
    k = 0
    while compute_norm_w_minus_lambda_dot_v(w, lambdaa, v) > eps and k <= k_max:
        v = compute_new_v(w)
        w = compute_matrix_mult_vector(mat, v)
        lambdaa = compute_dot_product(w, v)
        k += 1

    if k > k_max:
        #print("k>kmax nu a reusit sa calculeze")
        return "nu se poate calcula"
    else:
        #print("valoare proprie de modul maxim ",lambdaa)
        #print("aprox vector", v)
        return lambdaa


if __name__ == "__main__":

    # Get rare structures for every matrix on web page
    a_300 = read_matrix_from_file("a_300.txt")
    a_500 = read_matrix_from_file("a_500.txt")
    a_1000 = read_matrix_from_file("a_1000.txt")
    a_1500 = read_matrix_from_file("a_1500.txt")
    a_2020 = read_matrix_from_file("a_2020.txt")

    #Power Method, generate matrix with the same dimension as the one from file
    #check if they are symmetric then perform power method on then
    gen_mat_300 = get_rare_matrix(300)
    if check_if_is_symmetric(gen_mat_300) and check_if_is_symmetric(a_300):
        print("a_300 din fisier, valoare proprie de modul maxim=", power_method(a_300, 300))
        print("a_300 generata, valoare proprie de modul maxim=", power_method(gen_mat_300, 300))
