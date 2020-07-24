import styled from 'styled-components/native';

export const Container = styled.View`
  width: 80%;
  margin-bottom: 15px;
`;

export const Legend = styled.Text`
  font-family: Ubuntu_700Bold;
  font-size: 16px;
  color: ${props => props.color};
  margin-bottom: 6px;
`;

export const InputContainer = styled.View`
  flex-direction: row;
  border: ${props => props.color == 'dark' ? '#000 2px solid' : '#F6F6F6 2px solid' };
  height: 55px;
  border-radius: 8px;
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

export const Description = styled.Text`
  font-family: Nunito_400Regular;
  font-size: 12px;
  color: ${props => props.color};
`;