import styled from 'styled-components'
import MainText from '../../components/Typography'
import { EvidenceCard } from '../../components/Cards'
import { Evidence1, Evidence2, Evidence3, Evidence4, Evidence5 } from '../../assets'
import { Button } from '@mui/material'
const EvidenceSectionContainer = styled.div`
    padding: 0 35px;
`
const EvidencesContainer = styled.div`
    display: flex;
    gap: 20px;
    padding: 30px;
`
const EvidenceSection = () => {
  return (
    <EvidenceSectionContainer>
        <MainText textSize={24} content='FOUND EVIDENCES' />
        <EvidencesContainer>
            <EvidenceCard name='BLOOD STAINS' dangerType='EXTREME' imgUrl={Evidence1} />  
            <EvidenceCard name='KNIFE' dangerType='MODERATE' imgUrl={Evidence2} />  
            <EvidenceCard name='BULLET SHELLS' dangerType='EXTREME' imgUrl={Evidence3} />  
            <EvidenceCard name='TISSUE WITH BLOOD' dangerType='LOW' imgUrl={Evidence4} />  
            <EvidenceCard name='SWORD' dangerType='EXTREME' imgUrl={Evidence5} />  
        </EvidencesContainer>

        <Button fullWidth>CREATE YOUR OWN EVIDENCE</Button>
    </EvidenceSectionContainer>
  )
}

export default EvidenceSection