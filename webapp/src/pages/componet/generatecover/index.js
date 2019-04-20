import React, { PureComponent } from 'react';
import { Button, Input, Spin} from 'antd';
import styles from './index.css';

export default class GenerateCoverUI extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      projectName: "项目名称",
      projectModule: "项目模块",
      version: "1.0",
      participants: "鲸鱼工作室",
      size: "small",
      button:"Generate Cover",
      buttonDisabled: true,
      cancel:"Cancel",
      projectNamePlaceholder: "项目名称",
      projectModulePlaceholder: "项目模块",
      versionPlaceholder: "1.0",
      participantsPlaceholder: "鲸鱼工作室",
      spinning: false,
    };
  };

  projectNameChange = (e) => {
    this.setState({
      projectName: e.target.value
    });
  };

  projectModuleChange = (e) => {
    this.setState({
      projectModule: e.target.value
    });
  };

  versionChange = (e) => {
    this.setState({
      version: e.target.value
    });
  };

  participantsChange = (e) => {
    this.setState({
      participants: e.target.value
    });
  };

  onCancel = () => {
    window.postMessage('closed');
  };

  generateCover = () => {
    window.postMessage('fromwebview', this.state);
    console.log(this.state)
  };

  render() {
    var  { size, button, cancel, spinning, projectName, projectModule, version, participants, projectNamePlaceholder, projectModulePlaceholder, versionPlaceholder, participantsPlaceholder} = this.state;
    return (
      <Spin spinning={spinning} tip="In the screenshot, it takes some time...">
      <div className={styles.body}>
          <div className={styles.url}>
            <span className={styles.itemName}>Project Name:</span><Input size={size} className={styles.urlInputCss} value={projectName} onChange={this.projectNameChange} placeholder={projectNamePlaceholder} onBlur={this.artBoardNameOnBulr}/>
          </div>
          <div className={styles.url}>
              <span className={styles.itemName}>Project Module:</span><Input size={size} className={styles.urlInputCss} value={projectModule} onChange={this.projectModuleChange} placeholder={projectModulePlaceholder}/>
          </div>
          <div className={styles.url}>
            <span className={styles.itemName}>Version:</span><Input size={size} className={styles.urlInputCss} value={version} onChange={this.versionChange} placeholder={versionPlaceholder}/>
          </div>
          <div className={styles.url}>
            <span className={styles.itemName}>Participants:</span><Input size={size} className={styles.urlInputCss} value={participants} onChange={this.participantsChange} placeholder={participantsPlaceholder}/>
          </div>

          <div className={styles.buttons}>
            <Button size={size} onClick={this.onCancel} className={styles.button}>{cancel}</Button>
            <Button size={size} onClick={this.generateCover} type="primary">{button}</Button>
          </div>
      </div>
      </Spin>
    );
  }
}

