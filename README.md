# ETHOnline - GALADRIEL ENIGMA
AN AI DRIVEN SCENARIO BASED CRIME SCENE SIMULATION APP.

## Components:
- Blockchain (GALADRIEL)
  - CONTRACT ADDRESS: 0x0bd0f2eC1281C2678F98557FF725b572aFf91cE0
  - CHAIN: GALADRIEL DEVNET
  - CHAIN ID: 696969
  - URL: "https://devnet.galadriel.com/"
  - CONTRACT URL: [CLICK HERE](https://github.com/Pranav9931/ethonline-galadriel/blob/main/webapp/src/contracts/crimeDetection.sol)
- Webapp (React.JS TypeScript)
  - Deployed Version: [WEBAPP URL](https://galadriel.netlify.app)
- 3D Simulation (Unreal Engine)
  - Unreal Procedural Generation Tools: [UNREAL DOCS](https://dev.epicgames.com/community/learning/tutorials/j4xJ/unreal-engine-introduction-to-procedural-generation-plugin-in-ue5-3)
  - Convai Plugin: Easy-to-use interface to create your characters' intelligence, and plugins to connect them to your character assets and worlds.
  - High Graphic Fedelity

## PROJECT SETUP:
### SMART CONTRACT DEPLOYMENT:
To deploy your own Smart Contract on Galadriel Devnet, follow the following commands below.
STEP 1: Clone the contracts repo from Galadriel GitHub repositories:
```bash
git clone https://github.com/galadriel-ai/contracts.git
```
STEP 2: Move to the contracts folder
```bash
cp contracts/contracts
```
STEP 3: Set your environment variables, using following commands:
```bash
cp template.env .env
```
You can replace your own environment variables in the `.env` file created in the folder.

STEP 4: Create your own contract:

You can create your own version of contract or copy the same contract I used for this project from [CONTRACT URL](https://github.com/Pranav9931/ethonline-galadriel/blob/main/webapp/src/contracts/crimeDetection.sol) 

STEP 5: Set script variable to deploy the contract you just created.

Open `package.json` file and set a script under scripts section: 
```
"deployCustomContract:galadriel": "npx hardhat run scripts/deployCustomContract.ts --network galadriel"
```
STEP 6: Create your own scripts file:

In scripts folder you should create your own scripts file with the name: `deployCustomContract.ts`, you can take examples from `scripts/deployTest.ts` file.

STEP 7: Deploy your contract:

You can deploy your contract by using the following commands:
```bash
npm run deployCustomContract:galadriel
```
STEP 8: Post deployment:

Once you are done with deployment, you should be able to see a contract address on your console, that you can able to use in the contracts variable in the app at [Contract Address in Context](https://github.com/Pranav9931/ethonline-galadriel/blob/cb037f5adf5b9efc52b00f14e0e4eee1c6f87e27/webapp/src/context/index.tsx#L32) 

### WEBAPP PROJECT SETUP
STEP 1: Clone the repo by using the following code into your desired folder.
```bash
git clone https://github.com/Pranav9931/ethonline-galadriel.git
```
STEP 2: Move to the `webapp` folder, by using the code below
```bash
cd webapp
```
STEP 3: Set your environment variables:

Follow the commands below
```bash
cp .env.example .env
```
You should see a `.env` file created in the webapp folder. Replace / add the environment variables of yours.

STEP 4: Install packages using the following command:
```bash
npm install
```
STEP 5: Run the app using following command:

Once you have finished all the above steps properly without any error being shown on the terminal, you must be able to run the app by:
```bash
npm run dev
```
STEP 6: Build your project (OPTIONAL):

If you want to deploy your own version of webapp, you can follow the below command to make a build of the app.
```bash
npm run build
```

### 3D SIMULATOR SETUP
Well you are lucky you don't have to do anything hard here :)

You can download our `.exe` file from the link: [Unreal Project EXE File](https://mega.nz/file/eiwRlQKT#3aTzXAza14XPxo58tm2EmWc7-QGQPJqsMzUshiw_skU)

Once you have downloaded the file, `extract` the ZIP file, and move to the following folder:
```bash
Galadriel/Galadriel/Windows/
```
Now double click on the file name: `Metaplex`.

Wallah, You are able to run the simulation and interact with the Character inside it :)

To interact with the character:
```
Press [T] to speak
```

Please share and support this project :)
Thanks!!
