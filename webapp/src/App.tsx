import { Route, Routes, useNavigate } from 'react-router-dom'
import { Navbar } from './components'
import { Homepage, SuccessPage } from './pages'

import { useStateContext } from './context'
import styled from 'styled-components'
import MainText from './components/Typography'
import { Backdrop, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, Typography } from '@mui/material'

import contractABI from "./contracts/abi/index.json"
import { BrowserProvider, recoverAddress } from 'ethers'
import { Contract } from 'ethers'
import React, { useEffect, useState } from 'react'
import { useWeb3ModalProvider } from '@web3modal/ethers/react'
import { handleConvaiAPICall } from './apis'

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
  z-index: 999;
  max-height: 900px;
  overflow: auto;

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

  const {contract, crimeScene, evidence, character, setCrimeScene, setEvidence, setCharacter, finalPrompt, setFinalPrompt} = useStateContext();

  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');

  const navigate = useNavigate();

  const { walletProvider } = useWeb3ModalProvider();

  const [isLoading, setIsLoading] = useState(false);

  const [hash, setHash] = React.useState("");
  const [res, setRes] = React.useState<string>(``);

  const [open, setOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleFinalSubmit = async () => {
    setIsLoading(true);
    setOpen(true);
    setDialogOpen(false);
    try {
      if (crimeScene && (evidence || character)){
        let story: string = `CREATE A PLOT / STORY WITH CHARACTERIZATION, CRIME SCENE DETAILS ARE AS FOLLOWS: PLACE [${crimeScene.title.toUpperCase()}] DESCRIPTION [${crimeScene.desc.toUpperCase()}].`
        if(evidence && evidence.length > 0) {
          const evidenceDesc: string = `FOUND EVIDENCES AT THE SCENE IS/ARE:${evidence.map((item: any) => (` [${item.name.toUpperCase()}]`))}`
          story = story + " " + evidenceDesc + ".";
        }
        if (character) {
          const characterDesc: string = `CHARACTER OF THE STORY SHOULD BE AS FOLLOWS: NAME [${character.name.toUpperCase()}] COMPLEXION [${character.complexion?.toUpperCase()}] CRIME RECORDS [${character.crimeRecords?.toUpperCase()}] CASES [${character.noOfCrimes}] JUDICIAL BAIL STATUS [${String(character.onBail).toUpperCase()}]`
          story = story + " " + characterDesc + "."
        }
  
        console.log(story)
        setFinalPrompt(story)
  
        const ethersProvider = new BrowserProvider(walletProvider as any);
        const signer = await ethersProvider.getSigner()
    
        const contractInstance = new Contract(contract, contractABI, signer)
        const result = await contractInstance.sendMessage(story);
        console.log(result.hash)
        setHash(result.hash)
    
        while(true) {
          const response = await contractInstance.response()
          if (response) {
              console.log(response);
              setRes(`${response}`)
              break;
          }
          await new Promise(resolve => setTimeout(resolve, 2000))
        }
      }
      setIsLoading(false);
      setOpen(false);

    } catch (err: any) {
      console.error(err)
      setIsLoading(false);
      setOpen(false);
    }
    
  }

  const handleClose = () => {
    setDialogOpen(false);
  }



  useEffect(() => {
    setDialogOpen(true);
  }, [res])


  const handleConvaiAPICall = async () => {
    const baseUri: string = import.meta.env.VITE_CONVAI_BASE_URI;
    if (!baseUri){
      window.alert("MISSING BASE URI FOR CONVAI");
      return;
    }

    try {
      setIsLoading(true);
      const convaiAPIKey: string = import.meta.env.VITE_CONVAI_API_KEY;
      if (!convaiAPIKey) {
        window.alert("MISSING CONVAI API KEY")
        return;
      }
      const body: {charName: string, backstory: string, charID: string} = {
        charName: character.name,
        backstory: res,
        charID: "5d586362-6a7f-11ee-9464-42010a40000b"
      } 


      const data = await fetch(`${baseUri}/character/update`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "CONVAI-API-KEY": String(convaiAPIKey)
        },
        body: JSON.stringify(body)
      });
      
      const result = await data.json();
      if (result.STATUS === 'SUCCESS'){

        setCrimeScene(null);
        setCharacter(null);
        setEvidence(null);

        setIsLoading(false);
        setRes("")
        setOpen(false);
        setDialogOpen(false);

        const promise = new Promise(resolve => setTimeout(resolve, 2000))
        navigate("../success")
      }

    } catch (err: any) {
      console.error(err);
      setIsLoading(false);
    }
  }

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

          <Button
            fullWidth
            sx={{
              height: 40,
              background: '#FFFFFF',
              color: '#000000',
              margin: '10px 0 0 0',
              borderRadius: '10px',
            }}

            onClick={() => handleFinalSubmit()}
          >
            CREATE STORY
          </Button>
        </Floater>
      )
    }
  }

  return (
    <>
      <Navbar />

      {getFloater()}
      {isLoading && <>
        <Backdrop
          sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </>
      }

      {!isLoading && res.length > 0 &&
        <>
          <React.Fragment>
            <Dialog
              open={dialogOpen}
              scroll={scroll}
              aria-labelledby="scroll-dialog-title"
              aria-describedby="scroll-dialog-description"
            >
              <DialogTitle id="scroll-dialog-title" sx={{background: '#171717', color: '#FFFFFF'}} >YOUR STORY BOARD</DialogTitle>
              <DialogContent dividers={scroll === 'paper'} sx={{whiteSpace: 'pre-wrap', background: '#1A1A1A', color: '#FFFFFF'}}>
                <Box sx={{background: '#000000', padding: '10px', borderRadius: '10px', marginBottom: '10px'}}>
                  <img src={crimeScene.imgUrl} style={{width: '100%', height: '250px', objectFit: 'cover', borderRadius: '5px'}} />
                  <Box>
                    <MainText textSize={12} content="SCENE NAME" />
                    <Typography sx={{fontFamily: 'Inter, sans-serif'}}>{crimeScene.title}</Typography>
                  </Box>
                </Box>

                <Box sx={{marginBottom: '10px', display: 'flex', gap: '10px'}}>
                  <Box sx={{background: '#000000', padding: '10px', borderRadius: '10px'}}>
                    <img src={character.imgUrl} style={{height: '150px', width: '150px', objectFit: 'cover', borderRadius: '5px'}} />
                    <Box>
                      <MainText textSize={12} content="CHARACTER NAME" />
                      <Typography sx={{fontFamily: 'Inter, sans-serif'}}>{character.name}</Typography>
                    </Box>
                  </Box>

                  <Box sx={{background: '#000000', padding: '10px', borderRadius: '10px', flex: 1}}>
                    <MainText textSize={12} content='EVIDENCES' />
                    <Box sx={{ display: 'flex', gap: '5px', marginTop: '10px' }}>
                    {evidence?.map((item: any) => {
                      return (
                        <>
                        <Box sx={{
                          maxWidth: '50px',
                          background: '#1E1E1E',
                          padding: '5px',
                          borderRadius: '5px'
                        }}>
                          <img src={item.imgUrl} style={{height: '50px', width: '50px', objectFit: 'cover', borderRadius: '5px'}} />
                        
                          <Typography sx={{fontFamily: 'Inter, sans-serif', fontSize: '10px'}}>{item.name}</Typography>
                        </Box>
                        </>
                      )
                    })}
                    </Box>
                    
                  </Box>
                  
                </Box>
                  <Box
                    sx={{
                      background: '#000000',
                      padding: '10px',
                      borderRadius: '10px'
                    }}
                  >
                    <center>
                      <MainText textSize={24} content='PLOT' />
                    </center>

                    {res}

                </Box>
              </DialogContent>

              <DialogActions sx={{background: '#171717', color: '#FFFFFF'}}>
                <Button onClick={handleClose} sx={{background: '#ffffff', color: '#000000', fontWeight: 600}}>Cancel</Button>
                <Button onClick={() => handleFinalSubmit()} sx={{background: '#ffffff', color: '#000000', fontWeight: 600}}>Retry</Button>
                <Button onClick={() => handleConvaiAPICall()} sx={{background: '#ffffff', color: '#000000', fontWeight: 600}}>SUBMIT</Button>
              </DialogActions>
            </Dialog>
            </React.Fragment>
            </>
      }


      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </>
  )
}

export default App