package thanhld.demo.jhi.service.impl;

import org.springframework.stereotype.Service;
import thanhld.demo.jhi.domain.Customer;
import thanhld.demo.jhi.repository.CustomerRepository;
import thanhld.demo.jhi.service.CustomerService;

import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService{
    @Inject
    private CustomerRepository customerRepository;

    @Override
    public List<Customer> findAll() {
        return customerRepository.findAll();
    }

    @Override
    public Customer findOne(long id) {
        return customerRepository.findById(id).get();
    }
}
