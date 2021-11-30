import React from "react";
import { Link } from "react-router-dom";

function PostList({ posts }) {
    return (
        <div>
            {posts.map((post) => (
                <li key={post.id}>
                    <Link to={`/${post.id}`}>{post.title}</Link>
                </li>
            ))}
        </div>
    );
}

export default PostList;
