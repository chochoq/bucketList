import React from "react";
import styled from 'styled-components';

import { useSelector } from 'react-redux';

const Progress = (props) => {
    const bucket_list = useSelector(state => state.bucket.list);

    let count = 0;

    bucket_list.map((l, idx) => {
        if (l.complete) {
            count++;
        }
    });

    return (
        <ProgressBar>
            <Highlight width={(count / bucket_list.length) * 100 + "%"} />
            <ProgressCircle/>
        </ProgressBar>
    );
}

const ProgressBar = styled.div`
    background-color:#eee;
    width:100%;
    height:20px;
    border-radius: 60px;
    display: flex;
    align-items: center;
`;

const Highlight = styled.div`
    background-color:#8B5599;
    height:20px;
    width:${props => props.width};
    transition: width 1s;

    border-radius: 60px;
    
`;

const ProgressCircle = styled.div`
    background-color:#FFF;
    border : 5px solid #DCC2E2;
    box-sizing:border-box;
    width: 40px;
    height: 40px;
    border-radius:150px;

    display: flex;
    margin: 0px 0px 0px -15px;
    

`;

export default Progress;