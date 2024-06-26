// Import PrimeNG modules
import { NgModule } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { PaginatorModule } from 'primeng/paginator';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';


@NgModule({
  imports: [
    TableModule, CardModule,ButtonModule, CheckboxModule,
    PaginatorModule, DividerModule, SliderModule, AvatarModule, DialogModule,
    DynamicDialogModule, ToolbarModule
  ],
  exports: [
    TableModule, CardModule,ButtonModule, CheckboxModule,
    PaginatorModule, DividerModule, SliderModule, AvatarModule, DialogModule,
    DynamicDialogModule, ToolbarModule
  ],
  providers: [ DialogService ]
})
export class ImportsModule {}
