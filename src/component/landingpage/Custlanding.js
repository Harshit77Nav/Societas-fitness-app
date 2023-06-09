import React, { useEffect, useState, useRef } from 'react'
import {useNavigate} from "react-router-dom"
import moment from "moment";
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from "recharts";
import "./customer.css";

function Custlanding() {
    const inputelem = useRef();
    const history = useNavigate();
    const [show, setShow] = useState(true);
    const [result, setResult] = useState();
    const [unit, setUnit] = useState("Kilograms");
    const [age, setAge] = useState()
    const [weight1, setWeight] = useState();
    const [height, setHeight] = useState();
    const [data, setData] = useState({
        color:null,
        status:null,
        ideal:null,
        client:null
    });
    const [valid, setValid] = useState({
        token:null,
        name:null,
        email:null,
        advise:null
    });
    useEffect(()=>{
        const token = sessionStorage.getItem("token");
        const name = sessionStorage.getItem("username");
        const email = sessionStorage.getItem("email");
        const advise = sessionStorage.getItem("advise");
        if(!token){
            history("/customerlogin")
        } else{
            setValid({...valid,token:token,name:name,email:email,advise:advise})
        }
    },[])

    const getdata = async()=>{
        setShow(false);
        await fetch(`https://fitness-mlv6.onrender.com/customer/data/${valid.email}`,{
            method:"GET",
            headers:{
                "Authorization":valid.token
            }
        })
        .then((res)=>res.json())
        .then((resdata)=>{
            if(resdata.status==="successfull"){
                setResult(resdata)
            } else {
                alert(resdata.status);
            }
        })
        .catch((err)=>{
            console.log(err.message);
        })
    }
    if(valid.email !== null && show === true){
        getdata();
    }

    const handleinput = ()=>{
        if(!age){
            return alert("Please select age")
        }
        if(!height){
            return alert("Enter your Height")
        }
        const totalAge = moment().format("YYYY")
        const ageyear = age.split("-")[0]
        const finalAge = parseInt(totalAge)-parseInt(ageyear);
        if(finalAge < 12){
            return alert("Please enter Age above 12 years")
        }
        console.log(finalAge);
        if(!weight1){
         return alert("Enter your weight")
        }
        let weight = 0
        if(unit === "Pounds"){
        weight = (weight1*0.45359237).toFixed(2);
        } else{
            weight = weight1
        }


        const bmi = (weight / ((height / 100) * (height / 100))).toFixed(2);
        let bmiClass = '';
    
        if (bmi < 18.5) {
          bmiClass = 'Underweight';
        } else if (bmi >= 18.5 && bmi <= 24.9) {
          bmiClass = 'Normal weight';
        } else if (bmi >= 25 && bmi <= 29.9) {
          bmiClass = 'Overweight';
        } else if (bmi >= 30) {
          bmiClass = 'Obese';
        }
        
        if(bmiClass === 'Underweight'){
            setData({...data,status:bmiClass,color:"orange",ideal:"18.5-24.9",client:bmi})
        } else if(bmiClass === 'Overweight'){
            setData({...data,status:bmiClass,color:"orange",ideal:"18.5-24.9",client:bmi})
        } else if(bmiClass === 'Normal weight'){
            setData({...data,status:bmiClass,color:"green",ideal:"18.5-24.9",client:bmi})
        } else if(bmiClass === "Obese"){
            setData({...data,status:bmiClass,color:"red",ideal:"18.5-24.9",client:bmi})
        }
        console.log(data);
        // if(finalAge <= 19){
        //     if(weight >= 35 && weight <= 45){
        //         setData({...data,status:"Ideal weight",color:"green", ideal:"35-45"})
        //     } else if(weight<35 && weight>=20){
        //         setData({...data,status:"Slightly Under weight",color:"orange", ideal:"35-45"})
        //     } else if(weight<20){
        //         setData({...data,status:"Under weight",color:"red", ideal:"35-45"})
        //     } else if(weight>45 && weight<=55){
        //         setData({...data,status:"Slightly over weight",color:"orange", ideal:"35-45"})
        //     } else if(weight>55){
        //         setData({...data,status:"Over weight",color:"red", ideal:"35-45"})
        //     }
        // } else if(finalAge > 19 && finalAge<=29){  // 70-80
        //     if(weight >= 70 && weight <= 80){
        //         setData({...data,status:"Ideal weight",color:"green", ideal:"70-80"})
        //     } else if(weight<70 && weight>=50){
        //         setData({...data,status:"Slightly Under weight",color:"orange", ideal:"70-80"})
        //     } else if(weight<50){
        //         setData({...data,status:"Under weight",color:"red", ideal:"70-80"})
        //     } else if(weight>80 && weight<=90){
        //         setData({...data,status:"Slightly over weight",color:"orange", ideal:"70-80"})
        //     } else if(weight>90){
        //         setData({...data,status:"Over weight",color:"red", ideal:"70-80"})
        //     }
        // } else if(finalAge >29 && finalAge<=39){ //75-90
        //     if(weight >= 75 && weight <= 90){
        //         setData({...data,status:"Ideal weight",color:"green", ideal:"75-90"})
        //     } else if(weight<75 && weight>=65){
        //         setData({...data,status:"Slightly Under weight",color:"orange", ideal:"75-90"})
        //     } else if(weight<65){
        //         setData({...data,status:"Under weight",color:"red", ideal:"75-90"})
        //     } else if(weight>90 && weight<=95){
        //         setData({...data,status:"Slightly over weight",color:"orange", ideal:"75-90"})
        //     } else if(weight>95){
        //         setData({...data,status:"Over weight",color:"red", ideal:"75-90"})
        //     }
        // } else if(finalAge >39 && finalAge <= 59){ //70-90
        //     if(weight >= 70 && weight <= 90){
        //         setData({...data,status:"Ideal weight",color:"green", ideal:"70-90"})
        //     } else if(weight<70 && weight>=60){
        //         setData({...data,status:"Slightly Under weight",color:"orange", ideal:"70-90"})
        //     } else if(weight<60){
        //         setData({...data,status:"Under weight",color:"red", ideal:"70-90"})
        //     } else if(weight>90 && weight<=95){
        //         setData({...data,status:"Slightly over weight",color:"orange", ideal:"70-90"})
        //     } else if(weight>95){
        //         setData({...data,status:"Over weight",color:"red", ideal:"70-90"})
        //     }
        // } else if(finalAge > 59){ // 75-85
        //     if(weight >= 70 && weight <= 85){
        //         setData({...data,status:"Ideal weight",color:"green", ideal:"75-85"})
        //     } else if(weight<70 && weight>=60){
        //         setData({...data,status:"Slightly Under weight",color:"orange", ideal:"75-85"})
        //     } else if(weight<60){
        //         setData({...data,status:"Under weight",color:"red", ideal:"75-85"})
        //     } else if(weight>85 && weight<=90){
        //         setData({...data,status:"Slightly over weight",color:"orange", ideal:"75-85"})
        //     } else if(weight>90){
        //         setData({...data,status:"Over weight",color:"red", ideal:"75-85"})
        //     }
        // }
    }
    
    const fetchData = async()=>{
        const date = moment().format("DD MMM YY")
        let weight = 0
        if(unit === "Pounds"){
        weight = (weight1*0.45359237).toFixed(2);
        } else{
            weight = weight1
        }

        await fetch("https://fitness-mlv6.onrender.com/customer/data",{
            method:"PATCH",
            headers:{
                "content-type":"application/json",
                "Authorization":valid.token
            },
            body:JSON.stringify({
                email:valid.email,
                status:data.status,
                date:date,
                reading:weight,
                color:data.color,
                ideal:data.ideal,
                client:data.client
            })
        })
        .then((res)=>res.json())
        .then((resdata)=>{
            setData({...data,status:null,color:null})
            inputelem.current.value = "";
            getdata();
            console.log(resdata);
        })
        .catch((err)=>{
            console.log(err.message);
        })
    }
    if(data.status !== null){
        fetchData();
    }
    
  return (
    <div className='customer_box'>
        <div className='custH1'><h1>Welcome {valid.name}</h1></div>
        <div className='maincontent'>
        <div className='custInput_box'>
            <div className='custSelect'>
                <div>
                <label>Select Unit:</label><br/>
                <select className='selectbox' onChange={(e)=>setUnit(e.target.value)}>
                    <option>Kilograms</option>
                    <option>Pounds</option>
                </select>
                </div>
                <div>
                    <label>Enter your Height(in cm):</label>
                    <input className='selectbox' type={"number"} onChange={(e)=>setHeight(e.target.value)}/>
                </div>
                <div>
                <label>Select Your Age:</label><br/>
                <input className='selectbox' type={"date"} onChange={(e)=>setAge(e.target.value)}/>
                </div>
            </div>
            {unit === "Kilograms"?
            <div>
                <label>Enter your weight (Kilograms)</label><br/>
                <input ref={inputelem} className='custtext_box' type={"number"} min="0" onChange={(e)=>setWeight(e.target.value)}/><br/>
                <button className='custSelectBtn' onClick={handleinput}>Enter</button>
            </div>:
            <div>
                <label>Enter your weight (Pounds)</label><br/>
                <input ref={inputelem} className='custtext_box' type={"number"} min="0" onChange={(e)=>setWeight(e.target.value)}/><br/>
                <button className='custSelectBtn' onClick={handleinput}>Enter</button>
            </div>}
        </div>
        <div className='custTable'>
            <table>
                <thead className='tablehead'>
                    <tr>
                        <th>Date</th>
                        <th>Current weight(kg)</th>
                        <th>Your BMI/Ideal BMI</th>
                    </tr>
                </thead>
                <tbody className='tableoverflow'>
                {result && result.result.map((items,index)=>{
                    return(
                        <tr key={index}>
                            <td>{items.date}</td>
                            <td style={{"color":`${items.color}`}}>{items.reading}</td>
                            <td>{items.client}/{items.ideal}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
        <div className='custGraph'>
            {result &&
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <AreaChart
                  data={result.result}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="reading" stroke="white" fill="blue" />
                </AreaChart>
              </ResponsiveContainer>
            </div>}
        </div>
        <div className='advise'>
            <h1>Expert Advise</h1>
            {valid.advise != "undefined"? <p className='h3'>{valid.advise}</p>:""}
        </div>
        </div>
    </div>
  )
}

export default Custlanding