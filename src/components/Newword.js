import Axios from 'axios'
import React, { useState,useEffect } from 'react'


function Newword() {
    
    const[en,setEn]=useState('')
    const[th,setTh]=useState('')
    const[category,setCategory]=useState([{}])
    const[cat,setCat]=useState([{}])
    const[nwadded,setNwadded]=useState('...')


    useEffect(() => {
        getCat();
      },[]);
    
    const getCat=async()=>{
        await Axios.get(process.env.REACT_APP_GETCAT).then((response)=>{
            setCategory(response.data);
        }).catch(error => console.log(error)) 
    }

    const addWord= async ()=>{
      setNwadded("Adding new word...")
        await Axios.post(process.env.REACT_APP_ADDWORD,{en:en,th:th,cat:cat}).then((response)=>{
            console.log('New record added')
            setNwadded('New word added')
        }).catch(error => console.log(error)) 
        
    }
    
    const handleChangeEn = event => {
        setEn(event.target.value);
        console.log('value is:', event.target.value);
      };


    const handleChangeTh = event => {
        setTh(event.target.value);
        console.log('value is:', event.target.value);
      };
      
    const handleChangeCat = event => {
        setCat(event.target.value);
        console.log('value is:', event.target.value);
      };  
  return (
    <>
    <div className='new-word'>{nwadded}</div>
    
    <div className='newword'>
      
       
       <select name = 'category' onChange={handleChangeCat}>
                <option>Select category</option>
            {category.map((val,key)=>
                <option>{val.catname}</option>)} 
            </select>
       <label>En</label> 
       <input
        value={en}
        onChange={handleChangeEn}
        className='en-text'
       />
       <label>Th</label>
       <input
        value={th}
        onChange={handleChangeTh}
        className='th-text'
       />

       <button onClick={addWord}>
        Add
       </button>
    </div>
    </>
  )
}

export default Newword