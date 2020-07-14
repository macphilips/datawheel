import { CounterDTO } from 'app/interfaces/IApiClient';

export type IStore = {
  setCounter: (counter: CounterDTO) => void;
  updateClickCount: (counter: number) => void;
  clickHistory: number[];
  counterId?: number;
  totalClicks: number | null;
};
