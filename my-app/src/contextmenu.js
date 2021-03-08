import React, { PureComponent } from 'react';
import { Spin, Image } from 'antd';
import { LoadingOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Dcopy, createGUID, isBlob } from './func/lib';
import { Menu, Dropdown } from 'antd';



class ContextMenu extends PureComponent {
  //action 传入object action={{
  //   reload: false,//false为禁用
  //   copyPic: ()=>{},//传入function按下按钮时将调用改function
  //   openInNewPage: 4,//传入其他将禁用
  //没有传入将调用默认操作
  // }}>
  // type 传入字符串如pic
  // content={{
  //   url: this.state.picURL,//视类型而定
  //   blob: this.state.picBlob,//视类型而定
  // }}
  constructor(props) {
    super(props)
    this.componentsName = "ContextMenu_" + createGUID()
    this.GUID = createGUID()
    this.state = {
      menuContent: []
    }
    this.lastProps = {}

    this.reload = () => {
      document.location.reload()
    }
    this.back = () => {
      window.history.back()
    }
    this.switchLanguage = () => { console.log("switchLanguage") }
    this.openPicInNewTab = function () {
      let url = this.props.content.url
      window.open(url)
    }
    this.copyPicLink = () => {
      let url = this.props.content.url
      navigator.clipboard.writeText(url)
    }
    this.savePic = () => {
      let blobUrl = this.props.content.blobUrl
      let fileType = this.props.content.fileType
      let atferfix = fileType.split("/")[1]
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = "picture." + atferfix;
      link.click();
      window.URL.revokeObjectURL(link.href);
    }
    this.copyPic = () => {
      let blob = this.props.content.blob
      let fileType = this.props.content.fileType
      fileType = 'image/png'//浏览器不支持png以外的格式，强制复制
      navigator.permissions.query({ name: 'clipboard-write' }).then(result => {
        let ClipboardItem = window.ClipboardItem
        if (result.state === 'granted') {
          const type = fileType;
          const thisBlob = new Blob([blob], { type });
          let data = [new ClipboardItem({ [type]: thisBlob })];
          navigator.clipboard.write(data).then(function () {
          }, function (error) {
            console.error(error);
          });
        }
      });
    }

    this.makeMeneItem = function () {
      if (this.props == this.lastProps) {
        return
      }
      this.lastProps = this.props
      let content = this.props.content || {}
      let action = this.props.action || {}
      let type = this.props.type || ""
      console.log("act", action)
      let selectionCount = 0
      let menuContent = []
      if (action.reload !== false && (typeof (action.reload) == "undefined" || typeof (action.reload) == "function")) {
        selectionCount++
        menuContent.push({
          key: "reload",
          text: "重新载入",
          function: action.reload || this.reload.bind(this),
        })
      }
      if (action.back !== false && (typeof (action.back) == "undefined" || typeof (action.back) == "function")) {
        selectionCount++
        menuContent.push({
          key: "back",
          text: "返回上一页",
          function: action.back || this.back.bind(this),
        })
      }
      if (selectionCount > 0) {
        menuContent.push({
          key: "divider",
        })
        selectionCount = 0
      }
      console.log("content",content)
      switch (type) {
        case "pic":
          {
            if (typeof (content.url) == "string") {
              if (action.openPicInNewTab !== false && (typeof (action.openPicInNewTab) == "undefined" || typeof (action.openPicInNewTab) == "function")) {
                selectionCount++
                menuContent.push({
                  key: "openPicInNewTab",
                  text: "在新标签页中打开图片",
                  function: action.openPicInNewTab || this.openPicInNewTab.bind(this),
                })
              }
              if (action.copyPicLink !== false && (typeof (action.copyPicLink) == "undefined" || typeof (action.copyPicLink) == "function")) {
                selectionCount++
                menuContent.push({
                  key: "copyPicLink",
                  text: "复制图片地址",
                  function: action.copyPicLink || this.copyPicLink.bind(this),
                })
              }
            }
            if (typeof (content.blobUrl) == "string" && typeof (content.fileType) == "string") {
              if (action.savePic !== false && (typeof (action.savePic) == "undefined" || typeof (action.savePic) == "function")) {
                selectionCount++
                menuContent.push({
                  key: "savePic",
                  text: "图片另存为",
                  function: action.savePic || this.savePic.bind(this),
                })
              }
            }
            if (isBlob(content.blob)) {
              if (action.copyPic !== false && (typeof (action.copyPic) == "undefined" || typeof (action.copyPic) == "function")) {
                selectionCount++
                menuContent.push({
                  key: "copyPic",
                  text: "复制图片",
                  function: action.copyPic || this.copyPic.bind(this),
                })
              }
            }
          }
          break;

        default:
          break;
      }
      if (selectionCount > 0) {
        menuContent.push({
          key: "divider",
        })
      }
      menuContent.push({
        key: "switchLanguage",
        text: "切换语言",
        function: this.switchLanguage,
      })
      console.log("menuContent", menuContent)
      this.setState({
        menuContent
      })
    }
  }
  componentDidUpdate() {
    this.makeMeneItem.bind(this)()
  }
  componentDidMount() {
    this.makeMeneItem.bind(this)()
  }
  render() {
    let Fthis = this

    return (
      <>
        <Dropdown overlay={<Menu>
          {Array.from(this.state.menuContent).map((item) => {
            if (item.key == "divider") {
              return <Menu.Divider />
            } else {
              return <Menu.Item key={item.key} onClick={item.function}>{item.text}</Menu.Item>
            }
          })}

        </Menu>} trigger={['contextMenu']} className={"nee"}>
          {this.props.children}
        </Dropdown>

      </>
    );

  }

  componentWillUnmount() {
    let Fthis = this
  }
}

export { ContextMenu };

