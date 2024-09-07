import { Box, Typography } from "@mui/material"
import { ImageWrapper, SceneCardContainer, SceneCardContent, SceneImage } from "./CardContainer"
import MainText from "../Typography"
import { Scene3 } from "../../assets"
import { useStateContext } from "../../context"

const TheJungleSceneCard = () => {

    const {crimeScene} = useStateContext();
  return (
    <SceneCardContainer
        // onClick={() => handleSceneSet(3)}
        style={{border: `${crimeScene && crimeScene.id === 3 ? '2px solid #0000FF' : 'none'}`, filter: 'grayscale(100)', opacity: 0.5}}
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
                <MainText textSize={64} content="THE JUNGLE" />
                <Typography sx={{
                    fontSize: '16px',
                    color: '#ffffff60'
                }}
                >
                    With over 10% of crimes occurring in jungles, our AI-driven simulations focus on these environments to help law enforcement practice and refine their investigative techniques for real-world scenarios.
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
                <SceneImage src={Scene3} />
            </ImageWrapper>
            
        </SceneCardContent>
    </SceneCardContainer>
  )
}

export default TheJungleSceneCard