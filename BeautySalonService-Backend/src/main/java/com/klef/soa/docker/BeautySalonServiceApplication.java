package com.klef.soa.docker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BeautySalonServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(BeautySalonServiceApplication.class, args);
		System.out.println("Beauty Salon Service is running..");
	}

}
