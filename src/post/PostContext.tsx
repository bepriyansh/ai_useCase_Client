import { createContext, useContext, useState, type ReactNode } from "react";
import { getFeed, likePost } from "../api/post";
import type { FeedResponse, IPost } from "../api/types";

interface PostContextType {
  posts: IPost[];
  fetchPosts: () => Promise<void>;
  hasMore: boolean;
  toggleLike: (id: string) => Promise<void>;
  getPostById: (id: string) => IPost | undefined;
  likingPosts: Set<string>;  
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [likingPosts, setLikingPosts] = useState<Set<string>>(new Set());

  const mergeUniquePosts = (arr1: IPost[], arr2: IPost[]) => {
    const map = new Map();
    [...arr1, ...arr2].forEach((post) => {
      map.set(post._id, post);
    });
    return Array.from(map.values());
  };

  const fetchPosts = async () => {
    try {
      const data: FeedResponse = await getFeed(page);
      setPosts((prev) => mergeUniquePosts(prev, data.items));

      if (data.currentPage >= data.totalPages) {
        setHasMore(false);
      } else {
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };
    const toggleLike = async (id: string) => {
        const previousPosts = posts;
        setLikingPosts((prev) => new Set(prev).add(id));

        setPosts((prev) =>
            prev.map((post) =>
            post._id === id
                ? {
                    ...post,
                    isLiked: !post.isLiked,
                    totalLikes: post.isLiked
                    ? post.totalLikes - 1
                    : post.totalLikes + 1,
                }
                : post
            )
        );

        try {
            await likePost(id); 
        } catch (error) {
            console.error("Failed to like post:", error);
            setPosts(previousPosts);
        } finally {
            setLikingPosts((prev) => {
            const newSet = new Set(prev);
            newSet.delete(id);
            return newSet;
            });
        }
    };

  const getPostById = (id: string) => posts.find((p) => p._id === id);

  return (
    <PostContext.Provider
      value={{
        posts,
        fetchPosts,
        hasMore,
        toggleLike,
        getPostById,
        likingPosts, 
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePost must be used within a PostProvider");
  }
  return context;
};
