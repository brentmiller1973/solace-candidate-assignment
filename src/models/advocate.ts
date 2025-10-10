export interface Advocate {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AdvocateRow {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  yearsOfExperience: number;
  phoneNumber: number;
  createdAt: Date | null;
  updatedAt: Date | null;
  specialty: {
    id: number | null;
    name: string | null;
  } | null;
}
