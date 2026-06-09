package com.chamantej.automobiles.entity.id;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.Embeddable;
import java.io.Serializable;


@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerMiddleNameId implements Serializable {

    @Column(name = "customer_id")
    private Long customerId;

    @Column(name = "middle_name")
    private String middleName;
}

