import React, { useRef, useState } from "react";
import classes from "./auth-modal.module.css";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { showToast } from "../ui/toast";

async function createUser(email, password, name) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password, name }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

export default function AuthModal() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const nameInputRef = useRef();
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);

  async function submitHandler(event) {
    event.preventDefault();
    const notificationId = toast.loading("Processing request...");

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredName = nameInputRef.current.value;

    // optional: Add validation
    setLoading(true);
    if (isLogin) {
      try {
        const result = await signIn("credentials", {
          redirect: false,
          email: enteredEmail,
          password: enteredPassword,
        });
        setLoading(false);
        if (result.ok) {
          showToast(notificationId, "User logged-In successfully!", "success");
          router.replace("/profile");
        } else {
          showToast(notificationId, result.error, "error");
        }
      } catch (error) {
        console.log(error);
        showToast(
          notificationId,
          error.message || "Something went wrong!, Please try again",
          "error"
        );

        setLoading(false);
      }
    } else {
      try {
        const result = await createUser(
          enteredEmail,
          enteredPassword,
          enteredName
        );
        await signIn("credentials", {
          redirect: false,
          email: enteredEmail,
          password: enteredPassword,
        });
        toast.update(notificationId, {
          render: "User created successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          closeButton: true,
        });
        showToast(notificationId, "User created successfully!", "success");
        setLoading(false);
        if (result.ok) {
          router.replace("/profile");
        }
      } catch (error) {
        console.log(error);
        showToast(
          notificationId,
          error.message || "Something went wrong!, Please try again",
          "error"
        );
        setLoading(false);
      }
    }
  }
  return (
    <>
      <a href="#" onClick={() => setModalOpen(true)}>
        {"Login"}
      </a>
      {isModalOpen && (
        <div
          className={`${classes.modal} ${isModalOpen ? classes.modalOpen : ""}`}
          id="modal"
        >
          <div className={classes.modalContent}>
            <a
              href="#"
              className={classes.modalClose}
              title="Close Modal"
              onClick={() => setModalOpen(false)}
            >
              X
            </a>
            <div className={classes.auth}>
              <h1>{isLogin ? "Login" : "Sign Up"}</h1>
              <form onSubmit={submitHandler}>
                {!isLogin && (
                  <div className={classes.control}>
                    <label htmlFor="name">Name *</label>
                    <input type="text" id="name" required ref={nameInputRef} />
                  </div>
                )}
                <div className={classes.control}>
                  <label htmlFor="email">Your Email *</label>
                  <input type="email" id="email" required ref={emailInputRef} />
                </div>
                <div className={classes.control}>
                  <label htmlFor="password">Your Password *</label>
                  <input
                    type="password"
                    id="password"
                    required
                    ref={passwordInputRef}
                  />
                </div>
                <div className={classes.actions}>
                  <button disabled={isLoading}>
                    {isLogin ? "Login" : "Create Account"}
                  </button>
                  <button
                    type="button"
                    className={classes.toggle}
                    onClick={() => setIsLogin((prevState) => !prevState)}
                  >
                    {isLogin
                      ? "Create new account"
                      : "Login with existing account"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
