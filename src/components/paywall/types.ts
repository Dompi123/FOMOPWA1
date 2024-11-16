export interface Feature {
  text: string;
  included: boolean;
}

export interface Plan {
  name: string;
  price: number;
  period: string;
  features: Feature[];
  popular?: boolean;
  badge?: string;
}

export interface PlanProps {
  plan: Plan;
  onSelect: () => void;
}