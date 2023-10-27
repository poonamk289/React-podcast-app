import React from "react";
import "./style.css";
import { Link, useLocation } from "react-router-dom";

function Header(){
    const location = useLocation();
    const currentPath = location.pathname;

    console.log(currentPath);

return <div className="navbar">
        <div className="gradient"></div>
        <div className="links">
            <Link to='/'
                className={ (currentPath==="/") ?  "active" : "" }
            >SignUp</Link>
            <Link to = '/podcasts'   className={(currentPath==="/podcasts")?"active":""}>Poscast</Link>
            <Link to = '/create-a-podcast'   className={(currentPath==="/create-a-podcast")?"active":""}> Create a Poscast</Link>
            <Link to = '/profile'   className={(currentPath==="/profile")?"active":""}> Profile</Link>
        </div>
        </div>
}

export default Header;