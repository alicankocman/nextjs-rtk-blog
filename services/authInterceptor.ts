import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: 'https://api.example.com/v1',
  prepareHeaders: (headers, { getState }) => {
    // Redux state'ten token'ı al
    const token = (getState() as RootState).auth.token;
    
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    
    return headers;
  },
});

// Token yenileme mantığı
export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQueryWithAuth(args, api, extraOptions);
  
  if (result.error && result.error.status === 401) {
    // Token yenileme işlemi
    const refreshResult = await baseQueryWithAuth(
      '/refresh-token',
      api,
      extraOptions
    );
    
    if (refreshResult.data) {
      // Token yenilendi, orijinal isteği tekrarla
      result = await baseQueryWithAuth(args, api, extraOptions);
    }
  }
  
  return result;
}; 