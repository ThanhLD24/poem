import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {Customer, ICustomer} from '../../shared/model/customer.model';
import {CustomerService} from './customer.service';
import {Injectable} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import {CustomerComponent} from './customer.component';
import {UserRouteAccessService} from '../../core/auth/user-route-access-service';
import {CustomerDetailComponent} from "./customer-detail.component";
import {CustomerUpdateComponent} from "./customer-update.component";

@Injectable({ providedIn: 'root' })
export class CustomerResolve implements Resolve<ICustomer> {
    constructor(private service: CustomerService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((customer: HttpResponse<Customer>) => customer.body));
        }
        return of(new Customer());
    }
}

export const customerRoute: Routes = [
    {
        path: 'customer',
        component: CustomerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'customer/:id/view',
        component: CustomerDetailComponent,
        resolve: {
            customer: CustomerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'customer/:id/edit',
        component: CustomerUpdateComponent,
        resolve: {
            customer: CustomerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }];
