import React from 'react';
import logo from './logo.svg';
import './App.css';
import {useState,useEffect} from 'react'
import Delete from './components/delete'
import Create from './components/create'
import Update from './components/update'
function App() {

  const [user,setUser] = useState();
  const [password,setPassword] = useState();
  const [person,setPerson] = useState({name : "", email : "",type : "",id : "", username : ""});
  const [isadmin,setAdmin] = useState(false);
  const [islogged, setLogged] = useState(false);
  useEffect( () =>
  {
    if(user !== undefined && password !== undefined)
    getData();
  },[user,password])

  useEffect( () =>
  {
    console.log(person.name);
  },[person]);

  const getData = async () =>
  {


    console.log(user);
    const payload = {
      user : user,
      password : password
    }
    console.log(JSON.stringify(payload))
    const api_call = await fetch("http://localhost:3000/user",{method : 'POST', body : JSON.stringify(payload),headers : {'Content-Type' : 'application/json'}});
    console.log(api_call);
    const data = await api_call.json();
    if(data.length === 0)
    {
      console.log("not found");
    }
    else
    {
      console.log("found");
      setPerson({name : data[0]['username'], email : data[0]['email'], username : data[0]['username'], id : data[0]['userid']});
      if(data[0].type === "admin")
      {
        setAdmin(true);
      }
      setLogged(true);
    }
    console.log(data);
  }


  return (
    <div className="App">
      {
        !islogged &&
      <form onSubmit = {
        (e) => {
          e.preventDefault();
          setUser(document.getElementById("user").value);
          setPassword(document.getElementById("pass").value);
        }
      }>
      <div className="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input type="email" className="form-control" id="user" aria-describedby="emailHelp" placeholder="Enter email" />
        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div className="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" className="form-control" id="pass" placeholder="Password" />
      </div>
      <button type="submit" className="btn btn-primary" >Submit</button>
    </form>
      }

      {
        islogged &&
        <div>
         <p> {person.name} </p>
         <p> {person.email} </p>
         <p> {person.username} </p>
         <p> {person.id} </p>
         <p>
           <Update id = {person.id}/>
         </p>
         <p>
         <button onClick = {
           (e) => {
             e.preventDefault();
             setLogged(false);
             setUser(undefined);
             setPassword(undefined);
             setAdmin(false);
           }
         }>
          Logout
         </button></p>
        </div>
      }

      {
        islogged && isadmin &&
      <div>
      <Delete />
      <Create />
      </div>
      }
    </div>
  );
}

export default App;
