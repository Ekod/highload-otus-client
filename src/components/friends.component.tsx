import React, { useEffect } from "react";

import { Header, Item, Segment } from "semantic-ui-react";
import { useStore } from "../stores";
import { observer } from "mobx-react-lite";

export default observer(function FriendsInfo() {
  const { commonStore } = useStore();

  useEffect(() => {
    commonStore.getFriends();
  }, [commonStore]);

  return (
    <>
      <Header content="Друзья" textAlign="center" />
      {commonStore.friendsList?.length! > 0 ? (
        commonStore.friendsList?.map((friend) => {
          return (
            <Segment.Group key={friend?.id}>
              <Segment>
                <Item.Group>
                  <Item>
                    <Item.Content>
                      <Item.Header>{`${friend.firstName} ${friend.lastName}`}</Item.Header>
                      <Item.Meta>{friend.city}</Item.Meta>
                      <Item.Meta>{friend.gender}</Item.Meta>
                      <Item.Meta>{friend.age}</Item.Meta>
                      <Item.Description>
                        <div>{friend.interests}</div>
                      </Item.Description>
                    </Item.Content>
                  </Item>
                </Item.Group>
              </Segment>
            </Segment.Group>
          );
        })
      ) : (
        <Segment placeholder>
          <Header icon>{`У вас друзей нет :(`}</Header>
        </Segment>
      )}
    </>
  );
});
