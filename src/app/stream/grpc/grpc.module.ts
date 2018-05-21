import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrpcService } from './grpc.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    GrpcService
  ],
  declarations: []
})
export class GrpcModule { }
