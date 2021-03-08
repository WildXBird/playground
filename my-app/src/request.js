import React, { PureComponent } from 'react';
import { Spin, Image } from 'antd';
import { LoadingOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import { Dcopy, createGUID } from './func/lib';
import { ContextMenu } from './contextmenu';

window.globalRConfig = {
  sourceList: [
    // "https://cdn.jsdelivr.net/gh/xieqiqiang001",
    "https://cdn.jsdelivr.net/gh/WildXBird",
  ]
}
let ResFetchRaw = function (pathname = "", isFullUrl = false, sourceIndex = -1, onProgress = (p, t, l) => { }) {
  return new Promise(function (resolve, reject) {
    if (pathname.indexOf("https://") === 0 && !isFullUrl) {
      console.error("ResFetchRaw", "got full url,but 'isFullUrl' is not true, pls check!")
    }
    if (pathname.indexOf("http://") === 0) {
      console.error("ResFetchRaw", "http URL is not allowed, pls replace!")
      reject(true)
    }
    if (sourceIndex < 0) {
      sourceIndex = 0
    }
    let url = pathname
    let sourceList = window.globalRConfig.sourceList///!!!!
    if (!isFullUrl) {
      if (typeof (sourceList[sourceIndex]) == "string") {
        url = sourceList[sourceIndex] + pathname
      } else {
        console.error("ResFetchRaw", "failed to load pathname:", pathname, ",ALL source unavailable")
        reject(true)
      }
    }
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "arraybuffer";
    xhr.onprogress = function (event) {
      if (event.total > 0) {
        onProgress(event.loaded / event.total, event.loaded, event.total)
      }
    };
    xhr.onreadystatechange = () => {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        if (xhr.status >= 200 && xhr.status <= 300) {
          let responseCode = xhr.status
          let contentType = xhr.getResponseHeader("Content-Type")
          let arrayBuffer = xhr.response
          resolve({ responseCode, contentType, arrayBuffer, url })
        } else {
          if (isFullUrl) {
            console.error("ResFetchRaw", "failed to load fullURL:", url)
          } else {
            console.error("ResFetchRaw", "failed to load pathname:", pathname, "changing source")
            sourceIndex++
            ResFetchRaw(pathname, isFullUrl, sourceIndex, onProgress).then(function (response) {
              resolve(response)
            }).catch(function (error) {
              reject(error)
            })
          }

        }
      }

    }
    xhr.send(null);
  })
}
let ResFetch2URL = function (pathname, isFullUrl, onProgress) {
  return new Promise(function (resolve, reject) {
    ResFetchRaw(pathname, isFullUrl, -1, onProgress).then(function (response) {
      let blob = new Blob([response.arrayBuffer]);
      let blobUrl = URL.createObjectURL(blob);
      resolve({
        responseCode: response.responseCode,
        contentType: response.contentType,
        url: response.url,
        arrayBuffer: response.arrayBuffer,
        blobUrl
      })
    }).catch(function (error) {
      reject(error)
    })
  })
}

class RPicture extends PureComponent {
  constructor(props) {
    super(props)
    this.ref = React.createRef();
    this.GUID = createGUID()
    this.state = {
      componentDidMount: false,
      picURL: undefined,
      picBlob: null,
      picType: null,
      picBlobUrl: undefined,
      picReady: false,
      failed: false,
      removeSpin: false,
      hasProgress: false,
      fitWidth: false,
    }
    this.clickPic = function () { }
    this.loadPic = function (path) {
      let Fthis = this
      ResFetch2URL(path, false).then(function (response) {
        Fthis.setState({
          picBlob: response.arrayBuffer,
          picBlobUrl: response.blobUrl,
          picType: response.contentType,
          picURL: response.url
        })
        setTimeout(() => {
          Fthis.setState({
            picReady: true
          })
        }, 100);
        setTimeout(() => {
          Fthis.setState({
            removeSpin: true
          })
        }, 1800);
      }).catch(function (error) {
        console.log(error)
        Fthis.setState({
          failed: true
        })
      })
    }
    this.transparentBg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAA1SURBVHjaYjxz5sx/BjzA2NgYnzQDEwOFYNSAwWAA4/////Gmg7Nnz44G4vA3AAAAAP//AwD0ygp+lRPdFgAAAABJRU5ErkJggg=="
  }
  componentDidMount() {
    let Fthis = this
    Fthis.loadPic(Fthis.props.path)
    let onresize = function () {
      Fthis.setState({
        fitWidth: Fthis.ref.current.offsetWidth
      })
    }
    this.onresize = onresize
    window.addEventListener('resize', this.onresize, false);
    let clickPic = function () {
      if (Fthis.state.failed) {
        Fthis.setState({
          componentDidMount: false,
          picURL: undefined,
          picBlob: undefined,
          picBlobUrl: undefined,
          picReady: false,
          failed: false,
          removeSpin: false,
          hasProgress: false,
          fitWidth: false,
        })
        Fthis.loadPic(Fthis.props.path)
      }
    }
    this.clickPic = clickPic
    Fthis.setState({ componentDidMount: true })
  }
  render() {
    let Fthis = this
    let props = Dcopy(Fthis.props)
    if (!(props.height > 0)) {
      props.height = 100
    }
    if (!(props.width > 0)) {
      props.width = 100
    }
    if (typeof (props.style) != "object") {
      props.style = {}
    }
    if (props.fitWidth !== false) {
      if (typeof (props.style) != "object" || typeof (props.style.width) == "undefined") {
        props.style.width = "100%"
      }
      if (Fthis.ref.current != null) {
        let actualWidth
        if (Fthis.state.fitWidth > 0) {
          actualWidth = Fthis.state.fitWidth
        } else {
          actualWidth = Fthis.ref.current.offsetWidth
        }
        props.height = actualWidth / props.width * props.height
      }
    }
    let picBackgroundImage = ""
    let picBackground = "url(" + this.transparentBg + ")"
    let transition = "all 0.4s ease-out"
    let loadingLayerOpacity = 1
    let picLayerOpacity = 0
    if (Fthis.state.picBlobUrl) {
      //载入图片
      picBackgroundImage = "url(" + Fthis.state.picBlobUrl + ")"
    }
    if (Fthis.state.picReady) {
      //显示图片
      loadingLayerOpacity = 0
      picLayerOpacity = 1
    }
    let loadingLayerInside = <LoadingOutlined style={{
      fontSize: 50, margin: "0 auto", margin: "auto", display: "block", top: 0, left: 0, right: 0, bottom: 0,
      position: "absolute", width: 50, height: 50,
    }} />
    if (Fthis.state.failed) {
      loadingLayerInside = <ExclamationCircleOutlined style={{
        fontSize: 50, margin: "0 auto", margin: "auto", display: "block", top: 0, left: 0, right: 0, bottom: 0,
        position: "absolute", width: 50, height: 50,
      }} />
    }
    if (props.height < 75 || props.width < 75) {
      loadingLayerInside = ""
    }
    let loadingLayer = <div key={"Rimg-loadingLayer-" + this.GUID} style={{ transition, width: "100%", height: "100%", position: "absolute", backgroundColor: "#d8d8d8", opacity: loadingLayerOpacity }}>{loadingLayerInside}</div>
    if (Fthis.state.removeSpin) {
      loadingLayer = ""
    }
    console.log("this.state.picURL,", this.state, this.state.picURL)
    return (
      <ContextMenu
        type="pic"
        content={{
          fileType: this.state.picType,
          url: this.state.picURL,
          blobUrl: this.state.picBlobUrl,
          blob: this.state.picBlob,
        }}
        action={{
          back: false,
        }}>
        <div key={"Rimg-parent-" + this.GUID} style={{
          height: props.height,
          width: props.width,
          position: "relative",
          backgroundImage: picBackground,
          backgroundPosition: "center",
          overflow: "hidden",
          ...props.style
        }}
          onClick={this.clickPic}
          ref={this.ref}>
          <div key={"Rimg-picLayer-" + this.GUID} style={{ transition, width: "100%", height: "100%", position: "absolute", backgroundImage: picBackgroundImage, backgroundSize: "cover", backgroundPosition: "center", opacity: 1 }} />
          {loadingLayer}
        </div>
      </ContextMenu>
    );

  }

  componentWillUnmount() {
    let Fthis = this
    window.removeEventListener('resize', Fthis.onresize);
  }
}

export { RPicture, ResFetchRaw, ResFetch2URL };

