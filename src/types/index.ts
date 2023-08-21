export interface Post {
  id: any,
  author: string,
  authorName: string,
  content: string,
  mediaCid: string,
  tip: number
}

export interface BCPost {
  id: number;
  contentHash: string;
  mediaCid: string;
  tip: number;
  postedBy: string;
}

export interface BCUser {
  id: number;
  name: string;
  profilePicture: string;
}