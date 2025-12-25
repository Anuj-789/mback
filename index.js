const express = require('express');
const app = express()
const path = require('path')

console.log(__dirname)
app.use(express.json())
app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

//mongodb:-

const collection = require("./mongo");
const { name } = require('ejs');
//handle post request from signup page
app.post("/submit", async (req, res) =>{

    const {name, email, password, repassword } = req.body;

    if(req.body.password !== req.body.repassword){
        return res.render("signup.ejs",{msg:"Passwords do not mactch"})
    }else{

                           const existuser = await collection.findOne({email});
           if(existuser){

                         return res.render("signup.ejs",{msg:"Email already exist"})

                        }else{

                             await collection.create({name, email, password });
                             res.render("login.ejs",{msg:"signup successfull,Please login"});  
                        }
    }

})









//handle post request from signin page

app.post("/sign", async (req, res) => {
          
    const {email, password} = req.body;

    const user = await collection.findOne({email, password});

    if(!user ){
               res.render('login.ejs',{msg:"Invalid email or password "})

    }else{
    const ruser = user.email;
        
        res.render('dash.ejs',{ruser});
    }
        
    
   
})



app.listen(3000, () => {
    console.log("Port connected at 3000")
})





app.get("/in", (req, res) => {
    res.render('login.ejs',{msg:" "})
})

app.get("/sino", (req, res) => {
    res.render('signup.ejs',{msg:" "})
})

app.get("/da", (req, res) => {
    res.render('dash.ejs',{msg:" "})
})