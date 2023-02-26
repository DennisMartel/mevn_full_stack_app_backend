const { Schema, model } = require("mongoose");

const PostSchema = Schema({
    title: String,
    category: String,
    content: String,
    image: String,
}, { 
    timestamps: true 
});

module.exports = model("Post", PostSchema);