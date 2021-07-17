import React from 'react';

// BucketList 컴포넌트를 import 해옵니다.
// import [컴포넌트 명] from [컴포넌트가 있는 파일경로];
import BucketList from './BucketList';
import Detail from './Detail'

// import './style.css';
// import './scss_ex.scss';
import styled from 'styled-components';
// import LifecycleEx from './LifecycleEx';

import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';



// 클래스형 컴포넌트는 이렇게 생겼습니다!
class App extends React.Component {

  constructor(props){
    super(props);
    // App 컴포넌트의 state를 정의해줍니다.
    this.state = {
      list: ['영화관 가기', '매일 책읽기', '수영 배우기'],
    };

    // input을 위한 ref
    this.text = React.createRef();
  }

  componentDidMount() {
    console.log(this.text);
    console.log(this.text.current);
  }
  
  addBucketList = () => {
    let list = this.state.list;
    const new_item = this.text.current.value;
    
    this.setState({ list: [...list, new_item] });
  }

  // 랜더 함수 안에 리액트 엘리먼트를 넣어줍니다!
  render() {
    // this 키워드를 통해 state에 접근할 수 있어요.
    console.log(this.state);

      return (
        <AppDiv className="App">
          {/* <LifecycleEx></LifecycleEx> */}
          <Container className="container">
              <Title className="title">내 버킷리스트</Title>
              <Line className="line" />
            
              {/* route에서 props 넘기기 */}
              <Route
                path="/"
                render={(props) => <BucketList history={this.props.history} list={this.state.list} />}></Route>
              
              <Route path="/detail" component={Detail}></Route>
          </Container>

          <Add>
            <input type="text" ref={this.text}/>
            <button onClick={this.addBucketList}>추가하기</button>
            <button onClick={() => {
              this.props.history.goBack();
            }}>뒤로가기</button>
          </Add>

          
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

export default withRouter(App);