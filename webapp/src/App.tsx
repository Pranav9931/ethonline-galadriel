import { Route, Routes } from 'react-router-dom'
import { Navbar } from './components'
import { Homepage } from './pages'

import { useStateContext } from './context'
import styled from 'styled-components'
import MainText from './components/Typography'
import { Box } from '@mui/material'

const Floater = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  margin-top: 70px;
  right: 35px;
  width: 400px;
  min-height: 100px;
  background: #2B2B2B;
  border-radius: 10px;
  padding: 10px;
  z-index: 99999;

`

const SceneBox = styled.div`
  background: #000000;
  margin-top: 5px;
  padding: 5px;
  border-radius: 10px;
`

const StorySceneImage = styled.img`
  height: 80px;
  border-radius: 5px 0 0 5px;
`

const EvidenceWrapper = styled.div`
  gap: 5px;
  background: #000000;
  padding: 5px;
  border-radius: 10px;
  margin-top: 5px;
`

const EvidenceItems = styled.div`
  margin-top: 5px;
  display: flex;
  width: 60px;
  padding: 5px;
  box-sizing: border-box;
  background: #171717;
  border-radius: 5px;
  flex-direction: column;
  img {
    width: 50px;
    height: 50px;
    border-radius: 5px;
  }
`
const CharacterWrapper = styled.div`
  gap: 5px;
  background: #000000;
  padding: 5px;
  border-radius: 10px;
  margin-top: 5px;
`

const CharacterImage = styled.img`
  height: 300px;
  border-radius: 5px 5px 0 0;
  object-fit: cover;
`

const App = () => {

  const {crimeScene, evidence, character} = useStateContext();

  const getFloater = () => {
    if (crimeScene || evidence || character) {
      return(
        <Floater>
          <MainText textSize={24} content='CRIME SCENE PROMPT' />
          {crimeScene && <SceneBox>
            <MainText textSize={12} content='SCENE' />
            <Box sx={{
              display: 'flex',
              marginTop: '5px',
              background: '#171717',
              borderRadius: '5px',
              gap: '10px'
            }}>
              <StorySceneImage src={crimeScene.imgUrl} />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: '5px'
                }}
              >
                <span style={{fontWeight: 600, fontSize: '14px'}}>{crimeScene.title}</span>
                <span style={{fontSize: '10px'}}>{(crimeScene.desc).slice(0, 50) + "..."}</span>
              </Box>
            </Box>
          </SceneBox>}

          {/* Evidences */}

          {(evidence && evidence.length > 0) && <EvidenceWrapper>
            <MainText textSize={12} content='EVIDENCES' />
            <Box sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '5px'
            }}>
              {evidence.map((item: any, _idx: number) => {
                return (
                  <EvidenceItems>
                    <img src={item.imgUrl} />
                    <span style={{fontWeight: 600, fontSize: '10px'}}>{item.name}</span>
                  </EvidenceItems>
                )
              })}
            </Box>
            
          </EvidenceWrapper>}

          {character && <CharacterWrapper>
            <MainText textSize={12} content='CHARACTER' />
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: '5px',
              background: '#171717',
              borderRadius: '5px',
              gap: '10px'
            }}>
              <CharacterImage src={character.imgUrl} />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: '5px',
                  padding: '0 10px 10px 10px'
                }}
              >
                <span style={{fontWeight: 600, fontSize: '16px'}}>NAME: {character.name}</span>
                <span style={{fontSize: '14px'}}>CRIME RECORD STATUS: {character.crimeRecords}</span>
                <span style={{fontSize: '12px'}}>CASES: {character.noOfCrimes}</span>
              </Box>
            </Box>
            
          </CharacterWrapper>
          }
        </Floater>
      )
    }
  }

  return (
    <>
      <Navbar />

      {getFloater()}


      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </>
  )
}

export default App