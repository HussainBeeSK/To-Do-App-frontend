import Todo from "./components/TODO";
import React, { useEffect, useState } from 'react'

function App() {
  
  const [listdata ,setlistdata] = useState([])
  const [text,settext] = useState("")
  const[updating,setupdating] = useState(false)
  const[todoId ,settodoId] = useState("")
   
  useEffect(()=>{
    fetchdata();
  },[]);    // eslint-disable-line react-hooks/exhaustive-deps

  const fetchdata = async ()=>{
      const data = await fetch("http://localhost:5000/getlist")
      const json = await data.json()
      setlistdata(json);
      // console.log(json)
  }

  const addtodo = async (text,settext,setlistdata)=>{
       const data = await fetch("http://localhost:5000/savetodo" , {
              method : 'POST',
              headers :{
                 'content-Type': "application/json"
              },
              body : JSON.stringify({
                text : text
              }),
             
            }).then((data)=>{
              console.log(data)
              settext("")
              fetchdata(setlistdata)
            }).catch((err)=>{
              console.log(err)
            })
       }

       
    const updateMode = (_id,text) => {
      setupdating(true)
      settext(text)
      settodoId(_id)
    }

    console.log("setted id is" ,todoId)
  const updatetodo = async (todoId,text,setlistdata,settext,setupdating)=>{
    const data = await fetch("http://localhost:5000/updatedata" , {
              method : 'POST',
              headers :{
                 'content-Type': "application/json"
              },
              body : JSON.stringify({
                id : todoId,
                text : text
              })
            }).then((data)=>{
              settext("")
              setupdating(false)
              fetchdata(setlistdata)
            }).catch((err)=>{
              console.log(err)
            })

  }

  const deletedata = async(_id,setlistdata)=>{
    const data = await fetch("http://localhost:5000/deletebyid" , {
              method : 'DELETE',
              headers :{
                 'content-Type': "application/json"
              },
              body : JSON.stringify({
                id : _id,
              })
            }).then((data)=>{
              fetchdata(setlistdata)
            }).catch((err)=>{
              console.log(err)
            })
  }

  return (
    <div className="App">
      <div className="container">
        <h1> To Do APP</h1>
        <div className= "top"> 
          <input type = "text" placeholder = " add to do List" value={text} onChange={(e) => settext(e.target.value)}></input>  
          <button className="btn" onClick={updating ? ()=> updatetodo(todoId,text,setlistdata,settext,setupdating) : ()=> addtodo(text,settext,setlistdata)}>
            {updating ? "Update" : "ADD"}</button>
          </div>
          <div className="list">
             {listdata.map((ele) => (
              <Todo key= {ele._id} text={ele.text}  
              updateMode = {()=> updateMode(ele._id,ele.text)} 
              deletedata = {()=> deletedata(ele._id,setlistdata)}/>
             ))}
          </div>
      </div>
    </div>
  );
}

export default App;
