export interface TicketOption {
  type: 'lineskip' | 'cover';
  title: string;
  venue: string;
  price: number;
  description: string;
  expires: string;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'apple' | 'google';
  label: string;
  icon: any; // LucideIcon type
}