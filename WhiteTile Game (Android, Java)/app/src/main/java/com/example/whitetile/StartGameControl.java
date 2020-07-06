package com.example.whitetile;

import android.view.View;
import android.widget.Button;

//Control that starts the game when player clicks play button
public class StartGameControl {
    public void startGame(View v){
        Button b = (Button)v.findViewById(R.id.button6);
        b.setVisibility(View.GONE);
        MainActivity.gamePaused = false;
    }
}
