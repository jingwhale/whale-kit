import React, { Component } from 'react';
import Chart from 'react-apexcharts'
import { Button, Input, message} from 'antd';
import styles from './index.css';

class RadarChart extends Component {
  constructor(props) {
    super(props);

    this.myRef=React.createRef();

    this.state = {
      size: "small",
      chartHeight:360,
      options: {
        chart: {
          dropShadow: {
            enabled: true,
            blur: 1,
            left: 1,
            top: 1
          },
        },
        labels: ['2011', '2012', '2013', '2014', '2015', '2016'],
        title: {
          text: 'Radar Chart - Multi Series'
        },
        stroke: {
          width: 0
        },
        fill: {
          opacity: 0.4
        },
        markers: {
          size: 0
        }
      },
      series: [{
        name: 'Series 1',
        data: [80, 50, 30, 40, 100, 20],
      }, {
        name: 'Series 2',
        data: [20, 30, 40, 80, 20, 80],
      }, {
        name: 'Series 3',
        data: [44, 76, 78, 13, 43, 10],
      }, {
        name: 'Series 4',
        data: [2, 90, 2, 13, 43, 10],
      }]
    }
  }

  chartTitleChange = (e) => {
    this.state.options.title.text = e.target.value;
    this.forceUpdate();
    this.updateChart();
  };

  seriesNameChange = (e) => {
    this.state.series[e.target.id].name = e.target.value;
    this.forceUpdate();
    if(this.state.series[e.target.id].data){
      this.updateChartSeries();
    }
  };

  seriesDataChange = (e) => {
    var seriesData = this.parserData(e.target.value);
    if(seriesData.length){

    }
    this.state.series[e.target.id].data = this.parserData(e.target.value);
    this.forceUpdate();
    if(this.state.series[e.target.id].data){
      this.updateChartSeries();
    }
  };

  seriesDataOnBlur = (e) => {
    var seriesData = this.parserData(e.target.value);
    var length = this.state.options.labels.length;
    if(e.target.value){
      if(seriesData.length!=length){
        message.error('seriesData should be "," separated '+length+'-bit integers!',2);
      }
    }else{
      message.error('Please complete the filling of all seriesData data!',2);
    }

    this.state.series[e.target.id].data = this.parserData(e.target.value);
    this.forceUpdate();
    if(this.state.series[e.target.id].data){
      this.updateChartSeries();
    }
  };

  addSeries = (e) => {
    if(!this.isSeriesDataHasEmpty()){
      this.state.series.push({
        name:"",
        data:""
      });
      this.forceUpdate();
    }else{
      message.error('Please complete the filling of all seriesData data!',2);
    }
  };

  isSeriesDataHasEmpty  = () => {
    var flag = false;
    for(var i=0;i<this.state.series.length;i++){
      if(this.state.series[i].data==''){
        flag = true;
      }
    }
    return flag;
  };

  labelsChange = (e) => {
    this.state.options.labels = this.parserData(e.target.value);
    this.forceUpdate();
    this.updateChartOptions();
  };

  getChartDataURI = () => {
    var that = this;
    this.myRef.current.chart.dataURI().then(function (data) {
        that.insertPage(data)
      }
    ).catch(function (reason) {
      console.log('失败：' + reason);
    });
  };

  insertPage = (data) => {
    var imagedata = {
      width:"300",
      height:"360"
    };
    imagedata.base64 = data.substring(data.indexOf(",")+1);

    window.postMessage('fromwebview', imagedata);
    console.log(imagedata)
  };

  onClickOk = () => {
    this.getChartDataURI();
  };

  updateChart = () =>{
    this.updateChartOptions();
    this.updateChartSeries();
  };

  updateChartSeries = () =>{
    if(this.state.series[this.state.series.length-1].data){
      this.myRef.current.chart.updateSeries(this.state.series);
    }
  };

  updateChartOptions = () =>{
    this.myRef.current.chart.updateOptions(this.state.options);
  };

  parserData = (string) =>{
      return string.split(",");
  };

  deleteItem = (e) =>{
    console.log(e.target.id);
    if(this.state.series.length>1){
      this.state.series.splice(e.target.id,1);
      this.forceUpdate();
      this.updateChartSeries();
    }else{
      message.error('Be sure to include a piece of series data!',2);
    }
  };

  render() {
    var items = [];
    for (var i = 0; i < this.state.series.length; i++) {
      var item = this.state.series[i];
      items.push(<div className={styles.seriesItem}>
        <span className={styles.close} id={i} onClick={this.deleteItem}>x</span>
        <Input size={this.state.size} className={styles.seriesName} value={item.name} id={i} onChange={this.seriesNameChange}/>
        <Input size={this.state.size} className={styles.seriesData} value={item.data} id={i} onChange={this.seriesDataChange} onBlur={this.seriesDataOnBlur}/>
      </div>);
    }

    return (
      <div className={styles.body}>
        <div id="jingwhalechart" className={styles.chart}>
          <div className={styles.chartIns}>
          <Chart options={this.state.options} ref={this.myRef} series={this.state.series} type="radar" height={this.state.chartHeight} id={"sd"}/>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.item}>
            <span className={styles.radarChartTitle}>Title:</span>
            <Input size={this.state.size} className={styles.inputCss} value={this.state.options.title.text} onChange={this.chartTitleChange}/>
          </div>
          <div className={styles.item}>
            <span className={styles.radarChartTitle}>Labels:</span>
            <Input size={this.state.size} className={styles.inputCss} value={this.state.options.labels} onChange={this.labelsChange}/>
          </div>
          <div className={styles.item}>
            <span className={styles.seriesTitle}>Series:</span>
            <div className={styles.series}>
              <span className={styles.seriesName}>seriesName</span>
              <span className={styles.seriesData}>seriesData<span>（{this.state.options.labels.length}）</span></span>
              <div className={styles.seriesDataItems}>
                {items}
              </div>
              <div className={styles.addSeries}>
                <Button size={this.state.size} onClick={this.addSeries} className={styles.button}>+ add series</Button>
              </div>
            </div>
            <div className={styles.item}></div>
          </div>
          <div className={styles.buttons}>
            <Button size={this.state.size} onClick={this.onClickOk} type={"primary"} className={styles.button}>Conform</Button>
          </div>
        </div>

      </div>

    );
  }
}

export default RadarChart;
