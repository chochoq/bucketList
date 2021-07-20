import React from 'react';

import BucketList from './BucketList';
import Detail from './Detail';
import NotFound from './NotFound';
import Progress from './Progress';

import styled from 'styled-components';

import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';

import { connect } from 'react-redux';
import { loadBucket, createBucket } from './redux/modules/bucket';

// 1) 리덕스 모듈과 connect 함수를 불러옵니다.
// 스토어에 있는 스테이트를 props의 형태로 App.js에 넣어준다
const mapStateToProps = (state) => {
  return {bucket_list : state.bucket.list};
}

// 2)상태값을 가져오는 함수와 액션 생성 함수를 부르는 함수를 만들어줍니다.
// 액션을 디스패치한다(??)
const mapDispatchToProps = (dispatch) => {
  return {
    load: () => {
      dispatch(loadBucket());
    },
    create: (bucket) => {
      dispatch(createBucket(bucket));
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
    console.log(this.text);
    console.log(this.text.current);
    // 4) 콘솔에 this.props를 찍어봅니다. 
    console.log(this.props);
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

          <Container className="container">
            
            <Title className="title">내 버킷리스트</Title>
            <Progress/>
            <Line className="line" />
            

          <Switch>
              {/* route에서 props 넘기기 */}
              {/* 5) this.state에  있는 list를 지우고 스토어에 있는 값으로 바꿔봅시다! */}
            <Route exact path="/"
                render={(props) => <BucketList history={this.props.history} list={this.props.bucket_list} />}></Route>
                
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
            <input type="text" ref={this.text}/>
            <button onClick={this.addBucketList}>추가하기</button>
            <button onClick={() => {
              this.props.history.goBack();
            }}>뒤로가기</button>
          </Add>

          <button onClick={() => {
            window.scrollTo({top:0,left:0, behavior:"smooth"});
          }}>go to top</button>
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
  min-height: 80vh;
  background-color: #fff;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
`

const Title = styled.h1`
  color: rgba(171, 106, 184, 0.411);
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
`;

// 3)connect로 컴포넌트와 스토어를 엮어줍니다.
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(App));