import Layout from "@/components/layout/layout";
import NotificationToast from "@/components/ui/notification-toast";
import "@/styles/globals.css";
import { getServerSession } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { authOptions } from "./api/auth/[...nextauth]";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider>
      <Layout>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scala=1" />
        </Head>
        <Component {...pageProps} />
        <NotificationToast />
      </Layout>
    </SessionProvider>
  );
}

export async function getServerSideProps({ req, res }) {
  return {
    props: {
      session: await getServerSession(req, res, authOptions),
    },
  };
}
