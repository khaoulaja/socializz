const router = require('express').Router();
const {getAllThoughts, getThoughtById, addThought, addReaction, removeReaction, updateThought, deleteThought} = require('../../controllers/thought-controller');

router.route('/')
.get(getAllThoughts)
.post(addThought);

router.route('/:id')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);

router.route('/:thoughtId/reactions')
.post(addReaction);

router.route('/:thoughtId/reactions/:reactionId')
.delete(removeReaction);


module.exports = router;