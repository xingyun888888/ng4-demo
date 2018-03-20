import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import api from '../../api';
import {Store} from '@ngrx/store';
import * as fromRoot from '@app-root-store';
import * as actions from './../../store/actions';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'app-strategy',
  templateUrl: './strategy.component.html',
  styleUrls: ['./strategy.component.css']
})
export class StrategyComponent implements OnInit {

  /**这个字段是保存着search的自定义列标签*/
  _searchTitle: Array<any> = [
    {key: 'username', name: '搜索', type: '', nzSpan: 5},
    {key: 'time', name: '开始时间', type: 'date', nzSpan: 10},
    {key: 'time', name: '结束时间', type: 'date', nzSpan: 10}
  ];

  /**这个字段是保存着table的自定义列标签*/
  _titles: Array<any> = [
    {
      key: 'id',
      name: 'ID',
      type: 'text'
    },
    {
      key: 'name',
      name: '参数名',
      type: 'text'
    },
    {
      key: 'type',
      name: '参数类型',
      type: 'text'
    },
    {
      key: 'operateType',
      name: '操作类型',
      type: 'text'
    },
    {
      key: 'description',
      name: '描述',
      type: 'text'
    },
    {
      key: 'createTime',
      name: '创建时间',
      type: 'date'
    },
    {
      key: 'creater',
      name: '创建人',
      type: 'text'
    },
    {
      key: 'modifier',
      name: '修改人',
      type: 'text'
    },
    {
      key: 'minPixel',
      name: '最小像素大小',
      type: 'text'
    },
    {
      key: 'pQ',
      name: '人脸图像质量',
      type: 'text'
    },
    {
      key: 'timeSlotId',
      name: '时间段id',
      type: 'text'
    }
  ];

  /**isEdit 和 isAdd 这两个属性维护着当前模态框是编辑还是新增*/
  isEdit = false;
  isAdd = false;

  /**这里存放着table需要的数据*/
  _dataSet = [];

  /**这里存放着从服务端接收到的数据，模态框需要*/
  formData = {};

  /**这个方法是订阅的子组件传进来的事件,当子组件触发的时候就会获取到值value,判断拿出的value是否是undefined,如果是新增处理,否则编辑处理，
   * 首先要把formData的脏值清空，然后将拿到的最新值赋值到formData，如果value有值那就是表明当前是编辑状态，否则说明是新增*/
  getRowData(value) {
    console.log(value);
    this.formData = {};
    this.formData = Object.assign({}, value);
    if (!value) {
      this.isAdd = true;
    } else {
      this.isEdit = true;
    }
  }

  /**这里是关模态框调用的方法,关闭也有两种状态,可能是编辑或者新增*/
  close() {
    if (this.isEdit) {
      this.isEdit = !this.isEdit;
    } else if (this.isAdd) {
      this.isAdd = !this.isAdd;
    }
  }

  /**删除功能处理，在这里调用删除的接口，给后台发送一个ID，应该用post，只有id查询是get，其他操作都用post
   * 删除成功之后，调用查询方法，更新页面，删除失败之后，调用查询方法，更新页面*/
  deleteRow(data) {
    this.http.post(api.deleteStrategy, JSON.stringify(data),{
      headers: new HttpHeaders({
        'Content-type': 'application/json;charset=UTF-8'
      })
    }).subscribe((res) => {
      this.getStrategy();
    }, (error) => {
      this.getStrategy();
    });
  }

  /**增加或者编辑操作后点击提交后调用的方法，请求的时候判断一下是新增还是修改，根据isEdit和isAdd的值判断
   * 添加下面的headers头部说明，前端需要接收的是json数据*/
  sendData(data) {
    if (this.isAdd) {
      this.http.post(api.addStrategy, data, {
        headers: new HttpHeaders({
          'Content-type': 'application/json;charset=UTF-8'
        })
      }).subscribe((res) => {
        this.getStrategy();
      }, (error) => {
        this.getStrategy();
      });
      this.isAdd = false;
    } else if (this.isEdit) {
      this.http.post(api.editStrategy, data, {
        headers: new HttpHeaders({
          'Content-type': 'application/json;charset=UTF-8'
        })
      }).subscribe((res) => {
        this.getStrategy();
      }, (error) => {
        this.getStrategy();
      });
      this.isEdit = false;
    }
  }

  constructor(private store:Store<fromRoot.State>,private http: HttpClient, ) {
  }

  /**在这里调用刷新,点击刷新按钮之后就会调用这个方法,刷新就是调用一次查询接口*/
  refresh(e) {
    this.getStrategy();
  }

  /**调用查询接口，查询到结果之后将拿到的res赋值给_dataSet才能显示到table*/
  getStrategy() {
    this.store.dispatch(new actions.setLoadingState(true));
    this.http.get(api.queryStrategy).subscribe((res) => {
      console.dir(res);
      const list = <any>res;
      this._dataSet = list;
      this.store.dispatch(new actions.setLoadingState(false));
    });
  }

  /**
   * 组件初始化的时候调用一次
   */
  ngOnInit() {
    this.getStrategy();
  }

}
