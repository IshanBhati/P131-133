statuses = "";
object = [];


function preload()
{
    img = loadImage("carOBJ.jpg");
}

function setup()
{
   canvas = createCanvas(450,450);
   canvas.center();

   objectDetector = ml5.objectDetector('cocossd', modelLoaded);
   document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function draw()
{
    if (statuses != "")
    {
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x, objects[i].y);
            noFill();
            stroke("FF0000");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }
}

function modelLoaded()
{
    console.log("Model Loaded");
    statuses = true;
    objectDetector.detect(img, gotResults);
}

function gotResults(results, error)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    object = results;
}