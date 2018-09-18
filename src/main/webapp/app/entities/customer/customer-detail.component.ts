import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ICustomer} from "../../shared/model/customer.model";

@Component({
  selector: 'jhi-customer-detail',
  templateUrl: './customer-detail.component.html',
  styles: []
})
export class CustomerDetailComponent implements OnInit {
    customer: ICustomer;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ customer }) => {
            this.customer = customer;
        });
    }

    previousState() {
        window.history.back();
    }

}
