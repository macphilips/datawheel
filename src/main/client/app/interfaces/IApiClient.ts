export interface IApiClient {
  getCounter: () => Promise<CounterDTO>;
  updateCount: (counter: CounterDTO) => Promise<CounterDTO>;
}

export type CountLog = {
  count: number;
  timestamp: number;
};

export interface CounterDTO {
  id: number;
  totalCount: number;
  counterHistory: CountLog[];
}
