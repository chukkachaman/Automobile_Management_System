package com.chamantej.automobiles.entity;

import com.chamantej.automobiles.entity.id.CustomerEmailId;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "customer_email")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerEmail {

    @EmbeddedId
    private CustomerEmailId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("customerId")
    @JoinColumn(name = "customer_id", referencedColumnName = "customer_id", nullable = false)
    private Customer customer;
}
