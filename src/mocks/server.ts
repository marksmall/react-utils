/* eslint-disable @typescript-eslint/ban-ts-comment */
import { setupServer } from 'msw/node';

// @ts-ignore
import handlers from './handlers';

// @ts-ignore
export const server = setupServer(...handlers);
