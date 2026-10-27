
package com.klef.soa.docker.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.soa.docker.dto.BeautySalonRequest;
import com.klef.soa.docker.dto.BeautySalonResponse;
import com.klef.soa.docker.entity.BeautySalon;
import com.klef.soa.docker.repository.BeautySalonRepository;
import com.klef.soa.docker.service.BeautySalonService;

@Service
public class BeautySalonServiceImpl implements BeautySalonService {

    @Autowired
    private BeautySalonRepository repository;

    @Override
    public BeautySalonResponse add(BeautySalonRequest request) {

        BeautySalon salon = new BeautySalon();

        salon.setName(request.getSalonName());
        salon.setLocation(request.getLocation());
        salon.setStaffcount(request.getStaffCount());
        salon.setOpen(request.getOpen());

        BeautySalon savedSalon = repository.save(salon);

        return mapToResponse(savedSalon);
    }

    @Override
    public List<BeautySalonResponse> displayAll() {

        return repository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public String delete(long id) {

        BeautySalon salon = repository.findById(id)
                .orElseThrow(() ->
                    new RuntimeException(
                        "Beauty salon not found with id: " + id));

        repository.delete(salon);

        return "Beauty salon deleted successfully";
    }

    private BeautySalonResponse mapToResponse(BeautySalon salon) {

        BeautySalonResponse response = new BeautySalonResponse();

        response.setId(salon.getId());
        response.setSalonName(salon.getName());
        response.setLocation(salon.getLocation());
        response.setStaffCount(salon.getStaffcount());
        response.setOpen(salon.isOpen());

        return response;
    }

	
}
