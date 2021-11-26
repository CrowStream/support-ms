const { request, response } = require('express');
const Post = require('../models/post');

const get_all_posts = (req = request, res = response) => {
    var filters = {} //TODO: Filters
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
    Post.findById(req.params.id)
        .then((post) => {
            if(post == null){
                res.status(400).json({
                    "msg": "Element not found"                    
                });
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

const create_post = (req = request, res = response) => {
    Post.create(req.body)
        .then((post) => {
            res.status(201).json(
                post
            );
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

const update_post = (req = request, res = response) => {
    Post.findByIdAndUpdate(req.params.id, req.body)
        .then((post) => {
            Post.findById(req.params.id)
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

const remove_post = (req = request, res = response) => {
    Post.findByIdAndDelete(req.params.id)
        .then((post) => {
            if(post == null){
                res.status(204).json();
            }else{
                res.status(400).json({
                    "msg": "Element not found"
                });
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
    create_post,
    update_post,
    remove_post
}