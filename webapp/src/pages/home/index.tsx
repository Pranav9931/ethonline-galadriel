import styled from "styled-components"
import { GridBackground } from "../../assets"
import { Button } from "@mui/material"
import { HeroButtonText } from "../../components/navbar"

const HomepageContainer = styled.div`
    background: url(${GridBackground}), #1a1a1a;
    min-height: 900px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top center;
    display: flex;
    justify-content: center;
    align-items: center;
`

const HomeContent = styled.div`
    font-family: var(--main-font);
    text-align: center;
    font-size: 4em;
    max-width: 800px;
    margin-top: -150px;
    padding: 0 35px;

    @media screen and (max-width: 650px) {
        font-size: 3em;
    }
`

const Homepage = () => {
  return (
    <HomepageContainer>
        <HomeContent>
            SIMULATE<span style={{color: '#ff4242'}}> CRIME </span>SCENES WITH <span style={{color: '#8103FF'}}> AI </span> DRIVEN <span style={{color: '#FE9983'}}> SCENARIOS </span>

            <br />
            <Button
            sx={{
                background: '#ffffff',
                padding: '0 35px',
                height: '50px',
                transform: 'skew(-45deg)',  // Apply skew only to the button
                fontFamily: 'var(--main-font)',
                borderRadius: 0,
                fontSize: '24px',
                border: 0,
                color: '#000000'
            }}
        >
           <span style={HeroButtonText}>GET STARTED</span>
        </Button>
        </HomeContent>
    </HomepageContainer>
  )
}

export default Homepage