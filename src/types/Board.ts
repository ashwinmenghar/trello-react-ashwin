export interface Board {
  id: string;
  name: string;
}

export interface Status {
  loading: boolean;
  error: { message: string } | null;
}

export interface InitialState {
  boards: Board[];
  status: {
    fetch: Status;
    add: Status;
  };
}

export interface List {
  id: string;
  name: string;
  idBoard: string;
}
