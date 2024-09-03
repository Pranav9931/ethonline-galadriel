import styled from 'styled-components'
import { Character, useStateContext } from '../../context'
import { CharacterCardContainer, CharacterCardContent } from './CardContainer'
import MainText from '../Typography'
import { Typography } from '@mui/material'

const CharacterImage = styled.img`
    width: 100%;
    height: 80%;
    object-fit: cover;
`

const CharacterCard = ({id, name, complexion, imgUrl, crimeRecords, noOfCrimes, onBail} : Character) => {

    const {character, setCharacter} = useStateContext()
    const handleCharacterSet = (characterNumber: number) => {
        if (!character) {
            setCharacter(() => ({
                id: characterNumber,
                name,
                complexion,
                crimeRecords,
                imgUrl,
                noOfCrimes,
                onBail
            }))
        } else if (character && character.id === characterNumber) {
            setCharacter(null)
        } else {
            setCharacter(() => ({
                id: characterNumber,
                name,
                complexion,
                crimeRecords,
                imgUrl,
                noOfCrimes,
                onBail
            }))
        }
    }
  return (
    <CharacterCardContainer
        onClick={() => handleCharacterSet(id)}
    >
        <CharacterCardContent>
            <CharacterImage src={imgUrl} />
            <MainText textSize={36} content={name} />
            <Typography sx={{
                fontSize: '16px',
                color: '#ffffff90',
                transform: 'skew(5deg)'
            }}>
                COMPLEXION: {complexion}
            </Typography>

            <Typography sx={{
                fontSize: '14px',
                color: '#ffffff70',
                transform: 'skew(5deg)'
            }}>
                CRIME RECORD STATUS: {crimeRecords}
            </Typography>

            <Typography sx={{
                fontSize: '14px',
                color: '#ffffff70',
                transform: 'skew(5deg)'
            }}>
                NUMBER OF CASES: {noOfCrimes}
            </Typography>

            <Typography sx={{
                fontSize: '14px',
                color: '#ffffff90',
                transform: 'skew(5deg)'
            }}>
                BAIL STATUS: {onBail ? 'ON BAIL' : 'NOT ON BAIL'}
            </Typography>
        </CharacterCardContent>
    </CharacterCardContainer>
  )
}

export default CharacterCard