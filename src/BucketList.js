// 리액트 패키지를 불러옵니다.
import React from 'react';
import styled from 'styled-components';

// 리덕스
import { useSelector, useDispatch } from 'react-redux';


const BucketList = (props) => {
    // -1) BucketList.js에 useSelector() 적용하기
    const bucket_list = useSelector(state => state.bucket.list);

    console.log(bucket_list);
    // 컴포넌트가 뿌려줄 ui 요소(리엑트 엘리먼트라고 불러요.)를 반환해줍니다.
    return (
        <ListStyle>
            {/* 2) 몇 번째 상세에 와있는 지 알기 위해, URL 파라미터를 적용하자 --- app.js에도 적용한다 */}
            {bucket_list.map((list, index) => {
                return (
                    <ListItem
                        className="list-item"
                        complete={list.complete}
                        key={index}
                        onClick={() => { props.history.push('/detail/'+index) }}
                    >{list.text}</ListItem>);
                })
            }
        </ListStyle>
    );
}


const ListStyle = styled.div`
    display: flex;
    flex-direction: column;
    height: 50vh;
    overflow-x: hidden;
    overflow-y: auto;
    max-height: 50vh;
`

const ListItem = styled.div`
    padding: 16px;
    margin: 8px;
    background-color: ${props => props.complete? "#8b5599":"#DCC2E2"};
    color: ${props => props.complete ? "#DCC2E2" : "#8b5599"};
    font-weight: 550;
    border-radius: 5px;
`

// 우리가 만든 함수형 컴포넌트를 export 해줍니다.
// export 해주면 다른 컴포넌트에서 BucketList 컴포넌트를 불러다 쓸 수 있어요.
export default BucketList;