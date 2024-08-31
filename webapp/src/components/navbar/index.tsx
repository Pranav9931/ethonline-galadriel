import { Box, Button } from '@mui/material';
import { useWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers/react';
import styled from 'styled-components'
import { UserImage } from '../../assets';

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

const Image = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    // border: 1px solid #000000;
`


const Navbar = () => {

    const { open } = useWeb3Modal()
    const { address, isConnected } = useWeb3ModalAccount();

  return (
    <NavbarContainer>
        <Logo>GALADRIEL</Logo>

        {
            isConnected && <>
                <Button
                    sx={{
                        background: '#ffffff',
                        padding: '0 15px 0 5px',
                        height: '45px',
                        fontFamily: 'Inter',
                        borderRadius: '50px',
                        fontSize: '10px',
                        border: 0,
                        color: '#000000',
                        position: 'relative',
                        
                    }}
                    onClick={() => open({view: 'Account'})}
                >   
                    <Image src={UserImage} />
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginLeft: '5px',
                    }}>
                        <span style={{alignSelf: 'flex-start', fontWeight: 800, fontSize: '12px'}}>Account</span>
                        <span style={{alignSelf: 'flex-start'}}>{address?.slice(0, 4) + "..." + address?.slice(-4)}</span>
                    </Box>
                </Button>
            </>
        }
        {
            !isConnected && <>
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
                    onClick={() => open()}
                >
                    <span style={HeroButtonText}>Connect</span>
                </Button>
            </>
        }
        
    </NavbarContainer>
  )
}

export default Navbar