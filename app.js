const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');

const port = process.env.PORT || 3030;

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs')

const { v4: uuid } = require('uuid');
uuid();

let comments = [  {id:uuid(), username: "tech_guru", tweet: "JavaScript is fun when it works 😅",img: "https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg?tx=w_1920,q_auto" },
    {id:uuid(), username: "cat_raj", tweet: "BootC just knocked over my coffee again 😾☕",img: "https://www.wfla.com/wp-content/uploads/sites/71/2023/05/GettyImages-1389862392.jpg?strip=1" },
    {id:uuid(), username: "fitness_junkie", tweet: "Hit a new PidR at the gym today! 💪",img: "https://i.shgcdn.com/d61f124a-5eb2-41c7-abd1-ace0dd6f7d97/-/format/auto/-/preview/3000x3000/-/quality/lighter/" },
    {id:uuid(), username: "travel_bug", tweet: "Can’t wait to explore the mountains this summer 🏔️",img: "https://himalayanoutback.com/wp-content/uploads/2022/05/Top-10-Mountain-Trekking-in-India.png" },
    {id:uuid(), username: "code_cruncher", tweet: "Finally solved that bug after 4 hours 😤 #DevLife",img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1351360/capsule_616x353.jpg?t=1717433600" },
    {id:uuid(), username: "bookworm101", tweet: "Just finished 'Atomic Habits'. Game changer 📘✨",img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLbKY9uvjiAFfge0HPkBquuKu9XpRcEX7rew&s" },
    {id:uuid(), username: "gamer_girl", tweet: "Late night Valorant sessions hit different 🎮",img: "https://sm.ign.com/ign_in/screenshot/default/valorant-2_mdt7.jpg" },
    {id:uuid(), username: "astro_nut", tweet: "Jupiter is visible tonight! Don’t miss it 🔭🌌", img: "https://cdn.thenewstack.io/media/2024/08/8a2142d6-manage-multiple-jupyter-instances-same-cluster-safely-1024x576.jpg"},
    {id:uuid(), username: "plantmom", tweet: "My monstera grew a new leaf today! 🪴❤️",img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCz4aZ2V1oVRS42WV7illsVw8NWTqMLmov0Q&s" },
    {id:uuid(), username: "coffee_addict", tweet: "Cold brew is the only way to survive deadlines ☕🔥",img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_4Qn3LryFISqpFq1q1KszCXYT3U6iysAbEA&s " }]
    
app.get('/comments',(req, res)=>{
    res.render('comments/index', {comments})
})

app.get('/comments/new', (req,res)=>{
    res.render('comments/new')
})

app.post('/comments',(req,res)=>{
    console.log(req.body)
    let {username, tweet,img} = req.body;
    comments.push({id:uuid(), username,tweet,img})
    res.redirect('/comments')
})

app.get('/comments/:id', (req,res)=>{
    const { id }= req.params;   //destructure the  id
    const comment = comments.find(c => c.id === id)
    res.render('comments/show',{comment})
})

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const { comment: newComment, img } = req.body;
    const foundComment = comments.find(c => c.id === id);
    if (foundComment) {
        foundComment.tweet = newComment;
        foundComment.img = img;
    }   
    res.redirect('/comments');
});

app.get('/comments/:id/edit',(req,res)=>{
    const {id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment });
})

app.delete('/comments/:id',(req,res)=>{
    const {id} = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments')
})

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is listening on port ${port}`);
});