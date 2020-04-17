import React, { PureComponent } from 'react';
import { Button, Input, Icon, InputNumber } from 'antd';
import styles from './index.css'

const items = ["于文晓","张云龙","胡骏","金荣株","吴婷婷"];

export default class IndexUI extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      items:items,
      currentName: "",
      currentWeek: "",
      currentMonthWeek: "",
      currentTime:""
    }
  }

  // getCurrentName
  getCurrentName = () => {
    var getNowFormatDateData = this.getNowFormatDate();
    // var getNowFormatDateData = {
    //   year: 2019,
    //   month: 11,
    //   date: 25
    // }
  
    var getWeekData = this.getYearWeek(getNowFormatDateData);
    var getMonthWeekData = this.getMonthWeek(getNowFormatDateData);
    this.setState({
      currentWeek: getWeekData,
      currentMonthWeek: getMonthWeekData
    });
    console.log(getWeekData);
    var index = getWeekData%(items.length);
    this.setState({
      currentName:items[index]
    })
  };

  // getWeek
  getYearWeek(getNowFormatDateData){
    /*  
        dateNow是当前日期 
        dateFirst是当年第一天  
        dataNumber是当前日期是今年第多少天  
        用dataNumber + 当前年的第一天的周差距的和在除以7就是本年第几周  
    */      
    let dateNow = new Date(getNowFormatDateData.year, parseInt(getNowFormatDateData.month) - 1, getNowFormatDateData.date);
    let dateFirst = new Date(getNowFormatDateData.year, 0, 1);
    let dataNumber = Math.round((dateNow.valueOf() - dateFirst.valueOf()) / 86400000);
    return Math.ceil((dataNumber + ((dateFirst.getDay() + 1) - 1)) / 7);        
  }

  // getNowFormatDate
  getNowFormatDate = () => {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1<10? "0"+(date.getMonth() + 1):date.getMonth() + 1;
    var strDate = date.getDate()<10? "0" + date.getDate():date.getDate();

    var nowFormatDate = {
      year:year,
      month:month,
      date:strDate
    };

    this.getCurrentTime(nowFormatDate);
    return nowFormatDate;
  };

  // currentTime
  getCurrentTime = (currentTime) => {

    var currentTimeData = currentTime.year+"-"+currentTime.month+"-"+currentTime.date

    this.setState({
      currentTime: currentTimeData || ""
    });
  };

  getMonthWeek(getNowFormatDateData){
    var year = getNowFormatDateData.year;
    var month = getNowFormatDateData.month;
    var date = getNowFormatDateData.date;
    /*  
        month = 6 - w = 当前周的还有几天过完(不算今天)  
        year + month 的和在除以7 就是当天是当前月份的第几周  
    */      
    let dateNow = new Date(year, parseInt(month) - 1, date);
    let w = dateNow.getDay();//星期数
    let d = dateNow.getDate();
    return Math.ceil((d + 6 - w) / 7);      
  };

  render() {
    var  { currentName, currentWeek, currentMonthWeek, currentTime } = this.state;

    this.getCurrentName();

    return (
      <div className={styles.body}>
      <h3>本周是今年第<span className={styles.tag}>{currentWeek}</span>周，本月的第<span className={styles.tag}>{currentMonthWeek}</span>周，周会执行人</h3>
        <div className={styles.currentName}>
          <span>{currentName}</span>  
          <span className={styles.time}>{currentTime}</span>
        </div>
      </div>
    );
  }
}