package com.chamantej.automobiles.entity.id;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserMiddleNameId implements Serializable {

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "middle_name")
    private String middleName;
}