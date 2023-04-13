import React, {useState} from 'react'
import {useNavigate} from "react-router-dom"
import "../registerpages/user.css";

function Expert() {
  const history = useNavigate();
  const [data, setData] = useState({
      email:null,
      password:null,
  })

  const handleSubmit = async()=>{
      await fetch("https://fitness-mlv6.onrender.com/expert/login",{
          method:"POST",
          headers:{
              "content-type":"application/json"
          },
          body:JSON.stringify({
              email:data.email,
              password:data.password
          })
      })
      .then((res)=>res.json())
      .then((resdata)=>{
          if(resdata.status == "successfull"){
              sessionStorage.setItem("token",resdata.token);
              sessionStorage.setItem("username",resdata.name);
              sessionStorage.setItem("email",resdata.user);
              alert(resdata.status);
              history("/expertland")
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
       <h1>Health specialist Login Page</h1>
   </div>
   <div className='userinput'>
       <div className='userInputBox'>
       <label>Email:</label>
       <input className='usertextBox' type={"email"} onChange={(e)=>setData({...data,email:e.target.value})}/>
       </div>
       <div className='userInputBox'>
       <label>Password</label>
       <input className='usertextBox' type={"password"} onChange={(e)=>setData({...data,password:e.target.value})}/>
       </div>
       <button className='userbtn' onClick={handleSubmit}>Login</button>
       <p className='route' onClick={()=>history("/newexpert")}>New Expert! Register</p>
   </div>
   </div>
  )
}

export default Expert