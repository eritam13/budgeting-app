export interface Record {
    id?:string;
    activity: string;
    description: string;
    date: Date;
    time: String;
    currency: string;
    amount: number;
    category: string;
    user: string | undefined;
  }
  
  export interface State {
    records: Record[];
  }