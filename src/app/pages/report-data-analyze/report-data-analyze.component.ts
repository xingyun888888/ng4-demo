import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {parseParam, dateFormat} from '../../utils/common';
import api from '../../api';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-report-data-analyze',
  templateUrl: './report-data-analyze.component.html',
  styleUrls: ['./report-data-analyze.component.less']
})
export class ReportDataAnalyzeComponent implements OnInit {
  _startDate = null;
  _endDate = null;

  /**
   * 数据结构
   *
   * data = [网络流量:[1,2,3,4,5,...],服务器负载:[1,2,3,4,5,...],人脸分析次数:[1,2,3,4,...]]
   *
   *
   *
   */


  /**
   * 定义x轴的显示名称
   * @type {string[]}
   */
    //xAxisName = ['服务器负载', '人脸分析次数', '网络流量', '抓水客数', '报警频度', '人脸库底图数', '摄像头在线数'];

  xAxisName = [
    {name: '服务器负载', key: '', resourceUrl: api.queryRegisterWeekCount},
    {name: '人脸分析次数', key: '', resourceUrl: api.queryRegisterWeekCount},
    {name: '网络流量', key: '', resourceUrl: api.queryRegisterWeekCount},
    {name: '抓水客数', key: '', resourceUrl: api.queryRegisterWeekCount},
    {name: '报警频度', key: '', resourceUrl: api.queryRegisterWeekCount},
    {name: '人脸库底图数', key: 'queryRegisterWeekCount', resourceUrl: api.queryRegisterWeekCount},
    {name: '摄像头在线数', key: '', resourceUrl: api.queryRegisterWeekCount}
  ];


  timeOptions = [
    {name: '天', id: 1, value: 'byDay'},
    {name: '周', id: 2, value: 'byWeek'},
    {name: '月', id: 3, value: 'byMonth'},
    {name: '年', id: 4, value: 'byYear'}
  ];

  toggleChart(e, index) {
    // if(!this.options.series[index]){
    //   this.options.series.push({
    //     name:this.xAxisName[index],
    //     type: 'line',
    //     stack: '总量',
    //     itemStyle: {normal: {areaStyle: {type: 'default'}}},
    //     data: [220, 182, 191, 234, 290, 330, 310, 342, 432]
    //   },)
    // }else{
    //   this.options.series.splice(index,1);
    // }
  }

  /**
   * 查询分析数据
   * @param e
   */
  getAnalyzeData(e, item) {
    console.log(this._startDate);
    console.log(this._endDate);
    /**
     * 日期格式 2018-01-01
     */
    const data = {
      startTime: dateFormat(new Date(this._startDate), 'yyyy-MM-dd hh:mm:ss'),
      endTime: dateFormat(new Date(this._endDate), 'yyyy-MM-dd hh:mm:ss')
    };
    /**
     * 明天记得改成get方式
     */
    this.http.post(api.queryRegisterWeekCount + parseParam(data), data, {
      headers: new HttpHeaders({
        'Content-type': 'application/json;charset=UTF-8'
      })
    }).subscribe((res) => {
      console.dir(res);
      const list = <any>res;
      this.options.series[5] = list;
    }, (error) => {
    });
  }


  newArray = (len) => {
    const result = [];
    for (let i = 0; i < len; i++) {
      result.push(i);
    }
    return result;
  };

  _startValueChange = () => {
    if (this._startDate > this._endDate) {
      this._endDate = null;
    }
  };

  _endValueChange = () => {
    if (this._startDate > this._endDate) {
      this._startDate = null;
    }
  };

  _disabledStartDate = (startValue) => {
    if (!startValue || !this._endDate) {
      return false;
    }
    return startValue.getTime() >= this._endDate.getTime();
  };

  _disabledEndDate = (endValue) => {
    if (!endValue || !this._startDate) {
      return false;
    }
    return endValue.getTime() <= this._startDate.getTime();
  };

  get _isSameDay() {
    return this._startDate && this._endDate && moment(this._startDate).isSame(this._endDate, 'day');
  }

  get _endTime() {
    return {
      nzHideDisabledOptions: true,
      nzDisabledHours: () => {
        return this._isSameDay ? this.newArray(this._startDate.getHours()) : [];
      },
      nzDisabledMinutes: (h) => {
        if (this._isSameDay && h === this._startDate.getHours()) {
          return this.newArray(this._startDate.getMinutes());
        }
        return [];
      },
      nzDisabledSeconds: (h, m) => {
        if (this._isSameDay && h === this._startDate.getHours() && m === this._startDate.getMinutes()) {
          return this.newArray(this._startDate.getSeconds());
        }
        return [];
      }
    };
  }

  options: any = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: this.xAxisName
    },
    toolbox: {
      show: true,
      feature: {
        mark: {show: true},
        dataView: {show: true, readOnly: false},
        magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
        restore: {show: true},
        saveAsImage: {show: true}
      }
    },
    calculable: true,
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['01-11', '02-11', '03-11', '04-11', '05-11', '06-11', '07-11', '08-11', '09-11',]
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '服务器负载',
        type: 'line',
        stack: '总量',
        itemStyle: {normal: {areaStyle: {type: 'default'}}},
        data: [220, 182, 191, 234, 290, 330, 310, 342, 432]
      },
      {
        name: '人脸分析次数',
        type: 'line',
        stack: '总量',
        itemStyle: {normal: {areaStyle: {type: 'default'}}},
        data: [150, 232, 201, 154, 190, 330, 410, 432, 113]
      },
      {
        name: '网络流量',
        type: 'line',
        stack: '总量',
        itemStyle: {normal: {areaStyle: {type: 'default'}}},
        data: [320, 332, 301, 334, 390, 330, 320, 343, 212]
      },
      {
        name: '抓水客数',
        type: 'line',
        stack: '总量',
        itemStyle: {normal: {areaStyle: {type: 'default'}}},
        data: [820, 932, 901, 934, 1290, 1330, 1320, 1222, 324]
      },
      {
        name: '报警频度',
        type: 'line',
        stack: '总量',
        itemStyle: {normal: {areaStyle: {type: 'default'}}},
        data: [820, 932, 901, 934, 1290, 1330, 1320, 1000, 999]
      },
      {
        name: '人脸库底图数',
        type: 'line',
        stack: '总量',
        itemStyle: {normal: {areaStyle: {type: 'default'}}},
        data: [820, 932, 901, 934, 1290, 1330, 1320, 1111, 225]
      },
      {
        name: '摄像头在线数',
        type: 'line',
        stack: '总量',
        itemStyle: {normal: {areaStyle: {type: 'default'}}},
        data: [820, 932, 901, 934, 1290, 1330, 1320, 999, 234]
      },
    ]
  };


  /**
   * 将数据渲染到页面上
   * res是服务器返回的
   */
  renderData(res) {
    this.options.xAxis.data = [];
    this.options.series = [];
    res.map((item, index) => {
      this.options.xAxis.data.push(item);
      this.options.series.push({
        name: this.xAxisName[index],
        type: 'line',
        stack: '总量',
        itemStyle: {normal: {areaStyle: {type: 'default'}}},
        data: [820, 932, 901, 934, 1290, 1330, 1320, 1111, 225]
      });
    });
  }

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    // this.renderData([1,2,3,4,5])
  }
}
