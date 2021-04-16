import { observer } from "mobx-react-lite";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Container, Menu, Image, Dropdown } from "semantic-ui-react";
import { useStore } from "../stores";

export default observer(function NavBar() {
  const { userStore } = useStore();
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} exact to="/" header>
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: 10 }} />
          Highload OTUS
        </Menu.Item>
        {userStore.isLoggedIn && (
          <Menu.Item as={NavLink} exact to="/users" header>
            Позьзователи
          </Menu.Item>
        )}
        <Menu.Item position="right">
          <Image src="/assets/user.png" avatar spaced="right" />
          <Dropdown pointing="top left" text={userStore.user?.firstName}>
            <Dropdown.Menu>
              <Dropdown.Item
                as={Link}
                to={`/profile`}
                text="Мой Профиль"
                icon="user"
              />
              <Dropdown.Item
                onClick={userStore.logout}
                text="Выйти"
                icon="sign-out"
              />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Container>
    </Menu>
  );
});
