import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs/Rx";
import {ICustomer} from "../../shared/model/customer.model";
import {createRequestOption} from "../../shared/util/request-util";
import {SERVER_API_URL} from "../../app.constants";
type EntityArrayResponseType = HttpResponse<ICustomer[]>;

export class CustomerService {
    private resourceUrl = SERVER_API_URL + 'api/categories';
    constructor(private http : HttpClient) {
    }

    query(req?: any) : Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICustomer[]>(this.resourceUrl, {params: options, observe: 'response'});
    }
}
