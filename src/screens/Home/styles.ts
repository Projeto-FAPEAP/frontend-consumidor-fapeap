import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import styled from 'styled-components/native';

export const Container = styled.View`
  background: ${(props) => props.theme.colors.background};
  flex-direction: column;
`;
export const Header = styled.View`
  flex-direction: row;
  padding-left: ${hp('3%')}px;
  padding-top: ${hp('3%')}px;
`;
export const TextMid = styled.Text`
  font-size: ${hp('2.5%')}px;
  font-weight: bold;
  flex-direction: row;
  padding-left: ${hp('3%')}px;
  padding-top: ${hp('3%')}px;
`;
