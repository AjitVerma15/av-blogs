import Link from "next/link";
import Logo from "./logo";
import classes from "./main-navbar.module.css";
import AuthModal from "../auth/auth-modal";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const MainNavbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (showNavbar) {
      setShowNavbar(!showNavbar);
    }
  }, [router.asPath]);

  const logoutHandler = () => {
    signOut();
  };
  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <header className={classes.navbar}>
      <div className={classes.logo}>
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <nav>
        <div className={classes.menuIcon} onClick={handleShowNavbar}>
          <Hamburger />
        </div>
        <div
          className={`${classes.navElements}  ${showNavbar && classes.active}`}
        >
          <ul>
            <li>
              <Link
                className={router.pathname == "/posts" ? classes.active : ""}
                href="/posts"
              >
                {"Posts"}
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={router.pathname == "/contact" ? classes.active : ""}
              >
                {"Contact"}
              </Link>
            </li>
            <li>
              {status !== "authenticated" ? (
                <AuthModal />
              ) : (
                <Link
                  className={
                    router.pathname == "/profile" ? classes.active : ""
                  }
                  href="/profile"
                >
                  {"Profile"}
                </Link>
              )}
            </li>
            {status === "authenticated" && (
              <li>
                <a onClick={logoutHandler}>{"Logout"}</a>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

const Hamburger = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="52"
    height="24"
    viewBox="0 0 52 24"
  >
    <g id="Group_9" data-name="Group 9" transform="translate(-294 -47)">
      <rect
        id="Rectangle_3"
        data-name="Rectangle 3"
        width="42"
        height="4"
        rx="2"
        transform="translate(304 47)"
        fill="#87848B"
      />
      <rect
        id="Rectangle_5"
        data-name="Rectangle 5"
        width="42"
        height="4"
        rx="2"
        transform="translate(304 67)"
        fill="#87848B"
      />
      <rect
        id="Rectangle_4"
        data-name="Rectangle 4"
        width="52"
        height="4"
        rx="2"
        transform="translate(294 57)"
        fill="#87848B"
      />
    </g>
  </svg>
);

export default MainNavbar;
