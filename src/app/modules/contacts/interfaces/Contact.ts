import { Address } from "./Address";

export interface Contact {
  id: number;
  name: string;
  lastname: string;
  email: string;
  addresses: Address[]
}
