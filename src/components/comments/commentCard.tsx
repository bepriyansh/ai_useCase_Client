import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  Paper,
} from "@mui/material";
import type { IComment } from "../../api/types";
import { timeAgo } from "../../utils/timeAgo";

import MoreVertIcon from '@mui/icons-material/MoreVert';

interface CommentCardProps {
  comment: IComment;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  return (
    <Card
      sx={{
        maxWidth: 600,
        margin: 'auto',
        mb: 1,
        border: '1px solid rgba(0,0,0,0.1)',
        borderRadius: '8px',
        boxShadow: 'none',
      }}
    >
      <CardHeader
        avatar={<Avatar src={comment.user.profilePicture} />}
        action={<IconButton><MoreVertIcon /></IconButton>}
        title={comment.user.username}
        subheader={timeAgo(comment.createdAt)}
      />
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
