export type ApiReadState = {
  apiPath: string;
};

export type DataWithId = { id: number };

export type ApiMutateState<D extends DataWithId> = {
  apiPath: string;
  method: string;
  data: D;
};
