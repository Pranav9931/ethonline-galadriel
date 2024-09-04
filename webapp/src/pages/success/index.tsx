import React from 'react'
import styled from 'styled-components'
import { SuccessImg } from '../../assets'
import MainText from '../../components/Typography'

const SuccesPageContainer = styled.div`
    padding: 0 35px;
`

const SuccessPageContent = styled.div`
    background: #000000;
    border-radius: 10px;
    min-height: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const SuccessImage = styled.img`
    width: 400px;
    height: 300px;
    object-position: center center;
    margin-bottom: -70px;
`

const SuccessPage = () => {
  return (
    <SuccesPageContainer>
        <SuccessPageContent>
            <SuccessImage src={SuccessImg} />
            <br />
            <MainText textSize={24} content="3D SCENE GENERATED AND KNOWLEDGE BASE WAS UPDATED SUCCESSFULLY." />
        </SuccessPageContent>
    </SuccesPageContainer>
  )
}

export default SuccessPage