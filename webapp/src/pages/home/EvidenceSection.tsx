import styled from 'styled-components'
import MainText from '../../components/Typography'
import { EvidenceCard } from '../../components/Cards'
import { Evidence1, Evidence2, Evidence3, Evidence4, Evidence5 } from '../../assets'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Skeleton, Slide, TextField } from '@mui/material'
import { Evidence, useStateContext } from '../../context'
import { useWeb3ModalProvider } from '@web3modal/ethers/react'
import React from 'react'
import { BrowserProvider } from 'ethers'
import { Contract } from 'ethers'
import { TransitionProps } from '@mui/material/transitions'
import SelectInput from '@mui/material/Select/SelectInput'


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const EvidenceSectionContainer = styled.div`
    padding: 0 35px;
`
const EvidencesContainer = styled.div`
    display: flex;
    gap: 20px;
    padding: 30px;
`


const EvidenceBody = styled.div`
  padding: 10px;
  background: #171717;
  height: 100%;
`


const EvidenceSection = () => {

  const contractABI = [
    "function initialiseImageGeneration(string memory message) public returns (uint)",
    "function lastResponse() public view returns (string)"
  ];

  const {contract, evidence, setEvidence} = useStateContext();
  const { walletProvider } = useWeb3ModalProvider()

  const [open, setOpen] = React.useState(false);

  const [isSet, setIsSet] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [hash, setHash] = React.useState("");

  const [evidencePrompt, setEvidencePrompt] = React.useState("");
  const [name, setName] = React.useState("");
  const [dangerType, setDangerType] = React.useState("");
  const [generatedEvidenceLink, setGeneratedEvidenceLink] = React.useState("")

  const handleSubmit = async () => {

    if (evidencePrompt.length === 0) return;
    setIsLoading(true);
    try {
      const ethersProvider = new BrowserProvider(walletProvider as any);
      const signer = await ethersProvider.getSigner()

      const contractInstance = new Contract(contract, contractABI, signer)
      const result = await contractInstance.initialiseImageGeneration(evidencePrompt);

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
      setGeneratedEvidenceLink(newResponse);

    } catch (err: any) {
      console.log(err)
    }
    


    setIsLoading(false)
    setIsSet(true)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEvidenceSet = () => {
    if (name.length > 0 && dangerType.length > 0 && generatedEvidenceLink.length > 0) {
      const getId: number = Math.ceil(8 * Math.random())
      if(evidence && evidence.length > 0) {
        setEvidence((prevEvidences: Evidence[]) => ([...prevEvidences, {
          evidenceId: getId,
          name,
          dangerType,
          imgUrl: generatedEvidenceLink
        }]))
      } else {
        setEvidence(() => ([{
          evidenceId: getId,
          name,
          dangerType,
          imgUrl: generatedEvidenceLink
        }]))
      }
      
    }
  }


  return (
    <EvidenceSectionContainer>
        <MainText textSize={24} content='FOUND EVIDENCES' />
        <EvidencesContainer>
            <EvidenceCard name='BLOOD STAINS' dangerType='EXTREME' imgUrl={Evidence1} evidenceId={1} />  
            <EvidenceCard name='KNIFE' dangerType='MODERATE' imgUrl={Evidence2} evidenceId={2} />  
            <EvidenceCard name='BULLET SHELLS' dangerType='EXTREME' imgUrl={Evidence3} evidenceId={3} />  
            <EvidenceCard name='TISSUE WITH BLOOD' dangerType='LOW' imgUrl={Evidence4} evidenceId={4} />  
            <EvidenceCard name='SWORD' dangerType='EXTREME' imgUrl={Evidence5} evidenceId={5} />  
        </EvidencesContainer>


      {/* MUI Dialogue Box */}
      <React.Fragment>
          <Button onClick={handleClickOpen} fullWidth>CREATE YOUR OWN EVIDENCE</Button>
          <Dialog
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
          >
            <DialogTitle sx={{background: '#1E1E1E', color: '#ffffff', fontSize: '14px'}}>{"ADD EVIDENCES TO YOUR STORYBOARD?"}</DialogTitle>
            <EvidenceBody>
              <DialogContent>
                <DialogContentText sx={{color: '#FFFFFF50'}} id="alert-dialog-slide-description">
                  Let Galadriel help generate relevant evidence images. We use Dall-E to generate such images for you.
                </DialogContentText>
                <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="name"
                  name="evidence"
                  label="PROMPT FOR EVIDENCE"
                  type="type"
                  fullWidth
                  variant="outlined"
                  sx={{
                    '& .MuiInputBase-input': {
                      color: '#ffffff', // Text color
                      borderRadius: '5px'
                    },
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
                  }
                  }}

                  onChange={(e) => setEvidencePrompt(e.target.value)}
                />
                <Button sx={{background: '#ffffff', color: '#000000', height: '55px', padding: '0 20px', fontWeight: 600}}
                  onClick={() => handleSubmit()}
                >GENERATE</Button>
                </div>

                {isLoading && <div style={{display: 'flex', gap: '10px', margin: '10px 0 0 0'}}>
                  <Skeleton sx={{ height: 160, width: 150 }} variant="rectangular" />
                  <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: '10px'}}>
                    <Skeleton sx={{height: 40}} variant="rectangular" />
                    <Skeleton sx={{height: 40}} variant="rectangular" />
                  </div>
                </div>}

                {isSet && !isLoading && <>
                  <div style={{display: 'flex', gap: '10px', margin: '10px 0 0 0'}}>
                    <img style={{ height: 160, width: 150 }} src={generatedEvidenceLink} />
                    <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: '10px'}}>
                      <label htmlFor='evidence' style={{color: '#ffffff', fontSize: '12px', fontWeight: '800', marginBottom: '-10px'}}>NAME</label>
                      <input id='evidence' style={{
                        height: 30,
                        border: '1px solid #FFFFFF'
                      }} onChange={(e) => setName(e.target.value)} />

                      <label htmlFor='danger' style={{color: '#ffffff', fontSize: '12px', fontWeight: '800', margin: '0 0 -10px 0'}}>DANGER TYPE</label>
                      <input id='danger' style={{
                        height: 30,
                        border: '1px solid #FFFFFF'
                      }} onChange={(e) => setDangerType(e.target.value)} />

                      <Button sx={{background: '#FFFFFF', color: '#000000', fontWeight: 600}} onClick={() => handleEvidenceSet()}>SELECT</Button>

                    </div>
                  </div>
                </>}



              </DialogContent>

              <DialogActions>
                <Button onClick={handleClose}>CONTINUE</Button>
              </DialogActions>

            </EvidenceBody>
          </Dialog>
        </React.Fragment>



    </EvidenceSectionContainer>
  )
}

export default EvidenceSection