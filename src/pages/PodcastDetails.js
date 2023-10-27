import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import { useNavigate, useParams } from "react-router-dom";
import { QuerySnapshot, collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import { toast } from "react-toastify";
import { auth, db } from "../firebase";
import Button from "../components/common/Button";
import EpisodeDetails from "../components/common/Podcasts/EpisodeDetails";
import AudioPlayer from "../components/common/Podcasts/AudioPlayer";

const PodcastDetailsPage =()=>{
    const { id } = useParams();
    const [podcast,setPodcast] = useState({});
    const [episodes,setEpisodes] = useState([]);
    const [playingFile,setPlayingFile] = useState("");
    console.log("ID" , id);

    const navigate = useNavigate();
    useEffect(()=>{
        if(id){
            getData();
        }
    },[id])
    console.log(podcast)
    const getData=async()=>{
        try{
            const docRef = doc(db,"podcasts",id);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                console.log("document data:",docSnap.data());
                setPodcast({id:id,...docSnap.data()});
                // toast.success("Podcast Found");
            }else{
                console.log("No such document!");
                toast.error("No such document");
                navigate("/podcasts");
            }
        }catch(e){
            toast.error(e.message);
        }
    };

    useEffect(()=>{
        const unsubscribe = onSnapshot(
            query(collection(db,"podcasts",id,"episodes")),
            (querySnapshot)=>{
                const episodeData =[];
                querySnapshot.forEach((doc)=>{
                    episodeData.push({id:doc.id,...doc.data()});
                });
                setEpisodes(episodeData);
            },
            (error)=>{
                console.log("Error fetching episodes");
            }
        );
        return()=>{
            unsubscribe();
        }
    },[id]);
    return (
        <div>
            <Header/>
            <div className="input-wrapper" style={{marginTop:"1rem"}}>
            {
                podcast.id &&  (
                    <>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"}}>
                    <h1 className="podcast-title">{podcast.title}</h1>
                    { podcast.createdBy === auth.currentUser.uid && 
                        <Button 
                        text="Create Episodes"
                        width="250px"
                        onClick={()=>{
                            navigate(`/podcast/${id}/create-episode`);
                        }}
                        />
                    }
                    </div>
                    <div className="banner-wrapper">
                        <img src={podcast.bannerImage}/>
                    </div>
                    <p className="podcast-description">{podcast.description}</p>
                        <h1 className="podcast-title">Episodes</h1>
                       <div style={{width:"100%"}}> {episodes.length>0?
                       ( <>
                            {episodes.map((episode,index)=>{
                                return (<EpisodeDetails 
                                    key={index}
                                    index = {index+1}
                                    title={episode.title} 
                                    description={episode.description}
                                    audioFile={episode.audioFile}
                                    onClick = {(file)=>setPlayingFile(file)}
                                 />);
                                })}
                            
                        </>):(
                        <p>No Episodes</p>)
                        }</div>
                    </>
                )
            }

                </div>
            {playingFile && <AudioPlayer 
                            audioSrc={playingFile}
                            image={podcast.displayImage}
                            />}
        </div>
    )
}

export default PodcastDetailsPage;