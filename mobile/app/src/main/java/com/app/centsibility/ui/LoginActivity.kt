package com.app.centsibility.ui

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.ViewModelProvider
import com.app.centsibility.data.local.TokenManager
import com.app.centsibility.data.remote.Resource
import com.app.centsibility.data.repository.AuthRepository
import com.app.centsibility.databinding.ActivityLoginBinding
import com.app.centsibility.ui.viewmodel.AuthViewModel
import com.app.centsibility.ui.viewmodel.AuthViewModelFactory

class LoginActivity : AppCompatActivity() {

    private lateinit var binding: ActivityLoginBinding
    private lateinit var viewModel: AuthViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val repository = AuthRepository()
        val tokenManager = TokenManager(this)
        val factory = AuthViewModelFactory(repository, tokenManager)
        viewModel = ViewModelProvider(this, factory)[AuthViewModel::class.java]

        setupListeners()
        observeViewModel()
    }

    private fun setupListeners() {
        binding.loginButton.setOnClickListener {
            val email = binding.emailEditText.text.toString().trim()
            val password = binding.passwordEditText.text.toString().trim()
            viewModel.login(email, password)
        }

        binding.signUpLink.setOnClickListener {
            startActivity(Intent(this, RegisterActivity::class.java))
        }
    }

    private fun observeViewModel() {
        viewModel.authState.observe(this) { resource ->
            when (resource) {
                is Resource.Loading -> {
                    binding.loginProgressBar.visibility = View.VISIBLE
                    binding.loginButton.isEnabled = false
                }
                is Resource.Success -> {
                    binding.loginProgressBar.visibility = View.GONE
                    binding.loginButton.isEnabled = true
                    Toast.makeText(this, "Login Successful", Toast.LENGTH_SHORT).show()
                    // Navigate to HomeActivity
                    val intent = Intent(this, HomeActivity::class.java)
                    intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
                    startActivity(intent)
                    finish()
                }
                is Resource.Error -> {
                    binding.loginProgressBar.visibility = View.GONE
                    binding.loginButton.isEnabled = true
                    Toast.makeText(this, resource.message ?: "Login Failed", Toast.LENGTH_LONG).show()
                }
                else -> {
                    binding.loginProgressBar.visibility = View.GONE
                    binding.loginButton.isEnabled = true
                }
            }
        }
    }
}
