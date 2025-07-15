import React from "react";
import { Link } from 'react-router-dom';

const CardPost = ({ post }) => {
  return (
    <article className="flex flex-col justify-between border rounded p-1">
      <div className="flex flex-col">
        <Link to={`/show/${post.id}`}>
        <img
          src={post.photo}
          alt={post.title}
          className="w-full h-52 rounded"
        />
        </Link>
        <small className="mt-2">Criado por: {post.createdBy}</small>
        <h2 className="text-2xl mb-1 font-semibold">{post.title}</h2>
        <ul className="flex flex-wrap gap-1">
          {post.tags.map((tag) => (
            <li key={tag} className="text-sm border py-1 px-2 rounded-full"> #{tag}</li>
          ))}
        </ul>
      </div>

    </article>
  );
};

export default CardPost;
