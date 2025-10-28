// backend/routes/projects.js
const express = require('express');
const auth = require('../middleware/auth');
const Project = require('../models/Project');
const router = express.Router();

// create
router.post('/', auth, async (req, res) => {
  const { title, files } = req.body;
  try {
    const project = new Project({ owner: req.user.id, title, files: files || [] });
    await project.save();
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// list current user's projects
router.get('/', auth, async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user.id }).sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// get by id
router.get('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    if (project.owner.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// update
router.put('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    if (project.owner.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    const { title, files } = req.body;
    if (title !== undefined) project.title = title;
    if (files !== undefined) project.files = files;
    await project.save();
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// delete
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    if (project.owner.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    await project.remove();
    res.json({ message: 'Project deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
