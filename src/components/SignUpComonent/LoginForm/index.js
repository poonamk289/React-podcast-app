import React,{useState} from "react";
import InputComponent from "../../../components/common/Input";
import Button from "../../../components/common/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../../slices/userSlice";
import { toast } from "react-toastify";


function LoginForm (){
   
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [loading,setLoading] = useState(false);
   
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin =async()=>{
            console.log("handling login")
            if(email && password){
                setLoading(true);
            try{
                const userCredential = await signInWithEmailAndPassword(
                    auth,email,password
                );
                const user = userCredential.user;
                console.log("user",user);
                //getting user from firebase
                 const val = await getDoc(doc(db,"users",user.uid));
                 const userData = val.data();
                 console.log("userData",userData);
                 //setting data in redux
                dispatch(
                    setUser({
                        name:userData.name,
                        email:user.email,
                        uid:user.uid,
                    })
                );
                  navigate("/profile");
                  setLoading(false);
                  toast.success("login successfully")
                console.log(val);
            }catch(e){
                console.log("error",e);
                toast.error(e.message);
            }
        }else{
            toast.error("email & password should not be empty");
            setLoading(false);
        }
        
    }
    return<>
           
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
                
                <Button 
                    text={"Login"}
                    onClick={handleLogin}
                    disabled={loading}
                />

               
                
    </>
}

export default LoginForm;