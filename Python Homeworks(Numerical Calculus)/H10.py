import numpy as np
import random
import matplotlib.pyplot as plt
import  math

def function_fx(x):
    return x**4-12*x**3+30*x**2+12

def generate_xi_values(inceput, final):
    vector = []
    vector.append(float(inceput))
    for i in range(inceput+1, final):
        vector.append(random.uniform(i, i+1))
    vector.append(float(final))
    print("xi", vector)
    return vector

def generate_yi_values(vector):
    ys = []
    for i in range(len(vector)):
        ys.append(function_fx(vector[i]))
    print("yi:", ys)
    return ys

def generate_yi_trigonometric_values(vector):
    ys = []
    for i in range(len(vector)):
        ys.append(function_trig_fx(vector[i]))
    print("yi:", ys)
    return ys

def compute_matrix_b(x_values):
    matrix = np.zeros((len(x_values), len(x_values)), dtype=float)
    for i in range(len(x_values)):
        for j in range(len(x_values)):
            if j == 0:
                matrix[i][j] = 1
            else:
                matrix[i][j] = x_values[i]**j
    print("matrix B", matrix)
    return matrix

def compute_ai(matrix, ys):
    ai_vec = np.linalg.solve(matrix, ys)
    print("ai:", ai_vec)
    return ai_vec

#Horner schema
def compute_sm_not_x(ai_vec, x):
    #reverse to start from a_n
    ai_vec = ai_vec[::-1]
    d = 0
    for i in range(len(ai_vec)):
        d = ai_vec[i] + d*x
    print("Sm(x): ", d)
    return d

def plot_f():
    x = np.arange(1, 5, 0.1)
    y = x**4-12*x**3+30*x**2+12
    plt.title("f(x) plot")
    plt.plot(x, y)
    plt.show()

def plot_sm(ai_vec):
    x = np.arange(1, 5, 0.1)
    y = ai_vec[0]
    for i in range(1, len(ai_vec)):
        y = y + ai_vec[i]*x**i
    plt.title("Sm(x) plot")
    plt.plot(x, y)
    plt.show()

def plot_tn(aii_vec):

    x = np.arange(0, 2*np.pi, 0.1)
    ai_vec = []
    for el in aii_vec:
        ai_vec.append(el)
    y = ai_vec[0]
    for i in range(1, len(ai_vec)):
        if i % 2 == 1:
            y = y + ai_vec[i]*np.sin(x*i)
        elif i % 2 == 0:
            y = y + ai_vec[i] * np.cos(x * i)
    plt.title("Tn(x) plot")
    plt.plot(x, y)
    plt.show()


#Trigonometric approximation fx = sinx-cosx
def function_trig_fx(x):
    return math.sin(x) - math.cos(x)

def compute_t(x_values):
    matrix = np.zeros((len(x_values), len(x_values)), dtype=float)
    for i in range(len(x_values)):
        k = 1
        for j in range(len(x_values)):
            if j == 0:
                matrix[i][j] = 1
            elif j % 2 == 1:
                matrix[i][j] = math.sin(x_values[i]*k)
                k = k + 1
                print("k", k)
            elif j % 2 == 0:
                matrix[i][j] = math.cos(x_values[i] * (j/2))
    print("matrix B", matrix)
    return matrix

def compute_t_ai(matrix, ys):
    ai_vec = np.linalg.solve(matrix, ys)
    print("t_ai:", ai_vec)
    return ai_vec


def compute_t_of_x(ai_vec, x):
    res = ai_vec[0]             # put a_0
    k = 1
    for i in range(1, len(ai_vec)):
        if i % 2 == 1:
            res = res + ai_vec[i] * math.sin(k*x)
            k += 1
        elif i % 2 == 0:
            res = res + ai_vec[i] * math.cos((i/2)*x)
    print("Tn(x): ", res)
    return res


def workspace():
    #Polynomial approximation
    x0 = int(input("enter x0:"))
    xn = int(input("enter xn:"))
    print(x0, xn)
    xi = generate_xi_values(x0, xn)
    yi = generate_yi_values(xi)
    matrix_b = compute_matrix_b(xi)

    #linear system Ba = f => ai
    ai = compute_ai(matrix_b, yi)

    #compute Sm(x) Horner schema
    sm_x = compute_sm_not_x(ai, 3.0)
    print("|Sm(x)-f(x)|", abs(sm_x-function_fx(3.0)))

    # Trigonometric approximation
    print("\n\nAproximare trigonometrica")
    t_xi = generate_xi_values(0, int(2*np.pi))
    t_yi = generate_yi_trigonometric_values(t_xi)
    matrix_t = compute_t(t_xi)
    t_ai = compute_t_ai(matrix_t, t_yi)
    #compute Tn(x)
    tn_x = compute_t_of_x(t_ai, 3.14)
    print("|T(x)-f(x)|", abs(tn_x - function_trig_fx(3.14)))




workspace()