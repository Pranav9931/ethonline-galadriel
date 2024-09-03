import styled from "styled-components"
import MainText from "../../components/Typography"
import { BuildingSceneCard, RiverSideSceneCard, TheJungleSceneCard } from "../../components/Cards"
import { AppBar, Button, CircularProgress, Dialog, IconButton, Slide, TextField, Toolbar, Typography } from "@mui/material"
import React, { useEffect } from "react"
import { TransitionProps } from "@mui/material/transitions"
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { CrimeScene, useStateContext } from "../../context"
import { BrowserProvider } from "ethers"
import { useWeb3ModalProvider } from "@web3modal/ethers/react"
import { Contract } from "ethers"
import ShortcutIcon from '@mui/icons-material/Shortcut';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const CrimeSceneSectionContainer = styled.div`
    padding: 0 35px;
    margin-top: -100px;
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
const CrimeSceneSection = () => {

  const contractABI = [
    "function initializeDalleCall(string memory message) public returns (uint)",
    "function lastResponse() public view returns (string)"
  ];

  const {contract, setCrimeScene} = useStateContext();
  const { walletProvider } = useWeb3ModalProvider()

  const [open, setOpen] = React.useState(false);
  const scenePlaceholderRef = React.useRef<HTMLDivElement>(null);
  const [isSet, setIsSet] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  // variables related to scene:
  const [scenePrompt, setScenePrompt] = React.useState("");
  const [sceneTitle, setSceneTitle] = React.useState("");
  const [sceneDescription, setSceneDescription] = React.useState("");
  const [generatedCrimeSceneLink, setGeneratedCrimeSceneLink] = React.useState("");

  const [hash, setHash] = React.useState("");

  const handleSubmit = async () => {

    if (scenePrompt.length === 0) return;
    setIsLoading(true);
    const ethersProvider = new BrowserProvider(walletProvider as any);
    const signer = await ethersProvider.getSigner()

    const contractInstance = new Contract(contract, contractABI, signer)
    const result = await contractInstance.initializeDalleCall(scenePrompt);

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
    setGeneratedCrimeSceneLink(newResponse);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSceneSet = () => {
    if (sceneTitle.length > 0 && sceneDescription.length > 0 && generatedCrimeSceneLink.length > 0) {
      const getId: number = Math.ceil(6 * Math.random());
      setCrimeScene((prev: CrimeScene) => ({
        id: getId,
        title: sceneTitle,
        desc: sceneDescription,
        imgUrl: generatedCrimeSceneLink
      }))

      handleClose();
    }
  }

  useEffect(() => {
      try{
        if(scenePlaceholderRef.current) {
          scenePlaceholderRef.current.style.backgroundImage = `url(${generatedCrimeSceneLink})`;
        }
        
      } catch (err) {
        console.log(err);
        setIsSet(false);
      }
  }, [generatedCrimeSceneLink])
  return (
    <CrimeSceneSectionContainer>
        <MainText content="SELECT CRIME SCENE" textSize={24} />
        <BuildingSceneCard />
        <RiverSideSceneCard />
        <TheJungleSceneCard />
        <br />

        {/* MUI Dialogue Box */}
        <React.Fragment>
          <Button onClick={handleClickOpen} fullWidth>CREATE YOUR OWN SCENE</Button>
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
                  CREATE YOUR OWN SCENE
                </Typography>
                <Button autoFocus color="inherit" onClick={handleClose}>
                  SELECT SCENE
                </Button>
              </Toolbar>
            </AppBar>
            <CrimeSceneBody>
              <CrimeSceneImagePlaceholder ref={scenePlaceholderRef}>
                {!isSet && !isLoading && <>
                  <TextField label="FRAME PROMPT TO GENERATE SCENE IMAGE" variant="filled" color="success"
                  autoComplete="off" focused
                    sx={{
                      '& .MuiInputBase-input': {
                        color: '#ffffff', // Text color
                      },
                      width: '800px'
                    }}
                    onChange={(e: any) => setScenePrompt(e.target.value)}
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
                    PROMPT: {scenePrompt}
                  </div>
                  <IconButton onClick={() => {
                      setIsSet(false);
                      setIsLoading(false);
                      setGeneratedCrimeSceneLink("");
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

              
              <div style={{margin: '10px 0 0 0'}}>
              <label htmlFor="sceneTitle" style={{color: '#ffffff', fontSize: '12px', fontWeight: '800'}}>TITLE</label>
              <TextField id="sceneTitle" variant="outlined" onChange={(e) => setSceneTitle(e.target.value)} fullWidth
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

              <div style={{margin: '10px 0 0 0'}}>
              <label htmlFor="sceneDescription" style={{color: '#ffffff', fontSize: '12px', fontWeight: '800'}}>DESCRIPTION</label>
              <TextField id="sceneDescription" onChange={(e) => setSceneDescription(e.target.value)} multiline fullWidth
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

              <Button sx={{marginTop: '10px', background: '#ffffff', color: '#000000', padding: '15px', fontWeight: 700}} fullWidth
                onClick={() => handleSceneSet()}
              >SELECT SCENE</Button>
            </CrimeSceneBody>
          </Dialog>
        </React.Fragment>

    </CrimeSceneSectionContainer>
  )
}

export default CrimeSceneSection