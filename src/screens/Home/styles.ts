import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: ${(props) => props.theme.colors.white};
  flex-direction: column;
  padding: 10px;
`;

export const Header = styled.View`
  flex-direction: row;
  padding-left: 10px;
  padding-top: 10px;
`;

export const TextMid = styled.Text`
  font-size: 16px;
  font-weight: bold;
  flex-direction: row;
  padding-left: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
`;
