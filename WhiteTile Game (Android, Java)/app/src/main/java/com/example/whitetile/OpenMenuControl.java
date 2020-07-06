package com.example.whitetile;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Intent;
import android.media.MediaPlayer;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import static com.example.whitetile.MainActivity.*;

//Control that opens the menu inside the game session
public class OpenMenuControl {

    public void openMenu(final Activity gameActivity){
        mediaPlayer = MediaPlayer.create(gameActivity, R.raw.click);
        mediaPlayer.start();
        gamePaused = true;

        final AlertDialog alertD = new AlertDialog.Builder(gameActivity).create();
        alertD.getWindow().setBackgroundDrawableResource(R.drawable.alert_back);

        LayoutInflater layoutInflater = LayoutInflater.from(gameActivity);
        final View promptView = layoutInflater.inflate(R.layout.alert_menu, currentLayout, false);
        promptView.setBackgroundResource(R.drawable.alert_back);
        Button replayBtn = (Button)promptView.findViewById(R.id.replay);
        replayBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //Reset environment variables when player clicks to play again
                if(sounds){
                    mediaPlayer = MediaPlayer.create(gameActivity, R.raw.click);
                    mediaPlayer.start();
                }
                cardTwo.setImageResource(R.mipmap.black);
                cardTwo.setX(- cardTwo.getWidth());
                cardTwo.setY(screenHeight+ cardTwo.getHeight());
                cardThree.setImageResource(R.mipmap.black);
                cardThree.setX(- 2* cardTwo.getWidth());
                cardThree.setY(screenHeight+ 2* cardTwo.getHeight());
                cardOne.setImageResource(R.mipmap.black);
                cardOne.setX(- 3* cardTwo.getWidth());
                cardOne.setY(screenHeight+ 3* cardTwo.getHeight());
                missedPress = 0;
                score = 0;
                lifeCount = 10;
                lifeBox.setText(Integer.toString(lifeCount));
                scoreBox.setText(Integer.toString(score));
                Button b = (Button)gameActivity.findViewById(R.id.button6);
                b.setVisibility(View.VISIBLE);
                alertD.dismiss();
            }
        });

        Button backBtn = (Button)promptView.findViewById(R.id.back);
        backBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(sounds) {
                    mediaPlayer = MediaPlayer.create(gameActivity, R.raw.click);
                    mediaPlayer.start();
                }
                gamePaused = false;
                alertD.dismiss();
            }
        });

        Button homeBtn = (Button)promptView.findViewById(R.id.menu);
        homeBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(sounds) {
                    mediaPlayer = MediaPlayer.create(gameActivity, R.raw.click);
                    mediaPlayer.start();
                }
                Intent intent = new Intent(gameActivity, WelcomeActivity.class);
                gameActivity.startActivity(intent);
            }
        });

        alertD.setView(promptView);
        alertD.setCancelable(false);
        alertD.setCanceledOnTouchOutside(false);
        alertD.show();
    }
}
