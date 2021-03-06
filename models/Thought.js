const {Schema, model} = require('mongoose');
const dateFormat = require('../utils/dateFormat');

//reaction schema
const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdVal => dateFormat(createdVal)
        }
    },
    {
        toJSON:{
            getters: true
        }
    }
);

//thought schema
const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdVal)=> dateFormat(createdVal)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [ReactionSchema]

    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

//get total count of reactions
ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;