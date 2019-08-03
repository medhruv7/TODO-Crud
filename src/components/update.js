import React from 'react';

import {useState,useEffect} from 'react'




const Update = props =>
{
    const [email1,setEmail1] = useState("");
    const [username1,setUsername1] = useState("");
    const updEmail = async () =>
        {
            console.log(email1);
            const payload =
            {
                key2 : props.id,
                email2 : email1
            }
            const packet = JSON.stringify(payload);
            const api_call = await fetch(`http://localhost:3000/updemail`,{method : 'POST', body : packet, headers : {'Content-Type' : 'application/json'}});
            const data = await api_call.json();
            console.log(data);
        }

        const updUsername = async () =>
        {
            console.log(email1);
            const payload =
            {
                key2 : props.id,
                username2 : username1
            }
            const packet = JSON.stringify(payload);
            const api_call = await fetch(`http://localhost:3000/updusername`,{method : 'POST', body : packet, headers : {'Content-Type' : 'application/json'}});
            const data = await api_call.json();
            console.log(data);
        }
    useEffect(() =>
    {
        if(email1.email !== "")
        updEmail();
    },[email1]);

    useEffect(()=>
    {
        if(username1.username !== "")
        updUsername();
    },[username1]);
    return (
        <div>
            <p>
           <form action="" onSubmit = {(e) => {
               e.preventDefault();
               setEmail1(document.getElementById("emailup"));
           }} >
           <input type="text"/>
           <button className = "button" id = "emailup" >Update email</button>
           </form>
            </p>
            <p>
            <form action="" onSubmit = {(e) =>
            {
                e.preventDefault();
                setUsername1(document.getElementById("userup"));
            }}>
                <input type="text"/>
            <button className = "button" id = "userup">Update username</button>
            </form>
         </p>
        </div>
    );
}

export default Update;