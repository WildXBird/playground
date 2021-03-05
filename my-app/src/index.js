import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import { RPicture, ResFetchRaw } from './request';
import reportWebVitals from './reportWebVitals';
import { Modal } from 'antd';


if (!!!document.getElementById('antd-css-import')) {
  let head = document.head
  let link = document.createElement("link")
  link.id = 'antd-css-import'
  link.rel = "stylesheet"
  link.type = "text/css"
  link.href = 'https://cdn.jsdelivr.net/npm/antd@4.13.0/dist/antd.dark.min.css';
  head.appendChild(link)
}

// console.log(Request())
ReactDOM.render(
  <React.StrictMode>
    <style>
      {` 
  .ant-dropdown{
    user-select: none;
  }
  `}
    </style>
    <div style={{ width: "100%", maxWidth: 400, height: "100%", background: "#25797d" }}>
      <RPicture width={256} height={256} path={"/browser-voiceAssistant/WeatherIcon/100.png"} />
      <RPicture width={3840} height={2160} path={"/r6sground.cn/res/assets/backgrounds/tom-clancys-rainbow-six-siege-pro-league-4k-5a.jpg"} />
      <RPicture width={1920} height={1080} path={"/r6sground.cn/res/assets/backgrounds/10.jpg"} style={{ display: "inline-block" }} />
      {/* <Modal
        title={null}
        footer={null}
        closable={false}
        maskClosable={true}
        onCancel={()=>{console.log("onCancel")}}
        visible={true}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal> */}
    </div>
    {/* <App /> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
