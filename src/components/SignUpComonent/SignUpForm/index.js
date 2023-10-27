import React,{useState} from "react";
import InputComponent from "../../../components/common/Input";
import Button from "../../../components/common/Button";
import { auth,db,storage} from "../../../firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setUser } from "../../../slices/userSlice";
import { toast } from "react-toastify";


function SignUpForm (){
    const [fullname,setFullName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [loading,setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignUp =async()=>{
        console.log("handling signup") 
        setLoading(true);
        if(password===confirmPassword && password.length>=6){
            try{
                //creating user
                const userCredential = await createUserWithEmailAndPassword(
                    auth,email,password
                );
                const user = userCredential.user;
                console.log("user",user);
                //storing data of user in database

                 const val = await setDoc(doc(db,"users",user.uid),{
                    name:fullname,
                    email:user.email,
                    uid:user.uid,

                });

                //store data in redux
                dispatch(
                    setUser({
                        name:fullname,
                        email:user.email,
                        uid:user.uid,
                    })
                );
                
                toast.success("signup successfully");
                setLoading(false);
                  navigate("/profile");
                console.log(val);
            }catch(e){
                console.log("error",e);
                toast.error(e.message);
                setLoading(false)
            }
        }else{
            //throw an error
            console.log("error");
            if(password!==confirmPassword){
                toast.error("Password shouls be same");
            }else if(password.length<6){
                toast.error("password should have more than 6 characters.");
            }
            setLoading(false);
        }
    }


    return<>
            <InputComponent 
                    type="text"
                    setState={setFullName}
                    placeholder="Full Name"
                    required={true}
                    state={fullname}
                /> 
                <InputComponent 
                    type="email"
                    setState={setEmail}
                    placeholder="Email"
                    required={true}
                    state={email}
                /> 
                <InputComponent 
                    type="password"
                    setState={setPassword}
                    placeholder="Password"
                    required={true}
                    state={password}
                /> 
                <InputComponent 
                    type="password"
                    setState={setConfirmPassword}
                    placeholder="Confirm Password"
                    required={true}
                    state={confirmPassword}
                /> 
                <Button 
                    text={loading?"Loading...":"SignUp"}
                    onClick={handleSignUp}
                    disabled = {loading}
                />

               
                
    </>
}

export default SignUpForm;