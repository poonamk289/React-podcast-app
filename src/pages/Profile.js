import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/common/Header";
import Button from "../components/common/Button";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../firebase";

const Profile =()=>{
    //getting data from redux
    const user = useSelector((state)=>state.user.user);
    console.log("my user",user);
    if(!user){
        return <p>Loading...</p>
    }

    const handlelogout =()=>{
        signOut(auth).then(()=>{
            toast.success("logout Successfully");
        }).catch((error)=>{
            toast.error(error.message);
        })
    }
    return<>
            <Header/>
    <h1>Profile</h1>
    <p>{user.name}</p>
    <Button text={"Logout"} onClick={handlelogout} />
    </>
}

export default Profile;