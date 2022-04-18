export type AuthorId = number;
export type ImageId = number;
export type VideoId = number;

export type Author = {
  id: AuthorId;
  name: string;
  url: string;
};

export type VideoAuthorCount = {
  id: AuthorId;
  count: number;
  name: string;
};

export type Video = {
  id: VideoId;
  authorId: AuthorId;
  duration: string;
  imgId: ImageId;
  title: string;
  url: string;
};
