import axios from 'axios';

export const API_URL = 'http://localhost:3333';
export const token = localStorage.getItem('token');

// Onboarding
export const createUserAccount = (user, base64credentials) => axios({
	url: `${API_URL}/users`,
	method: 'post',
	headers: {
		Authorization: `Basic ${base64credentials}`,
	},
	data: user,
});

export const login = (user, base64credentials) => axios({
	url: `${API_URL}/auth/authenticate`,
	method: 'post',
	headers: {
		Authorization: `Basic ${base64credentials}`,
	},
	data: user,
});

export const findUser = id => axios({
	url: `${API_URL}/users/${id}`,
	method: 'get',
	headers: {
		Authorization: `Bearer ${token}`,
	},
});

export const resetPassword = email => axios({
	url: `${API_URL}/auth/recovery`,
	method: 'post',
	headers: {
		'x-osclegal-email': email,
	},
});

export const createNewPassword = (token, newPassword) => axios({
	// Testar ainda
	url: `${API_URL}/auth/recovery`,
	method: 'post',
	headers: {
		Authorization: `Bearer ${token}`,
	},
	data: newPassword,
});

// Onboarding

// Organization
export const createOrganization = org => axios({
	url: `${API_URL}/organizations`,
	method: 'post',
	headers: {
		Authorization: `Bearer ${token}`,
	},
	data: org,
});

export const removeOrg = org => axios({
	url: `${API_URL}/organizations`,
	method: 'patch',
	headers: {
		Authorization: `Bearer ${token}`,
	},
	data: org,
});

export const getAllOrgsByUser = userId => axios({
	url: `${API_URL}/users/${userId}/organizations`,
	method: 'get',
	headers: {
		Authorization: `Bearer ${token}`,
	},
});

export const getAllOrganizations = () => axios({
	url: `${API_URL}/organizations`,
	method: 'get',
	headers: {
		Authorization: `Bearer ${token}`,
	},
});

export const patchOrg = org => axios({
	url: `${API_URL}/organizations`,
	method: 'patch',
	headers: {
		Authorization: `Bearer ${token}`,
	},
	data: org,
});

// Organization

// Document
// export const createDocument = (docs, token) => axios({
// 	url: `${API_URL}/documents`,
// 	method: 'post',
// 	headers: {
// 		Authorization: `Bearer ${token}`,
// 	},
// 	data: docs,
// });

export const createDocument = docs => axios.post(`${API_URL}/documents`, docs, {
	headers: {
		Authorization: `Bearer ${token}`,
		'Content-Type': 'multipart/form-data',
	},
});

export const getAllDocuments = token => axios({
	url: `${API_URL}/documents`,
	method: 'get',
	headers: {
		Authorization: `Bearer ${token}`,
	},
});
// Document

// Template (Document - Admin)
// export const createTemplate = templateData => axios({
// 	url: `${API_URL}/templates`,
// 	method: 'post',
// 	headers: {
// 		Authorization: `Bearer ${token}`,
// 		'Content-Type': 'multipart/form-data',
// 	},
// 	data: templateData,
// });

export const createTemplate = templateData => axios.post(`${API_URL}/templates`, templateData, {
	headers: {
		Authorization: `Bearer ${token}`,
		'Content-Type': 'multipart/form-data',
	},
});

export const getAllTemplates = () => axios({
	url: `${API_URL}/templates`,
	method: 'get',
	headers: {
		Authorization: `Bearer ${token}`,
	},
});

export const deleteTemplate = templateId => axios({
	url: `${API_URL}/templates/${templateId}`,
	method: 'delete',
	headers: {
		Authorization: `Bearer ${token}`,
	},
});

export const downloadTemplate = templateId => axios({
	url: `${API_URL}/templates/${templateId}/download`,
	method: 'get',
	headers: {
		Authorization: `Bearer ${token}`,
	},
});

// Template (Document - Admin)
