const { request, response } = require('express');
const Support_response = require('../models/support_response');

const get_all_support_responses = (req = request, res = response) => {
    var filters = {} //TODO: Filters
    Support_response.find(filters)
        .then((support_responses) => {
            res.status(200).json(
                support_responses
            );
        }).catch((err) =>{
            res.status(500).json(
                err
            );
        });
}

const get_support_response = (req = request, res = response) => {
    Support_response.findById(req.params.id)
        .then((support_response) => {
            if(support_response == null){
                res.status(400).json({
                    "msg": "Element not found"
                });
            }else{
                res.status(200).json(
                    support_response
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

const create_support_response = (req = request, res = response) => {
    Support_response.create(req.body)
        .then((support_response) => {
            res.status(201).json(
                support_response
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

const update_support_response = (req = request, res = response) => {
    Support_response.findByIdAndUpdate(req.params.id, req.body)
        .then((support_response) => {
            Support_response.findById(req.params.id)
                .then((support_response) => {
                    res.status(200).json(
                        support_response
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

const remove_support_response = (req = request, res = response) => {
    Support_response.findByIdAndDelete(req.params.id)
        .then((support_response) => {
            if(support_response == null){
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
    get_all_support_responses,
    get_support_response,
    create_support_response,
    update_support_response,
    remove_support_response
}