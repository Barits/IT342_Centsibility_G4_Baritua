package com.centsibility.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendVerificationEmail(String toEmail, String token) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject("Centsibility - Email Verification");
            message.setText("Please verify your email by clicking the link below:\n\n" +
                    "http://localhost:3000/verify-email?token=" + token + "\n\n" +
                    "This link will expire in 24 hours.\n\n" +
                    "Thank you for registering with Centsibility!");
            
            mailSender.send(message);
            log.info("Verification email sent to: {}", toEmail);
        } catch (Exception e) {
            log.error("Failed to send verification email to: {}", toEmail, e);
        }
    }

    public void sendPasswordResetEmail(String toEmail, String token) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject("Centsibility - Password Reset");
            message.setText("You requested a password reset. Click the link below to reset your password:\n\n" +
                    "http://localhost:3000/reset-password?token=" + token + "\n\n" +
                    "This link will expire in 1 hour.\n\n" +
                    "If you didn't request this, please ignore this email.");
            
            mailSender.send(message);
            log.info("Password reset email sent to: {}", toEmail);
        } catch (Exception e) {
            log.error("Failed to send password reset email to: {}", toEmail, e);
        }
    }

    public void sendBudgetAlertEmail(String toEmail, String category, String message) {
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(toEmail);
            mailMessage.setSubject("Centsibility - Budget Alert: " + category);
            mailMessage.setText(message);
            
            mailSender.send(mailMessage);
            log.info("Budget alert email sent to: {}", toEmail);
        } catch (Exception e) {
            log.error("Failed to send budget alert email to: {}", toEmail, e);
        }
    }

}
