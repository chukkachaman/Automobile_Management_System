package com.chamantej.automobiles.entity;

import com.chamantej.automobiles.entity.id.UserMiddleNameId;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_middle_name")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserMiddleName {

    @EmbeddedId
    private UserMiddleNameId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false)
    private User user;

    @Column(name = "middle_name_order")
    private int middleNameOrder;
}