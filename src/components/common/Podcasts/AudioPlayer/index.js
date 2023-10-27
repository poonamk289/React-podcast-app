import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import {FaPlay,FaPause,FaVolume,FaVolumeMute, FaVolumeUp} from "react-icons/fa"

const AudioPlayer=({audioSrc,image})=>{
    const[isPlaying,setIsPlaying] = useState(true);
    const[isMute,setIsMute] = useState(false);
    const [duration,setDuration] = useState("");
    const [currentTime,setCurrentTime] = useState(0);
    const [volume,setVolume] = useState(1);
    const audioRef = useRef();

    const handleDuration =(e)=>{
        setDuration(e.target.value);
        audioRef.current.currentTime=e.target.value;

    };
     

    const handleVolume =(e)=>{
        setVolume(e.target.value);
        audioRef.current.volume=e.target.value;

    }
    const togglePlay=()=>{
        if(isPlaying){
            setIsPlaying(false);
        }else{
            setIsPlaying(true);
        }
    };

    const toggleMute=()=>{
        if(isMute){
            setIsMute(false);
            
        }else{
            setIsMute(true);
            
        }
    };

    const handleTimeUpdate=()=>{
        setCurrentTime(audioRef.current.currentTime)
    }
    const handleLoadedMetadata=()=>{
        setCurrentTime(audioRef.current.duration)
    }

    const handleEnded=()=>{
        setCurrentTime(0);
        setIsPlaying(false);
    }


    useEffect(()=>{
        const audio= audioRef.current;
        audio.addEventListener("timeUpdate",handleTimeUpdate);
        audio.addEventListener("loadedmetadata",handleLoadedMetadata);
        audio.addEventListener("ended",handleEnded);
        return()=>{
            audio.removeEventListener("timeUpdate",handleTimeUpdate);
        audio.removeEventListener("loadedmetadata",handleLoadedMetadata);
        audio.removeEventListener("ended",handleEnded);
        }
    },[])
    useEffect(()=>{
        if(isPlaying){
            audioRef.current.play();

        }else{
            audioRef.current.pause();
        }
    },[isPlaying]);

    useEffect(()=>{
        if(!isMute){
            audioRef.current.volume=volume;
            setVolume(1)
        }else{
            audioRef.current.volume=0;
            setVolume(0)

        }
    },[isMute])


    return (
    <div className="custom-audio-player">
       <img src={image} className="display-image-player"/>
        <audio  ref={audioRef} src={audioSrc}/>
        <p onClick={togglePlay}>{isPlaying?<FaPause/>:<FaPlay/>}</p>
        <div className="duration-flex">
            <p>{currentTime}</p>
       
        <input type="range"
        max={duration}
        value={currentTime} 
        step={0.01}
        onChange={handleDuration}
        className="duration-range"

        />
        <p>{duration-currentTime}</p>
        <p onClick={toggleMute}>{!isMute?<FaVolumeUp/>:<FaVolumeMute/>}</p>
        <input type="range" 
        value={volume}
        max={1}
        min={0}
        step={0.01}
        onChange={handleVolume}
        className="volume-range"
        />
        </div>

       
    </div>
    )
}

export default AudioPlayer;
