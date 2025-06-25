const express=require("express");
const app=express();
const path=require("path");
const { v4: uuidv4 } = require('uuid');
//uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
var methodOverride = require('method-override')

app.set("view engine","ejs")//necessary to use ejs templates
app.set("views",path.join(__dirname,"/views"));//setting path for views folder
app.use(express.static(path.join(__dirname,"/public")));//setting path for public folder
app.use(express.urlencoded({extended:true}));//setting data format of data received in request
app.use(methodOverride('_method'))

let port=8080;

let posts=[
    {
        id: uuidv4(),
        username: "Shoaib",
        content: "I love coding"
    },
    {
        id: uuidv4(),
        username: "rahulkumar",
        content: "Hard Work is important to achieve success"
    },
    {
        id: uuidv4(),
        username: "shradha",
        content: "I am a good programming teacher"
    }
]

app.get("/",(req,res)=>{
    res.send("Server is working well");
})

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts})
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
})

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find(p => p.id === id);
    res.render("show.ejs", { post });
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post = posts.find(p => p.id === id);
    res.render("edit.ejs",{post});
})

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newcontent = req.body.newcontent;
    let post = posts.find((p) => p.id === id);

    if (!post) {
        return res.status(404).send("❌ Post not found");
    }

    post.content = newcontent;
    res.redirect("/posts");
})

app.delete("/posts/:id/delete",(req,res)=>{
    let {id}=req.params;
    posts = posts.filter(post => post.id !== id);
    res.redirect("/posts");
})


app.listen(port, ()=>{
    console.log("Server is listening on port",port);
    console.log("This is extra line");
})


// function fun(){
//     let id = Date.now().toString(36);
//     console.log(id);
// }
// fun();