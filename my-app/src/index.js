import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import { Rimg, ResFetchRaw } from './request';
import reportWebVitals from './reportWebVitals';

// console.log(Request())
ReactDOM.render(
  <React.StrictMode>
    <div style={{width:"100%",height:"100%",background:"#25797d"}}>
      {/* <Rimg width={256} height={256} path={"/browser-voiceAssistant/WeatherIcon/100.png"} style={{ display: "inline-block" }} /> */}
      <Rimg width={256} height={256} path={"/r6sground.cn/res/assets/backgrounds/tom-clancys-rainbow-six-siege-pro-league-4k-5a.jpg"} style={{ display: "inline-block" }} />
    </div>
    {/* <App /> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
