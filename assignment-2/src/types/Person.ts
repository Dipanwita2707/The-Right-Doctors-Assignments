export interface Person {
  _id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  mobile: string;
  createdAt?: string;
  updatedAt?: string;
}

export type PersonFormData = Omit<Person, '_id' | 'createdAt' | 'updatedAt'>;