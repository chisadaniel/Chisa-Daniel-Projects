from time import process_time

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

def read_b_vector(path):
    b = []
    f = open(path, "r")
    n = int(f.readline())
    for i in range(n):
        value = float(f.readline())
        b.append(value)
    return b


def check_diagonal_elements(valori, ind_col, ind_linii):
    has_zeros = False
    for row in range(len(ind_linii)-1):
        for column in range(ind_linii[row+1]-ind_linii[row]):
            index_valori = ind_linii[row]+column
            if ind_col[index_valori] == row:
                if valori[index_valori] == 0:
                    has_zeros = True
                    print("missing element on matrix diagonal at ", row, ind_col[index_valori])
    return has_zeros


def compute_new_xc(valori, ind_linii, ind_col, x_p, b):
    x_c = [0]*len(b)
    for row in range(0, len(ind_linii)-1):
       # print(ind_linii[row],b[row])
        bi = b[row]
        a_ii = 0.0
        for column in range(ind_linii[row + 1] - ind_linii[row]):
            index_valori = ind_linii[row] + column
            if ind_col[index_valori] != row:
                bi = bi - valori[index_valori]*x_p[ind_col[index_valori]]
            else:
                a_ii = valori[index_valori]
        x_c_new_element = bi / a_ii
        x_c[row] = x_c_new_element
    #print(x_c[:3])
    return x_c

def compute_normal_norm(x_c, x_p):
    norm = 0.0
    for index in range(len(x_c)):
        norm = norm + x_c[index] - x_p[index]
    #print(norm)
    return abs(norm)


def iterative_method(valori, ind_linii, ind_col, p, b):
    eps = 10**-p
    x_c = [0] * len(b)
    k = 0
    dx = 10000
    k_max = 10003
    while dx >= eps and dx < 10 ** 10 and k < k_max:
        x_p = x_c.copy()
        x_c = compute_new_xc(valori, ind_linii, ind_col, x_p, b).copy()
        dx = compute_normal_norm(x_c, x_p)
        k += 1
    if dx < eps:
        return True, x_c
    else:
        return False, x_c


def compute_infinite_norm(valori, ind_col, ind_linii, x_gs, b):
    infinite_norm_max = 0
    for row in range(0, len(ind_linii) - 1):
        bi = b[row]
        line_result = 0.0
        for column in range(ind_linii[row + 1] - ind_linii[row]):
            index_valori = ind_linii[row] + column
            line_result = line_result + valori[index_valori]*x_gs[ind_col[index_valori]]
        c = line_result - b[row]
        if abs(c) > infinite_norm_max:
            infinite_norm_max = abs(c)
    return infinite_norm_max


def workspace():
    t1 = process_time()
    valori, ind_col, inceput_linii = read_matrix_from_file("a_2.txt")
    b_2 = read_b_vector("b_2.txt")
    p = 10
    if check_diagonal_elements(valori, ind_col, inceput_linii) is False:
        flag, x_gs = iterative_method(valori, inceput_linii, ind_col, p, b_2)
        if flag is True:
            infinite_norm = compute_infinite_norm(valori, ind_col, inceput_linii, x_gs, b_2)
            print("\nHomework 4 bonus\nSystem 2 some values from  X_gs: ", "first 3:", x_gs[:3], "middle 3:", x_gs[10109:10112],
                  "last 3:", x_gs[20199:20202])
            print("System 2 norm: ", infinite_norm)
        else:
            print("\nSystem 2 is divergent")
    else:
        print("\nDiagonal of second system matrix has null elements")
    t2 = process_time()
    print("\nProcess time:", t2 - t1)


workspace()