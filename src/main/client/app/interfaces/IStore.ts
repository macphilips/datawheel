export type ClickHistory = {
  counter: number;
  timestamp: number;
};

export type IStore = {
  updateCounter: (counter: number) => void;
  history: ClickHistory[];
  totalCounter: number;
};
