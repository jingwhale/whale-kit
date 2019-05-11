import React from 'react';
import { Typography, Collapse, Timeline } from 'antd';
import styles from './index.css';

const { Title, Paragraph, Text } = Typography;
const Panel = Collapse.Panel;

class AboutAndHelpUI extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <div className={styles.body}>
        <Typography>
          <Title level={3}>关于</Title>
          <div className={styles.paragraph}>
            <Paragraph>
              高效交互标注系统 <Text code>Design Signifiers</Text> 是一个基于<a href="https://fusion.design/18642/" target="_blank"> Whale Design </a>高效设计的交互标注体系。它将交互的细节标注化，设计师只需要填写页面设计的具体要求，就可以快速的生成日常的交互说明。
            </Paragraph>
            <Paragraph>
              <Text code>Design Signifiers</Text> 目前包括<Text code>页面交互标注</Text> 与 <Text code>组件交互标注</Text>，来帮助业务快速设计出高质量的产品原型。你可以在Web浏览器中使用<Text code>Design Signifiers</Text>服务，也可以在sketch插件中使用。
            </Paragraph>
            <Paragraph>
              <Text code>Design Signifiers</Text> 目前已经嵌入sketch插件<a href="https://github.com/jingwhale/whale-kit" target="_blank"> Whale Kit </a>（已发布在sketch官网的插件库中）的<Text code>Generate Signifiers</Text>功能中。
            </Paragraph>
          </div>
          <Title level={4}>组件交互标注</Title>
          <div className={styles.paragraph}>
            <Paragraph>
              <Text code>页面交互标注</Text> 包括 <Text code>获得数据</Text>（Input、TextArea等） 、 <Text code>改变数据项</Text>（Select、Radio、RadioGroup、CheckBox、CheckBoxGroup等） 、 <Text code>展示数据</Text> （Table、A标签、Img标签等）、 <Text code>功能</Text>（Button等），四种类型，每种类型包含基本标注项如下：
            </Paragraph>
            <Collapse>
              <Panel header="值" key="1">
                <p>字段类型，字段规则，字段是否必填，字段是否为空</p>
              </Panel>
              <Panel header="校验" key="2">
                <p>校验规则与错误提示</p>
              </Panel>
              <Panel header="状态" key="3">
                <p>默认状态，当前状态，各种状态描述</p>
              </Panel>
              <Panel header="事件触发与触发效果" key="4">
                <p>事件触发与触发效果</p>
              </Panel>
              <Panel header="其他" key="5">
                <p>其他标注</p>
              </Panel>
            </Collapse>
          </div>
          <Title level={4}>页面交互标注</Title>
          <div className={styles.paragraph}>
            <Paragraph>
              基本标注项如下：
            </Paragraph>
            <Collapse>
              <Panel header="基本信息" key="1">
                <p>页面Url，页面Title，页面Ico</p>
              </Panel>
              <Panel header="页面SEO" key="2">
                <p>页面SEO-Keywords，页面SEO-Description</p>
              </Panel>
              <Panel header="页面权限" key="3">
                <p>页面权限</p>
              </Panel>
              <Panel header="页面状态" key="4">
                <p>页面状态：正常访问，网络状态不佳，无权限，404</p>
                <p>页面状态描述</p>
              </Panel>
              <Panel header="页面跳转" key="5">
                <p>页面跳转-页面的入口，页面跳转-页面的出口</p>
              </Panel>
              <Panel header="兼容性" key="6">
                <p>兼容性：IE+，IOS12</p>
              </Panel>
              <Panel header="其他" key="7">
                <p>其他标注</p>
              </Panel>
            </Collapse>
          </div>
          <Title level={4}>更新</Title>
        </Typography>
        <Timeline pending="Recording..." mode="alternate">
          <Timeline.Item>Design Signifiers 发布Web应用 2019-05-07</Timeline.Item>
          <Timeline.Item>发布 Whale Kit 4.0，嵌入<Text code>Generate Signifiers</Text>2019-05-08</Timeline.Item>
          <Timeline.Item><Text code>Design Signifiers</Text>添加复制标注功能 2019-05-09</Timeline.Item>
          <Timeline.Item><Text code>Design Signifiers</Text>添加自定义标注功能 2019-05-11</Timeline.Item>
        </Timeline>
        <Typography>
          <Title level={4}>安全性</Title>
          <div className={styles.paragraph}>
            <Paragraph>
              <Text code>Design Signifiers</Text> 使用浏览器内存进行算法与数据处理，不会保存任何用户数据。
            </Paragraph>
          </div>
        </Typography>
      </div>
    );
  }
}

export default AboutAndHelpUI;

