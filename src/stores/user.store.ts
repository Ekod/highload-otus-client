import { makeAutoObservable, runInAction } from "mobx";
import { history } from "..";
import { LoginUser, RegisterUser, User } from "../interfaces";
import agent from "../services/api.service";
import { store } from "./store";

export class UserStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  login = async (creds: LoginUser) => {
    try {
      const { user } = await agent.Account.login(creds);
      store.commonStore.setToken(user.token);
      runInAction(() => (this.user = user));
      history.push("/users");
      store.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  };

  logout = () => {
    store.commonStore.setToken(null);
    localStorage.removeItem("jwt");
    this.user = null;
    history.push("/");
  };

  getUser = async () => {
    try {
      const { user } = await agent.Account.current();
      runInAction(() => (this.user = user));
    } catch (error) {
      console.log(error);
    }
  };

  register = async (creds: RegisterUser) => {
    try {
      const { user } = await agent.Account.register(creds);
      store.commonStore.setToken(user.token);
      runInAction(() => (this.user = user));
      history.push("/users");
      store.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  };

  isFriend = (id: number) => {
    return this.user?.friends?.find((friend) => friend.id === id) !== undefined;
  };
}
