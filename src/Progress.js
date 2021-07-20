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
            <Highlight width={ (count/bucket_list.length)*100 + "%" }/>
        </ProgressBar>
    );
}

const ProgressBar = styled.div`
    background-color:#eee;
    width:100%;
    height:40px;
`;

const Highlight = styled.div`
    background-color:#DCC2E2;
    height:40px;
    width:${props => props.width};
    transition: width 1s;
`;

export default Progress;