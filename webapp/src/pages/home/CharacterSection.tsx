import styled from "styled-components"
import MainText from "../../components/Typography"
import { CharacterCard } from "../../components/Cards"
import { Character1, Character2, Character3 } from "../../assets"
import { AppBar, Box, Button, CircularProgress, Dialog, IconButton, Slide, TextField, Toolbar, Typography } from "@mui/material"
import React, { useEffect } from "react"
import { Character, useStateContext } from "../../context"
import { useWeb3ModalProvider } from "@web3modal/ethers/react"
import { BrowserProvider } from "ethers"
import { Contract } from "ethers"
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import ShortcutIcon from '@mui/icons-material/Shortcut'
import { TransitionProps } from "@mui/material/transitions"

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="left" ref={ref} {...props} />;
  });

const CharacterSectionContainer = styled.div`
    padding: 0 35px;
`

const CrimeSceneBody = styled.div`
  padding: 10px;
  background: #171717;
  height: 100%;
`

const CrimeSceneImagePlaceholder = styled.div`
  display: flex;
  background: #000000;
  min-height: 550px;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  // background-position: center center;
  background-size: 50%;
  position: relative;
`

const CharacterSection = () => {

      const contractABI = [
        "function initialiseImageGeneration(string memory message) public returns (uint)",
        "function lastResponse() public view returns (string)"
      ];
    
      const {contract, setCharacter} = useStateContext();
      const { walletProvider } = useWeb3ModalProvider()
    
      const [open, setOpen] = React.useState(false);
      const characterPlaceholderRef = React.useRef<HTMLDivElement>(null);
      const [isSet, setIsSet] = React.useState(false);
      const [isLoading, setIsLoading] = React.useState(false);
    
      // variables related to scene:
      const [characterPrompt, setCharacterPrompt] = React.useState("");
      const [characterName, setCharacterName] = React.useState("");
      const [CharacterComplexion, setCharacterComplexion] = React.useState("");
      const [characterCrimeRecords, setCharacterCrimeRecords] = React.useState("");
      const [characterCases, setCharacterCases] = React.useState<number>(0);
      const [onBail, setOnBail] = React.useState<boolean>(true);
      const [generatedCharacterLink, setGeneratedCharacterLink] = React.useState("");
    
      const [hash, setHash] = React.useState("");
    
      const handleSubmit = async () => {
    
        if (characterPrompt.length === 0) return;
        setIsLoading(true);
        const ethersProvider = new BrowserProvider(walletProvider as any);
        const signer = await ethersProvider.getSigner()
    
        const contractInstance = new Contract(contract, contractABI, signer)
        const result = await contractInstance.initialiseImageGeneration(characterPrompt);
    
        setHash(result.hash)
    
        let lastResponse = await contractInstance.lastResponse();
        console.log(lastResponse)
        let newResponse = lastResponse;
    
        while(newResponse === lastResponse) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          newResponse = await contractInstance.lastResponse();
          console.log(".")
        }
    
        console.log(newResponse)
        setIsLoading(false)
        setIsSet(true)
        setGeneratedCharacterLink(newResponse);
      }
    
      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    
      const handleSceneSet = () => {
        if (characterName.length > 0 && CharacterComplexion.length > 0 && generatedCharacterLink.length > 0 && characterCrimeRecords.length > 0 && characterCases >= 0) {
          const getId: number = Math.ceil(6 * Math.random());
          setCharacter((prev: Character) => ({
            id: getId,
            name: characterName,
            complexion: CharacterComplexion,
            crimeRecords: characterCrimeRecords,
            noOfCrimes: characterCases,
            onBail: onBail,
            imgUrl: generatedCharacterLink
          }))
    
          handleClose();
        }
      }
    
      useEffect(() => {
          try{
            if(characterPlaceholderRef.current) {
              characterPlaceholderRef.current.style.backgroundImage = `url(${generatedCharacterLink})`;
            }
            
          } catch (err) {
            console.log(err);
            setIsSet(false);
          }
      }, [generatedCharacterLink]);

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
        <br />

        {/* MUI Dialogue Box */}
        <React.Fragment>
          <Button onClick={handleClickOpen} fullWidth>CREATE YOUR OWN CHARACTER</Button>
          <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
          >
            <AppBar sx={{ position: 'relative', background: '#1E1E1E' }}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                  CREATE YOUR OWN CHARACTER
                </Typography>
                <Button autoFocus color="inherit" onClick={handleClose}>
                  SELECT SCENE
                </Button>
              </Toolbar>
            </AppBar>
            <CrimeSceneBody>
              <CrimeSceneImagePlaceholder ref={characterPlaceholderRef}>
                {!isSet && !isLoading && <>
                  <TextField label="FRAME PROMPT TO GENERATE CHARACTER IMAGE" variant="filled" color="success"
                  autoComplete="off" focused
                    sx={{
                      '& .MuiInputBase-input': {
                        color: '#ffffff', // Text color
                      },
                      width: '800px'
                    }}
                    onChange={(e: any) => setCharacterPrompt(e.target.value)}
                  />

                  <Button color="success" sx={{marginLeft: '-100px'}} onClick={() => handleSubmit()}>
                    GENERATE
                  </Button>
                </>
                }

                {isLoading && <CircularProgress color="success" />}

                {isSet && !isLoading && <>
                  <div style={{cursor: 'pointer', display: 'flex', alignItems: 'center', position: 'absolute', top: 10, right: 10, background: '#ffffff10', borderRadius: '50px', padding: '10px 15px', color: '#ffffff'}}
                    onClick={() => window.open(`https://explorer.galadriel.com/tx/${hash}`, '_blank')}
                  >
                    <ShortcutIcon /> {hash}
                  </div>

                  <div style={{display: 'flex', alignItems: 'center', position: 'absolute', bottom: 10, right: 10, background: '#ffffff10', borderRadius: '50px', padding: '10px 15px', color: '#ffffff'}}>
                    PROMPT: {characterPrompt}
                  </div>
                  <IconButton onClick={() => {
                      setIsSet(false);
                      setIsLoading(false);
                      setGeneratedCharacterLink("");
                    }}
                      sx={{
                        background: '#ffffff20',
                        color: '#ffffff'
                      }}
                    >
                    <DeleteIcon />
                  </IconButton>
                </>}
              </CrimeSceneImagePlaceholder>

              <div style={{display: 'flex', gap: '10px', flex: 1}}>
                <div style={{margin: '10px 0 0 0', flex: 1}}>
                <label htmlFor="sceneTitle" style={{color: '#ffffff', fontSize: '12px', fontWeight: '800'}}>NAME</label>
                <TextField id="sceneTitle" variant="outlined" onChange={(e) => setCharacterName(e.target.value)} fullWidth
                    sx={{
                    marginTop: '5px',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                        borderColor: '#ffffff', // Outline color
                        },
                        '&:hover fieldset': {
                        borderColor: '#ffffff', // Outline color on hover
                        },
                        '&.Mui-focused fieldset': {
                        borderColor: '#ffffff', // Outline color when focused
                        },
                    },
                    '& .MuiInputBase-input': {
                        color: '#ffffff', // Text color
                        borderRadius: '5px'
                    },
                    }}
                    placeholder="Your title goes here."
                    required
                />
                </div>

                <div style={{margin: '10px 0 0 0', flex: 1}}>
                <label htmlFor="sceneDescription" style={{color: '#ffffff', fontSize: '12px', fontWeight: '800'}}>COMPLEXION</label>
                <TextField id="sceneDescription" onChange={(e) => setCharacterComplexion(e.target.value)} multiline fullWidth
                    sx={{
                    marginTop: '5px',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                        borderColor: '#ffffff', // Outline color
                        // minHeight: '100px'
                        },
                        '&:hover fieldset': {
                        borderColor: '#ffffff', // Outline color on hover
                        },
                        '&.Mui-focused fieldset': {
                        borderColor: '#ffffff', // Outline color when focused
                        },
                    },
                    '& .MuiInputBase-input': {
                        color: '#ffffff', // Text color
                        // border: '1px solid #ffffff',
                        borderRadius: '5px',
                    },
                    }}
                    placeholder="Your description goes here."
                    required
                />
                </div>
              </div>

              <div style={{display: 'flex', gap: '10px', flex: 1}}>
                <div style={{margin: '10px 0 0 0', flex: 1}}>
                    <label htmlFor="sceneTitle" style={{color: '#ffffff', fontSize: '12px', fontWeight: '800'}}>CRIME STATUS</label>
                    <TextField id="sceneTitle" variant="outlined" onChange={(e) => setCharacterCrimeRecords(e.target.value)} fullWidth
                        sx={{
                        marginTop: '5px',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                            borderColor: '#ffffff', // Outline color
                            },
                            '&:hover fieldset': {
                            borderColor: '#ffffff', // Outline color on hover
                            },
                            '&.Mui-focused fieldset': {
                            borderColor: '#ffffff', // Outline color when focused
                            },
                        },
                        '& .MuiInputBase-input': {
                            color: '#ffffff', // Text color
                            borderRadius: '5px'
                        },
                        }}
                        placeholder="Your title goes here."
                        required
                    />
                </div>

                <div style={{margin: '10px 0 0 0', flex: 1}}>
                    <label htmlFor="sceneDescription" style={{color: '#ffffff', fontSize: '12px', fontWeight: '800'}}>CASES</label>
                    <TextField id="sceneDescription" type="number" onChange={(e) => setCharacterCases(Number(e.target.value))} multiline fullWidth
                        sx={{
                        marginTop: '5px',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                            borderColor: '#ffffff', // Outline color
                            // minHeight: '100px'
                            },
                            '&:hover fieldset': {
                            borderColor: '#ffffff', // Outline color on hover
                            },
                            '&.Mui-focused fieldset': {
                            borderColor: '#ffffff', // Outline color when focused
                            },
                        },
                        '& .MuiInputBase-input': {
                            color: '#ffffff', // Text color
                            // border: '1px solid #ffffff',
                            borderRadius: '5px',
                        },
                        }}
                        placeholder="Your description goes here."
                        required
                    />
                </div>
              </div>
              

              <Button sx={{marginTop: '10px', background: '#ffffff', color: '#000000', padding: '15px', fontWeight: 700}} fullWidth
                onClick={() => handleSceneSet()}
              >SELECT CHARACTER</Button>
            </CrimeSceneBody>
          </Dialog>
        </React.Fragment>
    </CharacterSectionContainer>
  )
}

export default CharacterSection