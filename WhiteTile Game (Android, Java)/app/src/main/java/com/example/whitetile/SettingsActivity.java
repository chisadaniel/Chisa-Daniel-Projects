package com.example.whitetile;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.CompoundButton;
import android.widget.EditText;
import android.widget.Switch;
import android.widget.TextView;

public class SettingsActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_settings);


        //listener to go back to welcome activity
        TextView backBtn= (TextView)findViewById(R.id.backToWelcome2);
        backBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), WelcomeActivity.class);
                startActivity(intent);
            }
        });

        //Sound switch for setting sound on/off
        Switch mySwitch = (Switch) findViewById(R.id.switchSounds);
        SharedPreferences sharedPreferences = getApplicationContext().getSharedPreferences("scores",0);
        boolean currentSoundSetting = sharedPreferences.getBoolean("sound",true);
        mySwitch.setChecked(currentSoundSetting);

        mySwitch.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
                @Override
                public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                    if(isChecked){
                        SharedPreferences sharedPreferences = getApplicationContext().getSharedPreferences("scores",0);
                        SharedPreferences.Editor editor = sharedPreferences.edit();
                        editor.putBoolean("sound",true);
                        editor.commit();
                        Log.i("set","sounds true"+sharedPreferences.getBoolean("sound",false));
                    }
                    else{
                        SharedPreferences sharedPreferences = getApplicationContext().getSharedPreferences("scores",0);
                        SharedPreferences.Editor editor = sharedPreferences.edit();
                        editor.putBoolean("sound",false);
                        editor.commit();
                        Log.i("set","sounds false"+sharedPreferences.getBoolean("sound",false));
                    }

                }
            });

    }

    //function for storing in preferences player name
    public void setName(View v){
        SharedPreferences sharedPreferences = getApplicationContext().getSharedPreferences("scores",0);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        EditText editText = (EditText)findViewById(R.id.enterName);
        editor.putString("name",editText.getText().toString());
        editor.commit();
    }
}
