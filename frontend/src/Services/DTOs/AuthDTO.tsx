export type LogInDTO = {
  username: string;
  password: string;
}

export type TokenDTO = {
  token: string;
  role: string;
}

export type RegisterDTO = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
}