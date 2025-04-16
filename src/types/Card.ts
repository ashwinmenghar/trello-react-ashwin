export interface CardData {
  id: string;
  idBoard: string;
  idList: string;
  name: string;
}

export interface CardItem {
  id: number;
  name: string;
}

export interface InitialState {
  cards: ListAndCards[];
}

export interface ListAndCards {
  id: string;
  name: string;
  idBoard: string;
  cardData: CardData[];
}
