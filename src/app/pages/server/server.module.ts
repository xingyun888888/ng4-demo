import { NgModule ,CUSTOM_ELEMENTS_SCHEMA}   from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';
import { ServerComponent }   from './server.component';
import { ServerRoutingModule} from './server-routing.module';
import {NgZorroAntdModule} from "ng-zorro-antd";

@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  imports:[
    CommonModule,
    FormsModule,
    ServerRoutingModule,
    NgZorroAntdModule.forRoot(),
  ],
  declarations: [
    ServerComponent
  ],
  exports:[],
  providers:[]
})
export class ServerModule { }
