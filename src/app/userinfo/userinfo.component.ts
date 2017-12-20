import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import api from "../api";

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {
  _titles: Array<any> = [
    {
      key:'id',
      name:'ID'
    },
    {
      key:'name',
      name:'姓名'
    },
    {
      key:"displayName",
      name:"显示名"
    },
    {
      key:"pwd",
      name:"密码"

    },
    {
      key:"module",
      name:"模块名"
    },
    {
      key:"role",
      name:"角色"
    },
    {
      key:"isEnable",
      name:"是否使用"

    },
    {
      key:"state",
      name:"目前状态"
    },

  ]
  isEdit = false;
  _dataSet = [];

  formData = {}


  getRowData(value){
    this.formData = {};
    this.formData  = Object.assign({},value);
    this.isEdit = true;
  }


  sendData(data){
    console.log(data);
    //在这里做请求操作
    this.http.get(api.editUserInfo,data).subscribe((res)=>{
      console.log(res);
      this.getUserInfo();
    })


    this.isEdit = false;
  }
  constructor(private http: HttpClient,){

  }

  getUserInfo(){
    this.http.get(api.queryUserInfo).subscribe((res)=>{
      console.dir(res);
      let list = <any>res;
      this._dataSet = list;
    })
  }



  ngOnInit() {
    this.getUserInfo();
  }

}


