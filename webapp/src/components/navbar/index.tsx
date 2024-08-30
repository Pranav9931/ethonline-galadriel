import { Button } from '@mui/material';
import styled from 'styled-components'

const NavbarContainer = styled.nav`
    display: flex;
    justify-content: space-between;
    padding: 0px 35px;
    align-items: center;
`

const Logo = styled.h1`
    font-family: var(--main-font);
    font-size: 28px;
    letter-spacing: 1.5px;
`

export const HeroButtonText = {
    transform: 'skew(45deg)'
}


const Navbar = () => {
  return (
    <NavbarContainer>
        <Logo>GALADRIEL</Logo>
        <Button
            sx={{
                background: '#ffffff',
                padding: '0 35px',
                height: '45px',
                transform: 'skew(-45deg)',  // Apply skew only to the button
                fontFamily: 'var(--main-font)',
                borderRadius: 0,
                fontSize: '24px',
                border: 0,
                color: '#000000',
                position: 'relative'
            }}
        >
           <span style={HeroButtonText}>Connect</span>
        </Button>
    </NavbarContainer>
  )
}

export default Navbar