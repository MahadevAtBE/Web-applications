// this is the backend server
import express from 'express'
import cors from "cors"
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

let db= await mongoose.connect("mongodb://localhost:27017/user") // connecting to db
import User from './schema.js';

const app = express()
const port = 5001

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.post('/',async (req, res) => {
  let email=await User.findOne({Email:req.body.email})  // making email component from res data
  if (email==null) {  // if data dosenot exist make new entry
    console.log("if=",email)
    const user = new User({  // file name of db (user)
      Name:req.body.name,
      Email:req.body.email,
      Password:req.body.password
    })
    user.save()
    res.status(201).json({Massege:"SignUp succesfull"})
  }
  else{    // if data exist send error
    console.log("else=",email)
    res.status(401).json({Massege:"User alrady exist!"})
  }
})

app.post('/find',async (req, res) => {
  let user=await User.findOne({Email:req.body.email})
  if (user) {
    // console.log(user)
    return res.json(user)
  }
  else{
    // console.log("not found")
    return res.json({error:"User not found!"})
  }
  
  res.send('Hello World!')
})

app.post("/login",async (req,res)=>{
  let email = req.body.email
  let password = req.body.password
  let useremail = await User.findOne({Email:email})
  let userpass = await User.findOne({Password:password})
  if (!useremail) { // if username not found
    res.status(401).json({Massege:"User not found!"})
  }
  if (useremail && !userpass) {  // if username found & password incorect
    res.status(401).json({Massege:"Password incorect!"})
  }
  if (useremail && userpass) { // if username & password found
    res.status(200).json({Massege:"Login succesfull"})
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})