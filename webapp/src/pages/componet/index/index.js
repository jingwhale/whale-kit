import React, { PureComponent } from 'react';
import { Timeline, Icon, Tag } from 'antd';
import styles from './index.css'

const category = "index";
export default class IndexUI extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: "Whale Kit",
    };
  }

  clickGithubGa = () => {
    this.ga("github","https://github.com/jingwhale/whale-kit");
  };

  clickYuqueGa = () => {
    this.ga("yuque","https://www.yuque.com/jingwhale/blog/hdvuwz");
  };

  ga  = (target,label) => {
    var action = "click_"+target;

    window.gtag('event', action, {
      'event_category': category,
      'event_label': label
    });
  };

  render() {
    return (
      <div>
          <div className={styles.title}>{this.state.title}</div>
          <div className={styles.github}>
            <a href="https://github.com/jingwhale/whale-kit" target="_blank" onClick={this.clickGithubGa}><Icon type="github" style={{ fontSize: '16px'}} /></a>
          </div>
          <div className={styles.yuque}>
            <a href="https://www.yuque.com/jingwhale/blog/hdvuwz" target="_blank" onClick={this.clickYuqueGa}><Icon type="yuque" style={{ fontSize: '16px'}} /></a>
          </div>
          <div className={styles.sign}>Designed and Coded by © <a href="https://www.jingwhale.cc/" target="_blank">Jingwhale</a></div>
          <Timeline mode="alternate">
            <Timeline.Item>
              <Tag color="gold"><a href="/lottieWebAe.html" target="_blank">LottieWeb AE</a></Tag> 2019-05-31
            </Timeline.Item>
            <Timeline.Item>
              2019-05-31 <Tag color="orange"><a href="/origamiDesign.html" target="_blank">Origami Design</a></Tag>
            </Timeline.Item>
            <Timeline.Item>
              <Tag color="volcano">Generate Writing Format</Tag> 2019-05-20
              <p className={styles.text}>ctrl shift option w</p>
            </Timeline.Item>
            <Timeline.Item>
              2019-05-11 <Tag color="red">Generate Tags</Tag>
              <p className={styles.text}>ctrl shift option t</p>
            </Timeline.Item>
            <Timeline.Item dot={<Icon type="like" style={{ fontSize: '16px',color:'#eb2f96' }} />}>
              <Tag color="magenta"><a href="/designsignifiers.html" target="_blank">Generate Signifiers</a></Tag> 2019-05-08
              <p className={styles.text}>ctrl shift option s</p>
            </Timeline.Item>
            <Timeline.Item dot={<Icon type="like" style={{ fontSize: '16px',color:'#722ed1'}} />}>
              2019-05-05 <Tag color="purple"><a href="/radarchart.html" target="_blank">Generate Radar Chart</a></Tag>
            </Timeline.Item>
            <Timeline.Item>
              <Tag color="geekblue">Generate Cover</Tag> 2019-04-20
              <p className={styles.text}>ctrl shift option c</p>
            </Timeline.Item>
            <Timeline.Item>
              2019-04-13 <Tag color="blue">Generate QR Code</Tag>
              <p className={styles.text}>ctrl shift option q</p>
            </Timeline.Item>
            <Timeline.Item dot={<Icon type="like" style={{ fontSize: '16px',color:'#13c2c2' }} />}>
              <Tag color="cyan">Convert to Grayscale</Tag> 2019-04-03
              <p className={styles.text}>control option shift g</p>
            </Timeline.Item>
            <Timeline.Item>
              2019-04-01 <Tag color="green">Toggle State</Tag>
              <p className={styles.text}>control option shift k</p>
            </Timeline.Item>
            <Timeline.Item>
              <Tag color="orange">Operate Image</Tag> 2019-03-30
              <p className={styles.text}>shift control q</p>
            </Timeline.Item>
            <Timeline.Item dot={<Icon type="like" style={{ fontSize: '16px',color:'#a0d911'}} />}>
              2019-03-28 <Tag color="lime">Screen Shot</Tag>
              <p className={styles.text}>control option shift j</p>
            </Timeline.Item>
            <Timeline.Item >
              <Tag color="gold">Flow Page</Tag> 2019-03-22
              <p className={styles.text}>control option shift p</p>
            </Timeline.Item>
            <Timeline.Item dot={<Icon type="like" style={{ fontSize: '16px',color:'#eb2f96'}} />}>
              2019-03-22 <Tag color="magenta"><a href="/pagelayout.html" target="_blank">Make Layout</a></Tag>
              <p className={styles.text}>shift control a</p>
            </Timeline.Item>
            <Timeline.Item>
              <Tag color="volcano">Generate Button</Tag> 2019-03-21
              <p className={styles.text}>shift control z</p>
            </Timeline.Item>
            <Timeline.Item color="red" dot={<Icon type="bank" style={{ fontSize: '16px' }} />}>
              <Tag color="red"><a href="https://www.jingwhale.cc/" target="_blank">Efficient design spec</a></Tag>
            </Timeline.Item>
          </Timeline>
      </div>
    );
  }
}

