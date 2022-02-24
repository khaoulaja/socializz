const { Schema, model} = require('mongoose')

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email:{
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function(v) {
                    return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v)
                },
                message: "Email is not valid!"
            }
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

//create user model
const User = model('User', UserSchema);

module.exports = User