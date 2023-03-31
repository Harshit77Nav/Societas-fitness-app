import React, { useState } from 'react'
import {useNavigate} from "react-router-dom";
import "./user.css";

function Newuser() {
    const history = useNavigate();
    const [data, setData] = useState({
        name:null,
        email:null,
        password:null,
    })

    const handleSubmit = async()=>{
        await fetch("http://localhost:5000/customer/signup",{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                name:data.name,
                email:data.email,
                password:data.password
            })
        })
        .then((res)=>res.json())
        .then((resdata)=>{
            if(resdata.status == "successfull"){
                history("/customerlogin")
            }else{
                alert(resdata.status);
            }
        })
        .catch((err)=>{
            console.log(err.message);
        })
    }
    
  return (
    <div className='newuser_box'>
        <div className='userH1'>
            <h1>Customer registration Page</h1>
        </div>
        <div className='userinput'>
            <div className='userInputBox'>
            <label>Name:</label>
            <input className='usertextBox' type={"text"} onChange={(e)=>setData({...data,name:e.target.value})}/>
            </div>
            <div className='userInputBox'>
            <label>Email:</label>
            <input className='usertextBox' type={"email"} onChange={(e)=>setData({...data,email:e.target.value})}/>
            </div>
            <div className='userInputBox'>
            <label>Password</label>
            <input className='usertextBox' type={"password"} onChange={(e)=>setData({...data,password:e.target.value})}/>
            </div>
            <button className='userbtn' onClick={handleSubmit}>Register</button>
            <p className='route' onClick={()=>history("/customerlogin")}>Already Registered! Login</p>
        </div>
    </div>
  )
}

export default Newuser