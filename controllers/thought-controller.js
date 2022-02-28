const {User, Thought} = require('../models');

const thoughtController = {
    //get all thoughts
    getAllThoughts(req, res){
        Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData) )
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    //get a thought by id
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
    //create a new thought and add it to user
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
    //add reaction to thought
    addReaction({params, body}, res){
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: {reactions: body}},
            {new: true}
        )
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
        });
    },
    //remove reaction from thought
    removeReaction({params}, res){
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$pull: {reactions: {_id: params.reactionId}}},
            {new: true}
        )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    },
    //update thought
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
    //delete a thought
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