import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";
import { useStore } from "../stores";
import LoginForm from "./login.component";
import RegisterForm from "./register.component"

export default observer(function HomePage() {
  const { userStore, modalStore } = useStore();
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          Highload OTUS
        </Header>
        {userStore.isLoggedIn ? (
          <>
            <Header as="h2" inverted content="Добро пожаловать" />
            <Button as={Link} to="/users" size="huge" inverted>
              Поехали
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => modalStore.openModal(<LoginForm />)}
              size="huge"
              inverted
            >
              Войти
            </Button>
            <Button
              onClick={() => modalStore.openModal(<RegisterForm />)}
              size="huge"
              inverted
            >
              Зарегистрироваться
            </Button>
          </>
        )}
      </Container>
    </Segment>
  );
});
