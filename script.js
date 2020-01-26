//global variables
let width=500,
    height=0,
    filter="none",
    streaming=false;

//fetching
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const photos = document.getElementById("photos");
const clearbutton = document.getElementById("clear-button");
const photobutton = document.getElementById("photo-button");
const photofilter = document.getElementById("photo-filter");

//get the webcam

navigator.mediaDevices.getUserMedia({video:true,audio:false}
)
.then(function(stream){
    video.srcObject = stream;
    video.play();
})
.catch(function(err){
    console.log(`Error: ${err}`);
});

//play when ready
video.addEventListener('canplay',function(e){
    if(!streaming){
        height = video.videoHeight / (video.videoWidth/width);
        video.setAttribute('width',width);
        video.setAttribute('height',height);
        canvas.setAttribute('width',width);
        canvas.setAttribute('height',height);

        streaming = true;
    }
    },false);
// attach photo
photobutton.addEventListener('click',function(e){
    takePicture();

    e.preventDefault();

},false);    

//attaching photo filter
photofilter.addEventListener('change',function(e){

    filter = e.target.value;
    video.style.filter = filter;

    e.preventDefault();
});

clearbutton.addEventListener('click',function(e){

    photos.innerHTML = '';
    filter = 'none';

    video.style.filter = filter;

    photofilter.selectedIndex = 0;
})

function takePicture(){

    const context = canvas.getContext('2d');

    if(width && height){
        canvas.width = width;
        canvas.height = height;

        //snap
        context.drawImage(video,0,0,width,height);
        const imgUrl = canvas.toDataURL('image/png');

        const img = document.createElement('img');
        
        img.setAttribute('src',imgUrl);

        img.style.filter = filter;

        photos.appendChild(img);
    }
}