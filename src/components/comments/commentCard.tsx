import React from 'react';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  CircularProgress,
  Backdrop,
  Box,
  Chip,
  Divider,
} from "@mui/material";
import type { IComment } from "../../api/types";
import { timeAgo } from "../../utils/timeAgo";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { useAuth } from "../../auth/useAuth";
import FormattedText from '../FormattedText';

interface CommentCardProps {
  comment: IComment;
  onDelete?: (commentId: string) => Promise<void>;
  isDeleting?: boolean;
}

const AI_ACCOUNT = {
  username: "AI Assistant",
  profilePicture: "", 
  fallbackIcon: SmartToyIcon,
};

// AI Reply Component as part of the same comment
const AIReply: React.FC<{ aiReply: string }> = ({ aiReply }) => {
  const FallbackIcon = AI_ACCOUNT.fallbackIcon;
  
  return (
    <Box sx={{ mt: 2 }}>
      <Divider sx={{ mb: 2, opacity: 0.3 }} />
      
      <Box sx={{ display: 'flex', gap: 1.5 }}>
        <Avatar 
          src={AI_ACCOUNT.profilePicture}
          sx={{ 
            bgcolor: '#1976d2',
            width: 32,
            height: 32,
          }}
        >
          {!AI_ACCOUNT.profilePicture && <FallbackIcon sx={{ fontSize: 18 }} />}
        </Avatar>
        
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                fontWeight: 600,
                fontSize: '0.875rem',
              }}
            >
              {AI_ACCOUNT.username}
            </Typography>
            <Chip
              label="AI"
              size="small"
              sx={{
                height: 18,
                fontSize: '0.65rem',
                bgcolor: '#e3f2fd',
                color: '#1976d2',
                fontWeight: 600,
                '& .MuiChip-label': {
                  px: 1,
                }
              }}
            />
            <Typography variant="caption" color="text.secondary">
              • AI-generated response
            </Typography>
          </Box>
          
          <Box 
            sx={{
              backgroundColor: '#f8f9fa',
              borderRadius: '12px',
              padding: '12px 16px',
              border: '1px solid #e3f2fd',
              position: 'relative',
            }}
          >
            <FormattedText 
              text={aiReply} 
              color="#333333"
              bgColor="#f8f9fa"
              variant="body2"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

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
        mb: 2,
        border: '1px solid rgba(0,0,0,0.1)',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        position: 'relative',
        opacity: isDeleting ? 0.4 : 1,
        transition: 'opacity 0.3s ease',
        pointerEvents: isDeleting ? 'none' : 'auto',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }
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
            borderRadius: '12px',
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
        avatar={
          <Avatar 
            src={comment.user.profilePicture}
            sx={{ width: 40, height: 40 }}
          />
        }
        action={isOwner && (
          <IconButton onClick={handleMenuClick} disabled={isDeleting}>
            <MoreVertIcon />
          </IconButton>
        )}
        title={
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {comment.user.username}
          </Typography>
        }
        subheader={
          <Typography variant="caption" color="text.secondary">
            {timeAgo(comment.createdAt)}
          </Typography>
        }
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

      <CardContent sx={{ pt: 0 }}>
        <FormattedText 
          text={comment.description} 
          color="text.primary"
        />
        
        {/* AI Reply as part of the same comment */}
        {comment.aiReply && (
          <AIReply aiReply={comment.aiReply} />
        )}
      </CardContent>
    </Card>
  );
};

export default CommentCard;
