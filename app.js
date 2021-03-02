//ejs lint hint off
const express = require("express");
const ejs= require("ejs");
const bodyParser= require("body-parser");
const _ = require('lodash');


const homeStartingContent = "This is a home page";
const aboutContent = "This is a about page";
const contactContent = "This is a contact page";
let posts=[];



const app= express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",(req, res)=>{
    res.render("home", {startingContent:homeStartingContent, blogs: posts});

});

app.get("/about", (req, res)=>{
    res.render("about", {about: aboutContent});
});

app.get("/contact", (req, res)=>{
    res.render("contact", {contact: contactContent});
});

app.get("/compose", (req, res)=>{
    res.render("compose");
    
});

app.post("/compose", (req, res)=>{
    blogTitle= req.body.title;
    blogContent= req.body.content;
  
  const mposts={
      blogTitle: blogTitle,
      blogContent: blogContent
  };
  posts.push(mposts);
  
  res.redirect("/");
});




app.get("/blogs/:title", (req, res)=>{
    const reqTitle= _.lowerCase(req.params.title);
    posts.forEach(post => {
       const storedTitle= _.lowerCase(post.blogTitle);
     if(reqTitle === storedTitle){
         res.render("posts", {filteredTitle: post.blogTitle, filteredContent: post.blogContent});
     }

     });
    
});  


app.listen(3000, ()=>{
    console.log("server started at port 3000");
});