import { CounterDTO, CountLog } from 'app/interfaces/IApiClient';

export type IStore = {
  setCounter: (counter: CounterDTO) => void;
  updateCount: (counter: number) => void;
  history: CountLog[];
  counterId?: number;
  totalCount: number | null;
};
