$(document).ready(function(){
  var switchButtonStatus, count=0, strictmd = false, strictstat=true;
  var colorArray=[], trkClick=[]; $('#switchEvent').bootstrapToggle('off');  
  
  function initialize(){ // reset all variables
        for(var b=1; b<=4; b++){
          
          $('#'+b).disabled = true;
           $('#'+b).off('click'); }
         $('.countV')[0].innerHTML ='&emsp;';
         $('#start').off('click'); $('#strict').off('click');
         turnOnOffButton(0);
        switchButtonStatus= false; strictstat=false; colorArray =[]; count =0; trkClick =[]; strictmd=false;
         $('#start').css("opacity","0.6"); $('#strict').css("opacity","0.6")  ;        
         document.getElementById("strictStatus").style.backgroundColor = "black";
  }   initialize();
 
    $('#switchEvent').on('change',function(){ // switch on and off 
     switchButtonStatus = $('#switchEvent').prop('checked');
     if(switchButtonStatus === true){  // click enable all color buttons 
       for(var b=1; b<=4; b++){
         $('#'+b).disabled = false;
        } 
       document.getElementById('start').disabled = false;  document.getElementById('strict').disabled = false;  // enable start and strict button
       $('#trckCnt').text("- -"); // count reset to "- -"
       $('#start').css("opacity","1");$('#strict').css("opacity","1"); // light up the start and strict button       
       
        $('#strict').off('click').on('click',function(){ // strict button click events
             trkClick=[]; colorArray=[];
             if(strictstat===false){ 
                  document.getElementById("strictStatus").style.backgroundColor = "red";
                  strictmd= true; strictstat = true;
             }
              else if(strictstat === true){
                  document.getElementById("strictStatus").style.backgroundColor = "black";
                  strictmd= false; strictstat = false;
               }
       })
      
       $('#start').off('click').on('click',function(){ // start button click events
          trkClick=[]; colorArray=[];count =0; playButton(); 
        }); // end of start
     } // end of if switch button on 
       else if(switchButtonStatus === false){  
         document.getElementById('winneralert').style.visibility='hidden';
         switchButtonStatus=true; initialize(); }
       }); // check for switch on and off button status
  
        function turnOnOffButton(v){// on and off switch button function to dim/light up the color buttons
           if (v===1) {
               for(var b=1; b<=4; b++){
                $('#'+b).css("opacity", "1");  }
          }

           if (v===0){
             for(var b=1; b<=4; b++){
             $('#'+b).css("opacity", "0.6");
            }
           }
        }  // end of turn on and off
     
      function addColors(){ // add colors in the colorArray array 
        colorArray.push([1,2,3,4][Math.floor(Math.random() * 4)]);
      };
  
      function playSound(){// play sound function when color buttons are clicked, reset the count label on wrong click
         for(var b=1; b<=4; b++){
          document.getElementById(b).style.pointerEvents = 'none';
         } 
         var a = colorArray, m=0;
         var startPlay = setInterval(function(){
         if ($('#trckCnt').text()=="! !"){  
             document.getElementById('trckCnt').innerHTML=('0'+count).slice(-2);
           }
           var str = a[m];
           document.getElementById(str).style.opacity=1;
           setTimeout(function(){document.getElementById(str).style.opacity=0.6;},200);
           document.getElementById('btn'+str).play();
          m++;      
          if(m>=a.length){
            clearInterval(startPlay);
            for(var b=1; b<=4; b++){
             document.getElementById(b).style.pointerEvents = 'auto';
             }
          }
        },800);
      }
 
  function addTurns(){// increment of the turns due to correct response
    count++;
    document.getElementById('trckCnt').innerHTML=('0'+count).slice(-2);;
    }
 
  function playButton(){
    
    if (count ===20){ // if the user played all 20 turns correctly, message and exit funnction
     document.getElementById('winner').play(); document.getElementById('winneralert').innerHTML="Hurray!</br> You won!";
      initialize();
      return false;
    }
   
   addColors(); playSound(); addTurns();   // add turns for colorArray
   $('button').off('click').on('click',function(j){ // user turns now
     if(j.target.id ==="start"){ // if during play, user clicks start, reset count and replay moves
      trkClick=[]; colorArray=[]; count =0; $('#trckCnt').text("- -"); playButton(); 
    }    
     
    if(j.target.id === "1" || j.target.id ==="2" || j.target.id==="3" || j.target.id==="4"){ // light up buttons during player moves
        document.getElementById('btn'+j.target.id).play(); document.getElementById(j.target.id).style.opacity=1;
        setTimeout(function(){document.getElementById(j.target.id).style.opacity=0.6;},200);
         trkClick.push(j.target.id);
      
        if (colorArray.toString() === trkClick.toString())// if user response same as colorArray, reset the track array and play next move
            { 
              trkClick =[]; setTimeout(function(){playButton(); return;},800);
            }
        
         for (var i=0; i<trkClick.length; ++i){ // used for loop to slow down the play sequence
           if(trkClick[i]!= colorArray[i]){// if user response not same as colorArray and strict status is off, replay the color sequence
             if(strictstat ===false){
                  var init_value = ($('#trckCnt').text());
                  $('#trckCnt').text("! !");document.getElementById('wmove').play(); // wrong move
                  trkClick=[]; setTimeout(function(){playSound(colorArray);},500); break; // reset user response array and replay the colorArray colors
             }
            else if(strictstat ===true){ // if strict status is true, reset color sequence, players move and count and replay
               trkClick=[]; colorArray=[]; count =0; $('#trckCnt').text("- -"); 
              document.getElementById('strictwm').play();
              setTimeout(function(){playButton(); return;},800);  break;
            }
          }  
        } // end of for
      }
    })
  }
}); // end of script
  