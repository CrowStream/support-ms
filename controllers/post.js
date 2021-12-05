const { request, response } = require('express');
const Post = require('../models/post');
const { create_task } = require('../messaging/task_management');
const uuid = require('uuid');

const get_all_posts = (req = request, res = response) => {
    var filters = {}
    Post.find(filters)
        .then((posts) => {
            res.status(200).json(
                posts
            );
        }).catch((err) =>{
            res.status(500).json(
                err
            );
        });
}

const get_post = (req = request, res = response) => {
    Post.findById(req.params.id_post)
        .then((post) => {
            if(post == null){
                res.status(400).json({});
            }else{
                res.status(200).json(
                    post
                );
            }
        }).catch((err) =>{
            if(err.name == 'CastError'){
                res.status(400).json(
                    err
                );
            }else{
                res.status(500).json(
                    err
                );
            }
        });
}

const get_post_comments = (req = request, res = response) => {
    Post.findById(req.params.id_post)
        .then((post) => {
            if(post == null){
                res.status(400).json({});
            }else{
                res.status(200).json(
                    post.comments
                );
            }
        }).catch((err) =>{
            if(err.name == 'CastError'){
                res.status(400).json(
                    err
                );
            }else{
                res.status(500).json(
                    err
                );
            }
        });
}

const get_post_comment = (req = request, res = response) => {
    Post.findById(req.params.id_post)
        .then((post) => {
            if(post == null){
                res.status(400).json({});
            }else{
                var flag = false;
                for(var i = 0; i < post.comments.length; i++){
                    if(post.comments[i]._id == req.params.id_comment){
                        res.status(200).json(
                            post.comments[i]
                        );
                        flag = true;
                    }
                }
                if(!flag){
                    res.status(400).json({});
                }
            }
        }).catch((err) =>{
            if(err.name == 'CastError'){
                res.status(400).json(
                    err
                );
            }else{
                res.status(500).json(
                    err
                );
            }
        });
}

const get_post_files = (req = request, res = response) => {
    Post.findById(req.params.id_post)
        .then((post) => {
            if(post == null){
                res.status(400).json({});
            }else{
                res.status(200).json(
                    post.files
                );
            }
        }).catch((err) =>{
            if(err.name == 'CastError'){
                res.status(400).json(
                    err
                );
            }else{
                res.status(500).json(
                    err
                );
            }
        });
}

const get_post_file = (req = request, res = response) => {
    Post.findById(req.params.id_post)
        .then((post) => {
            if(post == null){
                res.status(400).json({});
            }else{
                var flag = false;
                for(var i = 0; i < post.files.length; i++){
                    if(post.files[i]._id == req.params.id_comment){
                        res.status(200).json(
                            post.files[i]
                        );
                        flag = true;
                    }
                }
                if(!flag){
                    res.status(400).json({});
                }
            }
        }).catch((err) =>{
            if(err.name == 'CastError'){
                res.status(400).json(
                    err
                );
            }else{
                res.status(500).json(
                    err
                );
            }
        });
}

const create_post = (req = request, res = response) => {
    var post = req.body;
    if(post.files != undefined){
        for(var i = 0; i < post.files.length; i++){
            file = post.files[i];
            split = file.split('.')
            extention = split.at(-1);
            filename = uuid.v4();
            create_task('file.upload', 'file.upload', 'file.upload', {
                bucketName: process.env.GOOGLE_CROWSTREAM_BUCKET_NAME,
                base64File: (split.slice(0, split.length - 1)).join('.'),
                destFileName: `PostFiles/${filename}.${extention}`
            });  
            post.files[i] = `${process.env.GOOGLE_CROWSTREAM_BUCKET_PATH}PostFiles/${filename}.${extention}`;
        }
    }
    Post.create(req.body)
        .then((post) => {
            Post.findById(post._id)
                .then((post) => {
                    res.status(201).json(
                        post
                    );
                })
        }).catch((err) =>{
            if(err.name == 'ValidationError'){
                res.status(400).json(
                    err
                );
            }else{
                res.status(500).json(
                    err
                );
            }
        });
}

const create_post_comment = (req = request, res = response) => {
    var comment = req.body;
    if(comment.files != undefined){
        for(var i = 0; i < comment.files.length; i++){
            file = comment.files[i];
            split = file.split('.')
            extention = split.at(-1);
            filename = uuid.v4();
            create_task('file.upload', 'file.upload', 'file.upload', {
                bucketName: process.env.GOOGLE_CROWSTREAM_BUCKET_NAME,
                base64File: (split.slice(0, split.length - 1)).join('.'),
                destFileName: `CommentFiles/${filename}.${extention}`
            });  
            comment.files[i] = `${process.env.GOOGLE_CROWSTREAM_BUCKET_PATH}CommentFiles/${filename}.${extention}`;
        }
    }
    Post.findById(req.params.id_post)
        .then((post) => {
            if(post == null){
                res.status(400).json({});
            }else{
                post.comments.push(req.body);
                post.save();
                if(req.body.email != undefined){
                    create_task('comment.creation', 'comment.creation', 'comment.creation', {
                        to: req.body.email,
                        subject: "Han comentado tu publicación",
                        html: "<h1>Han comentado tu publicación, Revisa la plataforma.</h1>"
                    });
                }
                res.status(200).json(
                    post.comments.at(-1)
                );
            }
        }).catch((err) =>{
            if(err.name == 'CastError'){
                res.status(400).json(
                    err
                );
            }else{
                res.status(500).json(
                    err
                );
            }
        });
}

const create_post_file = (req = request, res = response) => {
    Post.findById(req.params.id_post)
        .then((post) => {
            if(post == null){
                res.status(400).json({});
            }else{
                post.files.push(req.body);
                post.save();
                res.status(200).json(
                    post.files.at(-1)
                );
            }
        }).catch((err) =>{
            if(err.name == 'CastError'){
                res.status(400).json(
                    err
                );
            }else{
                res.status(500).json(
                    err
                );
            }
        });
}

const update_post = (req = request, res = response) => {
    Post.findByIdAndUpdate(req.params.id_post, req.body)
        .then((post) => {
            Post.findById(req.params.id_post)
                .then((post) => {
                    res.status(200).json(
                        post
                    );
                })
        }).catch((err) =>{
            if(err.name == 'CastError'){
                res.status(400).json(
                    err
                );
            }else{
                res.status(500).json(
                    err
                );
            }
        });
}

const update_post_comment = (req = request, res = response) => {
    Post.findById(req.params.id_post)
        .then((post) => {
            if(post == null){
                res.status(400).json({});
            }else{
                var flag = false;
                for(var i = 0; i < post.comments.length; i++){
                    if(post.comments[i]._id == req.params.id_comment){
                        post.comments[i] = req.body;
                        post.save();
                        res.status(200).json(
                            post.comments[i]
                        );
                        flag = true;
                    }
                }
                if(!flag){
                    res.status(400).json({});
                }
            }
        }).catch((err) =>{
            if(err.name == 'CastError'){
                res.status(400).json(
                    err
                );
            }else{
                res.status(500).json(
                    err
                );
            }
        });
}

const update_post_file = (req = request, res = response) => {
    Post.findById(req.params.id_post)
        .then((post) => {
            if(post == null){
                res.status(400).json({});
            }else{
                var flag = false;
                for(var i = 0; i < post.files.length; i++){
                    if(post.files[i]._id == req.params.id_file){
                        post.files[i] = req.body;
                        post.save();
                        res.status(200).json(
                            post.files[i]
                        );
                        flag = true;
                    }
                }
                if(!flag){
                    res.status(400).json({});
                }
            }
        }).catch((err) =>{
            if(err.name == 'CastError'){
                res.status(400).json(
                    err
                );
            }else{
                res.status(500).json(
                    err
                );
            }
        });
}

const remove_post = (req = request, res = response) => {
    Post.findByIdAndDelete(req.params.id_post)
        .then((post) => {
            if(post == null){
                res.status(204).json();
            }else{
                res.status(400).json({});
            }
        }).catch((err) =>{
            if(err.name == 'CastError'){
                res.status(400).json(
                    err
                );
            }else{
                res.status(500).json(
                    err
                );
            }
        });
}

const remove_post_comment = (req = request, res = response) => {
    Post.findById(req.params.id_post)
        .then((post) => {
            if(post == null){
                res.status(400).json({});
            }else{
                var flag = false;
                for(var i = 0; i < post.comments.length; i++){
                    if(post.comments[i]._id == req.params.id_comment){
                        post.comments.splice(i, 1);
                        post.save();
                        res.status(204).json();
                        flag = true;
                    }
                }
                if(!flag){
                    res.status(400).json({});
                }
            }
        }).catch((err) =>{
            if(err.name == 'CastError'){
                res.status(400).json(
                    err
                );
            }else{
                res.status(500).json(
                    err
                );
            }
        });
}

const remove_post_files = (req = request, res = response) => {
    Post.findById(req.params.id_post)
        .then((post) => {
            if(post == null){
                res.status(400).json({});
            }else{
                var flag = false;
                for(var i = 0; i < post.files.length; i++){
                    if(post.files[i]._id == req.params.id_file){
                        post.files.splice(i, 1);
                        post.save();
                        res.status(204).json();
                        flag = true;
                    }
                }
                if(!flag){
                    res.status(400).json({});
                }
            }
        }).catch((err) =>{
            if(err.name == 'CastError'){
                res.status(400).json(
                    err
                );
            }else{
                res.status(500).json(
                    err
                );
            }
        });
}


module.exports = {
    get_all_posts, 
    get_post, 
    get_post_comments,
    get_post_comment,
    get_post_files,
    get_post_file,
    create_post, 
    create_post_comment,
    create_post_file,
    update_post,
    update_post_comment,
    update_post_file,
    remove_post,
    remove_post_comment,
    remove_post_files
}