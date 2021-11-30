import React from "react";
import { useParams } from "react-router-dom";

import PostContainer from "../containers/PostContainer";

function PostPage() {
    const { id } = useParams();
    console.log(id);
    const postId = parseInt(id, 10);

    return <PostContainer postId={postId} />;
}

export default PostPage;
