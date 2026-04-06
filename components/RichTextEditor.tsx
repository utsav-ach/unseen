"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// Import html-to-draftjs
const htmlToDraft = require("html-to-draftjs").default;

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Start typing...",
  minHeight = "200px",
}: RichTextEditorProps) {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Initialize editor with existing value
    if (value) {
      try {
        const contentBlock = htmlToDraft(value);
        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
          setEditorState(EditorState.createWithContent(contentState));
        }
      } catch (error) {
        console.error("Error parsing HTML:", error);
      }
    }
  }, []);

  const handleEditorChange = (state: EditorState) => {
    setEditorState(state);
    const html = draftToHtml(convertToRaw(state.getCurrentContent()));
    onChange(html);
  };

  if (!isMounted) {
    return (
      <div 
        className="w-full bg-gray-50 border border-gray-300 rounded-lg flex items-center justify-center"
        style={{ minHeight }}
      >
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="rich-text-editor-wrapper border border-gray-300 rounded-lg overflow-hidden focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-100 transition-all">
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        placeholder={placeholder}
        editorStyle={{
          minHeight,
          padding: "12px 16px",
          fontSize: "14px",
          lineHeight: "1.75",
          color: "#111827",
        }}
        toolbarStyle={{
          border: "none",
          borderBottom: "1px solid #e5e7eb",
          background: "#f9fafb",
          padding: "8px",
        }}
        toolbar={{
          options: ["inline", "list", "link"],
          inline: {
            options: ["bold", "italic", "underline"],
            bold: { className: "toolbar-btn" },
            italic: { className: "toolbar-btn" },
            underline: { className: "toolbar-btn" },
          },
          list: {
            options: ["unordered", "ordered"],
            unordered: { className: "toolbar-btn" },
            ordered: { className: "toolbar-btn" },
          },
          link: {
            options: ["link"],
            link: { className: "toolbar-btn" },
          },
        }}
      />
    </div>
  );
}
