import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { Auto1Component } from '../components/auto1/auto1.component';
import { Auto2Component } from '../components/auto2/auto2.component';
import { Auto3Component } from '../components/auto3/auto3.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule
  ],
  declarations: [FolderPage,Auto1Component,Auto2Component,Auto3Component]
})
export class FolderPageModule {}
