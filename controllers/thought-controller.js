const { json } = require('express/lib/response');
const {User, Thought} = require('../models');

const thoughtController = {
    getAllThoughts(req, res){
        Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData) )
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    getThoughtById({params}, res){
        Thought.findOne({_id: params.id})
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({ message: 'No thought found with this id!'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err =>{
            console.log(err);
            res.status(400).json(err);
        });
    },
    addThought({body}, res){
        Thought.create(body)
        .then(({_id})=>{
            return User.findOneAndUpdate(
                {_id: body.userId},
                {$push: {thoughts: _id}},
                {new: true}
            )
        })
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({message : 'No user found with this id!'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },
    updateThought({params, body}, res){
        Thought.findOneAndUpdate( {_id: params.id}, body, {new: true} )
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({message : 'No thought found with this id!'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },
    deleteThought({params, body}, res){
        Thought.findOneAndDelete( {_id: params.id} )
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({message : 'No thought found with this id!'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    }
}

module.exports = thoughtController;