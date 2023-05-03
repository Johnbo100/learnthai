const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(cors())
app.use(express.json())


const db = mysql.createConnection({
    user:'root',
    host:'localhost',
    password:'johnbo100',
    database:'learnthaiDB'
})

app.post('/add',(req,res)=>{
    const en = req.body.en;
    const th = req.body.th;
    const cat = req.body.cat;

    db.query('INSERT INTO words(en,th,cat)VALUES(?,?,?)',[en,th,cat],
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log('new values inserted')
        }
    })
})

app.post('/addcat',(req,res)=>{
    const cat = req.body.cat; 
    db.query('INSERT INTO categories(catname)VALUES(?)',[cat],
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log('new values inserted')
        }
    })
})

app.put('/updateen',(req,res)=>{
    const id = req.body.id;
    const en = req.body.en;

    db.query('UPDATE words SET en = ? WHERE id = ?',[en,id],
    (err,result)=>{
        if(err){
            console.log('ERROR IN EN UPDATE '+err)
        }else{
            console.log('new values updated')
        }
    })
})

app.put('/updateth',(req,res)=>{
    const id = req.body.id;
    const th = req.body.th;

    db.query('UPDATE words SET th = ? WHERE id = ?',[th,id],
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log('new values updated')
        }}
    )
})

app.put('/updatecat',(req,res)=>{
    const id = req.body.id;
    const cat = req.body.cat;

    db.query('UPDATE words SET cat = ? WHERE id = ?',[cat,id],
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log('new values updated')
        }
    })
})

app.get('/words',(req,res)=>{
    const category = req.query.category
    console.log(req.query.category)
    console.log('Category in node is:' + category)
    db.query("SELECT id,cat,en,th FROM words WHERE cat = ?",[category],(err,result)=>{
        if(err){
            console.log('there is an error in node JS' +err)
        }
        else{
            res.send(result)   
        }
    })
})

app.get('/allwords',(req,res)=>{
    db.query("SELECT id,cat,en,th FROM words ORDER BY cat",(err,result)=>{
        if(err){
            console.log('there is an error in node JS' +err)
        }
        else{
            res.send(result)
            
        }
    })
})

app.get('/cat',(req,res)=>{
    db.query("SELECT * FROM categories",(err,result)=>{
        if(err){
            console.log('there is an error in node JS' +err)
        }
        else{
            res.send(result)         
        }
    })
})

app.listen('3001',()=>{
    console.log('Listening on port 3001')
})