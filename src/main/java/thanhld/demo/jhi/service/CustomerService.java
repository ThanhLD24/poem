package thanhld.demo.jhi.service;

import thanhld.demo.jhi.domain.Customer;

import java.util.List;

public interface CustomerService {
    List<Customer> findAll();
    Customer findOne(long id);
}
