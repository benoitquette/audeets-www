import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { urlApiProjects } from '~/config';
import { capitalize } from '~/utils/string-helpers';

const sortAndCapitalize = (response) => {
  return response.map((item) => ({ ...item, category: capitalize(item.category) })).sort((a, b) => a.category.localeCompare(b.category));
};

const flattenData = (data, length, format) => {
  let res = null;
  if (data) {
    data = sortAndCapitalize(data);
    res = [];
    for (let i = 0; i < length; i++) {
      let day = {
        name: new Date(data[0].data[i].date).toLocaleDateString('en-us', format)
      };
      for (let j = 0; j < data.length; j++) {
        const categoryName = data[j].category;
        day[categoryName] = data[j].data[i].score;
      }
      res.push(day);
    }
  }
  return res;
};

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
      query: (id) => `${id}/scores/latest`,
      transformResponse: sortAndCapitalize
    }),
    getRollingWeek: builder.query({
      query: (id) => `${id}/scores/week`,
      transformResponse: (response) => flattenData(response, 7, { weekday: 'short' })
    }),
    getRollingMonth: builder.query({
      query: (id) => `${id}/scores/month`,
      transformResponse: (response) => flattenData(response, 30, { month: 'short', day: 'numeric' })
    }),
    getRollingYear: builder.query({
      query: (id) => `${id}/scores/year`,
      transformResponse: (response) => flattenData(response, 12, { month: 'short' })
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
