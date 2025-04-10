export interface Board {
  id: string;
  name: string;
}

export interface Status {
  loading: boolean;
  error: string | null;
}

export interface InitialState {
  boards: Board[];
  status: {
    fetch: Status;
    add: Status;
  };
}
