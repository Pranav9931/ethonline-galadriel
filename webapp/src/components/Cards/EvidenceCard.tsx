import styled from "styled-components"
import { EvidenceCardContainer } from "./CardContainer"
import { useStateContext } from "../../context"
import { useEffect, useState } from "react"

type EvidenceType = {
    evidenceId: number
    name: string,
    dangerType: string,
    imgUrl: string
}

const EvidenceImage = styled.img`
    height: 200px;
`
const EvidenceCard = ({evidenceId, name, dangerType, imgUrl}: EvidenceType) => {

  const {evidence, setEvidence} = useStateContext();

  const [isAvailable, setIsAvailable] = useState(false);

  const findEvidence = (evidenceId: number) => {
    if (!evidence) return false;
    const exists = evidence.some((element: EvidenceType) => element.evidenceId === evidenceId)
    if (exists) return true;
    return false;
  }

  

  const handleEvidencePush = (evidenceId: number) => {
    if (!evidence) {
      setEvidence(() => ([{
        evidenceId,
        name,
        dangerType,
        imgUrl
      }]))
      return;
    } else if(evidence) {
        const exists = evidence.some((element: EvidenceType) => element.evidenceId === evidenceId)
        if (exists) {
          const filteredEvidence = evidence.filter((element: EvidenceType) => element.evidenceId !== evidenceId)
          if(filteredEvidence.length === 0) {
            setEvidence(null)
            return;
          }
          setEvidence(() => (filteredEvidence))
        } else {
          setEvidence((prevEvidences: EvidenceType[]) => ([...prevEvidences, {
              evidenceId,
              name,
              dangerType,
              imgUrl
            }]))
          }
      } else {
        setEvidence(null)
      }
  }

  useEffect(() => {
    findEvidence(evidence) ? setIsAvailable(true) : setIsAvailable(false);
  }, [handleEvidencePush])
  return (
    <EvidenceCardContainer
      onClick={() => handleEvidencePush(evidenceId)}
      style={{
        border: isAvailable ? '2px solid #0000FF' : 'none'
      }}
    >
        <EvidenceImage src={imgUrl} />
        <span style={{fontFamily: 'var(--main-font)', fontSize: '20px', letterSpacing: '1px'}}>{name}</span>
        <span style={{transform: 'skew(15deg)', fontSize: '12px'}}>Danger Level: {dangerType}</span>
    </EvidenceCardContainer>
  )
}

export default EvidenceCard