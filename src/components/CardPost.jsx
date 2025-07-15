import React from "react";
import { Link } from "react-router-dom";

const CardPost = ({ post }) => {
  return (
    <article className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm">
      <Link to={`/show/${post.id}`}>
        <img className="rounded-t-lg" src={post.photo} alt={post.title} />
      </Link>
      <div className="p-5">
        <Link to={`/show/${post.id}`}>
          <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900">
            {post.title}
          </h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700">
          Criado por: {post.createdBy}
        </p>

        <ul className="flex flex-wrap gap-1">
          {post.tags.map((tag) => (
            <li key={tag} className="text-sm border py-1 px-2 rounded-full">
              #{tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default CardPost;
