import React from "react";
import "./style.css"
import { Link } from "react-router-dom";
const PodcastCard =({id,title,displayImage})=>{
    return(
        <Link to={`/podcast/${id}`}>     
           <div className="podcast-card">
            <img src={displayImage} className="display-image-podcast"/>
            <p className="title-podcast">{title}</p>

        </div>
        </Link>

    );
}

export default PodcastCard;