const signinForm = document.getElementById('adminSignin-form');
const errorMessage = document.getElementById('error-message');

signinForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  try {
    const response = await fetch('/admin/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signinForm.elements.email.value,
        password: signinForm.elements.password.value
      })
    });

    if (response.status === 404) {
      errorMessage.textContent = 'Email does not exist.';
      errorMessage.style.display = 'block';
    } else if (response.status === 401) {
      errorMessage.textContent = 'Invalid credentials.';
      errorMessage.style.display = 'block';
    } else if (response.status === 200) {
       // Handle successful sign-in
       window.location.href = '/admin/dashboard';
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