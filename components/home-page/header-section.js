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
        <a href="/posts">Start Reading</a>
      </div>
    </section>
  );
}

export default HeaderSection;
