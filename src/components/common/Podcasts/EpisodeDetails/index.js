import React from "react";
import Button from "../../Button";

const EpisodeDetails=({index,title,description,audioFile,onClick})=>{
    return(
        <div> 
            <h1 style={{textAlign:"left",marginBottom:"0.3rem"}}>{index}.{title}</h1>
            <p className="podcast-description" style={{marginLeft:"1rem"}}>{description}</p>
            <Button text={"play"} onClick={()=>onClick(audioFile)} width={"100px"}/>
        </div>
    )
}
export default EpisodeDetails;