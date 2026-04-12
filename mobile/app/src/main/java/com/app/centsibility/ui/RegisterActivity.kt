package com.app.centsibility.ui

import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.ViewModelProvider
import com.app.centsibility.data.local.TokenManager
import com.app.centsibility.data.remote.Resource
import com.app.centsibility.data.repository.AuthRepository
import com.app.centsibility.databinding.ActivityRegisterBinding
import com.app.centsibility.ui.viewmodel.AuthViewModel
import com.app.centsibility.ui.viewmodel.AuthViewModelFactory

class RegisterActivity : AppCompatActivity() {

    private lateinit var binding: ActivityRegisterBinding
    private lateinit var viewModel: AuthViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityRegisterBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val repository = AuthRepository()
        val tokenManager = TokenManager(this)
        val factory = AuthViewModelFactory(repository, tokenManager)
        viewModel = ViewModelProvider(this, factory)[AuthViewModel::class.java]

        setupListeners()
        observeViewModel()
    }

    private fun setupListeners() {
        binding.registerButton.setOnClickListener {
            val firstName = binding.firstNameEditText.text.toString().trim()
            val lastName = binding.lastNameEditText.text.toString().trim()
            val email = binding.emailEditText.text.toString().trim()
            val password = binding.passwordEditText.text.toString().trim()
            val confirmPassword = binding.confirmPasswordEditText.text.toString().trim()

            if (password != confirmPassword) {
                Toast.makeText(this, "Passwords do not match", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            viewModel.register(firstName, lastName, email, password)
        }

        binding.signInLink.setOnClickListener {
            finish()
        }
    }

    private fun observeViewModel() {
        viewModel.authState.observe(this) { resource ->
            when (resource) {
                is Resource.Loading -> {
                    binding.registerProgressBar.visibility = View.VISIBLE
                    binding.registerButton.isEnabled = false
                }
                is Resource.Success -> {
                    binding.registerProgressBar.visibility = View.GONE
                    binding.registerButton.isEnabled = true
                    Toast.makeText(this, "Registration Successful", Toast.LENGTH_SHORT).show()
                    finish()
                }
                is Resource.Error -> {
                    binding.registerProgressBar.visibility = View.GONE
                    binding.registerButton.isEnabled = true
                    Toast.makeText(this, resource.message ?: "Registration Failed", Toast.LENGTH_LONG).show()
                }
                else -> {
                    binding.registerProgressBar.visibility = View.GONE
                    binding.registerButton.isEnabled = true
                }
            }
        }
    }
}
