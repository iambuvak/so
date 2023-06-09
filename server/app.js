const express = require('express')
const cors = require('cors')
const methodOverride = require('method-override')
const mongoose = require('mongoose')

const { MONGODB_URL } = require('./settings.json');
const Post = require('./models/Post')


const app = express()
let arr = []


app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors({origin: true}))
app.use(
    methodOverride('_method', {
        methods: ['POST', 'GET'],
    })
);

mongoose.connect(MONGODB_URL).then(() => {
    console.log("Veritabanına erisim sağlandı.");
});

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/posts', async (req,res)=>{
    try{
        const posts = await Post.find({})
        res.status(200).json(posts)

    } catch(err){
        res.status(404).json({
            status: "fail",
            error: err
        })
    }
})

app.get('/dashboard', async (req,res)=>{
    let posts = await Post.find({})
    res.render('dashboard',{
        posts: posts
    })
})

app.post('/addPost', async (req,res)=>{
    await Post.create(req.body)
    res.status(200).redirect('/dashboard')
})

app.post('/deletePost', async (req,res)=>{
    try {
        await Post.findOneAndRemove(req.body)
        res.status(200).redirect('/dashboard')
    } catch(err){
        res.status(404).json({
            status: "fail",
            error: err
        })
    }
})

app.listen(80)