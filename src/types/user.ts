export interface User {
  id: string;
  name: string | null;
  username: string | null;
  email: string;
  bio: string | null;
  image: string | null;
  createdAt: Date;
  isFollowing?: boolean; // Optional property to indicate if the current user is following this user
  _count: {
    posts: number;
    followers: number;
    following: number;
  };
}
