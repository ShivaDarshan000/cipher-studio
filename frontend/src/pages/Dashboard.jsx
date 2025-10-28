import React, { useEffect, useState } from 'react';
import { projectsAPI } from '@/lib/api';
import { Link } from 'react-router-dom';

export default function Dashboard(){
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');

  const load = async () => {
    try {
      const res = await projectsAPI.list();
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(()=>{ load(); }, []);

  const create = async () => {
    if (!title) return;
    try {
      const res = await projectsAPI.create({ title, files: [{ path: 'index.html', content: '<!-- start -->' }] });
      setProjects(prev => [res.data, ...prev]);
      setTitle('');
    } catch (err) { console.error(err); }
  };

  const remove = async (id) => {
    if (!confirm('Delete project?')) return;
    try {
      await projectsAPI.remove(id);
      setProjects(prev => prev.filter(p => p._id !== id));
    } catch (err) { console.error(err); }
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input value={title} onChange={e=>setTitle(e.target.value)} className="border px-3 py-2 rounded" placeholder="New project title" />
        <button onClick={create} className="px-4 py-2 bg-blue-600 text-white rounded">Create</button>
      </div>
      <ul className="space-y-2">
        {projects.map(p => (
          <li key={p._id} className="bg-white p-3 rounded shadow flex justify-between items-center">
            <div>
              <Link to={`/editor/${p._id}`} className="text-lg font-medium">{p.title}</Link>
              <div className="text-slate-500 text-sm">{new Date(p.createdAt).toLocaleString()}</div>
            </div>
            <div className="flex gap-2">
              <Link to={`/editor/${p._id}`} className="px-3 py-1 bg-gray-200 rounded">Open</Link>
              <button onClick={()=>remove(p._id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
