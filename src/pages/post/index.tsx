import { useParams } from 'react-router-dom';
import PostCard from '../../components/post/card';
import { usePost } from '../../post/PostContext';

const PostPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getPostById } = usePost();

  const post = getPostById(id!);

  if (!post) {
    return <div>Post not found</div>;
  }

  return <PostCard post={post} />;
};

export default PostPage;
