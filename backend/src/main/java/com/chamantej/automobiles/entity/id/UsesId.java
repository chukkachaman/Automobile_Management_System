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
public class UsesId implements Serializable {
    @Column(name = "invoice_id")
    private Long invoiceId;

    @Column(name = "part_id")
    private Long partId;
}

