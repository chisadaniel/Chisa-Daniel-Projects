import math
import random
import numpy as np

#Exercitiul 1

def exercitiul1():
    for i in  range(0, 50):
        u=10**(-i)
        print(u)
        if 1 + u == 1:
            print("precizie gasita la m:", i)

#Exercitiul 2
#A+Z != X + B unde A=x+y B=y+z
#Să se verifice că operația de adunare efectuată de calculator este neasociativă

def exercitiul2():
    #prima parte
    x = 1.0
    y = 10**(-16)
    z = 10**(-16)
    A = x + y
    B = y + z
    st = A + z
    dr = x + B
    if st != dr:
        print(True,"operația de adunare efectuată de calculator este neasociativă")

    #a doua parte
    ok = 0
    count = 0
    while ok == 0:
        var = random.uniform(-100, 1000)
        count += 1
        y = 10 ** (-16)
        z = 10 ** (-16)
        A = var * y
        B = y * z
        st = A * z
        dr = var * B
        if st != dr:
            print("Iteratii: ", count, "Valoare gasita: ",var)
            ok = 1


#Exercitiul 3

# functie care calculeaza num(vector) - nr intreg obtinut din reprezentarea numarului in baza2
def num_function(vector):

    k = 1
    rez = 0
    for e in vector:
        rez += k * e
        k *= 2
    return rez

#functie care realizeaza sau logic pe linii
def sau_pe_linie(linie1, linie2):

    result = list()
    for i, elem in enumerate(linie1):
        result.append(elem | linie2[i])
    return result

#functie care realizeaza sau logic pe componente de matrice
def sau_pe_matrici(matrix1, matrix2):

    rez = list()
    for i in range(len(matrix1)):
        line = sau_pe_linie(matrix1[i], matrix2[i])
        rez.append(line)
    return rez

#functie care calcuzeaza sumele tuturor liniilor posibile ale matricei B
def sum_linii_B(matrix, n, m):

    rez = list()
    rez.append([0] * n)
    for j in range(1, 2 ** m):
        k = math.floor(math.log2(j))
        linie = sau_pe_linie(rez[j - 2 ** k], matrix[k])
        rez.append(linie)
    return rez

#functie care realizeaza inmultirea A ori B -- Calcularea matricei Ci
def compute_Ci(A, B, n, m):

    sum_B = sum_linii_B(B, n, m)
    rez = list()
    for linie in A:
        linie_num = num_function(linie)
        rez.append(list(sum_B[linie_num]))
    return rez

#functie ce completeaza matricele A,B cu linii/coloane 0 pentru a fi egale
def completare(A, B, n, m):
    if n % m != 0:
        for linie in A:
            linie += [0] * (m - n % m)
        B += [[0] * n] * (m - n % m)


# functie ce imparte o matricele A, B in submatrici
def subdivizare(A, B, n, m):

    # completam matricele cu linii/coloane necesare, avand val elementelor 0
    completare(A, B, n, m)

    A_l = list()
    B_l = list()
    p = math.ceil(n / m)
    for k in range(p):
        Bi = B[m * k: m * (k + 1)]
        B_l.append(Bi)
        Ai = [A[j][m * k: m * (k + 1)] for j in range(n)]
        A_l.append(Ai)
    return A_l, B_l

#functie ce realizeaza calculul rezultatului rezultat in urma inmultirii a doua matrici
def compute(A, B, n, m):
    rez = [[0] * n] * n
    for i in range(len(A)):
        Ci = compute_Ci(A[i], B[i], n, m)
        rez = sau_pe_matrici(rez, Ci)
    return rez



def exercitiul3():
    a, b = list(), list()
    N = 5
    for i in range(N):
        line_a, line_b = list(), list()
        for j in range(N):
            line_a.append(random.randint(0, 1))
            line_b.append(random.randint(0, 1))
        a.append(line_a)
        b.append(line_b)

    n = len(a)
    m = math.floor(math.log2(n))
    A, B = subdivizare(a, b, n, m)

    C = compute(A, B, n, m)

    print("Matricea A:")
    for line in a:
        print(line)
    print("Matricea B:")
    for line in b:
        print(line)
    print("Rezultat:")
    for line in C:
        print(line)






print("Exercitiul 1:\n")
exercitiul1()
print("\n\nExercitiul 2:\n")
exercitiul2()
print("\n\n Exercitiul 3:\n")
exercitiul3()

