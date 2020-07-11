export interface IApiClient {
  getCounter: () => Promise<number>
  updateCount: (counter: number) => Promise<void>
}

export interface GetCounterResponse {
  totalCount: number
}
