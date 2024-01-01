import Link from "next/link";
import classes from "./post-item.module.css";
import Image from "next/image";

function PostItem(props) {
  console.log(props);
  const { title, image, description, date, slug } = props.post;

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  let imagePath = `/images/posts/${slug}/${image}`;

  if (!image) {
    imagePath = `/images/posts/default_post.png`;
  }

  return (
    <li className={classes.post}>
      <div className={classes.post_content}>
        <Link href={`/posts/${slug}`}>
          <div className={classes.image}>
            <Image
              src={imagePath}
              alt={title}
              width={300}
              height={200}
              layout="responsive"
              loading="lazy"
            />
          </div>
          <div className={classes.content}>
            <h3>{title}</h3>
            <time>{formattedDate}</time>
            <p>{description}</p>
          </div>
        </Link>
      </div>
    </li>
  );
}

export default PostItem;
