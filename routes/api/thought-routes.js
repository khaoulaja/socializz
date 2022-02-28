const router = require('express').Router();
const {getAllThoughts, getThoughtById, addThought, addReaction, removeReaction, updateThought, deleteThought} = require('../../controllers/thought-controller');

//set up get all thoughts and create a thought at /api/thoughts
router.route('/')
.get(getAllThoughts)
.post(addThought);

//set up get one, update and delete thought at /api/thoughts/:id
router.route('/:id')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);

//set up add reation to thought at /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
.post(addReaction);

//set up remove reation from thought at /api/thoughts/:thoughtId/reactions/reactionId
router.route('/:thoughtId/reactions/:reactionId')
.delete(removeReaction);


module.exports = router;