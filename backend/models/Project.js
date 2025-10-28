// backend/models/Project.js
const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, trim: true },
  files: { type: Array, default: [] }, // e.g. [{ path: 'index.html', content: '<html>...' }]
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
