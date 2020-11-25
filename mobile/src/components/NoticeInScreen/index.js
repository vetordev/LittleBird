import React from 'react';
import { SvgUri } from 'react-native-svg';

import { Container, Content, Message } from './styles';

const NoticeInScreen = ({ img_url, message }) => {
  return (
    <Container>
      <Content>
        <SvgUri uri={img_url} width={130} height={130} />
        <Message>{message}</Message>
      </Content>
    </Container>
  );
}

export default NoticeInScreen;