import { Box, Typography } from "@mui/material"
import { ImageWrapper, SceneCardContainer, SceneCardContent, SceneImage } from "./CardContainer"
import MainText from "../Typography"
import { Scene2 } from "../../assets"
import { useStateContext } from "../../context"

const RiverSideSceneCard = () => {

    const {crimeScene} = useStateContext();

  return (
    <SceneCardContainer
        // onClick={() => handleSceneSet(2)}
        style={{border: `${crimeScene && crimeScene.id === 2 ? '2px solid #0000FF' : 'none'}`, filter: 'grayscale(100)', opacity: 0.5}}
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
                <MainText textSize={64} content="RIVER SIDE" />
                <Typography sx={{
                    fontSize: '16px',
                    color: '#ffffff60'
                }}
                >
                    With over 30% of crimes occurring on the river side, our AI-driven simulations focus on these environments to help law enforcement practice and refine their investigative techniques for real-world scenarios.
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
                <SceneImage src={Scene2} />
            </ImageWrapper>
            
        </SceneCardContent>
    </SceneCardContainer>
  )
}

export default RiverSideSceneCard