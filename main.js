song = "";
leftwristx = 0;
rightwristx = 0;
leftwristy = 0;
rightwristy = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0


function setup() {
    canvas = createCanvas(500, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelloaded);
    posenet.on("pose", gotposes);



}

function draw() {
    image(video, 0, 0, 500, 500);
    if (scoreLeftWrist > 0.2) {
        fill("#0008FF")
        stroke("#0008FF")
        circle(leftwristx, leftwristy, 20)
        NumLeftWristy = Number(leftwristy)
        RemoveDecy = floor(NumLeftWristy)
        volume = RemoveDecy / 500
        document.getElementById("vol").innerHTML = "volume = " + volume
        song.setVolume(volume)

    }
    if (scoreRightWrist > 0.2) {
        fill("#FF0000")
        stroke("#FF0000")
        circle(rightwristx, rightwristy, 20)
        if (rightwristy > 0 && rightwristy < 100) {
            document.getElementById("speed").innerHTML = "speed = 0.5x"
            song.rate(0.5)
        } else if (rightwristy > 100 && rightwristy < 200) {
            document.getElementById("speed").innerHTML = "speed = 1x"
            song.rate(1)
        } else if (rightwristy > 200 && rightwristy < 300) {
            document.getElementById("speed").innerHTML = "speed = 1.5x"
            song.rate(1.5)
        } else if (rightwristy > 300 && rightwristy < 400) {
            document.getElementById("speed").innerHTML = "speed = 2x"
            song.rate(2)
        }
        else if (rightwristy > 400 && rightwristy < 500) {
            document.getElementById("speed").innerHTML = "speed = 2.5x"
            song.rate(2.5)
       }

    }
}


function preload() {
    song = loadSound("something.mp3");
}

function PlayMp() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelloaded() {
    console.log("modelloaded");
}

function gotposes(results) {
    if (results.length > 0) {
        console.log(results);
        leftwristx = results[0].pose.leftWrist.x;
        leftwristy = results[0].pose.leftWrist.y;
        rightwristx = results[0].pose.rightWrist.x;
        rightwristy = results[0].pose.rightWrist.y;
        console.log(leftwristx)
        console.log(leftwristy)
        console.log(rightwristx)
        console.log(rightwristy)
        scoreLeftWrist = results[0].pose.keypoints[9].score
        console.log(scoreLeftWrist)
        scoreRightWrist = results[0].pose.keypoints[10].score
        console.log(scoreRightWrist)

    }
}