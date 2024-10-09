const age = document.getElementById('age')
const height = document.getElementById('height')
const weight = document.getElementById('weight')
const male = document.getElementById('m')
const female = document.getElementById('f')
const form = document.getElementById('form')
const resultArea = document.querySelector('.comment')
modalContent = document.querySelector('.modal-content')
modalText = document.querySelector('#modalText')
const modal = document.getElementById('myModal')
window.addEventListener('scroll', function () {
  const header = document.querySelector('.header')
  if (window.pageYOffset > 0) {
    header.classList.add('header-hidden')
  } else {
    header.classList.remove('header-hidden')
  }
})

function resetForm () {
  location.reload()
}

function updateClock () {
  const now = new Date()
  const dname = now.getDay()
  const mo = now.getMonth()
  const dnum = now.getDate()

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  const week = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]
  const ids = ['dayname', 'month', 'daynum']
  const values = [week[dname], months[mo], dnum]

  for (var i = 0; i < ids.length; i++) {
    document.getElementById(ids[i]).firstChild.nodeValue = values[i]
  }

  // Add workout information for specific days
  const workoutDay = document.getElementById('workoutDay')

  if (dname === 0 || dname === 3 || dname === 6) {
    workoutDay.children[0].textContent = 'Push Day Workout'
  } else if (dname === 1 || dname === 4) {
    workoutDay.children[0].textContent = 'Pull Day Workout'
  } else if (dname === 2 || dname === 5) {
    workoutDay.children[0].textContent = 'Legs Day Workout'
  }

  for (var i = 0; i < ids1.length; i++) {
    document.getElementById(ids1[i]).firstChild.nodeValue =
      workoutDay.children[i].textContent
  }
}

function initclock () {
  updateClock()
  window.setInterval(updateClock, 1000)
}

function workout (event) {
  event.preventDefault()

  const now = new Date()
  const dayName = getDayName(now.getDay())

  const workoutPageUrls = {
    Sunday: 'dashboard/pushDay',
    Monday: 'dashboard/pullDay',
    Tuesday: 'dashboard/legsDay',
    Wednesday: 'dashboard/pushDay',
    Thursday: 'dashboard/pullDay',
    Friday: 'dashboard/legsDay',
    Saturday: 'dashboard/pushDay'
  }

  const targetPageUrl = workoutPageUrls[dayName]

  if (targetPageUrl) {
    // Redirect to the target workout page
    window.location.href = targetPageUrl
  } else {
    console.log('No workout page available for the current day.')
  }
}

function getDayName (dayNumber) {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]
  return days[dayNumber]
}

function calculate () {
  if (
    age.value == '' ||
    height.value == '' ||
    weight.value == '' ||
    (male.checked == false && female.checked == false)
  ) {
    modal.style.display = 'block'
    modalText.innerHTML = 'All fields are required!'
  } else {
    // calculate BMI
    const p = [age.value, height.value, weight.value]
    if (male.checked) {
      p.push('male')
    } else if (female.checked) {
      p.push('female')
    }

    const bmi = Number(p[2]) / (((Number(p[1]) / 100) * Number(p[1])) / 100)
    console.log(bmi)
    let result = ''
    if (bmi < 18.5) {
      result = 'Underweight'
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      result = 'Healthy'
    } else if (bmi > 24.9 && bmi <= 29.9) {
      result = 'Overweight'
    } else if (bmi > 29.9 && bmi <= 34.9) {
      result = 'Obese'
    } else if (bmi > 34.9) {
      result = 'Extremely obese'
    }
    // ---------------------------------

    // Get the datalist element
    const datalist = document.getElementById('Activty')

    // Get the input element
    const input = document.getElementById('txtlist')
    let valueSelected = null
    // Loop through the datalist options
    for (let i = 0; i < datalist.options.length; i++) {
      const option = datalist.options[i]
      // Check if the input value matches the option text
      if (option.text.toLowerCase() === input.value.toLowerCase()) {
        // Alert the selected option text
        valueSelected = option.text
        break
      }
    }
    console.log(valueSelected)
    // ---------------------------------

    // Calculate BMR
    const B = [age.value, height.value, weight.value]
    let bmr = 0
    let tdee = 0

    if (male.checked) {
      bmr = 10 * Number(B[2]) + 6.25 * Number(B[1]) - 5 * Number(B[0]) + 5
    } else if (female.checked) {
      bmr = 10 * Number(B[2]) + 6.25 * Number(B[1]) - 5 * Number(B[0]) - 161
    }
    if (valueSelected == 'Little/No exercise') {
      tdee = bmr * 1.2
    }

    // Activity 2
    if (valueSelected == 'Low activity (exercise 1-3 times/week)') {
      tdee = bmr * 1.35
    }

    // Activity 3
    if (
      valueSelected ==
      'Active (daily exercise or intense exercise 3-4 times/week)'
    ) {
      tdee = bmr * 1.55
    }

    // Activity 4
    if (valueSelected == 'High activity (intense exercise 6-7 times/week)') {
      tdee = bmr * 1.75
    }

    // Activity 5
    if (
      valueSelected ==
      'Very high activity (very intense exercise daily, or physical job)'
    ) {
      tdee = bmr * 1.95
    }

    resultArea.style.display = 'block'
    document.querySelector('.comment').innerHTML =
      `You are <span id="comment">${result}</span>`
    document.querySelector('#result').innerHTML = bmi.toFixed(2).toString()
    document.querySelector('#BMR').innerHTML = tdee.toFixed(2)
  }
}
