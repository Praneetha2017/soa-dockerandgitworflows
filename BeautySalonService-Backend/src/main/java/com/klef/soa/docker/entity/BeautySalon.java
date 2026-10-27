package com.klef.soa.docker.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="exam_2400032017")

public class BeautySalon {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private long id;	
	@Column(name="name",length=100,nullable = false)
	private String name;
	@Column(name="loc",length=100,nullable = false)
	private String location;
	@Column(name="staffcount",length=20,nullable = false)
	private int staffcount;
	@Column(name="open",length=20,nullable = false)
	private boolean open;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public int getStaffcount() {
		return staffcount;
	}
	public void setStaffcount(int staffcount) {
		this.staffcount = staffcount;
	}
	public boolean isOpen() {
		return open;
	}
	public void setOpen(boolean open) {
		this.open = open;
	}
	@Override
	public String toString() {
		return "BeautySalon [id=" + id + ", name=" + name + ", location=" + location + ", staffcount=" + staffcount
				+ ", open=" + open + "]";
	}
	
	
	

}
