import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// ==============================|| RTK QUERY - PROJECTS ||============================== //

export const projectsApi = createApi({
  tagTypes: ['projects'],
  reducerPath: 'projectsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_URL_API_PROJECTS}/api/projects/`, credentials: 'include' }),
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => '',
      providesTags: ['projects']
    }),
    getProject: builder.query({
      query: (id) => `${id}`,
      providesTags: ['projects']
    }),
    addProject: builder.mutation({
      query: (body) => ({
        url: '',
        method: 'POST',
        body
      }),
      invalidatesTags: ['projects']
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['projects']
    }),
    getScores: builder.query({
      query: (id) => `${id}/latestscore`
    }),
    getRollingWeek: builder.query({
      query: (id) => `${id}/rollingweek`
    }),
    getRollingMonth: builder.query({
      query: (id) => `${id}/rollingmonth`
    })
  })
});

export const {
  useGetProjectsQuery,
  useGetProjectQuery,
  useGetScoresQuery,
  useGetRollingWeekQuery,
  useGetRollingMonthQuery,
  useAddProjectMutation,
  useDeleteProjectMutation
} = projectsApi;
