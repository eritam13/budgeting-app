export interface Record {
    id?:string;
    activity: string;
    description: string;
    date: Date;
    currency: string;
    amount: number;
    category: string;
  }
  
  export interface State {
    records: Record[];
  }