const editItemForm = document.getElementById('editItem-form')
const errorMessage = document.getElementById('error-message')

console.log(itemId)

editItemForm.addEventListener('submit', async (event) => {
  event.preventDefault()
  console.log('Add item form submitted')
  try {
    const response = await fetch('/admin/dashboard/edit/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: editItemForm.elements.name.value,
        weight: editItemForm.elements.weight.value,
        calories: editItemForm.elements.calories.value,
        fat: editItemForm.elements.fat.value,
        carbs: editItemForm.elements.carbs.value,
        protein: editItemForm.elements.protein.value,
        image: editItemForm.elements.image.value
      })
    })

    if (response.status === 500) {
      errorMessage.textContent = 'Item already exists.'
      errorMessage.style.display = 'block'
    } else if (response.status === 200) {
      // Handle successful signup
      window.location.href = '/admin/dashboard'
    } else {
      console.log('Error: ', response)
      window.location.reload()
    }
  } catch (error) {
    console.error('Error:', error)
    window.location.reload()
  }
})
