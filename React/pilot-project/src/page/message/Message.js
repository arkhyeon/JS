import React from 'react';
import styled from 'styled-components';
import MessageMain from './MessageMain';
import { MessageMenus } from '../../utils/AsideMenu';
import AsideMenuLayout from '../../template/AsideMenuLayout';

function Message() {
    return (
        <Container>
            <AsideMenuLayout menus={MessageMenus}>
                <MessageMain />
            </AsideMenuLayout>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    display: flex;
`;

export default Message;
