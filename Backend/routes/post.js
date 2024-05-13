const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const multer = require('multer');

// Set up multer storage for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Destination folder for file uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname) // Unique filename
  }
});

const upload = multer({ storage: storage });

// Import the Post model 
const Post = require('../models/Posting');
const fetchuser = require("../middleware/fetchuser");

// Route to handle post creation with image upload
router.post("/addposts", fetchuser, upload.single('image'), [
    body('description', 'Description is required').notEmpty(),
    body('comments'),
], async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Create new post object with user ID
        const newPost = new Post({
            user: req.user.id, // Populate user field with user ID
            description: req.body.description,
            comments: req.body.comments,
            image: req.file.path // Store path to uploaded image
        });

        // Save post to database
        await newPost.save();
 
        res.status(201).json({ message: 'Post created successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}); 

router.get('/getposts', fetchuser, async (req, res) => {
    console.log(req.user)
    try {
        const posts = await Post.find({ user: req.user.id }).select("-date");
        if (!posts || posts.length === 0) {
            return res.status(200).json({ message: 'No Posts Found' });
        } else {
            return res.json(posts);
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

router.put('/updateposts/:id',fetchuser,async(req,res)=>{
    const {image,description,comments} = req.body;
    try{
    const New_Post = {}
    if(image){New_Post.image = image}
    if(description){New_Post.description = description}
    if(comments){New_Post.comments = comments}

    // Finding already existing notes from databse by using id
    let post = await Post.findById(req.params.id)
    if(!post){return res.status(404).send("Not Found")}
    if (!post.user || post.user.toString() !== req.user.id) {
        return res.status(401).send("Accessing others Posts is Prohibited")
    }
    // For updating this Function
    post = await Post.findByIdAndUpdate(req.params.id, { $set: New_Post }, { new: true })
    res.json({ post });
    }catch(error){
        // console.error(error.message)
        res.status(400).send({error:"Internal Server Error"})
    }
})

router.delete('/deleteposts/:id',fetchuser,async(req,res)=>{

    try{
    let post = await Post.findById(req.params.id)
    if(!post){return res.status(404).send("Not Found")}
    if (!post.user || post.user.toString() !== req.user.id) {
        return res.status(401).send("Accessing others Posts is Prohibited")
    }
    // For Deletion
    post = await Post.findByIdAndDelete( req.params.id)
    res.status(200).json({ post, Success: "This Post Has been Deleted" });
}catch(error){
        console.error(error.message)
        res.status(400).send({error:"Internal Server Error"})
    }
})


module.exports = router;
