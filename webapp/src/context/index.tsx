import { createContext, ReactNode, useContext, useState } from "react";

const StateContext = createContext({} as any);

type CrimeScene = {
    id: number,
    title: string,
    desc: string,
    imgUrl: string
}

type Evidence = {
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

    const contract: string = '';
    const [crimeScene, setCrimeScene] = useState<CrimeScene|null>(null)
    const [evidence, setEvidence] = useState<Evidence | null>(null)
    const [character, setCharacter] = useState<Character | null>(null)

    return (
        <StateContext.Provider value={
            {
                contract,
                crimeScene,
                setCrimeScene,
                evidence,
                setEvidence,
                character,
                setCharacter
            }
        }>
            {children}
        </StateContext.Provider>
    );
};


export const useStateContext = () => useContext(StateContext);