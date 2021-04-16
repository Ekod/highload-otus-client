import React from "react";
import { Grid } from "semantic-ui-react";
import UserInfo from "./user-info.component";


export function Dashboard() {
  return (
    <Grid>
      <Grid.Column width="10">
        <UserInfo />
      </Grid.Column>
    </Grid>
  );
}
