import PostHeader from "./post-header";
import classes from "./post-content.module.css";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Image from "next/image";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";

SyntaxHighlighter.registerLanguage("js", js);
SyntaxHighlighter.registerLanguage("css", css);

function PostContent(props) {
  const { post } = props;
  let imagePath = `/images/posts/${post.slug}/${post.image}`;
  if (!post.image) {
    imagePath = `/images/posts/default_post.png`;
  }

  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };
  const customRenderer = {
    p(paragraph) {
      const { node } = paragraph;
      if (node?.children[0].tagName === "img") {
        const image = node.children[0];
        const imagePath = isValidURL(image.properties.src)
          ? image.properties.src
          : `/images/posts/${post.slug}/${image.properties.src}`;

        return (
          <div className={classes.image}>
            <Image
              src={imagePath}
              alt={image.properties.alt}
              width={600}
              height={300}
              layout="responsive"
              loading="lazy"
            />
          </div>
        );
      }
      return <p>{paragraph.children}</p>;
    },
    code(code) {
      const { className, children } = code;
      const language = className?.split("-")[1] || "js"; // className is something like language-js => we need the 'js'
      return (
        <SyntaxHighlighter
          style={atomDark}
          language={language}
          // eslint-disable-next-line
          children={children}
        />
      );
    },
  };
  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={customRenderer}>{post.content}</ReactMarkdown>
    </article>
  );
}

export default PostContent;
