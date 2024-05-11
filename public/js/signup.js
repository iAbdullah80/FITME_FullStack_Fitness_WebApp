const signupForm = document.getElementById('signup-form');
const errorMessage = document.getElementById('error-message');

signupForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const password = signupForm.elements.password.value;
  const confirmPassword = signupForm.elements.confirmPassword.value;

  if (password !== confirmPassword) {
    errorMessage.textContent = 'Passwords do not match.';
    errorMessage.style.display = 'block';
    return;
  }

  try {
    const response = await fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: signupForm.elements.name.value,
        email: signupForm.elements.email.value,
        password: signupForm.elements.password.value
      })
    });

    if (response.status === 500) {
      errorMessage.textContent = 'User already exists.';
      errorMessage.style.display = 'block';
    } else if (response.status === 200) {
      // Handle successful signup
      window.location.href = '/dashboard';
    }
    else {
      console.log("Error: ", response);
      window.location.reload();
    }
  } catch (error) {
    console.error('Error:', error);
    window.location.reload();
  }
});