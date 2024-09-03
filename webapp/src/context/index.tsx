import { createContext, ReactNode, useContext, useState } from "react";

const StateContext = createContext({} as any);

export type CrimeScene = {
    id: number,
    title: string,
    desc: string,
    imgUrl: string
}

export type Evidence = {
    evidenceId: number,
    name: string,
    dangerType: string,
    imgUrl: string
}[]

export type Character = {
    id: number,
    imgUrl: string,
    name: string,
    complexion: string,
    crimeRecords: string,
    noOfCrimes: number,
    onBail: boolean
}

export const StateContextProvider = ({ children }: { children: ReactNode }) => {
    // state logic here

    const contract: string = '0x64408810AE13271A409e4Fd3510Db9130d5dfe6f';
    const [crimeScene, setCrimeScene] = useState<CrimeScene|null>(null)
    const [evidence, setEvidence] = useState<Evidence | null>(null)
    const [character, setCharacter] = useState<Character | null>(null)

    const [finalPrompt, setFinalPrompt] = useState<string | null>(null)

    return (
        <StateContext.Provider value={
            {
                contract,
                crimeScene,
                setCrimeScene,
                evidence,
                setEvidence,
                character,
                setCharacter,
                finalPrompt,
                setFinalPrompt
            }
        }>
            {children}
        </StateContext.Provider>
    );
};


export const useStateContext = () => useContext(StateContext);