import React, { Fragment, useEffect } from "react";
import { Container } from "semantic-ui-react";
import { Route, Switch } from "react-router";
import { ToastContainer } from "react-toastify";
import { observer } from "mobx-react-lite";

import { NotFound } from "./components/fallback/not-found";
import { Dashboard } from "./components/dashboard.component";
import { useStore } from "./stores";
import NavBar from "./components/navbar.component";
import HomePage from "./components/home.component";
import ServerError from "./components/fallback/server-error";
import LoadingComponent from "./components/loading.component";
import ModalContainer from "./components/modals/modal-container.component";
import UserProfile from "./components/profile.component"

import "./styles.css";

export default observer(function App() {
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  if(!commonStore.appLoaded) return <LoadingComponent content="Загружаю приложение..."/>

  return (
    <Fragment>
      <ToastContainer position="bottom-right" hideProgressBar />
      <ModalContainer />
      <Route path="/" exact component={HomePage} />
      <Route
        path="/(.+)"
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route path="/users" exact component={Dashboard} />
                <Route path="/profile" exact component={UserProfile} />
                <Route path="/server-error" exact component={ServerError} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </>
        )}
      />
    </Fragment>
  );
});
