import Axios from 'axios'
import React, { useState } from 'react'

function Categories() {
        
    const[cat,setCat]=useState('')
    const[catadd,setCatadd]=useState('')
   

    const addCat=async ()=>{
        await Axios.post(process.env.REACT_APP_ADDCAT,{cat:cat}).then((response)=>{
            console.log('New category added')
            setCatadd('Posting....')
        }).catch(error => console.log(error)) 
        setCatadd('New category added')
    }
    
    const handleChange = event => {
        setCat(event.target.value);
        console.log('value is:', event.target.value);
      };

  return (
    <div className='newcat'> 
       <input
        onChange={handleChange}
       />
       <button onClick={addCat}>
        Add new category
       </button>        
       <div className='status'>{catadd}</div>
    </div>
  )
}

export default Categories