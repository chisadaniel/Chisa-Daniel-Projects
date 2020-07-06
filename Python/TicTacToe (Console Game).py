from math import inf as infinity
import pygame
import  os,sys

players = ['X', 'O']








def make_move(state, player, block_number):
    if state[int((block_number - 1) / 3)][(block_number - 1) % 3] is ' ':
        state[int((block_number - 1) / 3)][(block_number - 1) % 3] = player
    else:
        block_number = int(input("Chosen place is busy, choose again: \n"))
        make_move(state, player, block_number)


def copy_game_state(state):
    new_state = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']]
    for i in range(3):
        for j in range(3):
            new_state[i][j] = state[i][j]
    return new_state


def is_final(game_state):

    # Verificare pe orizontala

    if game_state[0][0] == game_state[0][1] and game_state[0][1] == game_state[0][2] and game_state[0][0] is not ' ':
        return game_state[0][0], "Done"
    if game_state[1][0] == game_state[1][1] and game_state[1][1] == game_state[1][2] and game_state[1][0] is not ' ':
        return game_state[1][0], "Done"
    if game_state[2][0] == game_state[2][1] and game_state[2][1] == game_state[2][2] and game_state[2][0] is not ' ':
        return game_state[2][0], "Done"

    # Verificara pe verticala

    if game_state[0][0] == game_state[1][0] and game_state[1][0] == game_state[2][0] and game_state[0][0] is not ' ':
        return game_state[0][0], "Done"
    if game_state[0][1] == game_state[1][1] and game_state[1][1] == game_state[2][1] and game_state[0][1] is not ' ':
        return game_state[0][1], "Done"
    if game_state[0][2] == game_state[1][2] and game_state[1][2] == game_state[2][2] and game_state[0][2] is not ' ':
        return game_state[0][2], "Done"

    # Verificare pe diagonale

    if game_state[0][0] == game_state[1][1] and game_state[1][1] == game_state[2][2] and game_state[0][0] is not ' ':
        return game_state[1][1], "Done"
    if game_state[2][0] == game_state[1][1] and game_state[1][1] == game_state[0][2] and game_state[2][0] is not ' ':
        return game_state[1][1], "Done"

 # Verificare daca este remiza
    check_if_draw = 0
    for i in range(3):
        for j in range(3):
            if game_state[i][j] is ' ':
                check_if_draw = 1
    if check_if_draw is 0:
        return None, "Draw"

    return None, "Not Done"


def print_board(game_state):
    print('-------------')
    print('| ' + str(game_state[0][0]) + ' | ' + str(game_state[0][1]) + ' | ' + str(game_state[0][2]) + ' |')
    print('-------------')
    print('| ' + str(game_state[1][0]) + ' | ' + str(game_state[1][1]) + ' | ' + str(game_state[1][2]) + ' |')
    print('-------------')
    print('| ' + str(game_state[2][0]) + ' | ' + str(game_state[2][1]) + ' | ' + str(game_state[2][2]) + ' |')
    print('-------------')

s=ss=0
def minimax_alg(state, player):
   
    the_winner_loser, done = is_final(state)

    if done == "Done" and the_winner_loser == 'O':  # If AI won
        return  10
    elif done == "Done" and the_winner_loser == 'X':  # If Human won
        return -10
    elif done == "Draw":
        return 0

    moves = []
    empty_cells = []
    for i in range(3):
        for j in range(3):
            if state[i][j] is ' ':
                empty_cells.append(i * 3 + (j + 1))

    for empty_cell in empty_cells:
        move = {}
        move['index'] = empty_cell
        new_state = copy_game_state(state)
        make_move(new_state, player, empty_cell)

        if player == 'O':  # Computer chose
            result = minimax_alg(new_state, 'X')  # make more depth tree for human
            move['score'] = result
        else:
            result = minimax_alg(new_state, 'O')  # make more depth tree for Computer
            move['score'] = result

        moves.append(move)



    # Find best move
    best_move = None
    if player == 'O':  # Computer turn
        best = -infinity
        for move in moves:
            if move['score'] > best:
                best = move['score']
               # print("score:",move['score'])
                best_move = move['index']
    else:
        best = infinity
        for move in moves:
            if move['score'] < best:
                #print("score:", move['score'])
                best = move['score']
                best_move = move['index']
  #  print("best move: ",best_move)
    return best_move


ok = 0
while ok == 0:
    print("\n\n ***NEW GAME*** \n\n")
    game_state = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']]
    current_state = "Not Done"

    print_board(game_state)
    the_winner = None
    the_player = 0




    while current_state == "Not Done":

        if the_player == 0:  # Man turn
            option = int(input("Choose where to place an X (1 - 9):\n "))
            make_move(game_state, players[the_player], option)
        else:  # Computer turn
            option = minimax_alg(game_state, players[the_player])
            make_move(game_state, players[the_player], option)
            print("Computer chosen: " + str(option))

        print_board(game_state)

        the_winner, current_state = is_final(game_state)

        if the_winner is not None:
            if the_winner == 'O':
                print("Computer won! (O)")
            else:
                print("You won! (X)")
        else:
            the_player = (the_player + 1) % 2

        if current_state is "Draw":
            print("It is a Draw!")


