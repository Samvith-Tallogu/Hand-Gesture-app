
Webcam.set({
    width: 350, 
    height: 300,
    image_format:"png",
    png_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById('result').innerHTML = '<img id="captured_image" src="'+data_uri+'"/><hr><button onclick="check();" class="btn btn-default">Recognize Gesture</button><br><h3>Gesture:<h2 id="ges_name"></h2></h3>';
    });
}
console.log('ML5 Version:', ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/UWai5nqYe/model.json", modelLoaded);

function modelLoaded(){
    console.log("Model Loaded");
}
function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The first Prediction is:" + prediction_1;
    speak_data_2 = "And the second Prediction is:" + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}
function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}
function gotResult(error, results) {
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("ges_name").innerHTML = results[0].label;
    }
}
