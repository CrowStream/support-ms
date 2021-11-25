const { request, response } = require('express');
const Comment = require('../models/comment');

const get_all_comments = (req = request, res = response) => {
    var filters = {} //TODO: Filters
    Comment.find(filters)
        .then((comments) => {
            res.status(200).json(
                comments
            );
        }).catch((err) =>{
            res.status(500).json(
                err
            );
        });
}

const get_comment = (req = request, res = response) => {
    Comment.findById(req.params.id)
        .then((comment) => {
            if(comment == null){
                res.status(400).json(
                    "msg": "Element not found"
                );
            }else{
                res.status(200).json(
                    comment
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

const create_comment = (req = request, res = response) => {
    Comment.create(req.body)
        .then((comment) => {
            res.status(201).json(
                comment
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

const update_comment = (req = request, res = response) => {
    Comment.findByIdAndUpdate(req.params.id, req.body)
        .then((comment) => {
            Comment.findById(req.params.id)
                .then((comment) => {
                    res.status(200).json(
                        comment
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

const remove_comment = (req = request, res = response) => {
    Comment.findByIdAndDelete(req.params.id)
        .then((comment) => {
            if(comment == null){
                res.status(204).json();
            }else{
                res.status(400).json(
                    "msg": "Element not found"
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


module.exports = {
    get_all_comments,
    get_comment,
    create_comment,
    update_comment,
    remove_comment
}