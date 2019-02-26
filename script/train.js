var video = document.getElementById('video');
var container = document.getElementById('container');
var leftWrist = document.createElement("div");
var rightWrist = document.createElement("div");
let poseNet;
let poses = [];
let skeletons = [];

// Create a webcam capture
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({
    video: true
  }).then(function (stream) {
    video.srcObject = stream;
    video.play();

    poseNet = ml5.poseNet(video);
    poseNet.on('pose', function (results) {
      poses = results;
      console.log(poses)
      drawKeypoints();
    });
    drawSkeleton();

  });
}

// function setup() {
//   createCanvas(440, 380);
//   stroke(255);
// }


// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = poses[i].pose.keypoints[j];


      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.5) {
        // fill(255, 0, 0);
        // noStroke();
        // ellipse(keypoint.position.x, keypoint.position.y, 10, 10);

        // draw point
        switch (keypoint.part) {
          case "leftWrist":
            leftWrist.style.width = "15px";
            leftWrist.style.height = "15px";
            leftWrist.style.left = (keypoint.position.x).toString() + "px";
            leftWrist.style.top = (keypoint.position.y).toString() + "px";
            leftWrist.style.backgroundColor = "red";
            leftWrist.style.position = "absolute";
            leftWrist.style.zIndex = "100";
            container.appendChild(leftWrist);
            break;

          case "rightWrist":
            rightWrist.style.width = "15px";
            rightWrist.style.height = "15px";
            rightWrist.style.left = (keypoint.position.x).toString() + "px";
            rightWrist.style.top = (keypoint.position.y).toString() + "px";
            rightWrist.style.backgroundColor = "blue";
            rightWrist.style.position = "absolute";
            rightWrist.style.zIndex = "100";
            container.appendChild(rightWrist);
            break;

          default:
            break;
        }

        // try {
        //   container.removeChild(leftWrist);
        //   container.removeChild(rightWrist);
        // } catch (error) {
          
        // }
       
        console.log("point");
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    // For every skeleton, loop through all body connections
    for (let j = 0; j < poses[i].skeleton.length; j++) {
      let partA = poses[i].skeleton[j][0];
      let partB = poses[i].skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}