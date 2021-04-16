import {observer} from 'mobx-react-lite';
import React from 'react';
import {Container, Header} from 'semantic-ui-react';
import {useStore} from '../../stores/store';

export default observer(function ServerError() {
    const {commonStore} = useStore();
    return (
        <Container>
            <Header as='h1' content='Server Error'/>
            <Header sub as='h5' color='red' content={commonStore.error?.message}/>
        </Container>
    )
})