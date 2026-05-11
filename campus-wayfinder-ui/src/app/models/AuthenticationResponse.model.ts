export interface AuthenticationResponse {
  jwt: string;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  phoneNumber?: string;
}
