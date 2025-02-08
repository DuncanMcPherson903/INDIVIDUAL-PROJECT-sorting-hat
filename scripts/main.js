import {renderToDom} from "../utils/renderToDom.js";
import {randomInteger} from "../utils/randomInteger.js";

let studentCount = 0
let allStudents = []
let expelledStudents = []

// HTML for the starting card
const startHtml = () => {
    return `
    <div class="card text-center" id="start" style="background-color: black;">
      <div class="card-body">
        <h5 class="card-text" style="margin-bottom: 20px;">Please click the button below to start sorting!</h5>
        <button type="button" class="btn btn-primary" id="start-btn">Start!</button>
      </div>
    </div>`
}

// HTML for the student form
const studentFormHtml = () => {
  return `
  <div class="card-body" style="background-color: black;">
    <h5 class="card-text">Enter the student's full name on the line below.</h5>
    <div class="form-group">
      <input type="text" class="form-control" id="inputName" placeholder="Full Name" style="text-align: center;">
      <div id="formWarning"></div>
    </div>
    <button type="button" class="btn btn-primary" id="submit-btn">Submit</button>
  </div>`
}

// HTML for the cards to be displayed in the "Good Students" section
const goodStudentCard = (object) => {
  return `
  <div class="card text-center border-dark" id="student" style="color: black; border-radius: 10px;">
    <h5 class="card-title">${object.name}</h5>
    <div>
      <img src="${object.crest}" width="100" height="100">
    </div>
    <br>
    <button type="button" class="btn btn-danger" id="expel-btn--${object.id}">EXPEL</button>
  </div>`
}

// HTML for the cards to be displayed in the "Not So Good Students" section
const badStudentCard = (object) => {
  return `
  <div class="card text-center border-dark" id="student" style="color: black; width: 144.22px; border-radius: 10px">
    <h5 class="card-title">${object.name}</h5>
    <img src="https://contentful.harrypotter.com/usf1vwtuqyxm/63QOGEALJGJmp1LPXTp8hC/9c3a1ef99d14a11acc11aa2f6bacd095/fact-file-hero-dark-mark-illustration-2.jpg?q=75&fm=jpg&w=600&h=416&fit=pad" width="100%" height="100">
    <p class="card-text" style="background-color: black; color: white; margin: 0px;">Voldemort's Army</p>
  </div>`
}

// Renders the student form and removes the start card
const startCard = (event) => {
  if (event.target.id === "start-btn") {
   renderToDom("#student-form", studentFormHtml())
  }
}

// Returns 2 item array with randomized name and color string pairs
const randomHouse = () => {
  const houseNum = randomInteger(0, 4)
  let houseInfo = []
  switch(houseNum) {
    case 0:
      houseInfo = ["Gryffindor", "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/946397ca-37b3-4eed-9a27-6182d454e626/de0kjre-c20de09d-c0b8-4c67-b4b1-292217d2db93.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzk0NjM5N2NhLTM3YjMtNGVlZC05YTI3LTYxODJkNDU0ZTYyNlwvZGUwa2pyZS1jMjBkZTA5ZC1jMGI4LTRjNjctYjRiMS0yOTIyMTdkMmRiOTMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.xC29ZjndzWaSPWaQaSvq3CDkICZkJ6M1a5OZ-QCuRoc"]
      break;
    case 1:
      houseInfo = ["HufflePuff", "https://wallpapers.com/images/hd/hufflepuff-house-crest-er0zlh9qeprz890r.jpg"]
      break;
    case 2:
      houseInfo = ["Ravenclaw", "https://www.pngmart.com/files/12/Ravenclaw-House-Transparent-Background.png"]
      break;
    case 3:
      houseInfo = ["Slytherin", "https://wallpapers.com/images/hd/slytherin-house-crest-69gc23adf20vvgx6.jpg"]
      break;
  }
  return houseInfo
}

// Returns a single string of HTML elements to be rendered to the "Good Students" section
const renderedStudents = (array) => {
  let finalRender = ''
  array.forEach(student => {
    finalRender += goodStudentCard(student)
  });
  return finalRender
}

// Returns a single string of HTML elements to be rendered the "Not So Good Students" section
const renderedExpelledStudents = (array) => {
  let finalRender = ''
  array.forEach(student => {
    finalRender += badStudentCard(student)
  });
  return finalRender
}

// Re-renders the "Good Students" section with the students whose house matches the selected house filter criteria 
const filterHouse = (event) => {
  if (allStudents.length == 0) {
    document.querySelector('#formWarning').innerHTML = `<p style="color: red" class="warning-text">Please enter at least one student before filtering.</p>`
  } else {
    if(event.target.id === "Gryffindor") {
      const gryf = allStudents.filter(student => student.house === "Gryffindor")
      renderToDom("#good-students", renderedStudents(gryf))
    } else if (event.target.id === "HufflePuff") {
      const huff = allStudents.filter(student => student.house === "HufflePuff")
      renderToDom("#good-students", renderedStudents(huff))
    } else if (event.target.id === "Ravenclaw") {
      const rave = allStudents.filter(student => student.house === "Ravenclaw")
      renderToDom("#good-students", renderedStudents(rave))
    } else if (event.target.id === "Slytherin") {
      const slyth = allStudents.filter(student => student.house === "Slytherin")
      renderToDom("#good-students", renderedStudents(slyth))
    } else if (event.target.id === "all") {
      renderToDom("#good-students", renderedStudents(allStudents))
    }
  }
  
}

// Creates a student object with the user given name and a random pair of house values
const createStudent = (event) => {
  
  if(event.target.id === "submit-btn") {
    if (document.querySelector('#inputName').value == '') {
      document.querySelector('#formWarning').innerHTML = `<p style="color: red" class="warning-text">Please enter a name</p>`
    } else {
      const houseValues = randomHouse()
      const studName = document.querySelector('#inputName').value
      const studentObj = {
      id: studentCount += 1,
      name: studName,
      house: houseValues[0],
      crest: houseValues[1]
      }
      allStudents.push(studentObj)
      renderToDom("#good-students", renderedStudents(allStudents))
      document.querySelector('#inputName').value = ''
      document.querySelector('#formWarning').innerHTML = ""
    }
    
  }
 
}

// Removes a student from the allStudents array and pushes this student info to the expelledStudents array
const expelStudent = (event) => {
  const [expelCheck, id] = event.target.id.split('--')
  if(expelCheck === "expel-btn") {
    const expelStudObj = allStudents.find((student) => student.id === Number(id))
    allStudents.splice(allStudents.indexOf(expelStudObj), 1)
    renderToDom("#good-students", renderedStudents(allStudents))
    expelledStudents.push(expelStudObj)
    renderToDom("#expelled-students", renderedExpelledStudents(expelledStudents))
  }
}

const startApp = () => {

  renderToDom("#student-form", startHtml())

  document.querySelector('#start').addEventListener('click', startCard);

  document.querySelector('#student-form').addEventListener('click', createStudent);

  document.querySelector('#good-students').addEventListener('click', expelStudent);

  document.querySelector('#filter').addEventListener('click', filterHouse);

}

startApp()
