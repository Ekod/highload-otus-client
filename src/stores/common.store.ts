import { makeAutoObservable, reaction, runInAction } from "mobx";
import { ServerError, UserInfoData } from "../interfaces";
import agent from "../services/api.service";
import { store } from "./store";

export default class CommonStore {
  error: ServerError | null = null;
  usersList: UserInfoData[] = [];
  friendsList: UserInfoData[] = [];
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
    if (this.usersList.length > 0) {
      return this.usersList.filter(
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

  getFriends = async () => {
    try {
      const { friends } = await agent.User.getFriends();
      runInAction(() => {
        this.friendsList = friends;
      });
    } catch (error) {
      throw error;
    }
  };
  isFriend = (id: number) => {
    return (
      this.friendsList &&
      this.friendsList.find((friend) => friend.id === id) !== undefined
    );
  };
}
