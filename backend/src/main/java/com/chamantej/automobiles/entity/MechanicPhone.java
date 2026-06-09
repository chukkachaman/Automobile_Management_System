package com.chamantej.automobiles.entity;

import com.chamantej.automobiles.entity.id.MechanicPhoneId;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "mechanic_phone")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MechanicPhone {

    @EmbeddedId
    private MechanicPhoneId id;

    @ManyToOne
    @MapsId("mechanicId")
    @JoinColumn(name = "mechanic_id", referencedColumnName = "mechanic_id")
    private Mechanic mechanic;
}

