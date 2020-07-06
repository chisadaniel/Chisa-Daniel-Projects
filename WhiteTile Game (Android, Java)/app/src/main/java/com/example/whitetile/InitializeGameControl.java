package com.example.whitetile;

import android.app.Activity;
import android.content.SharedPreferences;
import android.graphics.Point;
import android.media.MediaPlayer;
import android.util.Log;
import android.view.Display;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;
import static com.example.whitetile.MainActivity.*;

//Control that initialize a new game session
public class InitializeGameControl {

    public void initialize(Activity gameActivity){
        //Capture layout
        currentLayout = (RelativeLayout)gameActivity.findViewById(R.id.mylay);
        //ScoringBox capture
        scoreBox = (TextView)gameActivity.findViewById(R.id.score);
        //LifeBox capture
        lifeBox = (TextView)gameActivity.findViewById(R.id.life);
        lifeBox.setText(Integer.toString(lifeCount));
        //SpeedBox capture
        speedBox=(TextView)gameActivity.findViewById(R.id.speedBox);

        //Load tap sound of pressed cards
        mediaPlayer = MediaPlayer.create(gameActivity, R.raw.sound);

        //Get screen sizes x y (width, height)
        WindowManager wm = gameActivity.getWindowManager();
        Display currentDisplay = wm.getDefaultDisplay();
        Point size = new Point();
        currentDisplay.getSize(size);
        screenHeight = size.y;
        screenWidth = size.x;

        //get sound turned on/off from preferences
        SharedPreferences sharedPreferences = gameActivity.getSharedPreferences("scores",0);
        sounds = sharedPreferences.getBoolean("sound",true);
        Log.i("set","get sounds as "+sounds);
        if(sounds) {
            backgroundPlayer = MediaPlayer.create(gameActivity, R.raw.back_sound);
            backgroundPlayer.setLooping(true);
        }

        //Configure black images, create and fill them with black images, setting their initial position
        cardOne = new ImageView(gameActivity);
        cardTwo = new ImageView(gameActivity);
        cardThree = new ImageView(gameActivity);

        cardTwo.setImageResource(R.mipmap.black);
        cardTwo.setX(cardTwo.getWidth());
        cardTwo.setY(cardTwo.getHeight());

        cardThree.setImageResource(R.mipmap.black);
        cardThree.setX( cardTwo.getWidth()+ cardTwo.getWidth());
        cardThree.setY(2* cardTwo.getHeight());

        cardOne.setImageResource(R.mipmap.black);
        cardOne.setX( cardTwo.getWidth()+ cardTwo.getWidth()+ cardTwo.getWidth());
        cardOne.setY(-3* cardTwo.getHeight());

        //Find out how many cards can fit on a line considering screen width
        screenNumberOfFrames = screenWidth/87 ;
        Log.i("screens",""+screenNumberOfFrames);

        // Set divider limit 200 px margin of divider, cards which cross this limit become red
        separatorPosition = screenHeight-200.0f+ cardTwo.getHeight()/2;
        Log.i("separator",""+separatorPosition+"" );

        RelativeLayout.LayoutParams params = new RelativeLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT,ViewGroup.LayoutParams.WRAP_CONTENT);

        //add to layout dynamic created cards
        currentLayout.addView(cardOne, params);
        currentLayout.addView(cardTwo, params);
        currentLayout.addView(cardThree, params);
    }
}
