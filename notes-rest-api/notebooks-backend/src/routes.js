const express = require('express');
const { Notebook } = require('./models');
const { default: mongoose } = require('mongoose');

const notebookRouter = express.Router();


const validateId = (req, res, next) => {
       
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'notebook not found ! ' });
  }
  next();
}
// CREATE
notebookRouter.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ error: "'name' field is required." });
    }

    const notebook = new Notebook({ name, description });
    await notebook.save();
    res.status(201).json({ data: notebook });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all
notebookRouter.get('/', async (req, res) => {
  try {
    const allNotebooks = await Notebook.find();
    return res.status(200).json(allNotebooks);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// GET one by name
notebookRouter.get('/:name', async (req, res) => {
  const { name } = req.params;

  try {
    const notebook = await Notebook.findOne({ name });
    if (!notebook) {
      return res.status(404).json({ error: 'Notebook not found' });
    }
    return res.status(200).json({ name, description: notebook.description });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// UPDATE
notebookRouter.put('/:id',validateId, async (req, res) => {
  const { name , description } = req.body;

  try {
    const notebook = await Notebook.findByIdAndUpdate(
      req.params.id  ,
      { name, description },
      { new: true }
    );

    if (!notebook) {
      return res.status(404).json({ error: '"name" not found' });
    }

    return res.status(200).json({ message: 'Notebook updated successfully', data: notebook });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE
notebookRouter.delete('/:name', async (req, res) => {
  const { name } = req.params;
  try {
    const deleted = await Notebook.findOneAndDelete({ name });

    if (!deleted) {
      return res.status(404).json({ error: 'Notebook not found' });
    }

    return res.status(200).json({ message: 'Notebook deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports ={
    notebookRouter,
};

