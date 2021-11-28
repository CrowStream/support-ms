const { request, response } = require('express');
const Support_request = require('../models/support_request');


const get_all_support_requests = (req = request, res = response) => {
    var filters = {}
    Support_request.find(filters)
        .then((support_requests) => {
            res.status(200).json(
                support_requests
            );
        }).catch((err) =>{
            res.status(500).json(
                err
            );
        });
}

const get_support_request = (req = request, res = response) => {
    Support_request.findById(req.params.id_support_request)
        .then((support_request) => {
            if(support_request == null){
                res.status(400).json({
                    "msg": "Element not found"                    
                });
            }else{
                res.status(200).json(
                    support_request
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

const get_support_request_files = (req = request, res = response) => {
    Support_request.findById(req.params.id_support_request)
        .then((support_request) => {
            if(support_request == null){
                res.status(400).json({
                    "msg": "Element not found"                    
                });
            }else{
                res.status(200).json(
                    support_request.files
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

const get_support_request_file = (req = request, res = response) => {
    Support_request.findById(req.params.id_support_request)
        .then((support_request) => {
            if(support_request == null){
                res.status(400).json({
                    "msg": "Element not found"                    
                });
            }else{
                var flag = false;
                for(var i = 0; i < support_request.files.length; i++){
                    if(support_request.files[i]._id == req.params.id_comment){
                        res.status(200).json(
                            support_request.files[i]
                        );
                        flag = true;
                    }
                }
                if(!flag){
                    res.status(400).json({
                        "msg": "Element not found"                    
                    });
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

const create_support_request = (req = request, res = response) => {
    Support_request.create(req.body)
        .then((support_request) => {
            Support_request.findById(support_request._id)
                .then((support_request) => {
                    res.status(201).json(
                        support_request
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

const create_support_request_file = (req = request, res = response) => {
    Support_request.findById(req.params.id_support_request)
        .then((support_request) => {
            if(support_request == null){
                res.status(400).json({
                    "msg": "Element not found"                    
                });
            }else{
                support_request.files.push(req.body);
                support_request.save();
                res.status(200).json(
                    support_request.files.at(-1)
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

const update_support_request = (req = request, res = response) => {
    Support_request.findByIdAndUpdate(req.params.id_support_request, req.body)
        .then((support_request) => {
            Support_request.findById(req.params.id_support_request)
                .then((support_request) => {
                    res.status(200).json(
                        support_request
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

const update_support_request_file = (req = request, res = response) => {
    Support_request.findById(req.params.id_support_request)
        .then((support_request) => {
            if(support_request == null){
                res.status(400).json({
                    "msg": "Element not found"                    
                });
            }else{
                var flag = false;
                for(var i = 0; i < support_request.files.length; i++){
                    if(support_request.files[i]._id == req.params.id_file){
                        support_request.files[i] = req.body;
                        support_request.save();
                        res.status(200).json(
                            support_request.files[i]
                        );
                        flag = true;
                    }
                }
                if(!flag){
                    res.status(400).json({
                        "msg": "Element not found"                    
                    });
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

const remove_support_request = (req = request, res = response) => {
    Support_request.findByIdAndDelete(req.params.id_support_request)
        .then((support_request) => {
            if(support_request == null){
                res.status(400).json({
                    "msg": "Element not found"
                });
            }else{
                res.status(204).json();
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

const remove_support_request_files = (req = request, res = response) => {
    Support_request.findById(req.params.id_support_request)
        .then((support_request) => {
            if(support_request == null){
                res.status(400).json({
                    "msg": "Element not found"                    
                });
            }else{
                var flag = false;
                for(var i = 0; i < support_request.files.length; i++){
                    if(support_request.files[i]._id == req.params.id_file){
                        support_request.files.splice(i, 1);
                        support_request.save();
                        res.status(204).json();
                        flag = true;
                    }
                }
                if(!flag){
                    res.status(400).json({
                        "msg": "Element not found"                    
                    });
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
    get_all_support_requests, 
    get_support_request, 
    get_support_request_files,
    get_support_request_file,
    create_support_request, 
    create_support_request_file,
    update_support_request,
    update_support_request_file,
    remove_support_request,
    remove_support_request_files
}