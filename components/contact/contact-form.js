import { useState } from "react";
import classes from "./contact-form.module.css";
import { toast } from "react-toastify";
import { showToast } from "../ui/toast";

async function sendContactData(contactDetails) {
  const response = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(contactDetails),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
}

function ContactForm() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredMessage, setEnteredMessage] = useState("");
  const [requestStatus, setRequestStatus] = useState(); // 'pending', 'success', 'error'
  const [requestError, setRequestError] = useState();

  async function sendMessageHandler(event) {
    event.preventDefault();

    setRequestStatus("pending");
    const notificationId = toast.loading("Your message is on its way!");

    try {
      await sendContactData({
        email: enteredEmail,
        name: enteredName,
        message: enteredMessage,
      });
      setRequestStatus("success");
      setEnteredMessage("");
      setEnteredEmail("");
      setEnteredName("");
      showToast(notificationId, "Message sent successfully!", "success");
    } catch (error) {
      setRequestError(error.message);
      setRequestStatus("error");
      showToast(
        notificationId,
        "Something went wrong, Please try again",
        "error"
      );
    }
  }

  return (
    <section className={classes.contact}>
      <h1>Hey! I'm Ajit Verma</h1>
      <h2>How can I help you?</h2>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              required
              value={enteredEmail}
              onChange={(event) => setEnteredEmail(event.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              required
              value={enteredName}
              onChange={(event) => setEnteredName(event.target.value)}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            rows="5"
            required
            value={enteredMessage}
            onChange={(event) => setEnteredMessage(event.target.value)}
          ></textarea>
        </div>

        <div className={classes.actions}>
          <button disabled={requestStatus == "pending"}>Send Message</button>
        </div>
      </form>
      {/* Removed the custom notification logic as of now*/}
      {/* {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )} */}
    </section>
  );
}

export default ContactForm;
