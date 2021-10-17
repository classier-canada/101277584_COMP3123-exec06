const express = require('express')
const noteModel = require('../models/Note');
const app = express()

//TODO - Create a new Note


//http://mongoosejs.com/docs/api.html#document_Document-save
app.post('/notes', (req, res) => {
    /* Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
*/
    //TODO - Write your code here to save the note

    try {
        var data = req.body;
        data.date_added = Date.now();
        data.date_updated = Date.now();
    
        const note = new noteModel(data);
        await note.save();

        res.send(`Note has been created: ${note}`);
    }catch(err){
        console.log("ERROR: Note Saved: " + err)
        res.status(500).send(err)
    }
});

//TODO - Retrieve all Notes
//http://mongoosejs.com/docs/api.html#find_find
app.get('/notes', (req, res) => {
    /* Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }*/
    //TODO - Write your code here to returns all note

    try {
        const notes = await noteModel.find({});
    
        res.send(`All notes listed: ${notes}`);
    } catch (err) {
        res.status(500).send(err);
    }

});

//TODO - Retrieve a single Note with noteId
//http://mongoosejs.com/docs/api.html#findbyid_findById
app.get('/notes/:noteId', (req, res) => {
    /* Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }*/
    //TODO - Write your code here to return onlt one note using noteid

    try {
        const id = req.params.noteId;
        const result = await noteModel.findById(id);
    
        res.send(`Note found: ${result}`);
    } catch(err){
        res.status(500).send(err);
    }

});

//TODO - Update a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
app.put('/notes/:noteId', (req, res) => {
    /* Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }*/
    //TODO - Write your code here to update the note using noteid
    try {
        const id = req.params.noteId;
        var updates = req.body;
        updates.date_updated = Date.now();
        const options = {new: true};
    
        const result = await noteModel.findByIdAndUpdate(id, updates, options);
    
        res.status(200).send(`Note has been updated: ${result}`);
    } catch(err){
        res.status(500).send(err);
    }


});

//TODO - Delete a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove
app.delete('/notes/:noteId', (req, res) => {
    /* Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }*/
    //TODO - Write your code here to delete the note using noteid

    try {
        const id = req.params.noteId;
        const result = await noteModel.findByIdAndRemove(id);
        if (!result) res.status(404).send("Note is not found!");
    
        res.status(200).send(`Note has been deleted: ${result}`);
    } catch(err){
        res.status(500).send(err)
    }

});
//app.use(noteModel);
module.exports = app
