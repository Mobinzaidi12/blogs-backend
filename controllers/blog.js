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

const getBlog = async (req, res) => {

    try {
        const data = await Blog.find();

        if (data.lenght < 1) {
            res.status(400).json({ status: false, mes: "Data Not Found" })
        }

        res.status(200).send({ status: true, data });

    } catch (error) {
        res.status(500).send({ status: false, message: error });
        console.log(error)
    }

}

const getBlogById = async (req, res) => {

    try {
        const { id } = req.params;
        const data = await Blog.findById(id)
        if (data.author.toString(id) == req.user.id) {
            return res.status(200).json({ status: true, data })
        }

        return res.status(403).json({ message: 'Permission denied' });


    } catch (error) {
        res.status(500).send({ status: false, message: error });
        console.log(error)
    }

}

const updateBlog = async (req, res) => {
    try {

        const { id } = req.params;
        const { title, content } = req.body;

        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        if (blog.author.toString(id) !== req.user.id) {

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


const deleteBlog = async (req, res) => {
    const { id } = req.params;
    let data = await Blog.findById(id);

    if (!data) {
        return res.status(403).json({ status: false, mes: "Data Not found" })
    };
    if (data.author.toString(id) !== req.user.id) {
        return res.status(400).json({ status: false, mes: "Permission denied" })
    }

    await Blog.findByIdAndDelete(id)

    res.status(200).json({ status: true, mes: "Data Deleted" })

}



module.exports = { createBlogs, updateBlog, getBlog, getBlogById, deleteBlog }