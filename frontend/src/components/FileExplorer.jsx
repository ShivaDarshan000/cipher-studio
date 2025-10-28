import React from 'react';

export default function FileExplorer({ files = [], onSelect }) {
  return (
    <div>
      <h4 className="font-medium mb-2">Files</h4>
      <ul className="space-y-1 text-sm">
        {files.map((f, i) => (
          <li key={i}>
            <button className="text-left w-full" onClick={()=>onSelect?.(f)}>{f.path}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
