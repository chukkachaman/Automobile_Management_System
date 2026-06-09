package com.chamantej.automobiles.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsedPartDTO {
    private Long partId;
    private String partName;
    private Integer count;
    private Double unitPrice;
    private Double lineTotal; // unitPrice * count
}