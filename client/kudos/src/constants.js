export const SERVER_BASE_URL = 'http://localhost:8000';

export const API_ENDPOINTS = {
  ME: `${SERVER_BASE_URL}/kudos/api/me/`,
  LOGIN: `${SERVER_BASE_URL}/kudos/api/token/`,
  TOKEN_REFRESH: `${SERVER_BASE_URL}/kudos/api/token/refresh/`,

  ORGANIZATIONS: `${SERVER_BASE_URL}/kudos/organizations/`,
  ORGANIZATION_DETAIL: (orgId) => `${SERVER_BASE_URL}/kudos/organizations/${orgId}/`,

  USERS: (orgId) => `${SERVER_BASE_URL}/kudos/organizations/${orgId}/users/`,
  USER_DETAIL: (orgId, userId) => `${SERVER_BASE_URL}/kudos/organizations/${orgId}/users/${userId}/`,

  KUDOS: (orgId) => `${SERVER_BASE_URL}/kudos/organizations/${orgId}/kudos/`,
  KUDOS_DETAIL: (orgId, kudosId) => `${SERVER_BASE_URL}/kudos/organizations/${orgId}/kudos/${kudosId}/`,

  USER_KUDOS_RECEIVED: (orgId, userId) => `${SERVER_BASE_URL}/kudos/organizations/${orgId}/users/${userId}/kudos/`,
  USER_KUDOS_GIVEN: (orgId, userId) => `${SERVER_BASE_URL}/kudos/organizations/${orgId}/users/${userId}/kudos/given/`,

  KUDOS_ASSIGNMENTS: (orgId) => `${SERVER_BASE_URL}/kudos/organizations/${orgId}/kudos-assignments/`,
  KUDOS_ASSIGNMENT_DETAIL: (orgId, assignmentId) => `${SERVER_BASE_URL}/kudos/organizations/${orgId}/kudos-assignments/${assignmentId}/`,
};