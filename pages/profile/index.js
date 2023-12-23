import FeaturedPosts from "@/components/home-page/featured-posts";
import Hero from "@/components/home-page/hero";
import { getFeaturedPost } from "@/lib/post-utils";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";

function ProfilePage(props) {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "unauthenticated") {
    router.replace("/");
  }
  return (
    <Fragment>
      <Head>
        <title>{"Profile"}</title>
        <meta
          name="description"
          content="Profile page contains information about user"
        />
      </Head>
      <Hero name={session?.user?.name} email={session?.user?.email} />
      <div className="flex justify-center items-center text-lg font-black">
        {"Work in progress"}
      </div>
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

export default ProfilePage;
