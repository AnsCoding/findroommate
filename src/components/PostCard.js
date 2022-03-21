import { useNavigate } from "react-router-dom";
import UserAvatar from "./UserAvatar";

export default function PostCard({ post }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`posts/${post.id}`);
  }

  return (
    <article className="imagecir" onClick={handleClick}>
      <UserAvatar uid={post.uid} />
      <img src={post.image} alt={post.title} />

      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </article>
  );
}
