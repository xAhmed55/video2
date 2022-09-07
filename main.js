
const video_player = document.querySelector('.video_player'),
    mainVideo = video_player.querySelector('.main-video'),
progressAreaTime = video_player.querySelector('.progressAreaTime'),
controls = video_player.querySelector('.controls'),
progress_area = video_player.querySelector('.progress-area'), 
progress_bar = video_player.querySelector('.progress-bar'),
fast_rewind = video_player.querySelector('.fast-rewind'),
play_pause = video_player.querySelector('.play_pause'),
fast_forward = video_player.querySelector('.fast-forward'),
volume = video_player.querySelector('.volume'),
volume_range = video_player.querySelector('.volume_range'),
current = video_player.querySelector('.current'),
Totalduration = video_player.querySelector('.duration'),
auto_play = video_player.querySelector('.auto-play'),
settingsBtn = video_player.querySelector('.settingsBtn'),
picture_in_picutre = video_player.querySelector('.picture_in_picutre'),
fullscreen = video_player.querySelector('.fullscreen'),
settings = video_player.querySelector('#settings'),
playback = video_player.querySelectorAll('.playback li');
UploadBtn = document.getElementById('Upload'),
upload_input = document.querySelector('#uplload');

//likebtn ,sharebtn
let likebtn =document.querySelector('.like');
let likeIcon=document.querySelector('#icon-forlLike');
let count=document.querySelector('#count');


//foll screen logo in video
let logoFUll=document.querySelector('.imge2')
let pInfull=document.querySelector('p-inVideo')


//like function

let clicked=false;


likebtn.addEventListener('click',()=>{
   if(!clicked){
    clicked=true
    likeIcon.innerHTML='<i class="fa-solid fa-thumbs-up"></i>';
    count.textContent++;
    c_s = window.localStorage.setItem("count",`${count.textContent}`);
    c_src = window.localStorage.setItem('src' , `${mainVideo.getAttribute('src')}`);
   }else if(clicked){
    clicked=false
    likeIcon.innerHTML='<i class="fa-regular fa-thumbs-up">'
    count.textContent--;
   }else if(window.localStorage.getItem("count")){
    count.innerHTML=window.localStorage.getItem("count");
    likeIcon.innerHTML='<i class="fa-solid fa-thumbs-up"></i>';
    clicked=false;
   }else{
    likeIcon.innerHTML='<i class="fa-regular fa-thumbs-up">'
    count.textContent;
    }
})

window.addEventListener('load',()=>{
   let count_y = localStorage.getItem('count');
   count.innerHTML = count_y;
    let src_y = localStorage.getItem('src');
})

//we done call the elements

//functions play start
function playVideo(){
    play_pause.innerHTML = 'paused';
    play_pause.title = 'play';
    video_player.classList.add('paused');
    mainVideo.play();
}
//functions play end

function pausedVideo(){
    play_pause.innerHTML = 'play_arrow';
    play_pause.title = 'paused';
    video_player.classList.remove('paused');
    mainVideo.pause();
}

play_pause.addEventListener('click',()=>{
    const isVideoPaused = video_player.classList.contains('paused');

    isVideoPaused ? pausedVideo() : playVideo();
})


mainVideo.addEventListener('play',()=>{
    playVideo();
})
mainVideo.addEventListener('pause',()=>{
    pausedVideo();
})
//fast farwerd

fast_rewind.addEventListener('click',()=>{
    mainVideo.currentTime -=10
})
//fast farwerd

fast_forward.addEventListener('click',()=>{
    mainVideo.currentTime +=10
})

//load video 

mainVideo.addEventListener('loadeddata',(e)=>{
    let videoDuratin=e.target.duration;
    let totalMin = Math.floor(videoDuratin /60);
    let totalsec = Math.floor(videoDuratin % 60);

    //if total second less 10 thin add 0 at the start
    totalsec <10 ? totalsec = "0"+totalsec :totalsec;

    Totalduration.innerHTML =`${totalMin} : ${totalsec}`;
})

//curent video duration 

mainVideo.addEventListener('timeupdate',(e)=>{
 
    let curentTime = e.target.currentTime;
    let curentMin =Math.floor(curentTime / 60);
    let curentsec =Math.floor(curentTime % 60);

     //if total second less 10 thin add 0 at the start
     curentsec <10 ? curentsec = "0"+curentsec :curentsec;
    current.innerHTML= `${curentMin} : ${curentsec}`;


   let videoDureation = e.target.duration
    //progresbar width change
    let progressWidth=(curentTime / videoDureation) *100; 
    progress_bar.style.width = `${progressWidth}%`
})

//updata playing video
progress_area.addEventListener('click',(e)=>{
    let videoDureation = mainVideo.duration
    let progressWidthval = progress_area.clientWidth;
    let clickoff =e.offsetX;

    mainVideo.currentTime =(clickoff / progressWidthval) *videoDureation
})

//change valume 

function changeVol(){
    mainVideo.volume=volume_range.value / 100;
    if(volume_range.value==0){
        volume.innerHTML="volume_off";  
    }else if(volume_range.value<40){
        volume.innerHTML="volume_down"
    }else{
        volume.innerHTML= "volume_up"
    }
}

    function mutevolune(){
        if(volume_range.value==0){
            volume_range.value =80;
            mainVideo.volume = 0.8;
            volume.innerHTML = "volume_up";
           }
        else 
        {
           volume_range.value = 0;
           mainVideo.volume = 0;
           volume.innerHTML = "volume_off";
        }
    }
      


volume_range.addEventListener('change',()=>{
    changeVol();
})

volume.addEventListener('click',()=>{
    mutevolune();
})

// display block oon mouse move in bar
progress_area.addEventListener('mousemove',(e)=>{
    let progressWidthval=progress_area.clientWidth;
    let x =e.offsetX;
    progressAreaTime.style.setProperty('--x',`${x}px`);
    progressAreaTime.style.display="block"


    let videoDuratin = mainVideo.duration;
    let prgressTime = Math.floor((x/progressWidthval)* videoDuratin)
    let currentMin =Math.floor(prgressTime / 60);
    let currentsec =Math.floor(prgressTime % 60);

     //if total second less 10 thin add 0 at the start
     currentsec <10 ? currentsec = "0"+currentsec :currentsec;

     progressAreaTime.innerHTML=`${currentMin} : ${currentsec}`;

})
progress_area.addEventListener('mouseleave',()=>{
    progressAreaTime.style.display="none";
})

//auto play 

auto_play.addEventListener('click',()=>{
    auto_play.classList.toggle('active')
    if(auto_play.classList.contains('active')){
        auto_play.title= "Autoplay is on"
    }else{
        auto_play.title="Autoplay is off"
    }
})
mainVideo.addEventListener('ended',()=>{
    if(auto_play.classList.contains('active')){
        playVideo();
    }
    else{
        play_pause.innerHTML='replay';
        play_pause.title='Replay'
    }
})

//picture in pic

picture_in_picutre.addEventListener('click',()=>{
    mainVideo.requestPictureInPicture();

})

//FULL screen
fullscreen.addEventListener('click',()=>{
    if(!video_player.classList.contains('openFullScreen')){
        video_player.classList.add('openFullScreen');
        fullscreen.innerHTML='fullscreen_exit'
        video_player.requestFullscreen();
        logoFUll.style.width='120px'
        logoFUll.style.height='100px'
        pInfull.style.width='120px'
        p.style.fontSize = '1.9rem';

    }else{
        video_player.classList.remove('openFullScreen');
        fullscreen.innerHTML='fullscreen'
        document.exitFullscreen();
        logoFUll.style.width='50px'
        logoFUll.style.height='40px'  
        pInfull.style.width='50px'
        p.style.fontSize = '1rem';

    }
})
settingsBtn.addEventListener('click',()=>{
    settings.classList.toggle('active');
    settingsBtn.classList.toggle('active')
})

//playback Rate

playback.forEach((event)=>{
    event.addEventListener('click',()=>{
        removeActiveClasses();
        event.classList.add('active')
        let speed =event.getAttribute('data-speed')
        mainVideo.playbackRate =speed;
    })
})
function removeActiveClasses(){
    playback.forEach(event =>{
        event.classList.remove('active')
    });
}


//upload video

function uplload(){
    let x = document.getElementById('uplload');
    let x_up =new FileReader();
    x_up.readAsDataURL(x.files[0]);
    x_up.onload=function(){
        document.getElementById('main.video').src = x_up.result;
    }
}

UploadBtn.addEventListener('click',()=>{
    uplload();
})