import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputComponent from "../common/Input";
import Button from "../common/Button";
import { toast } from "react-toastify";
import FileInput from "../common/Input/FileInput";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../../firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
const CreatePodcastForm =()=>{
    const [title,setTitle] = useState("");
    const [desc,setDesc] = useState("");
    const [displayImage,setDisplayImage] = useState();
    const [bannerImage,setBannerImage] = useState();
    const [loading,setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlePodcastSubmit=async()=>{
        setLoading(true);
       
        if(title && desc && displayImage && bannerImage){
        //1.Upload files ->get downloadeable links
        //2.create a new doc in a new collection  called podcasts
        //3.save this new podcats episodes states in our podcasts
            try{
                const bannerImageRef=ref(storage,`podcasts/${auth.currentUser.uid}/${Date.now()}.png`);
                const upload = await uploadBytes(bannerImageRef,bannerImage);
                console.log(upload);
                //src image
                const bannerImageUrl = await getDownloadURL(bannerImageRef);
                console.log("banner image := ",bannerImageUrl);
                toast.success("file uploaded");
                ///////////////////////////////////////////////////////////////////////////

                
                const displayImageRef=ref(storage,`podcasts/${auth.currentUser.uid}/${Date.now()}.png`);
                const displayupload = await uploadBytes(displayImageRef,displayImage);
                console.log(displayupload);
                //src image
                const displayImageUrl = await getDownloadURL(displayImageRef);
                console.log("display image := ",displayImageUrl);

                const podcastData = {
                    title:title,
                    description:desc,
                    bannerImage:bannerImageUrl,
                    displayImage:displayImageUrl,
                    createdBy:auth.currentUser.uid,

                }
                const docRef = await addDoc(collection(db,"podcasts"),podcastData);
                setTitle("");
                setDesc("");
                setBannerImage(null);
                setDisplayImage(null);

                toast.success("podcast uploaded");
                setLoading(false);

            }catch(e){
                toast.error(e.message);
                console.log(e);
                setLoading(false);
            }
            

        }else{
            toast.error("All fields required");
            setLoading(false);
        }

        setLoading(false);
    }
    const displayImageHandle=(file)=>{
        setDisplayImage(file);
    }
    const bannerImageHandle=(file)=>{
        console.log("FIle>>>>", file);
        setBannerImage(file);
    }

    return<>
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
                    accept={"image/*"}
                    id={"display-image-input"}
                    fileHandleFnc= {displayImageHandle}
                    text = {"Upload display Image"}  
                />

                <FileInput 
                    accept={"image/*"}
                    id={"banner-image-input"}
                    fileHandleFnc= {bannerImageHandle}
                    text = {"Upload Banner Image"}  
                />
                 <Button 
                    text={loading?"Loading...":"Submit Podcast"}
                    onClick={handlePodcastSubmit}
                    disabled = {loading}
                />
    </>
}

export default CreatePodcastForm;