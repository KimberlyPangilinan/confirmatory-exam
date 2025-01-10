export interface AuthType {
  id: number;
  name: string;
  email: string;
  homeAddress?: string;
  workAddress?: string;
  phone?: string;
  avatar?: string;
  access_token?: string;
}

export interface AuthState {
  user?: AuthType;
  access_token?: string;
}

export interface AuthForm {
  email: string;
  password: string;
}
