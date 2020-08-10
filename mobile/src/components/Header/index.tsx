import React from 'react';

import { Container, Title } from './styles';
import HeaderBtnBack from '../HeaderBtnBack';

interface HeaderProps {
   title?: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
     <Container>
        <HeaderBtnBack />
        <Title>{title}</Title>
     </Container>
  );
}

export default Header;