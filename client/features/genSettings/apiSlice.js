import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: '/corsproxy'}),
    endpoints: (builder) => ({
      getDirection: builder.query({
        query: ({ origin, destination, waypointStr }) => {
            const url = `/corsproxy/directions?url=https://maps.googleapis.com/maps/api/directions/json&key=${process.env.GOOGLE_API_KEY}&destination=${destination.replace(' ', '+')}&origin=${origin.replace(' ', '+')}${waypointStr}`;
            return url;
      },
    }),
  }),      
});

export const { useGetDirectionQuery } = api;
export default api;