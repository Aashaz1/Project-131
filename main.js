song1 = "";
song2 = "";
song1Status = "";
song2Status = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
songOn = "";

function preload(){
    song1 = loadSound("believer.mp3");
    song2 = loadSound("Butter - BTS.mp3");
}

function setup(){
    canvas = createCanvas(500, 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded(){
    console.log("PoseNet is Initialized");
}

function gotPoses(results){
    if (results.length > 0){
        console.log(results);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        console.log(`Left Wrist X = ${leftWristX} Left Wrist Y = ${leftWristY}`);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log(`Right Wrist X = ${rightWristX} Right Wrist Y = ${rightWristY}`);
    }
}

function draw(){
    image(video, 0, 0, 500, 400);
    song1Status = song1.isPlaying();
    song2Status = song2.isPlaying();
    fill("#e81e1e");
    stroke("#e81e1e");

    if(scoreLeftWrist > 0.2){

    circle(leftWristX - 77, leftWristY - 56, 20);
    song2.stop();

    if(song1Status == false){
        song1.play();
        document.getElementById("song").innerHTML = `Playing : Believer`;
    }
    }

    if(scoreRightWrist > 0.2){

        circle(rightWristX - 77, rightWristY - 56, 20);
        song1.stop();
    
        if(song2Status == false){
            song2.play();
            document.getElementById("song").innerHTML = `Playing : Butter`;
        }
        }

}

function stop(){
    song1.stop();
    song2.stop();
}