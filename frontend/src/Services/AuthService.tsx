import {LogInDTO, RegisterDTO, TokenDTO} from "./DTOs/AuthDTO";
import axios from "axios";

export const LogIn = async (credentials: LogInDTO) => {
  try {
    return await axios.post<TokenDTO>('/api/auth/authenticate', credentials);
  } catch (error) {
    console.error(error);
  }
}

export const Register = async (credentials: RegisterDTO) => {
  try {
    return await axios.post<TokenDTO>('/api/auth/register', credentials);
  } catch (error) {
    console.error(error);
  }
}

export default LogIn;