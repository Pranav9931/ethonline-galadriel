import { Box, Typography } from "@mui/material"
import { SceneCardContainer, SceneCardContent, SceneImage } from "./CardContainer"
import MainText from "../Typography"
import { Scene3 } from "../../assets"

const TheJungleSceneCard = () => {
  return (
    <SceneCardContainer>
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
                    With over 60% of crimes occurring in apartments and buildings, our AI-driven simulations focus on these environments to help law enforcement practice and refine their investigative techniques for real-world scenarios.
                </Typography>


                <Typography sx={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#ffffff',
                    height: '90px',
                    display: 'flex',
                    alignItems: 'flex-end',
                    cursor: 'pointer'
                }}
                >
                    EXPAND
                </Typography>                
            </Box>
            <SceneImage src={Scene3} />
        </SceneCardContent>
    </SceneCardContainer>
  )
}

export default TheJungleSceneCard