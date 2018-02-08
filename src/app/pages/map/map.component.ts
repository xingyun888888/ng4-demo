import {Component, OnInit, ElementRef, ViewChild, ViewContainerRef, ComponentFactoryResolver} from '@angular/core';
import api from '../../api';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MapMarkComponent} from '../../components/map-mark/map-mark.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})
export class MapComponent implements OnInit {

  /**
   * 是否展示上传地图模态框
   * @type {boolean}
   */
  isShowUploadModal:boolean = false;


  /**
   * 地图上传模态框点击确定的回调
   * @param e
   */
  handleMapUploadOk = (e) => {
    this.isShowUploadModal = false;
  }
  /**
   * 地图上传模态框点击取消的回调
   * @param e
   */
  handleMapUploadCancel = (e) => {
    console.log(e);
    this.isShowUploadModal = false;
  }


  /**用来存储楼层的集合*/
  mapOptions = [
    {value: 'floor1', label: '地下一层'},
    {value: 'floor2', label: '地下二层'},
    {value: 'floor3', label: '地下三层'},
    {value: 'floor4', label: '地下四层'},
    {value: 'floor5', label: '地下五层'}
  ];


  /**
   * 保存准备上传到服务的地图文件
   * @type {Array}
   */
  mapFileList:Array<any> = [];

  /**
   * 保存地图的名字
   * @type {string}
   */
  mapName:string = "";

  /**
   * 返回false就是取消上传
   * @param file
   * @returns {boolean}
   */
  beforeUpload(file){
    this.mapFileList.push(file);
    console.log(file);
    return false;
  }

  /**
   * @param e 确认上传地图的操作
   */
  handleMapUpload(e){
    const formData = new FormData();
    this.mapFileList.forEach((file: any) => {
      formData.append('files', file);
    });
    formData.append('mapName',this.mapName);
    this.http.post(api.batchUpload,formData, {headers:new HttpHeaders({
      })}).subscribe((event: any) => {
      this.mapFileList = [];
    }, (err) => {
      this.mapFileList = [];
    });
  }

  /**
   * 取消上传地图的操作
   * @param e
   */
  cancalMapUpload(e){
    this.mapFileList = [];
    this.mapName = "";
  }

  /**用来存储当前地图上面在线camera的集合*/
  cameraPositions = [];

  /**绑定视图上面mapImg元素*/
    // @ViewChild('mapImg') mapImg: ElementRef;
  @ViewChild('mapImg', {read: ViewContainerRef}) mapImg: ViewContainerRef;

  /**表示当前选择的floor-map*/
  selectedMap = this.mapOptions[0];


  /**
   * 用来存放当前地图上面生成的坐标组件的集合
   * @type {Array}
   */
  allCameraImgNodes: any = [];

  /**初始化当前地图上面的在线camera,在这里接受一个参数res,就是拿到接口返回的response）*/
  initCurrentMapOnlineCamera(res) {
    this.cameraPositions =res;
    res.map((item, index) => {
      let mapMark = this.resolver.resolveComponentFactory(MapMarkComponent);
      let component = this.mapImg.createComponent(mapMark);

      component.instance['left'] = item.camMapX + 'px';
      component.instance['top'] = item.camMapY + 'px';
      component.instance['title'] = `x:${item.camMapX},y:${item.camMapY}`;
      component.instance['src'] = item.camState ? '../../../assets/images/map/map-active.png' : '../../../assets/images/map/map.png';
      this.allCameraImgNodes.push(component);
    });
  }

  /**floor切换的回调,清除页面脏数据,更新当前map上所有camera位置*/
  floorChangeHandler(e) {
    console.log(this.selectedMap);
    this.allCameraImgNodes.map((item, index) => {
      //this.mapImg.nativeElement.removeChild(item);
      item.destroy();
    });
    this.allCameraImgNodes = [];
    setTimeout(()=>{
      this.initCurrentMapOnlineCamera(this.cameraPositions);
    },2000)
  }

  constructor(private vcr: ViewContainerRef, private http: HttpClient, private resolver: ComponentFactoryResolver) {
    /**
     *  因为beforeUpload 里面用到了this  但是this取值是根据方法执行的时候才知道的
     *  所以要想this是该组件 就必须在这里进行绑定为当前组件的this;
     * @type {any}
     *
     */

    this.beforeUpload = this.beforeUpload.bind(this);

  }

  /**将查询到的camera的坐标信息赋值给mapDataSet*/
  showCameraOnMap() {
    this.http.get(api.showCameraOnMap).subscribe((res) => {
      console.dir(res);
      const list = <any>res;
      this.initCurrentMapOnlineCamera(list);
    }, (error) => {
      const list = [{
        id: 1,
        camMapX:364,
        camMapY:243,
        camState: 1
      },{
        id: 1,
        camMapX:464,
        camMapY:233,
        camState: 0
      },{
        id: 1,
        camMapX:564,
        camMapY:442,
        camState: 1
      }];
      this.initCurrentMapOnlineCamera(list);
    });
  }

  ngOnInit() {
    this.showCameraOnMap();
  }

}
