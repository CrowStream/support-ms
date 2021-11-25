const { request, response } = require('express');
const Support_request = require('../models/support_request');

const get_all_support_requests = (req = request, res = response) => {
    var filters = {} //TODO: Filters
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
    Support_request.findById(req.params.id)
        .then((support_request) => {
            if(support_request == null){
                res.status(400).json(
                    "msg": "Element not found"
                );
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

const create_support_request = (req = request, res = response) => {
    Support_request.create(req.body)
        .then((support_request) => {
            res.status(201).json(
                support_request
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

const update_support_request = (req = request, res = response) => {
    Support_request.findByIdAndUpdate(req.params.id, req.body)
        .then((support_request) => {
            Support_request.findById(req.params.id)
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

const remove_support_request = (req = request, res = response) => {
    Support_request.findByIdAndDelete(req.params.id)
        .then((support_request) => {
            if(support_request == null){
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
    get_all_support_requests,
    get_support_request,
    create_support_request,
    update_support_request,
    remove_support_request
}