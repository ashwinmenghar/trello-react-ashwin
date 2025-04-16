export interface Checklist {
  id: string;
  name: string;
  cardId: string;
  checkItems: CheckItem[];
}

export interface CheckItem {
  id: string;
  state: string;
  name: string;
  idChecklist: string;
}

export interface InitialState {
  checklists: Checklist[];
}
