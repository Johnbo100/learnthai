import Axios from 'axios'
import React, { useEffect, useState } from 'react'



function Card() {
    const [cardNum, setCardNum] = useState(0);
    const [card, setCard] = useState(null);
    const [cat, setCat] = useState(null);

    const getWords = async (e) => {
        const val = e.target.value;
        console.log('From select box: ' + val);
        setCard(null);
        await Axios.get(process.env.REACT_APP_WORDS, {
            params: {
                category: val
            }
        }).then((response) => {
            if (response.data.length === 0) {
                setCard([]);
            } else {
                setCard(response.data);
            }
            console.table(response.data);
            console.log("Data from getWords" + res);
            setCardNum(0);
        }).catch(error => console.log('Error is: ' + error));
    };

    useEffect(() => {
        getCat();
    }, [cat]);

    const getCat = async () => {
        await Axios.get(process.env.REACT_APP_CAT).then((response) => {
            setCat(response.data);
        });
    }

    const nextword = () => {
        if (card && card[cardNum]) {
            setCardNum((prev) => prev + 1);
            console.log('card number is :' + cardNum);
        } else {
            console.log("card is undefined");
        }
    };

    const prevword = () => {
        if (card && card[cardNum]) {
            setCardNum((prev) => prev - 1);
            console.log('card number is :' + cardNum);
        } else {
            console.log("card is undefined");
        }
    };

    return (
        <div className='card'>
            <div className='cardinner'>
                <div className="flip-card">
                    <div className="flip-card-inner">
                        <div className="flip-card-front">
                            {card && card[cardNum] ? card[cardNum].en : ''}
                        </div>
                        <div className="flip-card-back">
                            {card && card[cardNum] ? card[cardNum].th : ''}
                        </div>
                    </div>
                </div>
                <div className="controls">
                    <button onClick={nextword}>next</button>
                    <button onClick={prevword}>Previous</button>
                    <select name = 'category' onChange={getWords}>
                        <option>Select category</option>
                        {cat != null && cat.map((val, key) => (
                            <option>{val.catname}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}

export default Card;
