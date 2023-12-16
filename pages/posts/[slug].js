import PostContent from "@/components/posts/post-detail/post-content";
import { getPostData, getPostFiles } from "@/lib/post-utils";
import Head from "next/head";
import { Fragment } from "react";

function SinglePostPage(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.post.title}</title>
        <meta name="description" content={props.post.description} />
      </Head>
      <PostContent post={props.post} />
    </Fragment>
  );
}

export function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;
  const postData = getPostData(slug);
  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  };
}

export function getStaticPaths() {
  const postFilesNames = getPostFiles();

  const slugs = postFilesNames.map((fileNames) =>
    fileNames.replace(/\.md$/, "")
  );
  return {
    paths: slugs.map((slug) => ({
      params: {
        slug: slug,
      },
    })),
    fallback: false,
  };
}

export default SinglePostPage;
