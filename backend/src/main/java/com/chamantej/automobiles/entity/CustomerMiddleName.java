package com.chamantej.automobiles.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.chamantej.automobiles.entity.id.CustomerMiddleNameId;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "customer_middle_name")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerMiddleName {

    @EmbeddedId
    private CustomerMiddleNameId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("customerId")
    @JoinColumn(name = "customer_id", referencedColumnName = "customer_id", nullable = false)
    @JsonBackReference
    private Customer customer;

    @Column(name = "middle_name_order")
    private int middleNameOrder;
}