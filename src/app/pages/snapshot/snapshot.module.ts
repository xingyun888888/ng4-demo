import { NgModule,CUSTOM_ELEMENTS_SCHEMA }   from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule ,ReactiveFormsModule}        from '@angular/forms';
import { SnapshotComponent }   from './snapshot.component';
import {SnapshotRoutingModule} from './snapshot-routing.module';
import {NgZorroAntdModule} from "ng-zorro-antd";
import  {CommonUiModule} from '../../components/common.module'

@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  imports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule.forRoot(),
    CommonUiModule,
    SnapshotRoutingModule
  ],
  declarations: [SnapshotComponent],
  exports:[],
  providers:[]
})
export class SnapshotModule{ }
