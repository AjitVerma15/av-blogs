import Link from "next/link";
import Logo from "./logo";
import classes from "./main-navigation.module.css";
import AuthModal from "../auth/auth-modal";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

function MainNavigation() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const logoutHandler = () => {
    signOut();
  };

  return (
    <header className={classes.header}>
      <Link href="/">
        <Logo />
      </Link>
      <nav>
        <ul>
          <li>
            <Link
              href="/posts"
              className={router.pathname === "/posts" ? "active" : ""}
            >
              Posts
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={router.pathname === "/contact" ? "active" : ""}
            >
              Contact
            </Link>
          </li>
          {status !== "authenticated" ? (
            <li>
              <AuthModal />
            </li>
          ) : (
            <Link
              href="/profile"
              className={router.pathname === "/profile" ? "active" : ""}
            >
              Profile
            </Link>
          )}
          {status === "authenticated" && (
            <li>
              <a onClick={logoutHandler}>Logout</a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
