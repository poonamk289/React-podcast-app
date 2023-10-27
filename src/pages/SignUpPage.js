import React, { useState } from "react";
import Header from "../components/common/Header";
import InputComponent from "../components/common/Input";
import Button from "../components/common/Button";
import SignUpForm from "../components/SignUpComonent/SignUpForm";
import LoginForm from "../components/SignUpComonent/LoginForm";

const SignUpPage =()=>{
    const [flag ,setFlag] = useState(false);
   
    return(
        <div>
            <Header/>
            <div className="input-wrapper ">
                {flag ? <h1>SignUp</h1> : <h1>Login</h1> }
                {flag ? <SignUpForm/>:<LoginForm/> }
                {flag ? <p onClick={()=>setFlag(!flag)}>Already have account?  Login. </p>
                        :
                        <p onClick={()=>setFlag(!flag)}>Don't have account? SignUp. </p>}

                
            </div>
        </div>
    )
}

export default SignUpPage;