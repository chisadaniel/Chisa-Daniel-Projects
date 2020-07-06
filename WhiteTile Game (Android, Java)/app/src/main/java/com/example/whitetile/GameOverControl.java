package com.example.whitetile;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.SharedPreferences;
import android.media.MediaPlayer;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import static com.example.whitetile.MainActivity.*;

//Control that shows the game over dialog, computes the score and shows it,
//also saves it in preferences if it's bigger than actual last 3 saved high scores
public class GameOverControl {
    public void showGameOver(final Activity gameActivity){
        if(sounds) {
            mediaPlayer = MediaPlayer.create(gameActivity, R.raw.gameover);
            mediaPlayer.start();
        }
        gamePaused = true;
        boolean highScore = false;

        //saving high scores in preferences
        SharedPreferences sharedPreferences = gameActivity.getSharedPreferences("scores",0);
        SharedPreferences.Editor editor = sharedPreferences.edit();

        int s1 = sharedPreferences.getInt("lastScore1", -1);
        int s2 = sharedPreferences.getInt("lastScore2", -1);
        int s3 = sharedPreferences.getInt("lastScore3", -1);

        if(score > s1){
            highScore = true;
            editor.putInt("lastScore1", score);
            editor.commit();
            editor.putInt("lastScore2", s1);
            editor.commit();
            editor.putInt("lastScore3", s2);
            editor.commit();
        }
        else if(score > s2){
            editor.putInt("lastScore2", score);
            editor.commit();
        }
        else if(score > s3){
            editor.putInt("lastScore3", score);
            editor.commit();
        }

        final AlertDialog gameOverAlertDialog = new AlertDialog.Builder(gameActivity).create();
        gameOverAlertDialog.getWindow().setBackgroundDrawableResource(R.drawable.alert_back);
        LayoutInflater layoutInflater1 = LayoutInflater.from(gameActivity);
        View promptView1 = layoutInflater1.inflate(R.layout.gameover, currentLayout, false);
        TextView finalScore = (TextView)promptView1.findViewById(R.id.scoreGameOver);

        if(highScore) {
            String s = "NEW HS:"+Integer.toString(score);
            finalScore.setText(s);
        }
        else{
            finalScore.setText(Integer.toString(score));
        }
        Button replayGameBtn = (Button)promptView1.findViewById(R.id.replayGameOver);
        replayGameBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(sounds) {
                    mediaPlayer = MediaPlayer.create(gameActivity.getApplicationContext(), R.raw.click);
                    mediaPlayer.start();
                }
                cardTwo.setImageResource(R.mipmap.black);
                cardTwo.setX(- cardTwo.getWidth());
                cardTwo.setY(screenHeight + cardTwo.getHeight());
                cardThree.setImageResource(R.mipmap.black);
                cardThree.setX(- 2 * cardTwo.getWidth());
                cardThree.setY(screenHeight+ 2*cardTwo.getHeight());
                cardOne.setImageResource(R.mipmap.black);
                cardOne.setX(- 3*cardTwo.getWidth());
                cardOne.setY(screenHeight+ 3*cardTwo.getHeight());
                missedPress = 0;
                score = 0;
                lifeCount = 10;
                lifeBox.setText(Integer.toString(lifeCount));
                scoreBox.setText(Integer.toString(score));
                Button playBtn = (Button)gameActivity.findViewById(R.id.button6);
                playBtn.setVisibility(View.VISIBLE);
                gameOverShown = false;
                gameOverAlertDialog.dismiss();
            }
        });

        gameOverAlertDialog.setView(promptView1);
        gameOverAlertDialog.setCancelable(false);
        gameOverAlertDialog.setCanceledOnTouchOutside(false);
        gameOverAlertDialog.show();
    }
}
