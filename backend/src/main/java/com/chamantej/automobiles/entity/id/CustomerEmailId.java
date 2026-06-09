package com.chamantej.automobiles.entity.id;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerEmailId implements Serializable {

    @Column(name = "customer_id")
    private Long customerId;

    @Column(name = "email")
    private String email;
}