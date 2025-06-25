import { useEffect } from "react";
import PostCard from "../../components/post/card";
import InfiniteScroll from "react-infinite-scroll-component";
import PostCardSkeleton from "../../components/skeletons/postCard";
import { usePost } from "../../post/PostContext";

const Home = () => {
  const { posts, fetchPosts, hasMore } = usePost();

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchPosts}
      hasMore={hasMore}
      loader={<PostCardSkeleton />}
      endMessage={null}
    >
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </InfiniteScroll>
  );
};

export default Home;
