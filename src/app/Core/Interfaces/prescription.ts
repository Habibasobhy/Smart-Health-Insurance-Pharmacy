export interface Prescription {
    message: string;
    data: Data;
}

interface Data {
  Items: Item[];
  User:  User;
}

export interface Item {
  id : number
  Medicine: Medicine;
  medicineId: number;
}

interface Medicine {
  id: number;
  name: string;
  description: string;
  min_age: number;
  max_age: number;
  quantity: number;
  row: number;
  column: number;
  treatment_dose: string;
  image_cover : string;
}

interface User {
  first_name: string;
  last_name : string;
}

