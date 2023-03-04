const { Schema, model } = require("mongoose");

const PostSchema = new Schema({
    title: String,
    category: String,
    content: String,
    image: String,
}, { 
    versionKey: false,
    timestamps: true 
});

module.exports = model("Post", PostSchema);