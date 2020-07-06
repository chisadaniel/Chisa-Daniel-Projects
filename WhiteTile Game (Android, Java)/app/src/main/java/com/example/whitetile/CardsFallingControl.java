package com.example.whitetile;

import android.util.Log;
import java.util.Random;
import static com.example.whitetile.MainActivity.*;

//Control that manages the movement of the cards top-bottom
public class CardsFallingControl {

    //Function that change position of the falling cards, also keep evidence of missed cards
    public void changePos(){

        //Modify distance of falling, meaning increasing the speed while user achieve new scores levels
        if(score>40 && t4){
            t4 = false;
            jump += 2;
            speedBox.setText("x5");
        }
        else if(score>30 && t3){
            t3 = false;
            jump += 1;
            speedBox.setText("x4");
        }
        else if(score>20 && t2){
            t2 = false;
            jump += 1;
            speedBox.setText("x3");
        }
        else if(score>10 && t1){
            t1 = false;
            speed = 15;
            jump += 2;
            speedBox.setText("x2");
        }

        int x, x1, x2;
        Random rand = new Random();
        //Black cardOne, computing random the new lane it is falling down and turn it to black
        //only when had fallen(over fitted the screen bottom line)
        //same for the next cards
        coordinateY += jump;
        if(cardOne.getY() >screenHeight){
            //reset color to black
            cardOne.setImageResource(R.mipmap.black);
            x = rand.nextInt(screenNumberOfFrames);
            coordinateX = (float)(Math.floor(x) * 87.0f);
            coordinateY = -cardTwo.getHeight()- coordinateY;
            clicked1 = false;
        }
        //Set the new coordinates of card(falling down effect)
        cardOne.setX(coordinateX);
        cardOne.setY(coordinateY);
        Log.i("coord: ","1 x"+ coordinateX +","+ coordinateY);

        //Black cardTwo
        coordinateY1 += jump;
        if(cardTwo.getY() >screenHeight){
            //reset color to black
            cardTwo.setImageResource(R.mipmap.black);
            x1 = rand.nextInt(screenNumberOfFrames);
            coordinateY1 = -2* cardTwo.getHeight() - coordinateY1;
            coordinateX1 = (float)(Math.floor(x1) * 87.0f);
            clicked2 = false;
        }
        cardTwo.setX(coordinateX1);
        cardTwo.setY(coordinateY1);
        Log.i("coord: ","2 x"+ coordinateX1 +","+ coordinateY1);

        //Black cardThree
        coordinateY2 += jump;
        if(cardThree.getY() >screenHeight){
            //reset color to black
            cardThree.setImageResource(R.mipmap.black);
            x2 = rand.nextInt(screenNumberOfFrames);
            coordinateY2 = -3* cardTwo.getHeight()- coordinateY2;
            coordinateX2 = (float)(Math.floor(x2) * 87.0f);
            clicked3 = false;
        }
        cardThree.setX(coordinateX2);
        cardThree.setY(coordinateY2);
        Log.i("coord: ","3 x"+ coordinateX2 +","+ coordinateY2);

        //Change color from black to red of untouched cards when its cross the safe limit
        if(cardOne.getY() >= separatorPosition){
            if(!clicked1){
                cardOne.setImageResource(R.mipmap.red);

            }
        }
        if(cardTwo.getY() >= separatorPosition){
            if(!clicked2){
                cardTwo.setImageResource(R.mipmap.red);

            }
        }
        if(cardThree.getY() >= separatorPosition){
            if(!clicked3){
                cardThree.setImageResource(R.mipmap.red);

            }
        }

        //Saving number of missed touched cards to know when the game is over, also decrease life of player
        if(cardOne.getY() >= screenHeight && !clicked1) {

            if (!gamePaused && k == 0) {
                missedPress++;
                if (lifeCount != 0) lifeCount--;
                lifeBox.setText(Integer.toString(lifeCount));

            }
            k = 0;
        }
        if(cardTwo.getY() >= screenHeight  && !clicked2) {

            if(!gamePaused && m == 0) {
                missedPress++;
                if (lifeCount != 0) lifeCount--;
                lifeBox.setText(Integer.toString(lifeCount));
            }
            m = 0;
        }
        if(cardThree.getY()>=screenHeight &&  !clicked3) {

            if(!gamePaused && p == 0) {
                missedPress++;
                if (lifeCount != 0) lifeCount--;
                lifeBox.setText(Integer.toString(lifeCount));
            }
            p = 0;
        }
    }
}
