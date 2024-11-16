export type VenueStatus = 'peak' | 'busy' | 'live';

export interface Venue {
  id: string;
  name: string;
  description: string;
  status: VenueStatus;
  waitTime: number;
  capacity: number;
  skipPrice: number;
  image: string;
}