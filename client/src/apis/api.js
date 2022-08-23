import axiosInstance from './axiosInstance';

class ApiInstance {
  constructor() {
    this.axiosInstance = axiosInstance;
  }

  getAllUsers() {
    return this.axiosInstance.get('/api/v1/users');
  }

  signUp(payload) {
    return this.axiosInstance.post('/api/v1/users/signup', payload);
  }

  logout() {
    return this.axiosInstance.get('/api/v1/users/signout');
  }
}

const Api = new ApiInstance();

export default Api;
