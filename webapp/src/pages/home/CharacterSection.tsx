import styled from "styled-components"
import MainText from "../../components/Typography"
import { CharacterCard } from "../../components/Cards"
import { Character1, Character2, Character3 } from "../../assets"
import { Box } from "@mui/material"

const CharacterSectionContainer = styled.div`
    padding: 0 35px;
`
const CharacterSection = () => {

  return (
    <CharacterSectionContainer>
        <MainText content="SELECT CHARACTER" textSize={24} />
        <Box
            sx={{
                display: 'flex',
                gap: '20px',
                flexWrap: 'wrap'
            }}
        >
            <CharacterCard id={1} name={"BARAKA"} imgUrl={Character1} complexion="FAIR" crimeRecords="HEAVY" onBail={true} noOfCrimes={10} />
            <CharacterCard id={2} name={"TANIYA"} imgUrl={Character2} complexion="FAIR" crimeRecords="LOW" onBail={false} noOfCrimes={1} />
            <CharacterCard id={3} name={"AMYLIE"} imgUrl={Character3} complexion="FAIR" crimeRecords="MODERATE" onBail={true} noOfCrimes={4} />
        </Box>
    </CharacterSectionContainer>
  )
}

export default CharacterSection