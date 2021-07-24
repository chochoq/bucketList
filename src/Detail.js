import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateBucketFB, deleteBucketFB } from './redux/modules/bucket';

import { Button, ButtonGroup } from '@material-ui/core';



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

            <ButtonGroup >
                <Button
                    style={{color: '#8b5599', border: '1px solid #8b5599'}}
                    onClick={() => {
                    dispatch(deleteBucketFB(bucket_index));
                    props.history.goBack();
                }}>삭제</Button>

                <Button
                    style={{color: '#8b5599', border: '1px solid #8b5599'}}
                    onClick={() => {
                    dispatch(updateBucketFB(bucket_index));
                    props.history.goBack();
                    }}>완료하기</Button>
            </ButtonGroup>
        </div>
    )
}


export default Detail;