import express from 'express';
import Person from '../models/Person.js';

const router = express.Router();

// GET all persons
router.get('/', async (req, res) => {
  try {
    const persons = await Person.find().sort({ createdAt: -1 });
    res.status(200).json(persons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a single person
router.get('/:id', async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE a person
router.post('/', async (req, res) => {
  try {
    const newPerson = new Person(req.body);
    const savedPerson = await newPerson.save();
    res.status(201).json(savedPerson);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE a person
router.put('/:id', async (req, res) => {
  try {
    const updatedPerson = await Person.findByIdAndUpdate(
      req.params.id, 
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedPerson) {
      return res.status(404).json({ message: 'Person not found' });
    }
    
    res.status(200).json(updatedPerson);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a person
router.delete('/:id', async (req, res) => {
  try {
    const deletedPerson = await Person.findByIdAndDelete(req.params.id);
    
    if (!deletedPerson) {
      return res.status(404).json({ message: 'Person not found' });
    }
    
    res.status(200).json({ message: 'Person deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;