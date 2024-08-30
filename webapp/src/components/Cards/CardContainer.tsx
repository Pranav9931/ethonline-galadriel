import styled from "styled-components";

export const SceneCardContainer = styled.div`
    width: calc(100% - 50px);
    background: #1E1E1E;
    height: 300px;
    box-sizing: border-box;
    margin-top: 10px;
    padding: 0 0 0 45px;
    transform: skew(-15deg);
    margin-left: 20px;
    display: block;
    justify-content: space-between;
    overflow: hidden;
    gap: 20px;
`

export const SceneCardContent = styled.div`
    transform: skew(15deg);
    display: flex;
    gap: 20px;
    justify-content: space-between;
`

export const SceneImage = styled.img`
    width: 700px;
    object-fit: cover;
    object-position: top center;
    flex: 1;
    transform: skew(-15deg);
`