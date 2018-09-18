package thanhld.demo.jhi.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import thanhld.demo.jhi.domain.Customer;

import java.util.List;
import java.util.Optional;

public interface CustomerService {
    List<Customer> findAll();
    Page<Customer> findAll(Pageable pageable);
    Optional<Customer> findOne(long id);
    Customer save(Customer customer);
}
