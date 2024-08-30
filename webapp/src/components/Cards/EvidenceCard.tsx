import styled from "styled-components"
import { EvidenceCardContainer } from "./CardContainer"

type EvidenceType = {
    name: string,
    dangerType: string,
    imgUrl: string
}

const EvidenceImage = styled.img`
    height: 200px;
`
const EvidenceCard = ({name, dangerType, imgUrl}: EvidenceType) => {
  return (
    <EvidenceCardContainer>
        <EvidenceImage src={imgUrl} />
        <span style={{fontFamily: 'var(--main-font)', fontSize: '20px', letterSpacing: '1px'}}>{name}</span>
        <span style={{transform: 'skew(15deg)', fontSize: '12px'}}>Danger Level: {dangerType}</span>
    </EvidenceCardContainer>
  )
}

export default EvidenceCard