import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, TextField, Typography } from "@mui/material"
import { ImageWrapper, SceneCardContainer, SceneCardContent, SceneImage } from "./CardContainer"
import MainText from "../Typography"
import { Scene1 } from "../../assets"
import { useStateContext } from "../../context"
import React from "react"
import { TransitionProps } from "@mui/material/transitions"
import styled from "styled-components"

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const CrimeSceneBody = styled.div`
    padding: 10px;
    background: #171717;
    height: 100%;
`

const DialogBoxImage = styled.img`
    height: 250px;
    width: 100%;
    object-fit: cover;
    object-position: center center;
`


const BuildingSceneCard = () => {

    const {crimeScene, setCrimeScene} = useStateContext();

    const [open, setOpen] = React.useState<boolean>(false);
    const [desc, setDesc] = React.useState("");
    const [noOfFloors, setNoOfFloors] = React.useState<number>(3);
    const [height, setHeight] = React.useState(10)
    const [width, setWidth] = React.useState(7)
    const [seed, setSeed] = React.useState(10);
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        // console.log("Attempting to close dialog");
        setOpen(false);
    };

    const handleSceneSet = (sceneNumber: number) => {
        if(!desc.length) return;
        if (!crimeScene) {
            setCrimeScene(() => ({
                id: sceneNumber,
                title: 'THE BUILDING',
                desc: desc,
                imgUrl: Scene1
            }))
        } else if (crimeScene && crimeScene.id === sceneNumber) {
            // setCrimeScene(null)
        } else {
            setCrimeScene(() => ({
                id: sceneNumber,
                title: 'THE BUILDING',
                desc: desc,
                imgUrl: Scene1
            }))

        }
    }

    React.useEffect(() => {
        // console.log("Dialog state after close attempt:", open);
        setOpen(false)
    }, [crimeScene]);
  return (
    <SceneCardContainer
        onClick={() => handleClickOpen()}
        style={{border: `${crimeScene && crimeScene.id === 1 ? '2px solid #0000FF' : 'none'}`}}
    >
        <SceneCardContent>
            <Box
                sx={{
                    flex: 1,
                    margin: '25px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    alignSelf: 'flex-start'
                }}
            >
                <MainText textSize={64} content="THE BUILDING" />
                <Typography sx={{
                    fontSize: '16px',
                    color: '#ffffff60'
                }}
                >
                    With over 60% of crimes occurring in apartments and buildings, our AI-driven simulations focus on these environments to help law enforcement practice and refine their investigative techniques for real-world scenarios.
                </Typography>


                <Typography sx={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#ffffff',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'flex-end',
                    cursor: 'pointer'
                }}
                onClick={() => handleClickOpen()}
                >
                    EXPAND
                </Typography>                
            </Box>
            <ImageWrapper>
                <SceneImage src={Scene1} />
            </ImageWrapper>
        </SceneCardContent>


        {/* MUI Dialogue Box */}
        <React.Fragment>
        {/* <Button onClick={handleClickOpen} fullWidth>ADD SCENE DESCRIPTION</Button> */}
        <Dialog
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <DialogTitle sx={{background: '#1E1E1E', color: '#ffffff', fontSize: '14px'}}>{"ADD SCENE DESCRIPTION"}</DialogTitle>
            <CrimeSceneBody>
            <DialogContent>
                <DialogBoxImage src={Scene1} />

                <div style={{margin: '10px 0 0 0'}}>
                    <label htmlFor="DESC" style={{color: '#ffffff', fontSize: '12px', fontWeight: '800'}}>DESCRIPTION</label>
                    <TextField id="DESC" variant="outlined" onChange={(e) => setDesc(e.target.value)} fullWidth
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
                        required
                    />
                </div>
                
                <div style={{display: 'flex', gap: '10px'}}>
                    <div style={{margin: '10px 0 0 0', flex: 1}}>
                        <label htmlFor="WIDTH" style={{color: '#ffffff', fontSize: '12px', fontWeight: '800'}}>WIDTH (IN METERS)</label>
                        <TextField id="WIDTH" type="number" variant="outlined" onChange={(e) => setWidth(Number(e.target.value))} fullWidth
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
                            required
                        />
                    </div>

                    <div style={{margin: '10px 0 0 0', flex: 1}}>
                        <label htmlFor="HEIGHT" style={{color: '#ffffff', fontSize: '12px', fontWeight: '800'}}>HEIGHT (IN METERS)</label>
                        <TextField id="HEIGHT" type="number" variant="outlined" onChange={(e) => setHeight(Number(e.target.value))} fullWidth
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
                            required
                        />
                    </div>
                </div>

                <div style={{display: 'flex', gap: '10px'}}>
                    <div style={{margin: '10px 0 0 0', flex: 1}}>
                        <label htmlFor="floors" style={{color: '#ffffff', fontSize: '12px', fontWeight: '800'}}>NO. OF FLOORS</label>
                        <TextField id="floors" type="number" variant="outlined" onChange={(e) => setNoOfFloors(Number(e.target.value))} fullWidth
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
                            required
                        />
                    </div>

                    <div style={{margin: '10px 0 0 0', flex: 1}}>
                        <label htmlFor="seed" style={{color: '#ffffff', fontSize: '12px', fontWeight: '800'}}>SEED NUMBER</label>
                        <TextField id="seed" type="number" variant="outlined" onChange={(e) => setSeed(Number(e.target.value))} fullWidth
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
                            required
                        />
                    </div>
                </div>

            </DialogContent>

            <DialogActions>
                <Button onClick={() => {handleSceneSet(1)}}>CONTINUE</Button>
            </DialogActions>

            </CrimeSceneBody>
        </Dialog>
        </React.Fragment>
                
    </SceneCardContainer>
  )
}

export default BuildingSceneCard