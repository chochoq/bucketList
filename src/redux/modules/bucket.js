// bucket.js
import { firestore } from '../../firebase';

const bucket_db = firestore.collection("bucket");

// Actions
// 현재 기능은 조회하기, 추가하기가 있다 
const LOAD = "bucket/LOAD";
const CREATE = "bucket/CREATE";
const DELETE = "bucket/DELETE";
// 완료하기
const UPDATE = "bucket/UPDATE";

const LOADED = "bucket/LOADED";

// 처음에 들어가면 리스트가 있음->기본값
const initialState = {
    list: [
        {text:'영화관 가기',complete:false},
        {text:'매일 책읽기',complete:false},
        {text:'수영 배우기',complete:false},
    ],
    is_loaded : false,
};

// Action Creators
export const loadBucket = (bucket) => {
    return { type: LOAD, bucket };
}

export const createBucket = (bucket) => {
    return { type: CREATE, bucket };
}

export const deleteBucket = (bucket) => {
    return {type:DELETE,bucket};
}
export const updateBucket = (bucket) => {
    return {type:UPDATE,bucket};
}
export const isLoaded = (loaded) => {
    return {type: LOADED, loaded};
}


// list db - redux 연결
export const loadBucketFB = () => {
    return function (dispatch) {
        bucket_db.get().then((docs) => {
            let bucket_data = [];

            docs.forEach((doc) => {
                if (doc.exists) {
                    bucket_data = [...bucket_data, { id: doc.id, ...doc.data() }];
                }
            })

            console.log(bucket_data);
            dispatch(loadBucket(bucket_data));
        })
    }
}

export const addBucketFB = (bucket) => {
    return function (dispatch) {
        let bucket_data = { text: bucket, complete: false };
        dispatch(isLoaded(false));

        bucket_db.add(bucket_data).then((docRef) => {
            bucket_data = { ...bucket_data, id: docRef.id };
            dispatch(createBucket(bucket_data));
            dispatch(isLoaded(true));
        })
    }
}

export const updateBucketFB = (idx) => {
    return function (dispatch, getState) {
        const _bucket_data = getState().bucket.list[idx];
        dispatch(isLoaded(false));

        let bucket_data = { ..._bucket_data, complete: true };

        // err
        if (!bucket_data.id){
            return;
        }

        bucket_db.doc(_bucket_data.id).update(bucket_data).then((docRef) => {
            dispatch(updateBucket(idx));
            dispatch(isLoaded(true));
        }).catch((err) => {
            console.error(err);
        })
        
    }
}

export const deleteBucketFB = (idx) => {
    return function (dispatch, getState) {
        const _bucket_data = getState().bucket.list[idx];
        dispatch(isLoaded(false));

        if (!_bucket_data.id) {
            return;
        }

        bucket_db.doc(_bucket_data.id).delete().then((docRef) => {
            dispatch(deleteBucket(idx));
            dispatch(isLoaded(true));
        }).catch(error => {
            console.error(error);
            alert('Error');
        })
    }
}

// Reducer

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case "bucket/LOAD": {
            if (action.bucket.length > 0) {
                return { list: action.bucket, is_loaded: true };
            }
            return state;
        }
            
        case "bucket/CREATE": {
            const new_bucket_list = [...state.list, action.bucket];
            return {list:new_bucket_list, }
        }
        
        case "bucket/DELETE": {
            const bucket_list = state.list.filter((l, idx) => {
                if (idx !== action.bucket) {
                    return l;
                }
            });
            return {list:bucket_list, is_loaded: action.loaded};
        }
        case "bucket/UPDATE": {
            const bucket_list = state.list.map((l, idx) => {
                if (idx === action.bucket) {
                    return { ...l, complete: true };
                } else {
                    return l;
                }
            });
            return {list:bucket_list, is_loaded: action.loaded};
        }
        case "bucket/LOADED": {
            return {...state, is_loaded: action.loaded};
        }
        default:
            return state;
    }
}
