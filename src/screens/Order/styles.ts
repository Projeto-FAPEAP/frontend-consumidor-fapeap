import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  background: #fff;
`;

export const Header = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  min-height: 150px;
  width: 100%;
  background: #fff;
`;

export const Image = styled.Image`
  width: 150px;
  height: 150px;
`;

export const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.Ubuntu.normal};
`;

export const TextQuantity = styled.Text`
  color: ${(props) => props.theme.colors.success};
  font-size: 14px;
  font-family: ${(props) => props.theme.fonts.Ubuntu.normal};
`;

export const Subtitle = styled.Text`
  font-size: 11px;
  font-family: ${(props) => props.theme.fonts.Ubuntu.normal};
`;

export const Content = styled.View`
  padding: 10px;
`;

export const CardInformation = styled.View`
  padding: 20px;
  border-width: 1px;
  border-color: #999;
  border-radius: 10px;
`;

export const Left = styled.View``;

export const Right = styled.View``;

export const Button = styled.TouchableOpacity`
  width: 50%;
  padding: 10px;
  background: ${(props) => props.theme.colors.primary};
  border-radius: 20px;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-family: ${(props) => props.theme.fonts.Ubuntu.bold};
  font-size: 11px;
`;
