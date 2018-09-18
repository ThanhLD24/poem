import { Component, OnInit } from '@angular/core';
import {ICustomer} from "../../shared/model/customer.model";
import {CustomerService} from "./customer.service";
import {ActivatedRoute} from "@angular/router";
import {DATE_TIME_FORMAT} from "../../shared/constants/input.constants";
import * as moment from 'moment';
import {Observable} from "rxjs/Rx";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'jhi-customer-update',
  templateUrl: './customer-update.component.html',
  styles: []
})
export class CustomerUpdateComponent implements OnInit {
    customer : ICustomer;
    isSaving : boolean;
    createdDate: string;
    updatedDate: string;

    constructor(private activatedRoute: ActivatedRoute, private customerService : CustomerService) { }

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ customer }) => {
            this.customer = customer;
        });
    }
    save() {
        this.isSaving = true;
        this.customer.createdDate = moment(this.createdDate, DATE_TIME_FORMAT);
        this.customer.updatedDate = moment(this.updatedDate, DATE_TIME_FORMAT);
        if (this.customer.id !== undefined) {
            this.subscribeToSaveResponse(this.customerService.update(this.customer));
        } else {
            this.subscribeToSaveResponse(this.customerService.create(this.customer));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICustomer>>) {
        result.subscribe((res: HttpResponse<ICustomer>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        window.history.back();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
