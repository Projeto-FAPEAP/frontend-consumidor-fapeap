import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: ${(props) => props.theme.colors.background};
  padding: 10px;
`;
export const ViewFList = styled.View`
    background: #ffffff;
    border: 1px solid #E3DFDF;
    padding: 10px;
    width: 350px;
    height: 135px;
    marginVertical: 8;
    marginHorizontal: 10;
    border-radius: 8px;
`;
export const BorderBottom = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;
export const ViewTouchD = styled.View`
  flex-direction: row;
  top: 20px;
  width: 50%;
  justify-content: center;
`;
export const ViewTouchR = styled.View`
  flex-direction: row;
  top: 20px;
  width: 50%;
  justify-content: center;
`;
export const CenterView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  top: 10px;
`;
export const ModalView = styled.View`
  margin: 10px;
  background: #f9f9f9;
  border-radius: 10px;
  padding: 35px;
  width: 90%;
  height: 85%;
`;
export const ModalTextView = styled.View`
  padding: 10px;
  position: absolute;
`;
export const ModalText = styled.Text`
  font-family: Ubuntu-Bold;
  font-size: 32px;
  color: #84378f;
  text-align: left;
`;
export const TouchClose = styled.View`
  position: absolute;
  left: 110%
  top: 2%;
`;
export const ViewRating = styled.View`
  align-items: center;
  top: 15%;
`;
export const ButtonDetails = styled.TouchableOpacity`
  align-items: center;
  padding: 10px;
`;
export const ButtonRating = styled.TouchableOpacity`
  align-items: center;
  padding: 10px;
`;
export const SaveRating = styled.TouchableOpacity`
  width: 100%;
  background: ${(props) => props.theme.colors.primary};
  max-width: 350px;
  height: 30px;
  border-radius: 8px;
  margin: 0 auto;
  margin-top: 150px;
`;
