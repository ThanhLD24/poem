import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CustomerComponent} from './customer.component';
import {customerRoute} from './customer.route';
import {JhipsterSharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {CustomerDetailComponent} from "./customer-detail.component";
import {CustomerUpdateComponent} from "./customer-update.component";
const ENTITY_STATES = [...customerRoute];
@NgModule({
    imports: [JhipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [CustomerComponent, CustomerDetailComponent, CustomerUpdateComponent],
    entryComponents : [CustomerComponent, CustomerDetailComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterCustomerModule { }
