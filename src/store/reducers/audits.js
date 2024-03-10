import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';
import { sortAndCapitalizeCategories } from './transformers';
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
    )
  })
});

export const { fetchScores } = audits.actions;

export default audits;
