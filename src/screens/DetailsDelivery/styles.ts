import styled from 'styled-components/native';


export const Container = styled.SafeAreaView`
  flex: 1;
`;
export const StatusView = styled.View`
  align-items: center;
  width: 100%;
  height: 90%;
  top: 2%;
`;
export const Header = styled.View`
  align-items: center;
  justify-content: center;
  min-height: 150px;
  width: 100%;
`;
export const BorderBottom = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
  width: 100%;
  top: 2%;
`;
export const PrincipalDivider = styled.View`
  border-bottom-width: 1px;
  border: 1px solid #CDC3C3;
  width: 85%;
  top: 8%;
`;
export const Image = styled.Image`
  width: 200px;
  height: 200px;
`;
export const Title = styled.Text`
  font-family: Ubuntu-Bold;
  font-size: 14px;
  left: 10%;
  display: flex;
 `;
 export const Subtitle = styled.Text`
  font-family: Ubuntu-Regular;
  font-size: 14px;
  left: 10%;
  top: 1%;
 `;
 export const PrincipalText = styled.Text`
  font-family: Ubuntu-Bold;
  font-size: 18px;
  color: #444444;
  top: 5%;
 `;
 export const SaveDelivery = styled.TouchableOpacity`
  width: 100%;
  background: ${(props) => props.theme.colors.primary};
  max-width: 350px;
  height: 40px;
  border-radius: 8px;
  margin: 0 auto;
  margin-top: 300px;
`;