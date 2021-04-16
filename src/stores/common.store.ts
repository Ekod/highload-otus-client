import { makeAutoObservable, reaction, runInAction } from "mobx";
import { ServerError, UserInfoData } from "../interfaces";
import agent from "../services/api.service";
import { store } from "./store";

export default class CommonStore {
  error: ServerError | null = null;
  usersList: UserInfoData[] = [];
  token: string | null = localStorage.getItem("jwt");
  appLoaded = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
    reaction(
      () => this.token,
      (token) => {
        if (token) {
          localStorage.setItem("jwt", token);
        } else {
          localStorage.removeItem("jwt");
        }
      }
    );
  }

  setServerError = (error: ServerError) => {
    this.error = error;
  };

  setToken = (token: string | null) => {
    this.token = token;
  };

  setAppLoaded = () => {
    this.appLoaded = true;
  };

  getUsersListApi = async () => {
    try {
      this.setIsLoading(true);
      const { users } = await agent.User.getUsers();
      runInAction(() => {
        this.usersList = users;
      });
    } catch (error) {
      throw error;
    } finally {
      this.setIsLoading(false);
    }
  };

  get users() {
    if (store.commonStore.usersList.length > 0) {
      return store.commonStore.usersList.filter(
        (user) => user.email !== store.userStore.user?.email
      );
    } else {
      return [];
    }
  }

  private setIsLoading = (value: boolean) => {
    this.isLoading = value;
  };

  makeFirends = async (user: UserInfoData) => {
    try {
      await agent.User.makeFriends(user);
    } catch (error) {
      throw error;
    }
  };

  removeFriend = async (friendId: number) => {
    try {
      await agent.User.removeFriend(friendId);
    } catch (error) {
      throw error;
    }
  };
}
