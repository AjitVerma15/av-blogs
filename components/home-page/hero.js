import classes from "./hero.module.css";
import Image from "next/image";

function Hero({ name, bio }) {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/default.png"
          alt="User"
          width={300}
          height={300}
        />
      </div>
      <h1>{name}</h1>
      {bio && <p>{bio}</p>}
    </section>
  );
}

export default Hero;
