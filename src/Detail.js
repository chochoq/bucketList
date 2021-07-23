import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateBucketFB, deleteBucketFB } from './redux/modules/bucket';
import styled from 'styled-components';

const Detail = (props) => {
    const dispatch = useDispatch();

    // -3) 상세페이지에서 버킷리스트 내용을 띄워보자
    const bucket_list = useSelector((state) => state.bucket.list);
    console.log(bucket_list);
    console.log(props);
    const bucket_index = parseInt(props.match.params.index);
    
    return (
        <div>
            <h1>{bucket_list[bucket_index].text}</h1>

            <Button onClick={() => {
                dispatch(deleteBucketFB(bucket_index));
                props.history.goBack();
            }}>삭제</Button>

            <Button onClick={() => {
                dispatch(updateBucketFB(bucket_index));
                props.history.goBack();
            }}>완료하기</Button>
        </div>
    )
}

const Button = styled.button`
    width:25%;
    background-color: #DCC2E2;
    border: 1px solid #ddd0e0;
    border-radius: 10px;
    margin: 5% 12%;
`;


export default Detail;