import Data from "./Data";

export interface Result {
  count: number;
  next: string | null;
  previous: string | null;
  results: Data[];
}

export default Result;
