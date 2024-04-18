import HttpService from "./http.service";

class AuthService {
  login = async (payload) => {
    const loginEndpoint = "api/tokens";
    return await HttpService.post(loginEndpoint, payload);
  };

  logout = async (payload) => {
    const logoutEndpoint = "logout";
    return await HttpService.post(logoutEndpoint, payload);
  };

  getProfile = async () => {
    const getProfile = "me?include=Role";
    return await HttpService.get(getProfile);
  };

  updateProfile = async (newInfo) => {
    const updateProfile = "me";
    return await HttpService.patch(updateProfile, newInfo);
  };
}

export default new AuthService();
