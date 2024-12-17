const express = require('express');
const router = express.Router();

// array to store tasks where id starts at 1
let tasks = []; 
let id = 1; 


router.get('/', (req, res) => {
    res.json(tasks);
});

router.get('/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
});


router.post('/', (req, res) => {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });

    const newTask = { id: id++, title, description: description || '', completed: false };
    tasks.push(newTask);
    res.status(201).json(newTask);
});


router.put('/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ error: 'Task not found' });

    const { title, description, completed } = req.body;
    if (title) task.title = title;
    if (description) task.description = description;
    if (typeof completed === 'boolean') task.completed = completed;

    res.json(task);
});


router.delete('/:id', (req, res) => {
    tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
    res.status(204).send();
});

module.exports = router;
