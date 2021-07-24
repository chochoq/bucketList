import React from 'react';

import BucketList from './BucketList';
import Detail from './Detail';
import NotFound from './NotFound';
import Progress from './Progress';
import Spinner from './Spinner';

import styled from 'styled-components';

import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';

import { connect } from 'react-redux';
import { loadBucketFB, addBucketFB } from './redux/modules/bucket';

import { firestore } from "./firebase";

// 1) 리덕스 모듈과 connect 함수를 불러옵니다.
// 스토어에 있는 스테이트를 props의 형태로 App.js에 넣어준다
const mapStateToProps = (state) => ({
  bucket_list: state.bucket.list,
  is_loaded: state.bucket.is_loaded
});


// 2)상태값을 가져오는 함수와 액션 생성 함수를 부르는 함수를 만들어줍니다.
// 액션을 디스패치한다(??)
const mapDispatchToProps = (dispatch) => {
  return {
    load: () => {
      dispatch(loadBucketFB());
    },
    create: (bucket) => {
      dispatch(addBucketFB(bucket));
    }
  };
}

// 클래스형 컴포넌트는 이렇게 생겼습니다!
class App extends React.Component {

  constructor(props){
    super(props);
    // App 컴포넌트의 state를 정의해줍니다.
    this.state = {
      // 5) this.state에  있는 list를 지우고 스토어에 있는 값으로 바꿔봅시다!
    };

    // input을 위한 ref
    this.text = React.createRef();
  }

  componentDidMount() {
    this.props.load();    
  }
  
  addBucketList = () => {
    let list = this.state.list;
    const new_item = this.text.current.value;
    // 6) setState를 this.props.create로 바꿔봅시다!
    this.props.create(new_item);
  }

  // 랜더 함수 안에 리액트 엘리먼트를 넣어줍니다!
  render() {
    // this 키워드를 통해 state에 접근할 수 있어요.
    console.log(this.state);
    
    console.log(Switch);

      return (
        <AppDiv className="App">
          {!this.props.is_loaded ? (<Spinner />) : (
            <React.Fragment>
              <Container >
            
                <Title>🗒to do🗒</Title>
                <Progress/>
                <Line/>

                <Switch>
                    {/* route에서 props 넘기기 */}
                    {/* 5) this.state에  있는 list를 지우고 스토어에 있는 값으로 바꿔봅시다! */}
                  <Route exact path="/" component={BucketList}></Route>
                      
                    {/* 2) 몇 번째 상세에 와있는 지 알기 위해, URL 파라미터를 적용하자 ----- 함수형 리덕스사용법 -> de */}
                  <Route path="/detail/:index" component={Detail}/>
                    
                  {/* notfound에서 이미 history가 넘어갔지만, 
                    render 연습으로 다시 해봄.
                    props 사용or not으로 2가지 방법으로 해보았다
                  */}
                  {/* <Route render={() => <NotFound history={this.state.history}/> } /> */}
                  <Route render={(props) => <NotFound history={props.history}/> } />
                </Switch>

              </Container>

              <Add>
                <input type="text" ref={this.text}></input>
                <button onClick={this.addBucketList}>추가</button>
                
              </Add>

              <Back
                onClick={() => {
                  this.props.history.goBack();
              }}>🔙</Back>
              
              <Top onClick={() => {
                window.scrollTo({top:0,left:0, behavior:"smooth"});
              }}>🔝</Top>
              
            </React.Fragment>
          )}

          

          
      </AppDiv>
    );
  }
}


const AppDiv = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: rgba(171, 106, 184, 0.411);
  padding: 32px;
  box-sizing: border-box;
`

const Container = styled.div`
  max-width: 350px;
  min-height: 70vh;
  background-color: #fff;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
`

const Title = styled.h1`
  color: #8B5599;
  text-align: center;
`

const Line = styled.hr`
  margin: 16px 0px;
  border: 1px dotted #ddd;
`

const Add = styled.div`
  max-width: 350px;
  min-height: 5vh;
  background-color: #fff;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > * {
    padding: 5px;
  }
  & input {
    border-radius: 5px;
    margin-right: 10px;
    border: 1px solid #888;
    width: 70%;
    &:focus {
      background-color: #ddd;
    }
  }

  & button{
    width:25%;
    background-color: #DCC2E2;
    border: 1px solid #ddd0e0;
    border-radius: 10px;
  }
`;


const Top = styled.button`

  width:60px;
  height: 60px;

  align-items: center;
  background-color: #DCC2E2;
  border: 1px solid #DCC2E2;


  left: 50%;
  position: relative;

  font-size:40px;
`;
const Back = styled.button`

  width:60px;
  height: 60px;

  align-items: center;
  background-color: #DCC2E2;
  border: 1px solid #DCC2E2;

  left: 20%;
  position: relative;

  font-size:40px;
`;


// 3)connect로 컴포넌트와 스토어를 엮어줍니다.
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(App));