import styled from 'styled-components/native';

export const Container = styled.View`
  background: ${(props) => props.theme.colors.background};
  flex-direction: column;
`;
export const TextProfile = styled.Text`
  margin-top: 15px;
  margin-left: 15px;
`;
export const ViewList = styled.View`
  width: 342px;
  height: 500px;
  margin-top: 15px;
  margin-left: 25px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
`;
