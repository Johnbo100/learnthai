import Axios from 'axios'
import React, { useEffect, useState } from 'react'



function Card() {
    const [cardNum,setCardNum]=useState(0)
    const[card,setCard]=useState([{}])
    const[cat,setCat]=useState([{}])

const getWords=async(e)=>{
    const val=e.target.value;
    console.log('From select box: '+val)
    await Axios.get(process.env.REACT_APP_WORDS,{
        params: {
          category: val
        }
      }).then((response)=>{
        setCard(response.data);
        console.log('Response DATA = '+response.data)
    }).catch(error => console.log('Error is: ' +error)) 
}

useEffect(() => {
    getCat();
  },[cat]);

const getCat=async()=>{
    await Axios.get(process.env.REACT_APP_CAT).then((response)=>{
        setCat(response.data);
    }).catch(error => console.log(error)) 
}

const nextword =()=>{
    cardNum < card.length -1 ? setCardNum(cardNum +1):setCardNum(0)
    console.log('card number is :'+cardNum)
}

const prevword =()=>{
    cardNum > 0 ? setCardNum(cardNum -1):setCardNum(card.length -1)
    console.log('card number is :'+cardNum)
}

return (
    <div className='card'>
        <div className='cardinner'>
            <div className="flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        {card[cardNum].en}          
                    </div>
                    <div className="flip-card-back">
                        {card[cardNum].th}
                    </div>
                </div>
            </div>
            <div className="controls">
                <button onClick={nextword}>next</button>
                <button onClick={prevword}>Previous</button>
                <select name = 'category' onChange={getWords}>
                    <option>Select category</option>
                    {cat != null && cat.map((val,key)=>
                    <option>{val.catname}</option>)} 
                </select>
            </div>
        </div>
        
    </div>
)}

export default Card

//P]x@=&M4,z39 ssh