import Axios from 'axios'
import React, { useState } from 'react'



function Update() {
    
    const[words,setWords]=useState([])

    const getWords=async()=>{
        console.log('in the getWords function')
        await Axios.get(process.env.REACT_APP_ALLWORDS).then((response)=>{
            console.log('Response from getWords '+ response)
            setWords(response.data);
        }).catch(error => console.log(error))  
    }

    const updateWordEn=(val,id)=>{
        Axios.put(process.env.REACT_APP_UPDATEEN,{en:val,id:id}).then((response)=>{
            console.log('updated en')
        }).catch(error => console.log(error)) 
    }
    const updateWordTh=(val,id)=>{
        Axios.put(process.env.REACT_APP_UPDATETH,{id:id,th:val}).then((response)=>{
            console.log('updated th')
        }).catch(error => console.log(error)) 
    }
    const updateWordCat=(val,id)=>{
        Axios.put(process.env.REACT_APP_UPDATECAT,{id:id,cat:val}).then((response)=>{
            console.log('updated cat')
        }).catch(error => console.log(error)) 
    }

  return (
    <div>
        <div><button onClick={getWords}>show records</button></div>
        <div>
            {words.map((val,key)=>{
                return (
                <div className='grid'>   
                <label>Category:</label>    
                <input
                    type="text"
                    placeholder={val.cat} 
                    onChange={(e)=>{
                        updateWordCat(e.target.value,val.id)
                    }}
                />
                <label>English</label>    
                <input 
                    type="text"
                    placeholder={val.en}
                    onChange={(e)=>{
                        updateWordEn(e.target.value,val.id)
                    }}
                />
                <label>Thai</label>    
                <input 
                    type="text"
                    placeholder={val.th}
                    onChange={(e)=>{
                        updateWordTh(e.target.value,val.id)
                    }}    
                />  
                </div>
                )
            })}
        </div>
    </div>
  )
}

export default Update