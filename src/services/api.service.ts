import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../index";
import { LoginUser, RegisterUser, UserInfoData } from "../interfaces";
import { store } from "../stores/store";

axios.defaults.baseURL = "https://otus-go.herokuapp.com/api";
const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = store.commonStore.token;
  if (token) request.headers.Authorization = `Bearer ${token}`;

  return request;
});

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      const { data, status } = error.response!;

      switch (status) {
        case 400:
          toast.error(data.message);
          break;
        case 401:
          toast.error(data.message);
          history.push("/");
          break;
        case 404:
          history.push("/not-found");
          break;
        case 500:
          store.commonStore.setServerError(data);
          break;
        default:
          toast.error("Сервер спит! Просьба не беспокоить!");
      }
    }
    return Promise.reject(error);
  }
);

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
};

const Account = {
  current: () => requests.get("/info"),
  register: (user: RegisterUser) => requests.post("/register", user),
  login: (user: LoginUser) => requests.post("/login", user),
};

const User = {
  getUsers: () => requests.get("/users"),
  makeFriends: (friend: UserInfoData) => requests.post("/make-friends", friend),
  removeFriend: (friendId: number) => requests.del(`/remove-friend/${friendId}`),
  getFriends: () => requests.get("/friends"),
};

const agent = {
  Account,
  User,
};

export default agent;
