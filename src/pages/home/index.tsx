import { useEffect, useState } from "react";
import { getFeed } from "../../api/post";
import PostCard from "../../components/post/card";
import InfiniteScroll from "react-infinite-scroll-component";
import type { FeedResponse, IPost } from "../../api/types";
import PostCardSkeleton from "../../components/skeletons/postCard";

const Home = () => {
  const [page, setPage] = useState<number>(1);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchPosts = async () => {
    try {
        const data: FeedResponse = await getFeed(page);

        setPosts((prev) => [...prev, ...data.items]);

        if (data.currentPage >= data.totalPages) {
            setHasMore(false); // No more pages
        } else {
            setPage((prev) => prev + 1);
        }
        } catch (error) {
        console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchPosts}
      hasMore={hasMore}
      loader={<PostCardSkeleton/>}
      endMessage={null}
    >
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </InfiniteScroll>
  );
};

export default Home;
