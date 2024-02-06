import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { urlApiProjects } from '~/config';

export const projectsApi = createApi({
  tagTypes: ['project'],
  reducerPath: 'projectsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${urlApiProjects}/api/projects/`, credentials: 'include' }),
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => '',
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
  useDeleteProjectMutation,
  useUpdateProjectMutation
} = projectsApi;
