const router = require('express').Router();
const {getAllUsers, getUserById, createUser, addFriend, removeFriend, updateUser, deleteUser} = require('../../controllers/user-controller');

//set up get all post a user at /api/users
router.route('/')
.get(getAllUsers)
.post(createUser);

//set up get one, update delete a user at /api/users/:userid
router.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

//add and remove friend to user's friend list at /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(removeFriend)


module.exports = router;