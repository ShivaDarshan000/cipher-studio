import React, { useEffect, useRef } from 'react';

export default function Preview({ html = '' }) {
  const iframeRef = useRef();
  useEffect(() => {
    if (!iframeRef.current) return;
    const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow.document;
    doc.open();
    doc.write(html);
    doc.close();
  }, [html]);
  return <iframe ref={iframeRef} title="preview" className="w-full h-[60vh] border rounded" />;
}
