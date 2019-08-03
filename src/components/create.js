import React from 'react';

import {useState,useEffect} from 'react'




function Create ()
{
    const [user,setUser] = useState({username:"",email:"",password:"",type:""});

    const createData = async () =>
        {
            console.log(user);
            console.log(user['type']);
            const payload = {
                username : user['username'],
                email : user['email'],
                password : user['password'],
                type : user['type']
            };

            const packet = JSON.stringify(payload);
            console.log(packet);
            const api_call = await fetch(`http://localhost:3000/create`,{method : 'POST', body : packet, headers : {'Content-Type' : 'application/json'}});
            const data = await api_call.json();
            console.log(data);
        }


    useEffect(() =>
    {
        if(user.username !== "" && user.type !=="" && user.email !=="" && user.password !== "")
        createData();
    },[user])


    return (
        <div>
            <form  onSubmit = {
                (e) =>
                {
                    e.preventDefault();
                    console.log("submitted")
                    setUser({username : document.getElementById("userusername").value,
                    email : document.getElementById("useremail").value,
                    type : document.getElementById("usertype").value,
                    password : document.getElementById("userpassword").value
                })
                }
            }>
                <input type="text" name = "id" id = "userusername"/>
                <input type="text" name = "id" id = "useremail"/>
                <input type="text" name = "id" id = "usertype"/>
                <input type="password" name = "id" id = "userpassword"/>
                <button >Create</button>
            </form>
        </div>
    );
}

export default Create;