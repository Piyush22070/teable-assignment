import type { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { axios } from '../axios';
import { registerRoute } from '../utils';
import { z } from '../zod';

export const CHANGE_EMAIL = '/auth/change-email';

// Updated schema
export const changeEmailRoSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type IChangeEmailRo = z.infer<typeof changeEmailRoSchema>;

export const changeEmailRoute: RouteConfig = registerRoute({
  method: 'patch',
  path: CHANGE_EMAIL,
  description: 'Change email without verification',
  request: {
    body: {
      content: {
        'application/json': {
          schema: changeEmailRoSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Email changed successfully',
    },
  },
  tags: ['auth'],
});

export const changeEmail = async (ro: IChangeEmailRo) => {
  return axios.patch<void>(CHANGE_EMAIL, ro);
};
