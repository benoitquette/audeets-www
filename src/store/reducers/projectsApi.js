import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { urlApiProjects } from '~/config';
import { sortAndCapitalizeCategories, sortProjects, flattenProjectsData } from './transformers';

export const projectsApi = createApi({
  tagTypes: ['project'],
  reducerPath: 'projectsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${urlApiProjects}/api/projects/`, credentials: 'include' }),
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => '',
      transformResponse: sortProjects,
      providesTags: (result) => (result ? [...result.map((proj) => ({ type: 'project', id: proj._id })), 'project'] : ['project'])
    }),
    getProject: builder.query({
      query: (id) => `${id}`,
      providesTags: (result, error, id) => (result ? [{ type: 'project', id }] : ['project'])
    }),
    addProject: builder.mutation({
      query: (body) => ({
        url: '',
        method: 'POST',
        body
      }),
      invalidatesTags: ['project']
    }),
    updateProject: builder.mutation({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `${id}`,
          method: 'PUT',
          body
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'project', id }]
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, id) => [{ type: 'project', id }]
    }),
    getScores: builder.query({
      query: (id) => `${id}/scores/latest`,
      transformResponse: sortAndCapitalizeCategories
    }),
    getRollingWeek: builder.query({
      query: (id) => `${id}/scores/week`,
      transformResponse: (response) => flattenProjectsData(response, 7, { weekday: 'short' })
    }),
    getRollingMonth: builder.query({
      query: (id) => `${id}/scores/month`,
      transformResponse: (response) => flattenProjectsData(response, 30, { month: 'short', day: 'numeric' })
    }),
    getRollingYear: builder.query({
      query: (id) => `${id}/scores/year`,
      transformResponse: (response) => flattenProjectsData(response, 12, { month: 'short' })
    })
  })
});

export const {
  useGetProjectsQuery,
  useGetProjectQuery,
  useGetScoresQuery,
  useGetRollingWeekQuery,
  useGetRollingMonthQuery,
  useGetRollingYearQuery,
  useAddProjectMutation,
  useDeleteProjectMutation,
  useUpdateProjectMutation
} = projectsApi;
