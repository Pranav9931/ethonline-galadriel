import { Box, Typography } from "@mui/material"
import { ImageWrapper, SceneCardContainer, SceneCardContent, SceneImage } from "./CardContainer"
import MainText from "../Typography"
import { Scene1 } from "../../assets"
import { useStateContext } from "../../context"

const BuildingSceneCard = () => {

    const {crimeScene, setCrimeScene} = useStateContext();

    const handleSceneSet = (sceneNumber: number) => {
        if (!crimeScene) {
            setCrimeScene(() => ({
                id: sceneNumber,
                title: 'THE BUILDING',
                desc: 'With over 60% of crimes occurring in apartments and buildings, our AI-driven simulations focus on these environments to help law enforcement practice and refine their investigative techniques for real-world scenarios.',
                imgUrl: Scene1
            }))
        } else if (crimeScene && crimeScene.id === sceneNumber) {
            setCrimeScene(null)
        } else {
            setCrimeScene(() => ({
                id: sceneNumber,
                title: 'THE BUILDING',
                desc: 'With over 60% of crimes occurring in apartments and buildings, our AI-driven simulations focus on these environments to help law enforcement practice and refine their investigative techniques for real-world scenarios.',
                imgUrl: Scene1
            }))
        }
    }
  return (
    <SceneCardContainer
        onClick={() => handleSceneSet(1)}
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
                >
                    EXPAND
                </Typography>                
            </Box>
            <ImageWrapper>
                <SceneImage src={Scene1} />
            </ImageWrapper>
        </SceneCardContent>
    </SceneCardContainer>
  )
}

export default BuildingSceneCard