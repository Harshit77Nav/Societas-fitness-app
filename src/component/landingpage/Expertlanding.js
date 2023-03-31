import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
import "./expert.css";

function Expertlanding() {
    const history = useNavigate();
    const [fshow, setFshow] = useState(true);
    const [dashboard, setDashboard] = useState(false);
    const [email, setEmail] = useState();
    const [data, setData] = useState();
    const [details, setDetails] = useState();
    const [advise, setAdvise] = useState();
    const [valid, setValid] = useState({
        name:null,
        email:null,
        token:null,
    });

    useEffect(()=>{
        const name = sessionStorage.getItem("username");
        const email = sessionStorage.getItem("email");
        const token = sessionStorage.getItem("token");
        if(!token){
            history("/expertlogin")
        } else{
            setValid({...valid,name:name,email:email,token:token});
        }
    },[])

    const getdata = async (req,res)=>{
        setFshow(false)
        await fetch("http://localhost:5000/expert/data", {
            method:"GET",
            headers:{
                "Authorization":valid.token
            }
        })
        .then((res)=>res.json())
        .then((resdata)=>{
            if(resdata.status === "successfull"){
                setData(resdata)
                setDashboard(true)
            } 
        })
        .catch((err)=>{
            console.log(err.message);
        })
    }

    if(valid.token !== null && fshow === true){
        getdata();
    }

    const handleDetails = async(email)=>{
        setDashboard(false)
        setEmail(email);
        await fetch(`http://localhost:5000/customer/data/${email}`,{
            method:"GET",
            headers:{
                "Authorization":valid.token
            }
        })
        .then((res)=>res.json())
        .then((resdata)=>{
            if(resdata.status === "successfull"){
                setDetails(resdata);
            }
        })
        .catch((err)=>{
            console.log(err.message);
        })
    }
    
    const handleAdvise = async()=>{
        if(advise){
        await fetch("http://localhost:5000/expert/advise",{
            method:"PATCH",
            headers:{
                "Authorization":valid.token,
                "content-type":"application/json"
            },
            body:JSON.stringify({
                email:email,
                advise:advise
            })
        })
        .then((res)=>res.json())
        .then((resdata)=>{
            if(resdata.status === "successfull"){
                alert("Done");
                setEmail();
                setDashboard(true);
            }
        })
      } else{
        alert("Empty Text")
      }
    }

  return (
    <div className='expertContainerBox'>
        <div className='expertHead'>
        <h1>Greeting Dr.{valid.name}</h1>
        </div>
        {dashboard &&
        <div className='expert_dash'>
            <h2>Dashboard</h2>
            <div>
            <table>
                <thead>
                    <tr>
                        <th>Ideal weight</th>
                        <th>Slightly Overweight/Underweight</th>
                        <th>Overweight/Underweight</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.result.map((items,index,{email=items.email})=>{
                        return(
                            <tr key={index}>
                                <td style={{"color":"green"}}>{items.color==="green"?<p onClick={()=>handleDetails(email)}>{items.name}</p>:"-"}</td>
                                <td style={{"color":"orange"}}>{items.color==="orange"?<p onClick={()=>handleDetails(email)}>{items.name}</p>:"-"}</td>
                                <td style={{"color":"red"}}>{items.color==="red"?<p onClick={()=>handleDetails(email)}>{items.name}</p>:"-"}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </div>
        </div>}
        {email &&
        <div className='expertDetails'>
        {email && <div id='detailsHead' className='detailsBox' ><span>Date</span><span>Current weight</span><span>Ideal weight</span></div>}
        {details && details.result.map((items,index)=>{
            return(
                <div className='detailsBox' key={index}><span>{items.date} </span><span> {items.reading} </span><span> {items.ideal} </span></div>
            )
        })}
            <div className='expertAdvise'>
                <label>Add Advise</label>
                <input className='expertText' type={"text"} onChange={(e)=>setAdvise(e.target.value)}/>
                <button className='expertbtn' onClick={handleAdvise}>Post</button>
            </div>
        </div>}
    </div>
  )
}

export default Expertlanding



