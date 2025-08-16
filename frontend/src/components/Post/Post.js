import React from "react";
import UserCard from "../UserCard";
import PostData from "../PostData";
import PollBox from "../PollBox";

import './Post.css';

const Post = ({user, group, post, pollOptions}) => {
  return (
    <div className='root'>
      <UserCard user={user} group={group} timeLeft="2 hours" />
      <PostData post={post} />
      <PollBox initialOptions={pollOptions} />
    </div>
  )
}

export default Post;
