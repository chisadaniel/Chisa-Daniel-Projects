from sympy import *
import random
import numpy as np
import math
import cmath

def compute_first_derivative(ai, value):
    x = Symbol(str(value))
    result = 0
    n = len(ai)
    for i in range(len(ai)):
        result = result + ai[i]*x**(n-i)
    #print("first der",result)
    #print("first der", diff(result))
    #print(eval(str(diff(result))))
    #print("first der val",eval(str(diff(result))))
    return eval(str(diff(result)))

def compute_second_derivative(ai, value):
    x = Symbol(str(value))
    result = 0
    n = len(ai)
    for i in range(len(ai)):
        result = result + ai[i] * x ** (n-i)
    #print("second der:", diff(diff(result)))
    #print(eval(str(diff(diff(result)))))
    return eval(str(diff(diff(result))))

def compute_h_of_x(ai, value):
    n = len(ai)
    h_x = (((n-1)**2)*(compute_first_derivative(ai, value)**2))-(n*(n-1)*compute_p_of_x(ai, value)*compute_second_derivative(ai, value))
    #if h_x <= 0:
    #    print("hx <=0")
    #print("HHHHHHHHHHHHHHH x", h_x)
    return h_x

def compute_delta_x(ai, value):
    n = len(ai)
    first_der = compute_first_derivative(ai, value)
    #print("delta first der",first_der)
    result = (n*compute_p_of_x(ai, value))/(first_der+np.sign(first_der)*cmath.sqrt((compute_h_of_x(ai, value))))
    #print("result cd",result)
    return result  #abs

def generate_xi_values(n):
    vector = [1, -1, -2, -2, 4]# 2 real sol 1,2 and 2 complex 1+1j 1-1j
    #vector = [1, 10, 169, 0] # 2 solutions -5 +/-12i
    #for i in range(n+1):
    #    vector.append(random.uniform(-10, 20)) #-3 4
    #    print(vector[i], "*x**", n-i)
    return vector

def compute_p_of_x(ai_vec, x):
    #n = len(ai_vec)
    #d = 0
    #for i in range(0, len(ai_vec)):
    #    d = ai_vec[i] + d * x
    result = np.polyval(ai_vec, x)
    return cmath.rect(abs(result), cmath.phase(result))#d

def compute_r(ai):
    maxi = -1
    n = len(ai)
    for value in ai:
        if abs(value) > maxi:
            maxi = abs(value)
    return (abs(ai[0])+maxi)/(abs(ai[0]))

def laguere_method(ai, x):

    kmax = 100
    k = 0
    eps = 10**-8
    x = complex(x, 0)
    while eps <= abs(compute_delta_x(ai, x)) <= 10 **10 and k <= kmax:
        h_x = compute_h_of_x(ai, x)
        if h_x < np.absolute(complex(0, 0)):
            print("H < 0!!!!!!!!!!!!!!!!!!!")
            pass
            #break
        first_der = compute_first_derivative(ai, x)
        if abs(first_der+np.sign(first_der)*cmath.sqrt((h_x))) <= eps:
            break
        x = x - compute_delta_x(ai, x)
        k += 1
    if abs(compute_delta_x(ai, x)) < eps:
        #print("convergenta")
        print("simple x", x," =>   ",x.real,",", x.imag)
        print("complex ", cmath.rect(abs(x), cmath.phase(x)))
        return x
    else:
        #print("divergenta")
        return False

def compute_all_solutions(ai):
    file1 = open('solutions_t7.txt', 'w')
    r = compute_r(ai)
    n = len(ai)-1
    solutions = []
    for i in range(100):
        print("\nCautare solutii pas...", i)
        x = random.uniform(-3, 3) #-r r                  # MODIFICARE -3,3 pentru un interval mai restrans
        solution = laguere_method(ai, x)
        ok = False
        if solution is False:
            print("Solutie  negasita - caz de divergenta")
        else:
            print("Solutie ", solution)
        if solution is not False and round(abs(solution), 0) not in solutions:
            solutions.append(round(abs(solution), 0))
            print("Am gasit o noua solutie:", solution)
            print("SOLUTII GASITE ", solutions)
            file1.write(str(solution))
            file1.write("\n")
            if len(solutions) == n:
                break
        elif solution is not False:
            print("Aceasta solutie a mai fost gasita deja!")
    print("\n")
    polynomial = ""
    for i in range(n):
        polynomial = polynomial + str(ai[i])+"x**"+str(n-1)+"+"
    print(polynomial+str(ai[n]))
    print("SOLUTIILE POLINOMULUI ", solutions)

def workspace():
    ai_coefficients = generate_xi_values(3)
    compute_all_solutions(ai_coefficients)


workspace()
#ai = [1, -1, -2, -2, 4]
#n = complex(1, -1)
#print(np.polyval(ai, abs(n)))
#print(abs(np.polyval(ai, n)))