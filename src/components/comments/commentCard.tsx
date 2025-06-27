import React from 'react';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  Paper,
  Menu,
  MenuItem,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import type { IComment } from "../../api/types";
import { timeAgo } from "../../utils/timeAgo";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from "../../auth/useAuth";

interface CommentCardProps {
  comment: IComment;
  onDelete?: (commentId: string) => Promise<void>;
  isDeleting?: boolean;
}

const CommentCard: React.FC<CommentCardProps> = ({ 
  comment, 
  onDelete,
  isDeleting = false 
}) => {
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  
  const isOwner = user?.id === comment.user.id;

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    try {
      handleMenuClose();
      
      if (onDelete) {
        await onDelete(comment._id);
      }
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 600,
        margin: 'auto',
        mb: 1,
        border: '1px solid rgba(0,0,0,0.1)',
        borderRadius: '8px',
        boxShadow: 'none',
        position: 'relative',
        opacity: isDeleting ? 0.4 : 1,
        transition: 'opacity 0.3s ease',
        pointerEvents: isDeleting ? 'none' : 'auto'
      }}
    >
      {/* Loading overlay for deletion */}
      {isDeleting && (
        <Backdrop
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          open={isDeleting}
        >
          <CircularProgress 
            size={40} 
            thickness={4}
            sx={{ 
              color: '#1976d2',
              mb: 1
            }} 
          />
          <Typography 
            variant="body2" 
            sx={{ 
              fontWeight: 600,
              color: '#333'
            }}
          >
            Deleting Comment...
          </Typography>
        </Backdrop>
      )}

      <CardHeader
        avatar={<Avatar src={comment.user.profilePicture} />}
        action={isOwner && (
          <IconButton onClick={handleMenuClick} disabled={isDeleting}>
            <MoreVertIcon />
          </IconButton>
        )}
        title={comment.user.username}
        subheader={timeAgo(comment.createdAt)}
      />

      {/* Menu for more options */}
      {isOwner && (
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleDelete} disabled={isDeleting}>
            <DeleteIcon sx={{ mr: 1 }} />
            Delete Comment
          </MenuItem>
        </Menu>
      )}

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {comment.description}
        </Typography>

        {comment.aiReply && (
          <Paper
            variant="outlined"
            sx={{
              p: 1.5,
              mt: 1.5,
              backgroundColor: 'rgba(0,0,0,0.03)',
              borderRadius: '8px',
              borderLeft: '4px solid #1976d2',
            }}
          >
            <Typography
              variant="caption"
              color="primary"
              sx={{ fontWeight: 600 }}
            >
              AI Reply
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {comment.aiReply}
            </Typography>
          </Paper>
        )}
      </CardContent>
    </Card>
  );
};

export default CommentCard;
