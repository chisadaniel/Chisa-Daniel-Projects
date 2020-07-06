package com.example.whitetile;

import android.app.Activity;
import android.media.MediaPlayer;
import android.util.Log;
import android.view.View;
import static com.example.whitetile.MainActivity.*;

public class SetCardsEventListenerControl {
    public void setEventListeners(final Activity gameActivity){
        cardOne.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (!clicked1) {
                    if(sounds) {
                        //set sound
                        mediaPlayer.stop();
                        mediaPlayer = MediaPlayer.create(gameActivity, R.raw.sound);
                        mediaPlayer.start();
                    }
                    Log.i("pressed", "black1");
                    cardOne.setImageResource(R.mipmap.broken);
                    clicked1 = true;
                    score++;
                    scoreBox.setText(Integer.toString(score));
                }
            }
        });
        cardTwo.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(!clicked2) {
                    if(sounds) {
                        //set sound
                        mediaPlayer.stop();
                        mediaPlayer = MediaPlayer.create(gameActivity, R.raw.sound);
                        mediaPlayer.start();
                    }
                    Log.i("pressed", "black2");
                    cardTwo.setImageResource(R.mipmap.broken);
                    clicked2 = true;
                    score++;
                    scoreBox.setText(Integer.toString(score));
                }
            }
        });
        cardThree.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(!clicked3) {
                    if(sounds) {
                        //set sound
                        mediaPlayer.stop();
                        mediaPlayer = MediaPlayer.create(gameActivity, R.raw.sound);
                        mediaPlayer.start();
                    }
                    Log.i("pressed", "black2");
                    cardThree.setImageResource(R.mipmap.broken);
                    clicked3 = true;
                    score++;
                    scoreBox.setText(Integer.toString(score));
                }
            }
        });
    }
}
