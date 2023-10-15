objects = [];
status = "";

function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(380,380);
  video.hide();
}

function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
}

function start()
{
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
  input = document.getElementById("text_input").value;
}

function draw(){
    image(video, 0, 0, 380, 380);
        if(status != ""){
          objectDetector.detect(video, gotResult);
          for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";
            
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
  
           
            if(objects[i].label == input){
              video.stop();
              objectDetector.detect(gotResult);
              document.getElementById("text_input").innerHTML = input + " Found";
              synth = window.speechSynthesis;
              utterThis = new SpeechSynthesisUtterance(input + "Found");
              synth.speak(utterThis);
            }
            else{
              document.getElementById("text_input").innerHTML = input + " Not Found";
            }          
           }
        }
  }

  function gotResult(error, results) {
    if (error) {
      console.log(error);
    }
    console.log(results);
    objects = results;
  }