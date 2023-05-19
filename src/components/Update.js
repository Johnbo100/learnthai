import Axios from 'axios'
import React, { useState } from 'react'

function Update() {
  const[words, setWords] = useState([])
  const [status, setStatus] = useState('Waiting..')

  const getWords = async () => {
    console.log('in the getWords function')
    await Axios.get(process.env.REACT_APP_ALLWORDS).then((response) => {
      console.log('Response from getWords ' + response)
      setWords(response.data)
    }).catch(error => console.log(error))
  }

  const updateWordEn = (val, id) => {
    Axios.put(process.env.REACT_APP_UPDATEEN, { en: val, id: id }).then((response) => {
      console.log('updated en')
    }).catch(error => console.log(error))
  }

  const updateWordTh = (val, id) => {
    Axios.put(process.env.REACT_APP_UPDATETH, { id: id, th: val }).then((response) => {
      console.log('updated th')
    }).catch(error => console.log(error))
  }

  const updateWordCat = (val, id) => {
    Axios.put(process.env.REACT_APP_UPDATECAT, { id: id, cat: val }).then((response) => {
      console.log('updated cat')
    }).catch(error => console.log(error))
  }

  const updateWord = (e) => {
    if (e.key === 'Enter') {
        console.log("Enter button pressed")
        setStatus('Updating...')
      // Update the text box value
      const input = e.target
      const value = input.value
      const id = input.dataset.id
      
        if (input.name === 'cat') {
          updateWordCat(value, id)
          setStatus("Category updated")
        } else if (input.name === 'en') {
          updateWordEn(value, id)
          setStatus("English word updated")
        } else if (input.name === 'th') {
          updateWordTh(value, id)
          setStatus("Thai word updated")
        }
      
    }
  }

  return (
    <div>
        <div className='update-status'>{status}</div>
      <div><button onClick={getWords}>show records</button></div>
      <div>
        {words.map((val, key) => {
          return (
            <div className='grid'>
              <label>Category:</label>
              <input
                type="text"
                defaultValue={val.cat}
                onKeyDown={updateWord}
                data-id={val.id}
                name='cat'
              />
              <label>English</label>
              <input
                type="text"
                defaultValue={val.en}
                onKeyDown={updateWord}
                data-id={val.id}
                name='en'
              />
              <label>Thai</label>
              <input
                type="text"
                defaultValue={val.th}
                onKeyDown={updateWord}
                data-id={val.id}
                name='th'
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Update
