import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Detail = (props) => {

    // -3) 상세페이지에서 버킷리스트 내용을 띄워보자
    const bucket_list = useSelector((state) => state.bucket.list);
    console.log(bucket_list);
    console.log(props);
    const bucket_index = parseInt(props.match.params.index);
    
    return (
        <div>
            <h1>{bucket_list[bucket_index]}</h1>
        </div>
    )
}

export default Detail;