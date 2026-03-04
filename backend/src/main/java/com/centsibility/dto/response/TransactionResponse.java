package com.centsibility.dto.response;

import com.centsibility.model.Transaction;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransactionResponse {

    private Long id;
    private Transaction.TransactionType type;
    private BigDecimal amount;
    private String category;
    private String description;
    private LocalDate transactionDate;
    private Transaction.PaymentMethod paymentMethod;
    private String receiptUrl;
    private String tags;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
