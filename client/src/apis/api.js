import axiosInstance from './axiosInstance';

class ApiInstance {
  constructor() {
    this.axiosInstance = axiosInstance;
  }

  getAllUsers() {
    return this.axiosInstance.get('/api/v1/users');
  }

  logout() {
    return this.axiosInstance.get('/api/v1/logout');
  }
}

const Api = new ApiInstance();

export default Api;
