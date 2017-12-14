import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.less']
})
export class DemoComponent implements OnInit {
  _allChecked = false;
  _disabledButton = true;
  _checkedNumber = 0;
  _displayData: Array<any> = [];
  _operating = false;
  _dataSet = [];
  _indeterminate = false;

  editRow = []; //可编辑的行
  tempEditObject = [];//编辑暂存区
  pageSize = 5;//每页多少条数据
  total = 0; //总条数
  currentPageIndex = 1;//当前页码

  _multiEdit() {
    this.editRow = [];
    this.tempEditObject = this._dataSet.concat();
    this._displayData.forEach((item,index)=>{
        if(item.checked){
          this.editRow.push(item.key)
        }
    })
  }
  _multiSave() {
    this._dataSet = this.tempEditObject.concat();
    this.editRow = [];
  }
  _multiDelete(){
    let data = this._dataSet.concat();
    for(let i=this._displayData.length-1;i>=0;i--){
      if(this._displayData[i].checked){
        data.splice(i,1);
      }
    }
    this._dataSet = data;
  }
  edit(data){
    this.editRow = [];
    this.tempEditObject=this._dataSet.concat();
    this.editRow.push(data.key);
  }
  save(data){
    this.editRow = [];
    this._dataSet.forEach((item,index)=>{
      if(item.key==data.key){
        Object.assign(item,data);
      }
    })
    this.editRow = [];
  }
  cancel(data){
    console.log(this.tempEditObject[data.key]);
    console.log(this._dataSet[data.key])
    this.editRow.splice(this.editRow.indexOf(data.key),1);
    console.dir(this.editRow);
  }
  _displayDataChange($event) {
    this._displayData = $event;
    console.log($event);
  }




  _refreshStatus() {
    const allChecked = this._displayData.every(value => value.checked === true);
    const allUnChecked = this._displayData.every(value => !value.checked);
    this._allChecked = allChecked;
    this._indeterminate = (!allChecked) && (!allUnChecked);
    this._disabledButton = !this._dataSet.some(value => value.checked);
    this._checkedNumber = this._dataSet.filter(value => value.checked).length;
  }

  _checkAll(value) {
    if (value) {
      this._displayData.forEach(data => data.checked = true);
    } else {
      this._displayData.forEach(data => data.checked = false);
    }
    this._refreshStatus();
  }

  _operateData() {
    this._operating = true;
    setTimeout(_ => {
      this._dataSet.forEach(value => value.checked = false);
      this._refreshStatus();
      this._operating = false;
    }, 1000);
  }

  _pageSizeChange(visible){
     console.log(visible);
  }

  ngOnInit() {
    for (let i = 0; i < 10; i++) {
      this._dataSet.push({
        key    : i,
        name   : `得到的${i}`,
        age    : 32,
        address: `的${i}`,
        c    : 32,
        d: `的${i}`,
      });
    }

    this.total = this._dataSet.length;
  }
}
