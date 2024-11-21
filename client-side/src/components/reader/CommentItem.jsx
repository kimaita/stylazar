import {Avatar, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import React from "react";

const CommentItem = ({comment}) => {
  return (
    <ListItem disableGutters>
      <ListItemAvatar>
        <Avatar
          image={comment.user.avatar_links?.thumbnail}
          alt={comment.user.name}/>
      </ListItemAvatar>
      <ListItemText
        primary={`${comment.user.name} - ${comment.updatedAt}`}
        secondary={comment.body}
      />
    </ListItem>);
}

export default CommentItem;