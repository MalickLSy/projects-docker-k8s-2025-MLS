const express = require('express');
const {mongoose} = require('mongoose');
const axios = require('axios');
const { Note } = require('./models');

const noteRouter = express.Router();
const notebooksApiUrl = process.env.NOTEBOOKS_API_URL;

const validateId = (req, res, next) => {
       
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Note not found ! ' });
  }
  next();
}
// CREATE
noteRouter.post('/', async (req, res) => {
  try {
    const { title, content, notebookId } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: "'title' and 'content' fields are required." });
    }

    let validatedNotebookId = null;

    if (notebookId) {
      if (!mongoose.Types.ObjectId.isValid(notebookId)) {
        return res.status(400).json({ error: 'Invalid Notebook ID', notebookId });
      }

      try {
        await axios.get(`${notebooksApiUrl}/${notebookId}`);
        validatedNotebookId = notebookId; 
      } catch (err) {
        const jsonError = err.toJSON();
        if (jsonError.status === 404) {
          return res.status(404).json({ error: 'Notebook not found', notebookId });
        } else {
          console.error({
            message: 'Error verifying the notebook ID. Upstream notebooks service',
            notebookId,
            error: err.message,
          });
          return res.status(500).json({ error: 'Upstream notebooks service error' });
        }
      }
    }

    const note = new Note({ title, content, notebookId: validatedNotebookId });
    await note.save();
    res.status(201).json({ data: note });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET all
noteRouter.get('/', async (req, res) => {
  try {
    const allNotes = await Note.find();
    return res.status(200).json(allNotes);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// GET one by title
noteRouter.get('/:title', async (req, res) => {
  const { title } = req.params;

  try {
    const note = await Note.findOne({ title });
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    return res.status(200).json({ title, content: note.content });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// UPDATE
noteRouter.put('/:id', validateId, async (req, res) => {
  const { title , content } = req.body;
 
  try {

    const note = await Note.findByIdAndUpdate(
      req.params.id  ,
      { title, content },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ error: '"title" not found' });
    }

    return res.status(200).json({ message: 'Note updated successfully', data: note });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE
noteRouter.delete('/:id', async (req, res) => {
  
  try {
    const deleted = await Note.findOneAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: 'Note not found' });
    }

    return res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports ={
    noteRouter,
};

