import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  background: ${(props) => props.theme.colors.background};
  flex: 1;
`;

export const BackButtonWrapper = styled.TouchableOpacity`
  padding-left: ${hp('2.5%')}px;
`;

export const Header = styled.SafeAreaView`
  height: ${hp('10%')}px;
  justify-content: center;
`;

export const Form = styled.View`
  align-items: center;
  justify-content: center;
`;

export const Footer = styled.View`
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
`;

export const Title = styled.Text`
  color: ${(props) => props.theme.colors.primary};
  font-size: ${hp('5.5%')}px;
  padding-left: ${hp('5%')}px;
  font-family: ${(props) => props.theme.fonts.Ubuntu.bold};
`;

export const Input = styled.TextInput`
  align-self: center;
  background: #fff;
  width: 85%;
  height: ${hp('6.5%')}px;
  elevation: 5;
  border-radius: 22px;
  margin-top: 26px;
  padding-horizontal: ${hp('1.8%')}px;
  padding-vertical: ${hp('1.8%')}px;
  font-family: ${(props) => props.theme.fonts.Ubuntu.normal};
`;

export const P = styled.Text`
  font-size: 18px;
  color: #fff;
  padding-left: 25px;
  padding-right: 25px;
  font-family: ${(props) => props.theme.fonts.Ubuntu.normal};
`;

export const LoginButton = styled.TouchableOpacity`
  width: ${wp('85%')}px;
  border-radius: 22px;
  height: ${hp('6%')}px;
  margin-top: 25px;
  margin-right: 25px;
  margin-left: 25px;
  justify-content: center;
  background: ${(props) => props.theme.colors.primary};
`;

export const LoginButtonText = styled.Text`
  text-align: center;
  align-content: center;
  font-size: ${hp('2.4%')}px;
  color: ${(props) => props.theme.colors.secundary};
  font-family: ${(props) => props.theme.fonts.Ubuntu.normal};
`;

export const RetrievePasswordButton = styled.TouchableOpacity`
  border-radius: 22px;
  height: ${hp('5%')}px;
  margin-top: 25px;
  margin-right: 25px;
  margin-left: 25px;
  justify-content: center;
`;

export const RetrievePasswordText = styled.Text`
  text-align: center;
  align-content: center;
  font-size: ${hp('2.4%')}px;
  color: ${(props) => props.theme.colors.primary};
  font-family: ${(props) => props.theme.fonts.Ubuntu.normal};
`;

export const RegularText = styled.Text`
  text-align: right;
  align-content: center;
  font-size: ${hp('2.4%')}px;
  padding-top: ${hp('3%')}px;
  width: ${wp('55%')}px;
  color: #303030;
  font-family: ${(props) => props.theme.fonts.Ubuntu.normal};
`;

export const RegisterButton = styled.TouchableOpacity`
  border-radius: 22px;
  height: ${hp('5%')}px;
  padding-top: ${hp('2.6%')}px;
  margin-right: 25px;
  margin-left: 25px;
  width: ${wp('40%')}px;
`;

export const RegisterButtonText = styled.Text`
  text-align: left;
  align-content: center;
  font-size: ${hp('2.4%')}px;
  color: ${(props) => props.theme.colors.primary};
  font-family: ${(props) => props.theme.fonts.Ubuntu.normal};
`;
