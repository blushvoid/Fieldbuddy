export interface IOrder {
  Id: string;
  Name: string;
  Status: string;
  Type: string;
  StartDate: string;
  EndDate: string;
  Color: string;
  Description: string;
  [key: string]: any;
}

export interface IFilter {
  id: string;
  prop: string;
  condition: string;
  value: string | string[];
  active: boolean;
}
