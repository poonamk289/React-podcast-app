import React from "react";
import Header from "../components/common/Header";
import CreatePodcastForm from "../components/StartPodcast/CreatePodcastForm";

const CreateAPodcastPage =()=>{
    return<>
        <Header/>
        <div className="input-wrapper">
            <h1>Create A Podcast</h1>
            <CreatePodcastForm/>
        </div>
    </>
}

export default CreateAPodcastPage;