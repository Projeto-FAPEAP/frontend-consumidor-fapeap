import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: ${(props) => props.theme.colors.white};
`;

export const Content = styled.View`
  flex: 1;
  padding: 20px;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 21px;
`;

export const Text = styled.Text`
  font-size: 16px;
  color: #999;
`;
