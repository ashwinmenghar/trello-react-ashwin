export interface Card {
  id: number;
  name: string;
  listId: number;
  cardData: CardItem[];
}

export interface CardItem {
  id: number;
  name: string;
}
