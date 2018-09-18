package thanhld.demo.jhi.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import thanhld.demo.jhi.domain.Category;
import thanhld.demo.jhi.domain.Customer;
import thanhld.demo.jhi.service.CustomerService;
import thanhld.demo.jhi.web.rest.errors.BadRequestAlertException;
import thanhld.demo.jhi.web.rest.util.HeaderUtil;
import thanhld.demo.jhi.web.rest.util.PaginationUtil;

import javax.inject.Inject;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class CustomerResource {
    private final Logger log = LoggerFactory.getLogger(CustomerResource.class);

    private final CustomerService customerService;

    public CustomerResource(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping("/customers")
    @Timed
    public ResponseEntity<List<Customer>> getAllCustomers(Pageable pageable) {
        log.debug("REST request to get a page of Customers");
        Page<Customer> page = customerService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/customers");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/customers/{id}")
    @Timed
    public ResponseEntity<Customer> getCustomer(@PathVariable Long id) {
        log.debug("REST request to get Customer : {}", id);
        Optional<Customer> customer = customerService.findOne(id);
        return ResponseUtil.wrapOrNotFound(customer);
    }

    @PostMapping("/customers")
    @Timed
    public ResponseEntity<Customer> create(@RequestBody Customer customer) {
        log.debug("REST request to update Customer : {}", customer);
        if (customer.getId() != null) {
            throw new BadRequestAlertException("Invalid id", "customer", "idexists");
        }
        Customer result = customerService.save(customer);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityCreationAlert("customer", result.getId().toString()))
            .body(result);
    }

    @PutMapping("/customers")
    @Timed
    public ResponseEntity<Customer> update(@RequestBody Customer customer) {
        log.debug("REST request to update Customer : {}", customer);
        if (customer.getId() == null) {
            throw new BadRequestAlertException("Invalid id", "customer", "idnull");
        }
        Customer result = customerService.save(customer);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("customer", customer.getId().toString()))
            .body(result);
    }
}
