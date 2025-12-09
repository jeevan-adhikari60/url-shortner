import express from 'express'
import mongoose from 'mongoose';
import { shortUrl, getOriginalUrl } from "./Controllers/url.js";
import dotenv from 'dotenv';  
dotenv.config();


const app = express();

app.use(express.urlencoded({extended:true}))

mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "Backend_practice",
  })
  .then(() => console.log("MongoDB Connected..!"))
  .catch((err) => console.log(err));



  // rendering the ejs file
  app.get('/',(req,res)=>{
    res.render("index.ejs", {shortUrl :null})
  })

  // shorting url logic
  app.post('/short',shortUrl)

  // redirect to original url using short code :- dynamic routing
  app.get("/:shortCode", getOriginalUrl);

const port = 1000;
app.listen(port,()=>console.log(`server is running on port ${port}`))