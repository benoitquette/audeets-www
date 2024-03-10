import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';
import { sortAndCapitalizeCategories, capitalizeCategories, flattenProjectsData } from './transformers';
import client from '~/utils/api-client';
import { urlApiProjects } from '~/config';

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator }
});

const audits = createAppSlice({
  name: 'audits',
  initialState: {
    scores: { status: 'idle', error: null, data: [] },
    rolling: {
      week: { status: 'idle', error: null, data: [] },
      month: { status: 'idle', error: null, data: [] },
      year: { status: 'idle', error: null, data: [] }
    },
    audit: { status: 'idle', error: null, data: [] }
  },
  reducers: (create) => ({
    fetchScores: create.asyncThunk(
      async ({ id, url, date }) => {
        if (date) {
          return await client.get(`${urlApiProjects}/api/projects/${id}/scores/${date}?url=${encodeURIComponent(url)}`, {
            credentials: 'include'
          });
        } else {
          return await client.get(`${urlApiProjects}/api/projects/${id}/scores/latest?url=${encodeURIComponent(url)}`, {
            credentials: 'include'
          });
        }
      },
      {
        pending: ({ scores }) => {
          scores.status = 'loading';
        },
        rejected: ({ scores }, action) => {
          if (scores.status === 'loading') {
            scores.status = 'failed';
            scores.error = action.payload;
          }
        },
        fulfilled: ({ scores }, action) => {
          if (scores.status === 'loading') {
            scores.status = 'succeeded';
            scores.data = sortAndCapitalizeCategories(action.payload);
          }
        }
      }
    ),
    fetchAudit: create.asyncThunk(
      async ({ id, url, date }) => {
        return await client.get(`${urlApiProjects}/api/projects/${id}/audits/${date}?url=${encodeURIComponent(url)}`, {
          credentials: 'include'
        });
      },
      {
        pending: ({ audit }) => {
          audit.status = 'loading';
        },
        rejected: ({ audit }, action) => {
          if (audit.status === 'loading') {
            audit.status = 'failed';
            audit.error = action.payload;
          }
        },
        fulfilled: ({ audit }, action) => {
          if (audit.status === 'loading') {
            audit.status = 'succeeded';
            audit.data = capitalizeCategories(action.payload);
          }
        }
      }
    ),
    fetchRollingWeek: create.asyncThunk(
      async (id) => {
        return await client.get(`${urlApiProjects}/api/projects/${id}/rolling/week`, {
          credentials: 'include'
        });
      },
      {
        pending: ({ rolling }) => {
          rolling.week.status = 'loading';
        },
        rejected: ({ rolling }, action) => {
          if (rolling.week.status === 'loading') {
            rolling.week.status = 'failed';
            rolling.week.error = action.payload;
          }
        },
        fulfilled: ({ rolling }, action) => {
          if (rolling.week.status === 'loading') {
            rolling.week.status = 'succeeded';
            rolling.week.data = flattenProjectsData(action.payload, 7, { weekday: 'short' });
          }
        }
      }
    ),
    fetchRollingMonth: create.asyncThunk(
      async (id) => {
        return await client.get(`${urlApiProjects}/api/projects/${id}/rolling/month`, {
          credentials: 'include'
        });
      },
      {
        pending: ({ rolling }) => {
          rolling.month.status = 'loading';
        },
        rejected: ({ rolling }, action) => {
          if (rolling.month.status === 'loading') {
            rolling.month.status = 'failed';
            rolling.month.error = action.payload;
          }
        },
        fulfilled: ({ rolling }, action) => {
          if (rolling.month.status === 'loading') {
            rolling.month.status = 'succeeded';
            rolling.month.data = flattenProjectsData(action.payload, 30, { month: 'short', day: 'numeric' });
          }
        }
      }
    ),
    fetchRollingYear: create.asyncThunk(
      async (id) => {
        return await client.get(`${urlApiProjects}/api/projects/${id}/rolling/year`, {
          credentials: 'include'
        });
      },
      {
        pending: ({ rolling }) => {
          rolling.year.status = 'loading';
        },
        rejected: ({ rolling }, action) => {
          if (rolling.year.status === 'loading') {
            rolling.year.status = 'failed';
            rolling.year.error = action.payload;
          }
        },
        fulfilled: ({ rolling }, action) => {
          if (rolling.year.status === 'loading') {
            rolling.year.status = 'succeeded';
            rolling.year.data = flattenProjectsData(action.payload, 12, { month: 'short' });
          }
        }
      }
    )
  })
});

export const { fetchScores, fetchAudit, fetchRollingWeek, fetchRollingMonth, fetchRollingYear } = audits.actions;

export default audits;
