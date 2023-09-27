const { validationResult } = require("express-validator");
const Blog = require("../models/Blog");

const createBlogs = async (req, res) => {
    try {
        const vResult = validationResult(req)
        if (!vResult.isEmpty()) {
            return res.status(404).send({ status: false, message: vResult.array()[0] })
        }
        const { title, content } = req.body;

        if (req.user.role != "author") {
            return res.status(403).send({ status: false, message: "user is not author" });
        }

        const addBlog = await Blog.create({
            title,
            content,
            author: req.user.id
        });

        return res.status(200).send({ status: true, addBlog });

    } catch (error) {
        res.status(500).send({ status: false, message: error });
        console.log(error)
    }
}


const updateBlog = async () => {
    try {

        const { id } = req.params;
        const { title, content } = req.body;

        const blog = await Blog.findById(id);
        console.log(id)
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        if (blog.author.toSting() != req.user.id) {
            return res.status(403).json({ message: 'Permission denied' });

        }

        const updateResult = await Blog.updateOne(
            { _id: id },
            {
                $set: {
                    title,
                    content
                }
            });

        res.status(200).json({ status: true, msg: "Data Update" })


    } catch (error) {
        res.status(500).send({ status: false, message: error });
        console.log(error)
    }
}




module.exports = { createBlogs, updateBlog }