var express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app= express();

hbs.registerPartials(__dirname + "/views/partials")
app.set('view engine', 'hbs');
app.use(express.static(__dirname+'/public'));

app.use((req,res,next) =>{
var now =new Date().toString();
var log= ` ${now} : ${req.method} ${req.url}`;
fs.appendFile('server.log' , log +'\n');
next();
});

app.use((req,res,next) =>{
  res.render('maintain.hbs');
})

app.get('/',(req,res) =>{
  res.render('home.hbs',{
    title: 'Welocome',
    year : new Date().getFullYear()
  })
})

app.get('/about',(req,res) =>{
  res.render('about.hbs',{
    pagetitle: 'About page',
    year : new Date().getFullYear()
  });
})

app.get('/bad',(req,res)=>{
  res.send({
    error: 'invalid request',
    code:104
  })
})

app.listen(3000);
