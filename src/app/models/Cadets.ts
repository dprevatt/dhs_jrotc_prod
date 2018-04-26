import { Buyer } from './Buyer';

export interface Cadets {
    id?: String;
    CadetId: String;
    Cadet: String;
    Company: String;
    Sales: {
      Buyer: Buyer,
      TicketNumber: Number,
      SaleComplete: Boolean,
      SaleCompletedDate: Date
    };
 }
