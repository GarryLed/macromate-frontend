export interface IWaterIntake {
    _id?: string;          
    date: string;          
    amount: number;        
  }
  
  export class WaterIntake implements IWaterIntake {
    _id?: string;
    date: string;
    amount: number;
  
    constructor(date: string, amount: number) {
      this.date = date;
      this.amount = amount;
    }
  }
  