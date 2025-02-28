const express = require("express")
const router = express.Router()
const { createNotes, getAllNotes, getOneNote, updateNotes, deleteNote } = require('../controller/notes')
const { checkGrammar } = require('../controller/ai')

router.post('/note/add', createNotes)
router.get('/note/all', getAllNotes)
router.get('/note/solo/:id', getOneNote)
router.patch('/note/update/:id', updateNotes)
router.delete('/note/delete/:id', deleteNote)
router.post('/note/grammar-check', checkGrammar)

module.exports = router