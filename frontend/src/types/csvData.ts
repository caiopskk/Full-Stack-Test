export interface CSVData {
  name: string;
  city: string;
  country: string;
  favorite_sport: string;
}

export interface CardProps {
  data: CSVData;
  'data-testid'?: string;
}
