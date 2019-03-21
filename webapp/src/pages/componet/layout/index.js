import React, { PureComponent } from 'react';
import { Button, InputNumber, Checkbox} from 'antd';
import styles from './index.css'

export default class IndexUI extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      size: "small",
      button:"Make Layout",
      cancel:"Cancel",
      rows: 1,
      rowMargin:2,
      columns:3,
      columnMargin: 3,
      showCoordinate: true,
      rowMarginDisabled: true,
      columnMarginDisabled: false
    };

  };
  onMakeLayout = value => {
    window.postMessage('fromwebview', this.state);
  };

  onCancel = value => {
    window.postMessage('closed');
  };

  showCoordinateChange = value =>{
    this.setState({
      showCoordinate:value.target.checked
    })
  };

  rowsChange = (value) =>{
    this.setState({
      rows:value
    });
    if(value===1){
      this.setState({
        rowMarginDisabled:true
      })
    }else{
      this.setState({
        rowMarginDisabled:false
      })
    }
  }

  rowMarginChange = (value) =>{
    this.setState({
      rowMargin:value
    })
  }

  columnsChange = (value) =>{
    this.setState({
      columns:value
    });
    if(value===1){
      this.setState({
        columnMarginDisabled:true
      })
    }else{
      this.setState({
        columnMarginDisabled:false
      })
    }
  }

  columnMarginChange = (value) =>{
    this.setState({
      columnMargin:value
    });
  }


  render() {
    var  { size, button, cancel, rows, rowMargin, columns, columnMargin} = this.state;

    return (
      <div className={styles.body}>
        <div className={styles.item}>
          <span className={styles.inputItem}><span className={styles.name}>rows:</span><InputNumber size={size}  min={1} max={10} defaultValue={rows} onChange={this.rowsChange}/></span>
          <span className={styles.inputItem}><span className={styles.name}>rowMargin:</span><InputNumber size={size}  min={1} max={10} defaultValue={rowMargin} onChange={this.rowMarginChange} disabled={this.state.rowMarginDisabled}/></span>
        </div>
        <div className={styles.item}>
          <span className={styles.inputItem}><span className={styles.name}>columns:</span><InputNumber size={size}  min={1} max={10} defaultValue={columns} onChange={this.columnsChange}/></span>
          <span className={styles.inputItem}><span className={styles.name}>columnMargin:</span><InputNumber size={size}  min={1} max={10} defaultValue={columnMargin} onChange={this.columnMarginChange} disabled={this.state.columnMarginDisabled}/></span>
        </div>
        <div className={styles.coordinate} >
          <Checkbox defaultChecked={true} className={styles.coordinateAnt} onChange={this.showCoordinateChange}>Show Coordinate</Checkbox>
        </div>
        <div className={styles.buttons}>
          <Button size={size} onClick={this.onCancel} className={styles.button}>{cancel}</Button>
          <Button size={size} onClick={this.onMakeLayout} type="primary">{button}</Button>
        </div>
      </div>
    );
  }
}

