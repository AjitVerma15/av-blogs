import classes from "./hero.module.css";
import Image from "next/image";

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/ajit.jpg"
          alt="Ajit Verma Img"
          width={300}
          height={300}
        />
      </div>
      <h1>Hey, I'm Ajit Verma</h1>
      <p>I blog about frontend developmeny, especially on React.</p>
    </section>
  );
}

export default Hero;
