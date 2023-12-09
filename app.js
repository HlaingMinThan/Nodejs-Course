const express = require('express');
let morgan = require('morgan')
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');

const Blog = require('./models/Blog');

const app = express();

//db url
let mongoUrl = "mongodb+srv://hlaingminthan:test1234@cluster0.qhxu0as.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoUrl).then(() => {
    console.log('connected to db')
    app.listen(3000,() => {
        console.log('app is running on port 3000');
    })
}).catch(e => {
    console.log(e)
})

app.set('views', './views')
app.set('view engine', 'ejs')
app.use(expressLayouts);
app.set('layout', 'layouts/default');


app.use(morgan('dev'))
app.use(express.static('public'))

app.get('/add-blog',async (req,res) => {
    let blog = new Blog({
        title : "blog title 3",
        intro : "blog intro 3",
        body : "blog body 3"
    });

    await blog.save();
    res.send('blog saved');
})
app.get('/single-blog',async (req,res) => {
    let blog = await Blog.findById('657186fd23184e4e210d85f3');
    res.json(blog);
})

app.get('/',async (req,res) => {
    let blogs = await Blog.find().sort({createdAt : -1});
    res.render('home',{
        blogs,
        title : "Home"
    })
});

app.get('/about',(req,res) => {
    res.render('about', {
        title : "About"
    });
});

app.get('/contact',(req,res) => {
    res.render('contact', {
        title : 'Contact'
    });
});

app.get('/blogs/create',(req,res) => {
    res.render('blogs/create', {
        title : 'Blog Create'
    });
});

app.use((req,res)=> {
    res.status(404).render('404', {
        title : "404 Not Found"
    });
});