import classes from "./hero.module.css";
import Image from "next/image";

const adminEmail = ["sachin15@gmail.com", "ajit15@gmail.com"];

function Hero({ name, bio, email }) {
  let userImage = "/images/site/default.png";
  if (adminEmail.includes(email)) {
    userImage = "/images/site/ajit.jpg";
  }
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image src={userImage} alt="User" width={300} height={300} />
      </div>
      <h1>{name}</h1>
      <p>{email}</p>
      {bio && <p>{bio}</p>}
    </section>
  );
}

export default Hero;
