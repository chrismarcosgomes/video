const app =()=>{
    const song= document.querySelector(".song");
    const play=document.querySelector(".play");
    const outline=document.querySelector(".moving-outline circle");
    const video=document.querySelector(".vid-container video");
    const timeSelect= document.querySelectorAll(".time-select button")


    // sounds 
    const sounds=document.querySelectorAll(".sound-picker button");

    // time display
    const timeDisplay=document.querySelector(".time-display");

    // get the length of the outline

    const outlineLength=outline.getTotalLength();

    //console.log(outlineLength)

    // make the icon animate like its playing
    let fakeDuration=600;

    outline.style.strokeDasharray=outlineLength;

    outline.style.strokeDashoffset= outlineLength;

    // pick different sounds
    sounds.forEach((sound)=>{
            sound.addEventListener("click",function(){
                song.src=this.getAttribute("data-sound");
                video.src=this.getAttribute("data-video")
                checkPlaying(song);
            })
    
    })


    // play button

    play.addEventListener("click",function(){
       // song.play();
        checkPlaying(song)
    });

// select sound

timeSelect.forEach(option=>{
    option.addEventListener("click",function(){
        fakeDuration=this.getAttribute("data-time");
        timeDisplay.textContent=`${Math.floor(fakeDuration/60)}:${Math.floor(fakeDuration%60)}`
    })
})


    /// create a function specific to stop and play the songs

    const checkPlaying=song=>{
        if(song.paused){
            song.play();
            video.play();

            play.src="./myAPP/svg/pause.svg";
        }else{
            song.pause();
            video.pause();
            play.src="./myAPP/svg/play.svg";
        };

        // animate the circle

        song.ontimeupdate=function(){
            // put the time of the song into a variable
            let currentTime=song.currentTime;
            // we put 600 up top we subtract that from the current time 
            let elapsed=fakeDuration-currentTime;

            let secounds= Math.floor(elapsed%60);
            let minutes=Math.floor(elapsed/60);

            // animate the circle

            let progress= outlineLength-(currentTime/fakeDuration)*outlineLength;
            outline.style.strokeDashoffset=progress;

            // show the time 

            timeDisplay.textContent=`${minutes}:${secounds}`

            // stops the song and video when time runs out

            if(currentTime>=fakeDuration){
                song.pause();
                song.currentTime=0;
                
                video.pause();
            }
        }
    }
}




app();