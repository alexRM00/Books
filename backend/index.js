import express from "express"
import mysql2 from  "mysql2"
import cors from "cors"
const app= express()

//Connection with DB
const db= mysql2.createConnection({
    host: "localhost",
    user: "***",
    password:"****",
    database:"***"
})

///Send any json file using a client
app.use(express.json())

app.use(cors())

//Check connection with backend
app.get("/", (req,res)=>{
    res.json("Hello this is the backend")
})

//EndPoints from Postman
//Method GET from DB to show on application
app.get("/books", (req, res)=>{
    const q="SELECT * FROM books"
    db.query(q, (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

//Method POST from DB to post on application, in json format
app.post("/books",(req,res)=>{
    const q= "INSERT INTO books (`title`, `desc`, `price`,`cover`) VALUES(?)"
    const values= [req.body.title,req.body.desc,req.body.price,req.body.cover];
    db.query(q,[values],(err, data)=>{
        if(err) return res.json(err)
        return res.json("Book has been created succesfully")
    })
})

//Method DELETE from DB to delete on application
app.delete("/books/:id", (req, res)=>{
    const bookId= req.params.id;
    const q= "DELETE FROM books WHERE id= ?"
    db.query(q,[bookId], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Book has been deleted succesfully")
    })
})

//Method UPDATE from DB to update on application
app.put("/books/:id", (req, res)=>{
    const bookId= req.params.id;
    const q= "UPDATE books set `title`=?,`desc`=?,`price`=?,`cover`=? WHERE id= ?"
    const values= [req.body.title,req.body.desc,req.body.price,req.body.cover];
    db.query(q,[...values,bookId], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Book has been updated succesfully")
    })
})

//Check DB connection with node
app.listen(8080, ()=>{
    console.log('Back succesfull!!')
})
