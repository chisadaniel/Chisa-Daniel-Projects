import random
import numpy as np
import math

def read_matrix_from_file(path):
    f = open(path, "r+")
    dim = f.readline()
    n = int(dim)
    valori = []
    ind_col = []
    inceput_linie = [-1]*(n+1)
    index = 0
    for line in f:
        if dim not in line and len(line) > 5:
            value, i, j = ([x for x in line.split(',')])
            valori.append(float(value))
            ind_col.append(int(j))
            if inceput_linie[int(i)] == -1:
                inceput_linie[int(i)] = index
            index += 1
    inceput_linie[len(inceput_linie)-1] = index
    return valori, ind_col, inceput_linie

def compute_matrix_mult_vector(valori, ind_linii, ind_col, vec, n):
    vector = np.zeros((n,), dtype=float)
    for row in range(0, len(ind_linii)-1):
        sum = 0
        for column in range(ind_linii[row + 1] - ind_linii[row]):
            index_valori = ind_linii[row] + column
            sum = sum + valori[index_valori]*vec[ind_col[index_valori]]
        vector[row] = sum
    return vector

def compute_euclid_norm(vector):
    sum = 0
    for value in vector:
        sum = sum + value**2
    norm = math.sqrt(sum)
    return norm

def compute_initial_vector(n):
    initial = np.zeros((n,), dtype=float)
    for i in range(len(initial)):
        initial[i] = random.uniform(-5, 5)
    vector_norm = compute_euclid_norm(initial)
    for value in initial:
        value = 1/vector_norm*value
    return initial

def compute_dot_product(vec1, vec2):
    dot_product = sum([vec1[i]*vec2[i] for i in range(len(vec1))])
    return dot_product

def compute_new_v(w):
    w_norm = compute_euclid_norm(w)
    l = [1/w_norm*el for el in w]
    return l

def compute_norm_w_minus_lambda_dot_v(w, lambdaa, v):
    suma = sum([(w[i]-lambdaa*v[i])**2 for i in range(len(w))])
    return math.sqrt(suma)

def power_method(valori,  ind_col, ind_linii, n):
    eps = 10**-7
    k_max = 1000000
    v = compute_initial_vector(n)
    w = compute_matrix_mult_vector(valori, ind_linii, ind_col, v, n)
    lambdaa = compute_dot_product(w, v)
    k = 0
    while compute_norm_w_minus_lambda_dot_v(w, lambdaa, v) > eps and k <= k_max:
        v = compute_new_v(w)
        w = compute_matrix_mult_vector(valori, ind_linii, ind_col, v, n)
        lambdaa = compute_dot_product(w, v)
        k += 1

    if k > k_max:
        #print("k>kmax nu a reusit sa calculeze")
        return "nu se poate calcula"
    else:
        #print("valoare proprie de modul maxim ",lambdaa)
        #print("aprox vector", v)
        return lambdaa


def workspace():
    valori, ind_col, inceput_linii = read_matrix_from_file("a_500.txt")
    print("a_500 din fisier, valoare proprie de modul maxim=", power_method(valori, ind_col, inceput_linii, 500))


workspace()

