import React, { useState } from "react";
import Header from "../components/common/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from "../components/common/Button";
import FileInput from "../components/common/Input/FileInput";
import InputComponent from "../components/common/Input";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

const CreateAnEpisodePage =()=>{
    const {id} = useParams();
    const [title,setTitle] = useState("");
    const [desc,setDesc] = useState("");
    const [audioFile,setAudioFile] = useState();

    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const audioFileHandle=(file)=>{
        setAudioFile(file)
    }
    const handleSubmit=async()=>{
        if((title,desc,audioFile)){
            try{
                setLoading(true);
                const audioRef = ref(storage,
                    `podcast-episodes/${auth.currentUser.uid}/${Date().now}`);

                 await uploadBytes(audioRef,audioFile);
                 const audioURL = await getDownloadURL(audioRef);
                 const episodeData = {
                    title:title,
                    description:desc,
                    audioFile:audioURL
                 } 
                 
                 await addDoc(
                    collection(db,"podcasts",id,"episodes"),
                    episodeData
                    );
                    toast.success("Episode Created successfully");
                    setLoading(false);
                    navigate(`/podcast/${id}`);
                    setTitle("");
                    setDesc("");
                    setAudioFile("");
            }catch(e){
                toast.error(e.message);
                setLoading(false);
            }
        }else{
            toast.error("All Files Should Be there");
            setLoading(false);
        }
    }
    return(
        <div>
            <Header/>
            <div className="input-wrapper">
                <h1>Create An Episode</h1>

                <InputComponent 
                    type="text"
                    setState={setTitle}
                    placeholder="Title"
                    required={true}
                    state={title}
                /> 
                <InputComponent  
                    type="text"
                    setState={setDesc}
                    placeholder="Podcast Description"
                    required={true}
                    state={desc}
                /> 

                <FileInput 
                    accept={"audio/*"}
                    id={"audio-file-input"}
                    fileHandleFnc= {audioFileHandle}
                    text = {"Upload Audio File"}  
                />
                 <Button 
                    text={loading?"Loading...":"Create Episode"}
                    onClick={handleSubmit}
                    disabled = {loading}
                />
            </div>
        </div>
    )
}

export default CreateAnEpisodePage;