export interface Checklist {
  id: number;
  name: string;
  cardId: number;
  checkItems: checkItem[];
}

export interface checkItem {
  id: number;
  state: string;
  name: string;
}
