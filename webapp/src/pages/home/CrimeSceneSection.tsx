import styled from "styled-components"
import MainText from "../../components/Typography"
import { BuildingSceneCard } from "../../components/Cards"

const CrimeSceneSectionContainer = styled.div`
    padding: 0 35px;
    margin-top: -100px;
`
const CrimeSceneSection = () => {
  return (
    <CrimeSceneSectionContainer>
        <MainText content="SELECT CRIME SCENE" textSize={24} />
        <BuildingSceneCard />
    </CrimeSceneSectionContainer>
  )
}

export default CrimeSceneSection