import styled from "styled-components";

export const SceneCardContainer = styled.div`
    width: calc(100% - 50px);
    background: #1E1E1E;
    height: 250px;
    box-sizing: border-box;
    margin-top: 10px;
    padding: 0 0 0 45px;
    transform: skew(-15deg);
    margin-left: 20px;
    display: block;
    justify-content: space-between;
    overflow: hidden;
    gap: 20px;
`

export const SceneCardContent = styled.div`
    transform: skew(15deg);
    display: flex;
    gap: 20px;
    justify-content: space-between;
`

export const ImageWrapper = styled.div`
  width: 700px;
  overflow: hidden; /* Ensure the image doesn't overflow the container */
  transform: skew(-15deg); /* Apply skew to the container */
  display: flex; /* Maintain flex properties if needed */
`;

export const SceneImage = styled.img`
  width: 100%; /* Make sure the image fills the container */
  object-fit: cover;
  object-position: bottom center;
  flex: 1;
`;

export const EvidenceCardContainer = styled.div`
  display: flex;
  background: #1E1E1E;
  padding: 10px;
  flex-direction: column;
  gap: 10px;
  transform: skew(-15deg);
  flex: 1;
`