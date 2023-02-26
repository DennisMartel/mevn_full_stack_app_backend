const Post = require("../models/Post");
const fs = require("fs");

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        return res.status(200).json({ posts });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        return res.status(200).json({ post });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const setPost = async (req, res) => {
    try {
        const post = req.body;
        const imagename = req.file.filename;
        post.image = imagename;

        const newPost = new Post(post);
        const savedPost = await newPost.save();
        return res.status(200).json({ data: savedPost, message: "Post creado correctamente" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const updatePost = async (req, res) => {
    try {
        const { id } = req.params;

        if (req.file) {
            const post = await Post.findById(id);
            fs.unlinkSync(`./uploads/${post.image}`);

            const postData = req.body;
            postData.image = req.file.filename;

            await post.updateOne({
                $set: postData
            });

            const postUpdated = await Post.findById(id);

            return res.status(200).json({ post: postUpdated });
        } else {
            await Post.findByIdAndUpdate(id, {
                title: req.body.title,
                category: req.body.category,
                content: req.body.content,
            });

            const postUpdated = await Post.findById(id);

            return res.status(200).json({ post: postUpdated });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Post.findByIdAndDelete(id);

        if (post) {
            if (post.image) {
                fs.unlinkSync(`./uploads/${post.image}`);
            }
        }
        
        return res.status(200).json({ post });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getPosts,
    getPostById,
    setPost,
    updatePost,
    deletePost
}