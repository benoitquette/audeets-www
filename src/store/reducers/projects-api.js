import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { sortProjects, flattenProjectsData, capitalizeCategories } from './transformers';
import { urlApiProjects } from '~/config';

const projects = createApi({
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
    getRollingWeek: builder.query({
      query: (id) => `${id}/rolling/week`,
      transformResponse: (response) => flattenProjectsData(response, 7, { weekday: 'short' })
    }),
    getRollingMonth: builder.query({
      query: (id) => `${id}/rolling/month`,
      transformResponse: (response) => flattenProjectsData(response, 30, { month: 'short', day: 'numeric' })
    }),
    getRollingYear: builder.query({
      query: (id) => `${id}/rolling/year`,
      transformResponse: (response) => flattenProjectsData(response, 12, { month: 'short' })
    }),
    getAudit: builder.query({
      query: ({ id, date, url }) => `${id}/audits/${date}?url=${encodeURIComponent(url)}`,
      transformResponse: capitalizeCategories
    })
  })
});

export const {
  useGetProjectsQuery,
  useGetProjectQuery,
  useGetRollingWeekQuery,
  useGetRollingMonthQuery,
  useGetRollingYearQuery,
  useAddProjectMutation,
  useDeleteProjectMutation,
  useUpdateProjectMutation,
  useGetAuditQuery
} = projects;

export default projects;
