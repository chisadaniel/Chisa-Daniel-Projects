package com.example.whitetile;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;

import com.facebook.share.model.ShareLinkContent;
import com.facebook.share.widget.ShareDialog;

public class WelcomeActivity extends AppCompatActivity {
    MediaPlayer mediaPlayer;
    ShareDialog shareDialog;
    MediaPlayer backgroundPlayer;
    boolean sounds;
    int highScore=0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_welcome);
        SharedPreferences sharedPreferences = getApplicationContext().getSharedPreferences("scores",0);
        sounds = sharedPreferences.getBoolean("sound",true);
        highScore = sharedPreferences.getInt("lastScore1",0);
        if(sounds) {
            backgroundPlayer = MediaPlayer.create(getApplicationContext(), R.raw.back_sound);
            backgroundPlayer.start();
            backgroundPlayer.setLooping(true);
        }
        shareDialog = new ShareDialog(this);
    }

    @Override
    protected void onStop(){
        super.onStop();
        if(sounds){
            backgroundPlayer.stop();
        }
    }


    @Override
    protected void onStart(){
        super.onStart();
        if(sounds){
            backgroundPlayer.start();
        }
    }

    @Override
    protected void onRestart(){
        super.onRestart();
        backgroundPlayer = MediaPlayer.create(getApplicationContext(), R.raw.back_sound);
        //backgroundPlayer.start();
        backgroundPlayer.setLooping(true);
        SharedPreferences sharedPreferences = getApplicationContext().getSharedPreferences("scores",0);
        boolean sound = sharedPreferences.getBoolean("sound",true);
        if(sound){
            backgroundPlayer.start();
        }
    }


    public void startGame(View v){
        if(sounds) {
            mediaPlayer = MediaPlayer.create(getApplicationContext(), R.raw.click);
            mediaPlayer.start();
        }
        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
    }

    public void goToHighScores(View v){
        if(sounds) {
            mediaPlayer = MediaPlayer.create(getApplicationContext(), R.raw.click);
            mediaPlayer.start();
        }
        Intent intent = new Intent(this, HighScoresActivity.class);
        startActivity(intent);
    }

    public void goToSettings(View v){
        if(sounds) {
            mediaPlayer = MediaPlayer.create(getApplicationContext(), R.raw.click);
            mediaPlayer.start();
        }
        Intent intent = new Intent(this, SettingsActivity.class);
        startActivity(intent);
    }

    //Function that shares on facebook highest score of the player
    public void goToShare(View v){
        if(sounds) {
            mediaPlayer = MediaPlayer.create(getApplicationContext(), R.raw.click);
            mediaPlayer.start();
        }
        if (ShareDialog.canShow(ShareLinkContent.class)) {
            ShareLinkContent linkContent = new ShareLinkContent.Builder()
                    .setContentUrl(Uri.parse("https://images-na.ssl-images-amazon.com/images/I/318FqwZLykL._SY355_.png"))
                    .setQuote("Check out my new high score "+highScore)
                    .build();
            shareDialog.show(linkContent);
        }
    }
}
