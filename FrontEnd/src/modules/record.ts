export interface Record {
    id: number;
    activity: string;
    description: string;
    date: Date;
    currency: string;
    amount: number;
  }
  
  export interface State {
    records: Record[];
  }