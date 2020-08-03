import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: ${(props) => props.theme.colors.background};
`;

export const Content = styled.View`
  padding: 10px;
  flex: 1;
  justify-content: space-between;
`;

export const Header = styled.View`
  border-bottom-color: #999;
  border-bottom-width: 1px;
`;

export const Image = styled.Image`
  width: 100%;
  height: 200px;
`;

export const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.Ubuntu.bold};
  font-size: 18px;
  color: ${(props) => props.theme.colors.title};
`;

export const Text = styled.Text`
  color: ${(props) => props.theme.colors.subtitle};
  font-family: ${(props) => props.theme.fonts.Ubuntu.normal};
  font-size: 15px;
`;

export const CountText = styled.Text`
  color: ${(props) => props.theme.colors.title};
  font-size: 40px;
  font-family: ${(props) => props.theme.fonts.Ubuntu.normal};
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

export const ButtonAdd = styled.TouchableOpacity`
  padding: 5px 20px;
  background: ${(props) => props.theme.colors.primary};
  border-radius: 10px;
  margin-left: 20px;
`;

export const ButtonAddText = styled.Text`
  color: ${(props) => props.theme.colors.white};
  font-family: ${(props) => props.theme.fonts.Ubuntu.bold};
  font-size: 15px;
`;
