import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import { QuerySnapshot, collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";
import { setPodcasts } from "../slices/podcastSlice";
import { useDispatch, useSelector } from "react-redux";
import PodcastCard from "../components/common/Podcasts/PodcastCard";
import InputComponent from "../components/common/Input";

const PodcastsPage =()=>{
    const dispatch = useDispatch();
    const podcasts = useSelector((state)=>state.podcasts.podcasts)
    const [search,setSearch]=useState("");
    useEffect(()=>{
        const unsubscribe = onSnapshot(

            query(collection(db,"podcasts")),
            (querySnapshot)=>{
                const podcastsData = [];
                querySnapshot.forEach((doc)=>{
                    podcastsData.push({id:doc.id,...doc.data()});
                });
                dispatch(setPodcasts(podcastsData));
            },
            (error)=>{
                console.log("error fetchimng data",error.message)
            }
        );
        return()=>{
            unsubscribe();
        }
    },[dispatch]);

    var filteredPodcasts = podcasts.filter((item)=>item.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <div>
                <Header/>
                <div className="input-wrapper" style={{marginTop:"2rem"}}>
                <h1>Discover Podcasts</h1>
                <InputComponent
                  state={search}
                  setState={setSearch}
                  placeholder="Search by title"
                  type="text"
                  />
                {
                    filteredPodcasts.length>0?
                    (<div className="podcasts-flex" style={{marginTop:"2rem"}}>
                        {filteredPodcasts.map((item)=>{
                            return <PodcastCard
                                        id={item.id}
                                        title={item.title}
                                        displayImage={item.displayImage}
                               />;
                        })}
                    </div>):
                   ( <p>{search?"No podcast Found":"No current podcast"}</p>)
                }
                </div>
        </div>
    )
}

export default PodcastsPage;