import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { DemoComponent } from './demo/demo.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


/**
 * 引入图表库
 */
import { NgxEchartsModule } from 'ngx-echarts';


import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {appRoutes} from './app.route';
import { HomeComponent } from './home/home.component';
import { TableComponent } from './components/table/table.component';
import { CommonTableComponent } from './components/table/common-table/common-table.component';
import { UserinfoModelComponent } from './components/model/userinfo-model/userinfo-model.component';
import {NavComponent} from "./components/nav/nav.component";
import {HeaderComponent} from "./components/header/header.component";
import { SearchComponent } from './components/search/search.component';
import { CameraComponent } from './pages/camera/camera.component';
import {UserinfoComponent} from "./pages/userinfo/userinfo.component";
import { CameraEditComponent } from './components/model/camera-edit/camera-edit.component';
import { ServerComponent } from './pages/server/server.component';
import { ServerModelComponent } from './components/model/server-model/server-model.component';
import { MobileComponent } from './pages/mobile/mobile.component';
import { ReportDataAnalyzeComponent } from './pages/report-data-analyze/report-data-analyze.;
import { FacelibComponent } from './pages/facelib/facelib.;
import { FacelibModelComponent } from './components/model/facelib-model/facelib-model.;
import { LogComponent } from './pages/log/log.;
import { RecognizeComponent } from './pages/recognize/recognize.;
import { UserComponent } from './pages/user/user.component'component'component'component'component'component';

@NgModule({
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  declarations: [
    AppComponent,
    DemoComponent,
    NavComponent,
    HeaderComponent,
    HomeComponent,
    TableComponent,
    CommonTableComponent,
    UserinfoComponent,
    UserinfoModelComponent,
    SearchComponent,
    CameraComponent,
    CameraEditComponent,
    ServerComponent,
    ServerModelComponent,
    MobileComponent,
    ReportDataAnalyz,
    FacelibComponent,
    FacelibModelComponent,
    LogComponent,
    RecognizeComponent,
    UserComponenteComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    NgZorroAntdModule.forRoot(),
    ReactiveFormsModule,
    NgxEchartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
