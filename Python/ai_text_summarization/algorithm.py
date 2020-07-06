from collections import Counter
from string import punctuation
from sklearn.feature_extraction.stop_words import ENGLISH_STOP_WORDS as stop_words
from tkinter import *
import math
import nltk


root = Tk()
root.title("TEXT SUMMARIZATION Chisa Daniel")
status_text = StringVar()
warning_message = StringVar()
warning_message.set("Ready to summarize!")
summary = ""


#used to cut dialog, enumerations, double sentences
def preprocess_sentences(text):
    sentences = nltk.sent_tokenize(text)
    preproces_sentences = []
    for sentence in sentences:
        if sentence not in preproces_sentences:
            if sentence[0] == '-' or sentence.count('"'):                      # cut dialog
                pass
            elif sentence.count(',') >= 2 or sentence.count(':'):              # cut enumerations
                pass
            else:
                preproces_sentences.append(sentence)
        else:
            pass

    #compute main characters
    words = tokenizer(text)
    pos_list = nltk.pos_tag(words)
    names_in_text = []
    for word, tag in pos_list:
        if tag == 'NNP':
            names_in_text.append(word)
    top_name = Counter(names_in_text).most_common(2)

    set_of_sentences_including_main_characters=[]
    for sentence in preproces_sentences:
        for word in tokenizer(sentence):
            for w in top_name:
                if word.lower() == w[0].lower():
                    set_of_sentences_including_main_characters.append(sentence)
    print("Set of:", set_of_sentences_including_main_characters)


    return preproces_sentences, set_of_sentences_including_main_characters


def tokenizer(text):
    tokens = nltk.word_tokenize(text)
    return tokens


def count_words(tokens):
    word_counts = {}
    for token in tokens:
        if token not in stop_words and token not in punctuation:
            if token not in word_counts.keys():
                word_counts[token] = 1
            else:
                word_counts[token] += 1
    return word_counts


def word_frequency(word_counts):
    freq_distribution = {}
    max_frequency = max(word_counts.values())

    for word in word_counts.keys():
        freq_distribution[word] = (word_counts[word]/max_frequency)
    return freq_distribution


def score_sentences(sents, freq_dist):
    sent_scores = {}
    for sent in sents:
        words = sent.split(' ')
        for word in words:
            if word.lower() in freq_dist.keys():
                if sent not in sent_scores.keys():
                    sent_scores[sent] = freq_dist[word.lower()]
                else:
                    sent_scores[sent] += freq_dist[word.lower()]
    return sent_scores


def summarize(sent_scores, summarization_rate, sentences, sentences_about_chars):
    top_sents = Counter(sent_scores)
    text_summary = ''
    ordered_sentences = []
    top = top_sents.most_common(summarization_rate)
    #print("top", top)

    top_sentences = []
    for sent in top:
        top_sentences.append(sent[0])
    top_sentences = top_sentences + sentences_about_chars           # adding sentences about main characters

    #restore highly sentences in input logic order

    for raw_sent in sentences:
        for processed_sent in top_sentences:
            if raw_sent == processed_sent:
                if raw_sent not in ordered_sentences:
                    ordered_sentences.append(raw_sent)

    #compute summary with highly scored sentences
    for sentence in ordered_sentences:
        text_summary += sentence + ' '
    return text_summary


# CLEAR, PASTE, COPY event functions
def delete_input():
    input_text.delete('1.0', END)
    warning_message.set("Text deleted!")

def paste_input():
    text = root.selection_get(selection='CLIPBOARD')
    input_text.insert(INSERT, text)
    warning_message.set("Text inserted!")


def copy_output():
    root.clipboard_clear()
    root.clipboard_append(summary)
    warning_message.set("Text is in your clipboard!")


def validate_input_data(flag):
     if flag == 0:
         ok = 1
         inputValue = input_text.get("1.0", "end-1c")
         procent = procent_of_summarisation.get()
         if len(inputValue) < 1 and len(procent) < 2:
             warning_message.set("Please enter the text and the procent % of summarization!")
             ok = 0
         elif len(procent) < 2:
             warning_message.set("Please enter the procent %!")
             ok = 0
         elif len(inputValue) < 1:
             warning_message.set("Please enter the text!")
             ok = 0

         if int(procent) > 50 and len(procent)>=2:
            warning_message.set("Percent too long, choose between 10-50%!")
            ok = 0
         return ok
     else:
         warning_message.set("Ready!")
         return


def retrieve_input():
    global summary
    if validate_input_data(0) == 1:
        validate_input_data(1)
        output_text.delete('1.0', END)
        text = input_text.get("1.0", "end-1c")
        procent = procent_of_summarisation.get()

        #application logic

        tokens = tokenizer(text)
        sentences, sentences_about_main_chars = preprocess_sentences(text)
        word_counts = count_words(tokens)
        word_frequency_list = word_frequency(word_counts)
        sentences_scores = score_sentences(sentences, word_frequency_list)
        print(word_counts)
        print(word_frequency_list)
        print(sentences_scores)

        #compute summarization percent
        number_of_sentences = len(sentences)
        summary_rate = int(procent)/10*number_of_sentences/10
        print(summary_rate)

        summary = summarize(sentences_scores, math.floor(summary_rate), sentences, sentences_about_main_chars)

        status = "In:" + str(len(tokens)) + " words -> Out:" + str(len(tokenizer(summary))) + "words" + '\n'
        output_text.insert(INSERT, status)
        output_text.insert(INSERT, summary)
        warning_message.set("Summarization complete!")

    else:
        pass


#graphical interface

root.configure(background='#808080')

Label(root, text="Enter your text:", bg='#ff4d4d', bd=12).grid(row=0, column=0)

input_text = Text(root, height=25, width=60, bd=15, wrap=WORD, font=("Helvetica", 10, "bold italic"))

input_text.grid(row=1, column=0, padx=(10, 10), pady=(10, 10))

clear_input = Button(root, height=1, width=10, text="Clear", bd=5, command=lambda: delete_input()).grid(row=3, column=0, pady=(20, 20))

paste_the_input = Button(root, height=1, width=10, text="Paste", bd=5, command=lambda: paste_input())
paste_the_input.grid(row=4, column=0, pady=(20, 20))

copy_the_output = Button(root, height=1, width=10, text="Copy", bd=5, command=lambda: copy_output()).grid(row=3, column=3, pady=(20, 20))

Label(root, bg='#808080', text="Enter summarization percent 10-50: (%)").grid(row=3, column=2)

procent_of_summarisation=Entry(root, bd=3, justify=CENTER)
procent_of_summarisation.grid(row=4, column=2, pady=(5, 20))

buttonCommit = Button(root, height=1, width=30, bd=10, bg='#ff4d4d', text="Summarise", command=lambda: retrieve_input()).grid(row=5, column=2)

Label(root, text="Output:", bg='#ff4d4d', bd=12).grid(row=0, column=3)

output_text = Text(root, height=25, width=60, bd=15, wrap=WORD, font=("Helvetica", 10, "bold italic"))
output_text.grid(row=1, column=3, padx=(10, 10), pady=(10, 10))

warnings = Message(root, textvariable=warning_message, relief=RAISED, width=350, bg='red', font=("Helvetica", 15, "bold italic"))
warnings.grid(row=6, column=0, columnspan=2)

mainloop()