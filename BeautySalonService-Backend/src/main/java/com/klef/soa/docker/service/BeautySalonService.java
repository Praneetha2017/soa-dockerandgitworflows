
package com.klef.soa.docker.service;

import java.util.List;

import com.klef.soa.docker.entity.BeautySalon;
import com.klef.soa.docker.dto.BeautySalonRequest;
import com.klef.soa.docker.dto.BeautySalonResponse;

public interface BeautySalonService {

    BeautySalonResponse add(BeautySalonRequest request);

    List<BeautySalonResponse> displayAll();

    String delete(long id);

	

    
}
