package com.chamantej.automobiles.entity.id;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;
import java.io.Serializable;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MechanicMiddleNameId implements Serializable {

    @Column(name = "mechanic_id")
    private Long mechanicId;

    @Column(name = "mechanic_middle_name")
    private String middleName;
}