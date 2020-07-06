package com.example.whitetile;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

public class HighScoresActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_high_scores);

        SharedPreferences sharedPreferences = getApplicationContext().getSharedPreferences("scores",0);
        int s1 = sharedPreferences.getInt("lastScore1", -1);
        int s2 = sharedPreferences.getInt("lastScore2", -1);
        int s3 = sharedPreferences.getInt("lastScore3", -1);
        String name = sharedPreferences.getString("name", null);

        TextView score1 = (TextView)findViewById(R.id.score1);
        if(s1 != -1){
            score1.setText(Integer.toString(s1));
        }
        else{
            score1.setText("0");
        }
        TextView score2 = (TextView)findViewById(R.id.score2);
        if(s2 != -1){
            score2.setText(Integer.toString(s2));
        }
        else{
            score2.setText("0");
        }
        TextView score3 = (TextView)findViewById(R.id.score3);
        if(s3 != -1){
            score3.setText(Integer.toString(s3));
        }
        else{
            score3.setText("0");
        }
        if(name != null){
            TextView winner = (TextView)findViewById(R.id.name);
            winner.setText(name);
        }
        TextView backBtn = (TextView)findViewById(R.id.backToWelcome);
        backBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), WelcomeActivity.class);
                startActivity(intent);
            }
        });
    }

}
