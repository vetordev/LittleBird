import styled from 'styled-components/native';

export const Container = styled.View`
  width: 80%;
`;

export const InputContainer = styled.View`
  flex-direction: row;
  border: ${props => props.color == 'dark' ? '#000 2px solid' : '#F6F6F6 2px solid' };

  height: 55px;
  border-radius: 4px;
  margin-bottom: 15px;
`;

export const InputIcon = styled.View`
  height: 100%;
  width: 20%;
  justify-content: center;
  align-items: center;
`;

export const TextInput = styled.TextInput`
  color: #000;
  padding: 15px;
  padding-left: 0;
  font-size: 16px;
  flex: 1;
`;