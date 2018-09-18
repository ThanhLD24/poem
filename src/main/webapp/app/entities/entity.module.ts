import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhipsterCategoryModule } from './category/category.module';
import { JhipsterProductModule } from './product/product.module';
import {JhipsterCustomerModule} from './customer/customer.module';
import { CustomerUpdateComponent } from './customer/customer-update.component';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        JhipsterCategoryModule,
        JhipsterProductModule,
        JhipsterCustomerModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterEntityModule {}
