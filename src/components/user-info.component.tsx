import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import { useStore } from "../stores";
import LoadingComponent from "./loading.component";
import UserInfoItem from "./user-info-item.component";

export default observer(function UserInfo() {
  const { commonStore } = useStore();
  useEffect(() => {
    commonStore.getUsersListApi();
  }, [commonStore]);

  if (commonStore.isLoading) {
    return <LoadingComponent content="Загружаю пользователей" />;
  }

  return (
    <>
      {commonStore.users.length > 0 ? (
        commonStore.users.map((user) => {
          return <UserInfoItem user={user} key={user.email} />;
        })
      ) : (
        <Segment placeholder>
          <Header icon>
            <Icon name="search" />
            Пользователей не нашёл
          </Header>
          <Segment.Inline>
            <Button as={Link} to="/" primary>
              На Главную
            </Button>
          </Segment.Inline>
        </Segment>
      )}
    </>
  );
});
