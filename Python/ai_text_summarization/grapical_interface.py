from tkinter import *
from algorithm import *
root = Tk()
root.title("TEXT SUMMARIZATION")
status_text = StringVar()
warning_message = StringVar()
warning_message.set("Ready!")
def validate_input_data(flag):
     if flag == 0:
         ok = 1
         inputValue = textBox.get("1.0", "end-1c")
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
            ok=0
         return ok
     else:
         warning_message.set("Ready!")
         return


def retrieve_input():

    if validate_input_data(0) == 1:
        validate_input_data(1)
        output_text.delete('1.0', END)
        text = textBox.get("1.0", "end-1c")
        print(text)
        procent = procent_of_summarisation.get()
        print(type(procent))

        tokens = tokenizer(text)
        sents = sent_tokenizer(text)
        word_counts = count_words(tokens)
        freq_dist = word_freq_distribution(word_counts)
        sent_scores = score_sentences(sents, freq_dist)

        number_of_sentences=len(sents)
        summary_rate=int(procent)//10*number_of_sentences//10

        summary = summarize(sent_scores, summary_rate)

        for sent in sents:
            print(sent)




        output_text.insert(INSERT,summary)

    else:
        pass



def delete_input():
    textBox.delete('1.0', END)


root.configure(background = '#808080')
Label(root, text="Enter your text:", bg='#ff4d4d', bd=12).grid(row=0, column=0)
textBox = Text(root, height=25, width=60, bd=15, wrap=WORD)
textBox.grid(row=1, column=0,padx=(10, 10),pady=(10, 10))
clear_input = Button(root, height=1, width=10, text="Clear", bd=5, command=lambda: delete_input()).grid(row=3, column=0,pady=(20, 20))
Label(root,bg='#808080', text="Enter summarization percent 10-50: (%)").grid(row=3, column=2)
procent_of_summarisation=Entry(root, bd=3, justify=CENTER)
procent_of_summarisation.grid(row=4, column=2, pady=(5, 20))
buttonCommit = Button(root, height=1, width=30, bd=10, bg='#ff4d4d', text="Summarise", command=lambda: retrieve_input()).grid(row=5,column=2)
Label(root, text="Output:", bg='#ff4d4d', bd=12).grid(row=0,column=3)
output_text=Text(root, height=25, width=60, bd=15, wrap=WORD)
output_text.grid(row=1, column=3, padx=(10, 10), pady=(10, 10))

#warnings
warnings = Message(root, textvariable=warning_message, relief=RAISED, width=350, bg='red')
warnings.grid(row=6, column=0,columnspan=2)


mainloop()



