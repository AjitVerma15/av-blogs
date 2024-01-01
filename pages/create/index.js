import React, { useState } from "react";
import classes from "./create.module.css";
import matter from "gray-matter";
import PostContent from "@/components/posts/post-detail/post-content";

const TextEditor = () => {
  const [editorContent, setEditorContent] = useState("");
  const [post, setPost] = useState({
    title: "UnTitle",
    date: "2022-10-16",
    image: "",
    description: "",
    content: "",
  });

  const handleEditorChange = (event) => {
    const { data, content } = matter(event.target.value);
    setPost({
      title: "Untitle",
      date: "2022-10-16",
      image: "",
      description: "",
      content: content,
      ...data,
    });
    setEditorContent(event.target.value);
  };

  return (
    <div className={classes.text_editor_container}>
      <div className={classes.editor_container}>
        <textarea
          className={classes.preview_textarea}
          value={editorContent}
          onChange={handleEditorChange}
          placeholder="Start typing here..."
        />
      </div>
      <div className={classes.preview_container}>
        <div>
          <strong>Preview:</strong>
        </div>
        <div>
          <PostContent post={post} />
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
