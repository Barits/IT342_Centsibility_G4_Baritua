package com.centsibility.repository;

import com.centsibility.model.TransactionEntry;
import com.centsibility.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TransactionEntryRepository extends JpaRepository<TransactionEntry, Long> {

    List<TransactionEntry> findByUserOrderByTransactionDateDescCreatedAtDesc(User user);

    List<TransactionEntry> findByUserAndTransactionDateBetweenOrderByTransactionDateDescCreatedAtDesc(
            User user,
            LocalDate startDate,
            LocalDate endDate
    );
}
