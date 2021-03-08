import React, { PureComponent } from 'react';
import { Spin, Image } from 'antd';
import { LoadingOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';
import { Tabs } from 'antd';
import './tabs.less';
const { TabPane } = Tabs;


class TopTabsSwitcher extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      menuContent: []
    }
  }
  componentDidUpdate() {
  }
  componentDidMount() {
  }
  render() {
    let Fthis = this
    return (
      <div className={"TopTabsSwitcher"}>
        <Tabs defaultActiveKey="1" centered style={{ width: "100%" }} animated>
          <TabPane tab={"關於肺癌"} key="1">
           <LeftTabTopicSwitcher/>
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            {"Content of Tab Pane 2"}
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            {"Content of Tab Pane 3"}
          </TabPane>
        </Tabs>
      </div>
    );

  }
  componentWillUnmount() {
    let Fthis = this
  }
}
class LeftTabTopicSwitcher extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      menuContent: []
    }
  }
  componentDidUpdate() {
  }
  componentDidMount() {
  }
  render() {
    let Fthis = this
    return (
      <div className={"LeftTabTopicSwitcher"}>
        <Tabs defaultActiveKey="1" centered style={{ width: "100%" }} type="card" tabPosition={"left"}>
          <TabPane tab={"什么是癌症"} key="1">
            {"Content of Tab Pane 1"}
          </TabPane>
          <TabPane tab="肺癌種類和分期" key="2">
            {"Content of Tab Pane 2"}
          </TabPane>
          <TabPane tab="肺癌誤解" key="3">
            {"Content of Tab Pane 3"}
          </TabPane>
        </Tabs>
      </div>
    );

  }
  componentWillUnmount() {
    let Fthis = this
  }
}
let CTabPane = Tabs.TabPane


export { TopTabsSwitcher,LeftTabTopicSwitcher, CTabPane };

