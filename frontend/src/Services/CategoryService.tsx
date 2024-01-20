import axios from "axios";
import {CategoryDTO} from "./DTOs/CategoryDTO";

export const GetAllCategoryService = async () => {
  try {
    return await axios.get<CategoryDTO[]> ('/api/category/getAll', {
      withCredentials: true,
    });
  } catch (error) {
    console.error(error);
  }
}