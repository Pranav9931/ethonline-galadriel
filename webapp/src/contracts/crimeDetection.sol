// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

// import "hardhat/console.sol";
import "./interfaces/IOracle.sol";

contract CrimeInvestigation {
    // @notice address of the contract owner
    address private owner;

    // @notice address of the oracle address
    address public oracleAddress;
    IOracle.Message public message;
    string public response;
    IOracle.OpenAiRequest private config;

    struct CrimeScenes {
        address owner;
        string title;
        string desc;
        string sceneImgUrl;
    }

    struct Characters {
        address owner;
        string name;
        string complexion;
        string crimeRecordsDesc;
        uint256 numberOfCrimesRegistered;
        bool onJudicialBail;
        string imgUrl;
    }

    struct Evidences {
        address owner;
        string name;
        string dangerType;
        string imgUrl;
    }

    // @notice mappings
    mapping(uint256 => CrimeScenes) public scenes;
    mapping(uint256 => Characters) public character;
    mapping(uint256 => Evidences) public evidence;

    // @notice helpers
    uint256 public numberOfCrimeScenes = 0;
    uint256 public numberOfCharacters = 0;
    uint256 public numberOfEvidences = 0;

    // events:
    event OracleAddressUpdated(address indexed newOracleAddress);
    event CreateMessage(address indexed createrAddress, string msg);
    event CreateCrimeScene(address indexed ownerAddress, string title, string imgUrl);
    event CreateCharacter(address indexed ownerAddress, string name, string imgUrl);
    event CreateEvidence(address indexed ownerAddress, string name, string imgUrl);

    constructor(address initialOracleAddress) {
        owner = msg.sender;
        oracleAddress = initialOracleAddress;

        config = IOracle.OpenAiRequest({
            model : "gpt-4-turbo", // gpt-4-turbo gpt-4o
            frequencyPenalty : 21, // > 20 for null
            logitBias : "", // empty str for null
            maxTokens : 1000, // 0 for null
            presencePenalty : 21, // > 20 for null
            responseFormat : "{\"type\":\"text\"}",
            seed : 0, // null
            stop : "", // null
            temperature : 10, // Example temperature (scaled up, 10 means 1.0), > 20 means null
            topP : 101, // Percentage 0-100, > 100 means null
            tools : "",
            toolChoice : "", // "none" or "auto"
            user : "" // null
        });
    }

    // @modifiers
    // @notice: Ensure the caller is owner.
    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not owner");
        _;
    }

    modifier onlyOracle() {
        require(msg.sender == oracleAddress, "Only Oracle address is allowed");
        _;
    }    

    // @notice Updates the oracle address
    // @param newOracleAddress The new oracle address to set
    function setOracleAddress(address newOracleAddress) public onlyOwner {
        oracleAddress = newOracleAddress;
        emit OracleAddressUpdated(newOracleAddress);
    }

    // @notice Last response received from the oracle
    string public lastResponse;

    // @notice Counter for the number of calls made
    uint private callsCount;

    // story board creation
    function createCrimeScene(string memory _title, string memory _desc, string memory _sceneUrl) public returns (bool) {
        address newOwner = msg.sender;
        bool success = false;
        CrimeScenes storage newCrimeScene = scenes[numberOfCrimeScenes];

        // feed data
        newCrimeScene.owner = newOwner;
        newCrimeScene.title = _title;
        newCrimeScene.desc = _desc;
        newCrimeScene.sceneImgUrl = _sceneUrl;

        success = true;
        numberOfCrimeScenes++;

        emit CreateCrimeScene(newOwner, _title, _sceneUrl);

        return success;
    }

    function createCharacter(string memory _name, string memory _complexion, string memory _crimeRecordsDesc, uint256 _noOfCrimes, bool _onBail, string memory _imgUrl) public returns (bool) {
        address newOwner = msg.sender;
        bool success = false;
        Characters storage newCharacter = character[numberOfCharacters];

        // feed data
        newCharacter.owner = newOwner;
        newCharacter.name = _name;
        newCharacter.complexion = _complexion;
        newCharacter.crimeRecordsDesc = _crimeRecordsDesc;
        newCharacter.numberOfCrimesRegistered = _noOfCrimes;
        newCharacter.onJudicialBail = _onBail;

        success = true;
        numberOfCharacters++;

        emit CreateCharacter(newOwner, _name, _imgUrl);

        return success;
    }

    function createEvidence(string memory _name, string memory _dangerType, string memory _imgUrl) public returns (bool) {
        address newOwner = msg.sender;
        bool success = false;
        Evidences storage newEvidence = evidence[numberOfEvidences];

        // feed data
        newEvidence.owner = newOwner;
        newEvidence.name = _name;
        newEvidence.dangerType = _dangerType;
        newEvidence.imgUrl = _imgUrl;

        success = true;
        numberOfEvidences++;

        emit CreateEvidence(newOwner, _name, _imgUrl);

        return success;
    }
    

    // important functions: galadriel GPTs
    function initialiseImageGeneration(string memory _msgString) public returns (uint) {
        uint currentId = callsCount;
        callsCount = currentId + 1;

        IOracle(oracleAddress).createFunctionCall(
            currentId,
            "image_generation",
            _msgString
        );

        return currentId;
    }

    function onOracleFunctionResponse(
        uint,
        string memory response,
        string memory errorMessage
    ) public onlyOracle {
        if (keccak256(abi.encodePacked(errorMessage)) != keccak256(abi.encodePacked(""))) {
            lastResponse = errorMessage;
        } else {
            lastResponse = response;
        }
    }

    function sendMessage(string memory _message) public {
        message = createTextMessage("user", _message);
        IOracle(oracleAddress).createOpenAiLlmCall(0, config);
    }

    function createTextMessage(string memory role, string memory content) private pure returns (IOracle.Message memory) {
        IOracle.Message memory newMessage = IOracle.Message({
            role: role,
            content: new IOracle.Content[](1)
        });
        newMessage.content[0].contentType = "text";
        newMessage.content[0].value = content;
        return newMessage;
    }

    function getMessageHistory(
        uint /*_runId*/
    ) public view returns (IOracle.Message[] memory) {
        IOracle.Message[] memory messages = new IOracle.Message[](1);
        messages[0] = message;
        return messages;
    }


    function onOracleOpenAiLlmResponse(
        uint /*runId*/,
        IOracle.OpenAiResponse memory _response,
        string memory _errorMessage
    ) public {
        require(msg.sender == oracleAddress, "Caller is not oracle");
        if (bytes(_errorMessage).length > 0) {
            response = _errorMessage;
        } else {
            response = _response.content;
        }
    }


}