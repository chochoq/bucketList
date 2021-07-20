import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteBucket } from './redux/modules/bucket';

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

            <button onClick={() => {
                dispatch(deleteBucket(bucket_index));
                props.history.goBack();
            }}>삭제</button>
        </div>
    )
}

export default Detail;