const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    userName: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, enum: ["user", "author"], default: "user" },
    picture: { type: String }
})


module.exports = mongoose.model("User", userSchema);