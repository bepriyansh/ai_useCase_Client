import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Avatar,
  IconButton,
  Typography,
  CardActions,
  Box,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PostCarousel from './carousel';
import type { IPost } from '../../api/types';
import { timeAgo } from '../../utils/timeAgo';
import { useNavigate } from 'react-router-dom';
import { usePost } from '../../post/PostContext';

interface PostCardProps {
  post: IPost;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const navigate = useNavigate();
  const { toggleLike } = usePost();

  const handleLike = () => {
    console.log('Liked post', post._id);
    toggleLike(post._id);
  };

  const handleComment = () => {
    console.log('Comment on post', post._id);
    navigate(`/post/${post._id}`);
  };

  const handleShare = () => {
    console.log('Share post', post._id);
  };

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', mb: 1, border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px', boxShadow: "none" }}>
      <CardHeader
        avatar={<Avatar src={post.user.profilePicture} />}
        action={<IconButton><MoreVertIcon /></IconButton>}
        title={post.user.username}
        subheader={timeAgo(post.createdAt)}
      />
      {post.images.length > 0 && (
        <CardMedia>
          <PostCarousel images={post.images} />
        </CardMedia>
      )}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={handleLike} color={post.isLiked ? 'error' : 'default'}>
          {post.isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        <Typography variant="body2">{post.totalLikes}</Typography>
        <IconButton onClick={handleComment}>
          <ChatBubbleOutlineIcon />
        </IconButton>
        <Typography variant="body2">{post.totalComments}</Typography>
        <Box flexGrow={1} />
        <IconButton onClick={handleShare}>
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default PostCard;
