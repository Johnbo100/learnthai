import Axios from "axios";
import React, { useState } from "react";

function Update() {
  const [words, setWords] = useState([]);
  const [status, setStatus] = useState("Status");
  const [enupdate, setEnupdate] = useState("");
  const [thupdate, setThupdate] = useState("");
  const [catupdate, setCatupdate] = useState("");

  const getWords = async () => {
    console.log("in the getWords function");
    await Axios.get(process.env.REACT_APP_ALLWORDS)
      .then((response) => {
        console.log("Response from getWords " + response);
        setWords(response.data);
      })
      .catch((error) => console.log(error));
  };

  

  const updaterow = (e,id) => {
    e.preventDefault()
    if (enupdate !== "" || thupdate !== "" || catupdate !== "") {
      const data = {
        id: id,
        en: enupdate,
        th: thupdate,
        cat: catupdate,
      };
      console.log(data)
      setStatus("Updating...")
      Axios.put(process.env.REACT_APP_UPDATEWORDS, data)
        .then((response) => {
          console.log("All words posted");
          setStatus("Words updated succesfully")
        })
        .catch((error) => console.log(error));
    }
  };
  

  return (
    <div>
      <div className="update-status">{status}</div>
      <div>
        <button onClick={getWords}>show records</button>
      </div>
      <div>
        {words.map((val, key) => {
          return (
            <div className="grid">
              <label>Cat</label>
              <input
                type="text"
                defaultValue={val.cat}
                onChange={(e) => setCatupdate(e.target.value)}
                data-id={val.id}
                name="cat"
              />
              <label>En</label>
              <input
                type="text"
                defaultValue={val.en}
                onChange={(e) => setEnupdate(e.target.value)}
                data-id={val.id}
                name="en"
                className="en-text"
              />
              <label>Th</label>
              <input
                type="text"
                defaultValue={val.th}
                onChange={(e) => setThupdate(e.target.value)}
                data-id={val.id}
                name="th"
                className="th-text"
              />
              <button className="update-post-btn" onClick={(e)=>updaterow(e,val.id)}>
              &#94;
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Update;
