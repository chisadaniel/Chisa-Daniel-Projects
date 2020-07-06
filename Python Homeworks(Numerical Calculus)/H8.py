import random
def f_x(ai_vec, x):
    d = 0
    for i in range(0, len(ai_vec)):
        d = ai_vec[i] + d * x
    return d

#Calculul primei derivate g(x) prin aproximarea unei valori din intervalul (G1, G2)
def first_der_f_x(f, x):
    h = 10**-5
    g1 = m1(f, x, h)
    g2 = m2(f, x, h)
    return random.uniform(g1, g2)                                #+ 10**-8


#Calcul G1
def m1(f, x, h):
    return (3 * f_x(f, x) - 4 * f_x(f, x - h) + f_x(f, x - 2 * h)) / (2 * h)

#Calcul G2
def m2(f, x, h):
    return (-1 * f_x(f, x+2*h) + 8 * f_x(f, x+h) - 8 * f_x(f, x-h) + f_x(f, x-2*h)) / (12*h)

#Calcul f de 2 ori derivat
def f_der_der(f, x):
    h = 10**-5
    return (-1*f_x(f, x + 2 * h) + 16*f_x(f, x+h) - 30*f_x(f, x)+16*f_x(f, x-h) - f_x(f, x-2*h))/12*h**2 > 0

#Calcul delta x
def delta_x_k(f, x_k, h_k):
    return (h_k * first_der_f_x(f, x_k)) / (first_der_f_x(f, x_k) - first_der_f_x(f, x_k - h_k))

#Metoda Yun Petkovic
def yun_petkovic(f, a, b):
    x0 = a
    x1 = (a+b)/2
    eps = 10**-20
    x = x1
    h = x1 - x0
    kmax = 10000000
    k = 0
    while eps <= abs(delta_x_k(f, x, h)) <= 10**10 and k <= kmax:
        if abs(first_der_f_x(f, x) - first_der_f_x(f, x - h)) < eps:
            break
        delta = delta_x_k(f, x, h)
        x1 = x
        x = x - delta
        h = - delta
        k += 1
    #print("ultimul delta ",abs(delta_x_k(f, x, h)), "epsison", eps)
    if abs(delta_x_k(f, x, h)) < eps:
        #Verificare f derivat de 2 ori (x) > 0
        if f_der_der(f, x):
            print("Succes, caz de convergenta x*=", x)
    else:
        print("Esec, caz de divergenta")


def workspace():
    #vectorul ai contine valorile coeficientilor functiei
    #coeficientii pentru x^2-4x+3
    ai = [1, -4, 3]
    #coeficientii pentru x^4-6x^3+13x^2-12x+4
    ai2 = [1, -6, 13, -12, 4]

    #print(compute_p_of_x(ai, 1))       -metoda cu care am testat calculul f(x) f(2), f(3)
    print("Functia 1: x^2-4x+3")
    for i in range(10):
        yun_petkovic(ai, 1, 4)              # a=1 b=4

    print("\n\nFunctia 3: x^4-6x^3+13x^2-12x+4")
    for i in range(10):
        yun_petkovic(ai2, 1, 4)
        yun_petkovic(ai2, -5, 20)


workspace()