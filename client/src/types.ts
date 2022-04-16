export type VideoAuthorCount = {
  id: number;
  name: string;
  count: number;
};

export type Video = {
  id: number;
  title: string;
  authorId: number;
  duration: string;
  url: string;
  imgId: number;
};
