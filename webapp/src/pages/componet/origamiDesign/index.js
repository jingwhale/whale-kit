import React, { PureComponent } from 'react';
import styles from './index.css'

export default class OrigamiDesignUI extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      type: 1,//1,Equal layout;2,Proportional layout
      size: "small"
    };

  };

  render() {
    return (
      <div className={styles.body}>
        <div className={styles.title}>Designed by Origami</div>
        <div className={styles.pic}>
          <div className={styles.design}>design</div>
          <img src="https://cdn.nlark.com/yuque/0/2019/gif/120638/1559272454526-daf22217-1fb6-4c64-9f04-f9912399b663.gif" alt=""/>
          <div className={styles.biaozhu}>
            <div className={styles.design}>signifiers</div>
            <img src="https://cdn.nlark.com/yuque/0/2019/png/120638/1559274146236-f5e120e1-f1a9-419f-ab26-591f502ebdb3.png" alt=""/>
          </div>
        </div>
        <div className={styles.whale}>Realization by <a href="https://jing-whale.gitbook.io/whale-design/dong-xiao-she-ji-yu-luo-di" target="_blank">Whale Animation</a> Scheme.</div>
      </div>
    );
  }
}

