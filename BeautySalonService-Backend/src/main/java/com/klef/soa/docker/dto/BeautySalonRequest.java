package com.klef.soa.docker.dto;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;


public class BeautySalonRequest {
	@NotBlank(message = "Salon name is required")
    private String salonName;

    @NotBlank(message = "Location is required")
    private String location;

    @NotNull(message = "Staff count is required")
    @Min(value = 0, message = "Staff count must be zero or positive")
    private Integer staffCount;

    @NotNull(message = "Open status is required")
    private Boolean open;
    
    public String getSalonName() {
        return salonName;
    }

    public void setSalonName(String salonName) {
        this.salonName = salonName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Integer getStaffCount() {
        return staffCount;
    }

    public void setStaffCount(Integer staffCount) {
        this.staffCount = staffCount;
    }

    public Boolean getOpen() {
        return open;
    }

    public void setOpen(Boolean open) {
        this.open = open;
    }

}
