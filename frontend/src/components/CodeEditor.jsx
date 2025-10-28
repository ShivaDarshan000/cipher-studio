import React from 'react';

export default function CodeEditor({ content, onChange }) {
  return (
    <textarea
      value={content}
      onChange={e => onChange(e.target.value)}
      className="w-full h-[60vh] border rounded p-2 font-mono text-sm"
    />
  );
}
