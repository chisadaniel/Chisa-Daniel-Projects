package com.example.whitetile;

import android.content.SharedPreferences;
import android.graphics.Point;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.app.Activity;
import android.os.Handler;
import android.util.Log;
import android.view.Display;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;

import java.util.Timer;
import java.util.TimerTask;

public class MainActivity extends Activity {
    protected static int k=1,m=1,p=1,speed=25,jump=10;
    protected static float separatorPosition;
    protected static boolean clicked1=false,clicked2=false,clicked3=false,gamePaused=true,gameOverShown=false,sounds;
    protected static ImageView cardOne, cardTwo, cardThree;
    protected static int score;
    protected static int lifeCount = 10;
    protected static int missedPress = 0;

    //This booleans helps to increase the speed only once at time and keeping that speed
    protected static boolean t1=true,t2=true,t3=true,t4=true;

    //screen size
    protected static int screenWidth;
    protected static int screenHeight;

    //coordinates of blacks images
    protected static float coordinateX, coordinateX1, coordinateX2;
    protected static float coordinateY, coordinateY1, coordinateY2;

    //initialize handler
    private Handler handler = new Handler();
    private  Timer timer = new Timer();
    protected static int screenNumberOfFrames;

    //initialize current layout for capturing it late
    protected static RelativeLayout currentLayout;

    //initialize score and life boxes on screen
    protected static TextView scoreBox;
    protected static TextView lifeBox;
    protected static TextView speedBox;

    //initialize mediaPlayer objects first is used for tap sound the other for the background sound
    protected static MediaPlayer mediaPlayer;
    protected static MediaPlayer backgroundPlayer;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //Initialize game session
        InitializeGameControl initializeGame = new InitializeGameControl();
        initializeGame.initialize(MainActivity.this);

        //Set event listeners for cards to capture when player clicks on them
        SetCardsEventListenerControl setEventListeners = new SetCardsEventListenerControl();
        setEventListeners.setEventListeners(MainActivity.this);

        //Start timer, function that handle cycles in moving top-bottom
        final CardsFallingControl cardsFallingControl = new CardsFallingControl();
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                handler.post(new Runnable() {
                    @Override
                    public void run() {

                        if(missedPress > 10 && !gameOverShown){
                            gamePaused = true;
                            gameOverShown = true;
                            showGameOver();
                        }
                         if(!gamePaused) cardsFallingControl.changePos();

                    }
                });
            }
        },0,speed);
    }

    @Override
    protected void onStop(){
        super.onStop();
        gamePaused = true;
        if(sounds){
            backgroundPlayer.stop();
        }
    }
    @Override
    protected void onPause(){
        super.onPause();
        gamePaused = true;
    }
    @Override
    protected void onStart(){
        super.onStart();
        SharedPreferences sharedPreferences = getApplicationContext().getSharedPreferences("scores",0);
        boolean sound = sharedPreferences.getBoolean("sound",true);

        if(sound){
            backgroundPlayer.start();
        }
    }
    @Override
    protected void onRestart(){
        super.onRestart();
        gamePaused = false;
        backgroundPlayer = MediaPlayer.create(getApplicationContext(), R.raw.back_sound);
        //backgroundPlayer.start();
        backgroundPlayer.setLooping(true);
        SharedPreferences sharedPreferences = getApplicationContext().getSharedPreferences("scores",0);
        boolean sound = sharedPreferences.getBoolean("sound",true);

        if(sound){
            backgroundPlayer.start();
        }
    }

    //Function that starts the game when player clicks play button
    public void startGame(View v){
        StartGameControl startGame = new StartGameControl();
        startGame.startGame(v);
    }

    //Function that opens the menu inside game session
    public void openMenu(View w){
        OpenMenuControl openMenu = new OpenMenuControl();
        openMenu.openMenu(MainActivity.this);
    }

    //Function that shows the game over dialog, computes the score and show it,
    //also saves it in preferences if it's bigger than actual last 3 high scores saved
    public void showGameOver(){
       GameOverControl gameOverControl = new GameOverControl();
       gameOverControl.showGameOver(MainActivity.this);
    }
}
