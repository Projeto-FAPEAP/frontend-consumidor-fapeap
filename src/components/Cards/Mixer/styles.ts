import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  flex: 1;
  background: ${(props) => props.theme.colors.white};
  padding: 10px;
  flex-direction: row;
  margin: 5px 0 0 0;
`;

export const Image = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  margin-right: 10px;
`;

export const Title = styled.Text`
  font-weight: bold;
`;

export const Text = styled.Text`
  color: #999;
  font-size: 11px;
`;

export const Content = styled.View``;
