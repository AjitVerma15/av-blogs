import FeaturedPosts from "@/components/home-page/featured-posts";
import HeaderSection from "@/components/home-page/header-section";
import { getFeaturedPost } from "@/lib/post-utils";
import Head from "next/head";
import { Fragment } from "react";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>{"DevBlog"}</title>
        <meta
          name="description"
          content="Blogs about the frontend technologies and programming"
        />
      </Head>
      <HeaderSection />
      <FeaturedPosts posts={props.posts} />
    </Fragment>
  );
}

export function getStaticProps() {
  const featuredPosts = getFeaturedPost();

  return {
    props: {
      posts: featuredPosts,
    },
  };
}

export default HomePage;
