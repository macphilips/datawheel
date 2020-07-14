export interface IApiClient {
  getCounter: () => Promise<CounterDTO>;
  updateCount: (counter: CounterDTO) => Promise<CounterDTO>;
}

export interface CounterDTO {
  id: number;
  totalClicks: number;
  clickTimestampHistory: number[];
}
