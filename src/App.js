/* eslint-disable */

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  let post = "하양 카츠 맛집";
  let [글제목, set글제목] = useState(['남자 코트 추천', '하양 카츠 맛집', '리액트 처음해용']);
  let [logo] = useState('ReactBlog');
  let [좋아요, set좋아요] = useState([0,0,0]);
  let [modal, setModal] = useState(false);
  let [title, setTitle] = useState(0);
  let [inputValue, setInputValue] = useState('');
  let [발행날짜, set발행날짜] = useState(['7월 13일','7월 19일','7월 20일'])

  return (
    <div className="App">
      <div className="black-nav">
        <h4>{logo}</h4>
      </div>

      <button onClick={()=> {
        let copy = [...글제목];
        copy[0] = '여자 코트 추천';
        set글제목(copy);
      }}>
      글 수정
      </button>
      <button onClick={()=>{
        let copy = [...글제목];
        copy.sort();
        set글제목(copy);
      }}>
      글 정렬
      </button>
        
      {
        글제목.map(function(a, i){
          return (
            <div className="list" key={i}>
              <h4 onClick={()=>{setModal(!modal); setTitle(i)}}>
                { a } {/* a 만 적어도 되고, 글제목[i] 적어도 됨!*/}
                <span onClick={ (e) => {
                  e.stopPropagation();    // 이벤트 버블링 방지
                  let copy = [...좋아요];
                  copy[i] = copy[i]+1 ;
                  set좋아요(copy)
                }}>👍</span> { 좋아요[i] }
              </h4>

              <p>{발행날짜[i]} 발행</p>
              
              <button onClick={()=>{
                let copy = [...글제목];
                copy.splice(i,1);
                set글제목(copy);
              }}>삭제</button>
            </div>
          )
        })
      }

      {
        modal == true 
        ? <Modal 
            title={title}
            color={'skyblue'} 
            글수정={set글제목}
            글제목={글제목} 
          /> 
        : null
      }

      <input onChange={ (e)=>{setInputValue(e.target.value)} }></input>
      <button onClick={()=>{
        if (inputValue.trim() === "") {
          alert("입력이 되지 않았습니다.");
        } else {
          let copy글제목 = [inputValue, ...글제목];
          // copy글제목.unshift(inputValue);
          let copy좋아요 = [0, ...좋아요];
          let today = new Date();
          let formattedDate = `${today.getMonth() + 1}월 ${today.getDate()}일`;
          let copy발행날짜 = [formattedDate, ...발행날짜];
          
          set좋아요(copy좋아요);
          set글제목(copy글제목);
          set발행날짜(copy발행날짜);
        }
      }}>글발행</button>

    </div>
  );
}

function Modal(props){
  return(
    <div className="modal" style={{background: props.color}}>
      <h4>{ props.글제목[props.title]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={()=> {props.글수정(['여자 코트 추천', '하양 카츠 맛집', '리액트 처음해용'])}}>글수정</button>
     </div>
  )
}
export default App;
