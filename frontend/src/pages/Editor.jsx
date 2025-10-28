import React, { useEffect, useState } from 'react';
import { projectsAPI } from '@/lib/api';
import { useParams } from 'react-router-dom';
import FileExplorer from '@/components/FileExplorer';
import CodeEditor from '@/components/CodeEditor';
import Preview from '@/components/Preview';

export default function Editor(){
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [activeFile, setActiveFile] = useState(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const res = await projectsAPI.get(id);
      setProject(res.data);
      setActiveFile(res.data.files?.[0] || null);
    })();
  }, [id]);

  const save = async () => {
    try {
      await projectsAPI.update(id, { files: project.files });
      alert('Saved ✅');
    } catch (err) {
      console.error(err);
      alert('Save failed');
    }
  };

  const updateFileContent = (content) => {
    setProject(prev => {
      const files = prev.files.map(f => f.path === activeFile.path ? { ...f, content } : f);
      return { ...prev, files };
    });
    setActiveFile(prev => ({ ...prev, content }));
  };

  if (!project) return <div>Loading project...</div>;

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-1 bg-white p-3 rounded shadow">
        <FileExplorer files={project.files} onSelect={(f)=>setActiveFile(f)} />
      </div>
      <div className="col-span-2 bg-white p-3 rounded shadow">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">{project.title}</h3>
          <div>
            <button onClick={save} className="px-3 py-1 bg-green-600 text-white rounded">Save</button>
          </div>
        </div>
        <CodeEditor content={activeFile?.content || ''} onChange={updateFileContent} />
      </div>
      <div className="col-span-1 bg-white p-3 rounded shadow">
        <h4 className="font-medium mb-2">Preview</h4>
        <Preview html={project.files.find(f=>f.path.includes('.html'))?.content || ''} />
      </div>
    </div>
  );
}
