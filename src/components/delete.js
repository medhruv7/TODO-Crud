import React from 'react';

import {useState,useEffect} from 'react'




function Delete ()
{
    const [email,setEmail] = useState("");

    const deleteData = async () =>
        {
            console.log(email);
            const payload =
            {
                email : email
            }
            const packet = JSON.stringify(payload);
            const api_call = await fetch(`http://localhost:3000/delete`,{method : 'POST', body : packet, headers : {'Content-Type' : 'application/json'}});
            const data = await api_call.json();
            console.log(data);
        }


    useEffect(() =>
    {
        if(email !== "")
        deleteData();
    },[email])


    return (
        <div>
            <form  onSubmit = {
                (e) =>
                {
                    e.preventDefault();
                    console.log("submitted")
                    setEmail(document.getElementById("user12").value);
                }
            }>
                <input type="text" name = "id" id = "user12"/>
                <button >Delete</button>
            </form>
        </div>
    );
}

export default Delete;