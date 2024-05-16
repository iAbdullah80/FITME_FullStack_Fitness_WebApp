const addItemForm = document.getElementById('addItem-form');
const errorMessage = document.getElementById('error-message');

addItemForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  console.log("Add item form submitted");
  try {
    const response = await fetch('/admin/dashboard/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: addItemForm.elements.name.value,
        weight: addItemForm.elements.weight.value,
        calories: addItemForm.elements.calories.value,
        fat: addItemForm.elements.fat.value,
        carbs: addItemForm.elements.carbs.value,
        protein: addItemForm.elements.protein.value,
        image: addItemForm.elements.image.value
      })
    });

    if (response.status === 500) {
      errorMessage.textContent = 'Item already exists.';
      errorMessage.style.display = 'block';
    } else if (response.status === 200) {
      // Handle successful signup
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