// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

// import "hardhat/console.sol";
import "./interfaces/IOracle.sol";

contract CrimeInvestigation {
    // @notice address of the contract owner
    address private owner;

    // @notice address of the oracle address
    address public oracleAddress;

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
    }

    // @notice mappings
    mapping(uint256 => CrimeScenes) public scenes;
    mapping(uint256 => Characters) public character;

    // @notice helpers
    uint256 public numberOfCrimeScenes = 0;
    uint256 public numberOfCharacters = 0;

    // events:
    event OracleAddressUpdated(address indexed newOracleAddress);
    event CreateMessage(address createrAddress, string msg);
    event CreateCrimeScene(address ownerAddress, string title);
    event CreateCharacter(address ownerAddress, string name);

    constructor(address initialOracleAddress) {
        owner = msg.sender;
        oracleAddress = initialOracleAddress;
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

    function initialiseImageGeneration(string memory message) public returns (uint) {
        uint currentId = callsCount;
        callsCount = currentId + 1;

        IOracle(oracleAddress).createFunctionCall(
            currentId,
            "image_generation",
            message
        );

        return currentId;
    }

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

        emit CreateCrimeScene(newOwner, _title);

        return success;
    }

    function createCharacter(string memory _name, string memory _complexion, string memory _crimeRecordsDesc, uint256 _noOfCrimes, bool _onBail) public returns (bool) {
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

        emit CreateCharacter(newOwner, _name);

        return success;
    }
    

}