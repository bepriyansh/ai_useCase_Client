import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import type { IComment } from "../../api/types";
import CommentCard from "./commentCard";
import { getComments } from "../../api/post";
import CommentSkeleton from "../skeletons/commentCard";

interface CommentSectionProps {
  postId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const mergeUniquePosts = (arr1: IComment[], arr2: IComment[]) => {
    const map = new Map();
    [...arr1, ...arr2].forEach((post) => {
      map.set(post._id, post);
    });
    return Array.from(map.values());
  };

  const fetchComments = async () => {
    try {
      const data = await getComments(postId, page);

      setComments((prev) => mergeUniquePosts(prev, data.items));

      if (data.currentPage >= data.totalPages) {
        setHasMore(false);
      } else {
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };

  useEffect(() => {
    // Reset when postId changes
    setComments([]);
    setPage(1);
    setHasMore(true);
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  return (
    <Box>
      <InfiniteScroll
        dataLength={comments.length}
        next={fetchComments}
        hasMore={hasMore}
        loader={<CommentSkeleton />} 
        endMessage={
          comments.length > 0 ? (
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
              mt={1}
            >
              No more comments.
            </Typography>
          ) : (
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
              mt={1}
            >
              No comments yet. Be the first to comment.
            </Typography>
          )
        }
      >
        {comments.map((comment) => (
          <CommentCard key={comment._id} comment={comment} />
        ))}
      </InfiniteScroll>
    </Box>
  );
};

export default CommentSection;
