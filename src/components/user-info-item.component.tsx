import React, { useState } from "react";
import { UserInfoData } from "../interfaces";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../stores";
import { observer } from "mobx-react-lite";

interface Props {
  user: UserInfoData;
}

export default observer(function UserInfoItem({
  user,
  user: { firstName, lastName, city, gender, age, interests, id },
}: Props) {
  const { commonStore, userStore } = useStore();
  const [isLoading, setIsLoading] = useState(false);

  const becomeFriends = async (user: UserInfoData) => {
    setIsLoading(true);
    try {
      await commonStore.makeFirends(user);
      await userStore.getUser();
    } finally {
      setIsLoading(false);
    }
  };

  const removeFriend = async (userId: number) => {
    setIsLoading(true);
    try {
      await commonStore.removeFriend(userId);
      await userStore.getUser();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Segment.Group>
      <Segment>
        {userStore.isFriend(id) ? (
          <Label as="a" color="green" content="Друг" ribbon />
        ) : null}
        <Item.Group>
          <Item>
            <Item.Content>
              <Item.Header>{`${firstName} ${lastName}`}</Item.Header>
              <Item.Meta>{`Пол: ${gender}`}</Item.Meta>
              <Item.Meta>{`Город: ${city}`}</Item.Meta>
              <Item.Meta>{`Возраст: ${age}`}</Item.Meta>
              <Item.Description>
                <div>{`Интересы: ${interests}`}</div>
              </Item.Description>
              <Item.Extra>
                {userStore.isFriend(id) ? (
                  <>
                    <Button
                      floated="right"
                      content="Удалить из Друзей"
                      color="red"
                      loading={isLoading}
                      onClick={() => removeFriend(id)}
                    />
                  </>
                ) : (
                  <Button
                    floated="right"
                    content="Подружиться"
                    color="blue"
                    loading={isLoading}
                    onClick={() => becomeFriends(user)}
                  />
                )}
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Segment.Group>
  );
});
