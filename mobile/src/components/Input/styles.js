import styled from 'styled-components/native';

export const Container = styled.View`
  width: 80%;
  margin-bottom: 15px;
`;

export const Legend = styled.Text`
  font-family: Ubuntu_700Bold;
  font-size: 15px;
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
  color: ${props => props.color == 'dark' ? '#000' : '#F6F6F6'};
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

export const ErrorContainer = styled.View`
  width: 150px;
  background: #202020;
  position: absolute;
  align-self: flex-end;
  z-index: 5;
  border-radius: 4px;
  top: -15px;
  right: -15px;
`;

export const ErrorContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  /* background: #f00; */
  margin: 9px 13px;
`;

export const ErrorMessage = styled.Text`
  color: #fff;
  font-size: 11px;
  max-width: 80%;
`;

export const ErrorDetail = styled.View`
  width: 15px;
  height: 15px;
  background: #202020;
  position: absolute;
  transform: rotate(45deg);
  margin-left: 10px;
  bottom: -7.5px;
  border-radius: 2px;
`;