// imports 
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

mongoose.connect('mongodb+srv://admin:Mongodbpassword@hosttododb.i3uhjm5.mongodb.net/TODO');
mongoose.set('strictQuery', false);

//Database Schema,modelling
const workSchema ={name:String}
const workModel = mongoose.model("Item",workSchema)

//static content
// const d1 = new workModel({name:"work"})
// const d2 = new workModel({name:"work"})
// const d3 = new workModel({name:"work"})
// const defaultItems = [d1,d2,d3]


//finding the date
const event = new Date();
const options = {  year: 'numeric', month: 'long', day: 'numeric' };
var workdate =event.toLocaleDateString('en-in', options)

app.get("/", function(req, res){
  workModel.find({},(err,itms)=>{
  // uncomment this to push some static values
  //   if(itms.length===0){
  //     workModel.insertMany(defaultItems,(err)=>{
  //       if(err){console.log(err)}
  //       else{console.log("added defaults")}
  //       res.redirect("/")
  //     }
  //   )
  // }
  // else
  res.render("list", {listTitle:workdate, newListItems: itms});
 })
});


app.get("/:whichone",(req,res)=>{
  const location = req.params.whichone
})


app.post("/", function(req, res){
  
  const new_work = req.body.newWork;
  const item = new workModel({
    name : new_work
  });
  item.save()
  res.redirect("/")

});

app.post("/delete",(req,res)=>{
  const remove = req.body.checkbox;
  workModel.findByIdAndRemove(remove,(err)=>{
    if(err){console.log(err)}
    res.redirect("/")
  })
  
})




app.listen(3000, function() {
  console.log("Server started on port 3000");
});
