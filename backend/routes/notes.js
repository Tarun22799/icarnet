const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const fetchUser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');


router.get('/fetchallnotes', fetchUser, async (req, res) => {
    var notes = await Notes.find({ user: req.user.id })
    res.send(notes);
})

router.post('/addnote', [
    body('title', "Please Enter the title (Length is not enough)").isLength({ min: 3 }),
    body('description', "Please Enter the description (Length is not enough)").isLength({ min: 5 }),
], fetchUser, async (req, res) => {
    try {

        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(401).json({ error: 'Validation failed !! ' })
        }
        const { title, description, tag } = req.body;
        const note = await new Notes({
            title,
            description,
            tag,
            user: req.user.id
        })
        const notesSaved = await note.save();
        res.json(notesSaved);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server error' })
    }
})

router.put('/updatenote/:id', fetchUser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        let newNote = {};
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        const note = await Notes.findById(req.params.id);
        if (!note) { return res.status(400).send('Please provide correct note ID') }
        if (note.user.toString() !== req.user.id) { return res.status(401).send("Access Denied") }

        const updatednote = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ updatednote });
    } catch (error) {

    }
})

router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router