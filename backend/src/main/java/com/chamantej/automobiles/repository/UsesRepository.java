package com.chamantej.automobiles.repository;

import com.chamantej.automobiles.entity.Uses;
import com.chamantej.automobiles.entity.id.UsesId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UsesRepository extends JpaRepository<Uses, UsesId> {
    List<Uses> findByInvoice_InvoiceId(Long invoiceId);
}
