export type AuthorId = number;
export type ImageId = number;
export type VideoId = number;

export type VideoAuthorCount = {
  id: AuthorId;
  count: number;
  name: string;
};

export type ImageKind = {
  id: ImageId;
  alt?: string;
  src: string;
};

export type AuthorKind = {
  id: AuthorId;
  name: string;
  url: string;
};

export type VideoKind = {
  id: VideoId;
  authorId: AuthorId;
  duration: string;
  imgId: ImageId;
  title: string;
  url: string;
};
