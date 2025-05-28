import { BaseResponse, SearchHistory } from "@/types/response.types";
import { axiosInstance } from "@/lib/axios";

export async function getUserSearchHistory() : Promise<BaseResponse<SearchHistory[]>> {
  try {
    const response = await axiosInstance.get('/api/search');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching user search history:', error);
    throw error;
  }
}

export async function getRelatedWords(keyword: string) : Promise<BaseResponse<string[]>>{
  try {
    const encodedKeyword = encodeURIComponent(keyword);
    const response = await axiosInstance.get(`/api/search/suggestions?keyword=${encodedKeyword}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching related words:', error);
    throw error;
  }
}

export async function postSearchHistory(keyword: string) : Promise<BaseResponse<string>> {
  try {
    const response = await axiosInstance.post('/api/search', { keyword : keyword });
    return response.data;
  } catch (error) {
    console.error('Error posting search history:', error);
    throw error;
  }
}

export async function deleteSearchHistory(id: number) {
  try {
    const response = await axiosInstance.delete(`/api/search/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting search history:', error);
    throw error;
  }
}