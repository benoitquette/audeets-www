import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { sortProjects } from './transformers';
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
    })
  })
});

export const { useGetProjectsQuery, useGetProjectQuery, useAddProjectMutation, useDeleteProjectMutation, useUpdateProjectMutation } =
  projects;

export default projects;
