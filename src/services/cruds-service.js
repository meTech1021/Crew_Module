import HttpService from "./http.service";

class CrudService {
  // users requests
  imageUpload = async (formData, id) => {
    const imageUpdate = `uploads/users/${id}/profile-image`;
    return await HttpService.post(imageUpdate, formData);
  };

  getUsers = async () => {
    const usersEndpoint = "crewlist";
    return await HttpService.get(usersEndpoint);
  };

  deleteUser = async (id) => {
    const endpoint = `users/${id}`;
    return await HttpService.delete(endpoint);
  };

  createUser = async (payload) => {
    const endpoint = "users";
    return await HttpService.post(endpoint, payload);
  };

  getUser = async (id) => {
    const endpoint = `users/${id}?include=Role`;
    return await HttpService.get(endpoint);
  };

  getUserWithPermissions = async (id) => {
    const endpoint = `users/${id}`;
    return await HttpService.get(endpoint);
  };

  updateUser = async (payload, id) => {
    const endpoint = `users/${id}`;
    return await HttpService.patch(endpoint, payload);
  };

  // roles requests
  getRoles = async () => {
    const rolesEndpoint = "roles";
    return await HttpService.get(rolesEndpoint);
  };

  deleteRole = async (id) => {
    const endpoint = `roles/${id}`;
    return await HttpService.delete(endpoint);
  };

  createRole = async (payload) => {
    const endpoint = "roles";
    return await HttpService.post(endpoint, payload);
  };

  updateRole = async (payload, id) => {
    const endpoint = `roles/${id}`;
    return await HttpService.patch(endpoint, payload);
  };

  getRole = async (id) => {
    const endpoint = `roles/${id}`;
    return await HttpService.get(endpoint);
  };
  
}

export default new CrudService();
