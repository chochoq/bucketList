// bucket.js

// Actions
// 현재 기능은 조회하기, 추가하기가 있다
const LOAD = "bucket/LOAD";
const CREATE = "bucket/CREATE";

// 처음에 들어가면 리스트가 있음->기본값
const initialState = {
    list: ['영화관 가기', '매일 책읽기', '수영 배우기'],
};

// Action Creators
export const loadBucket = (bucket) => {
    return { type: LOAD, bucket };
}

export const createBucket = (bucket) => {
    return { type: CREATE, bucket };
}


// Reducer

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case "bucket/LOAD": {
            return state;
        }
            
        case "bucket/CREATE": {
            const new_bucket_list = [...state.list, action.bucket];
            return {list:new_bucket_list}
        }
    default: return state;
    }
}
