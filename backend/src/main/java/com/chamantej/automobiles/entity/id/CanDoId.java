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
public class CanDoId implements Serializable {
    @Column(name = "mechanic_id")
    private Long mechanicId;

    @Column(name = "service_id")
    private Long serviceId;
}


