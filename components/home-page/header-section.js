import Link from "next/link";
import classes from "./header-section.module.css";

function HeaderSection() {
  return (
    <section className={classes.headerSection}>
      <div>
        <h3>{"Stay curious."}</h3>
        <p>
          {
            "Discover stories, thinking, and expertise from writers on any topic."
          }
        </p>
        <Link href="/posts">Start Reading</Link>
      </div>
    </section>
  );
}

export default HeaderSection;
