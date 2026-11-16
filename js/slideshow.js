// var TIME_STEP = 100;
var TIME_STEP = 50;

var SLIDESHOW_PIC_DELAY = 4000;

var opacityStep = 0.01;

var SLIDESHOW_PATH = "titlePics/";

var SLIDESHOP_PICS = [
    "webfilesys4.png",
    "explorer.png",
	"pictureAlbum.png",
	"albumDetail.png",
	"multiUpload.png",
	"thumbnails.png",
	"sunburst.png",
	"fileStats.gif",
	"calendarMonth.png",
	"GPX-track.png",
	"folderSync.png"
];

var currentPic = 1;

var prefetchImg = new Image();    
    
// prefetchImg.onload = prefetchLoaded;

var picElem1;
var picElem2;

function slideShow(duration) {
    var nextPic = (currentPic + 1) % SLIDESHOP_PICS.length;
    prefetchImg.src = SLIDESHOW_PATH + SLIDESHOP_PICS[nextPic];

    picElem1 = document.getElementById("pic1");
    picElem2 = document.getElementById("pic2");

    if (duration) {
	    var steps = duration / TIME_STEP;
		opacityStep = 1 / steps;
	}
    setTimeout("switchOpacity()", 3000);
}

function switchOpacity() {
    console.log("switchOpacity");
	
	var opacityChanged = false;
	
	var oldOpacity = parseFloat(picElem1.style.opacity);
	if (oldOpacity > 0) {
	    picElem1.style.opacity = (oldOpacity - opacityStep); 
        opacityChanged = true;		
    }	

	oldOpacity = parseFloat(picElem2.style.opacity);
	if (oldOpacity < 1) {
        picElem2.style.opacity = (oldOpacity + opacityStep);
        opacityChanged = true;		
    }	

	if (opacityChanged) {
        setTimeout("switchOpacity()", TIME_STEP);
    } else {
        var swap = picElem1;
		picElem1 = picElem2;
		picElem2 = swap;
		
		currentPic = (currentPic + 1) % SLIDESHOP_PICS.length;
		picElem2.src = SLIDESHOW_PATH + SLIDESHOP_PICS[currentPic];
		
        var nextPic = (currentPic + 1) % SLIDESHOP_PICS.length;
        prefetchImg.src = SLIDESHOW_PATH + SLIDESHOP_PICS[nextPic];
		
        setTimeout("switchOpacity()", SLIDESHOW_PIC_DELAY);
	}
}