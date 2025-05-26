import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getUserSearchHistory,
  getRelatedWords,
  postSearchHistory,
  deleteSearchHistory,
} from '@/lib/api/searchboxApi'
import { SearchHistory } from '@/types/response.types'

// 2) localStorage 읽기/쓰기 함수
function readLocalHistory(): SearchHistory[] {
  return JSON.parse(localStorage.getItem('searchHistory') || '[]');
}

function writeLocalHistory(history: SearchHistory[]) {
  localStorage.setItem('searchHistory', JSON.stringify(history));
}

function resetLocalHistory() {
  localStorage.removeItem('searchHistory');
}

export function useSearchHistory(isLogin: boolean) {
  return useQuery<SearchHistory[]>({
    queryKey: ['searchHistory', isLogin],
    queryFn: async () => {
      if (isLogin) {
        resetLocalHistory();
        const response = await getUserSearchHistory();
        return response.data;
      } else {
        return readLocalHistory();
      }
    },
    staleTime: 0,
  });
}

export function useRelatedWords(keyword: string) {
  return useQuery({
    queryKey: ['relatedWords', keyword],
    queryFn: () => getRelatedWords(keyword),
    enabled: keyword.length > 0,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  })
}

export function useAddSearchHistory(isLogin: boolean) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (keyword: string) => {
      if (isLogin) {
        return postSearchHistory(keyword);
      } else {
        const localHistory = readLocalHistory();
        const nextId = localHistory[0] ? localHistory[0].id + 1 : 1;
        const nextHistory = [
          { id: nextId, keyword, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
          ...localHistory.filter(item => item.keyword !== keyword)
        ];
        writeLocalHistory(nextHistory);
        return { data: nextHistory };
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['searchHistory'] });
    }
  });
}

export function useDeleteSearchHistory(isLogin: boolean) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: number) => {
      if (isLogin) {
        return deleteSearchHistory(id);
      } else {
        const localHistory = readLocalHistory();
        const nextHistory = localHistory.filter(h => h.id !== id);
        writeLocalHistory(nextHistory);
        return { data: nextHistory };
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['searchHistory'] });
    }
  });
}