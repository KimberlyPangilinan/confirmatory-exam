export interface AuthType {
  id: number;
  name: string;
  email: string;
  homeAddress: Address;
  workAddress: Address;
  phone?: string;
  avatar?: string;
  access_token?: string;
}

export interface AuthState {
  user: AuthType;
  access_token?: string;
}

export interface AuthForm {
  email: string;
  password: string;
}
type Address = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
};
