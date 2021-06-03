

function List(name) {


  this.name = name || prompt("What is the new list name?"
  )
  this.toDos = []
  this.trash = []

  const updateName = (name) => {

    this.name = name || this.name

  return this.name
  }
  const updateToDos = (toDo) => {
    if (toDo) {
       this.toDos.push(toDo) 
    }
  
    return this.toDos
  }
  const deleteToDo = (toDo) => {
    this.trash.push(toDo)
    for (let i = 0; i < this.toDos.length; i++) {
      if (this.toDos[i] == toDo) {
          this.toDos.splice(i, 1);
      }
      }
      renderList()
      return this.toDos
  }

  return {updateName, updateToDos, deleteToDo}
}

function ToDo(title, dueDate, priority, description) {

  this.title = title || prompt("New To Do:")
  this.dueDate = dueDate || "asap"
  this.priority = priority || 3
  this.description = description || "description here"

  this.notes = "enter any other notes here"
  this.checklist = []
  this.percent = 0 // 0 - 100

  const updatePercent = (change) => {
    this.percent += change || 0
    return this.percent
  }
  const updateList = (listItem) => {
    if (listItem) {
     this.checklist.push(listItem) 
    }
    
    return this.checklist
  }
  const updateDescription = (desc) => {
    this.description = desc || this.description
    return this.description
  }
  const updateDueDate = (newDate) => {
    this.dueDate = newDate || this.dueDate
    return this.dueDate
  }
  const updateName = (newTitle) => {
    this.title = newTitle || this.title
    return this.title
  }
  const updatePriority = (newPriority) => {
    this.priority = newPriority || this.priority
    return this.priority
  }
  const updateNotes = (newNotes) => {
    this.notes = newNotes || this.notes
    return this.notes
  }
  const complete = () => {
    this.percent = 100
  }


  return {updatePercent, updateList, updateDueDate, updateName, updatePriority, updateNotes, updateDescription, complete}
}

const renderLists = () => {
  $lists.innerHTML = ""
  for (let i = 0; i < lists.length; i++){
  $lists.innerHTML += `<div id="list${i}" class="list">${lists[i].updateName()}</div>`
  }
  let allLists = document.getElementsByClassName(`list`)
  for (let i = 0; i < allLists.length; i++){
     allLists[i].addEventListener("click", function (e) {
    currentList = lists[i]
    renderList()
  })
}


}
const saveLists = () => {
  console.log("saving Lists")
  window.localStorage.setItem('savedLists', JSON.stringify(lists))
  console.log(lists)
}
const loadLists = () => {
  console.log("loading Lists")
  let storedLibrary = JSON.parse(window.localStorage.getItem("savedLists"))
  console.log(storedLibrary)
  
}
const renderList = () => {
  
  $listTitle.textContent = `To Do List -- ${currentList.updateName()}`
  $toDos.innerHTML = ""
  
  for (let i = 0; i < currentList.updateToDos().length; i++){
  $toDos.innerHTML += `<div id="toDo${i + 1}" class="toDo"><div id="toDoLabel${i}" class="toDoLabel">${currentList.updateToDos()[i].updateName()}</div></div>`
  }
  let allToDos = document.getElementsByClassName(`toDo`)
  for (let i = 0; i < allToDos.length; i++){
     allToDos[i].addEventListener("dblclick", function (e) {
      if (e.target.id.indexOf("toDo") === 0 ){
        alert(`you clicked ${currentList.updateToDos()[i].updateName()}`)
      }
      
    
  })
    allToDos[i].addEventListener("mouseenter", function (e) {
      let $hiddenBtns = document.createElement("div")
      $hiddenBtns.id = "hiddenBtns"
      $hiddenBtns.style = "display: flex; flex-direction: column;"
      let $deleteBtn = document.createElement("button")
      let $editBtn = document.createElement("button")
      $editBtn.textContent = "edit"
      $deleteBtn.textContent = "delete"
      $editBtn.id = "editBtn"
      $deleteBtn.id = "deleteBtn"
      $editBtn.setAttribute("class", "hiddenBtn")
      $deleteBtn.setAttribute("class", "hiddenBtn")
      $editBtn.addEventListener("click", function (e) {
        let editConfirm = document.createElement("div")
        editConfirm.style = "background-color: blue; height: 100px; width: 100px; "
        editConfirm.id = "editConfirm"
        let a = $editBtn.parentNode.parentNode
        
        editStuff(allToDos[i])
        renderList()
      })
      $deleteBtn.addEventListener("click", function (e) {
        console.log(currentList["toDos"])
      })
      allToDos[i].appendChild($hiddenBtns)
      $hiddenBtns.appendChild($deleteBtn)
      $hiddenBtns.appendChild($editBtn)

      
    })
    allToDos[i].addEventListener("mouseleave", function (e) {
      let item = document.getElementById("hiddenBtns")
      if (item){
      allToDos[i].removeChild(item)
      
    }
    })
    }
 
}
//Function to clear the window once made
let clearEditWindow = () => {
  $form.style.opacity = 0;
  $form.style.zIndex = -1;



  $content.style.pointerEvents = "auto"
  $newListBtn.style.pointerEvents = "auto"
  $newToDoBtn.style.pointerEvents = "auto"

  
  }
  let targetObject = new ToDo("tester")
const editStuff = ($target) => {

  //find the specific To do List item to edit
  targetObject = ((currentList.updateToDos()[$target.id.replace("toDo", "") - 1]))

  console.log(targetObject.updateName())



  //render the form
  $form.style = `opacity: 100%; height: auto; width: auto; z-index: 2; `
  let title = $form.children[0]
  title.textContent = targetObject.updateName()
  let newDueDateSpan = "minutes"
  
  
  //make placeholder the Current Title
  let newTitle = $form.children[1].children[0].children[0].children[1]
  newTitle.placeholder = targetObject.updateName()
  
  $content.style.pointerEvents = "none"
  $newListBtn.style.pointerEvents = "none"
  $newToDoBtn.style.pointerEvents = "none"

  
  console.log(`editing ${targetObject.updateName()}`)
  
 

  //button logic
  $cancelBtn.addEventListener("click", function (e) {
    clearEditWindow()
  })
  
  $submitBtn.addEventListener("click", function (e) {
    
    //do submitting logic

    //Get any input values
    let newTitle = $form.children[1].children[0].children[0].children[1].value
    let newDueDate = $form.children[1].children[0].children[1].children[1].value
    console.log(newDueDateSpan)

    if (newTitle) {
    console.log("new title is " + newTitle)
    
     console.log(targetObject.updateName(newTitle))
     $form.children[1].children[0].children[0].children[1].value = ''
    
    renderList()
    clearEditWindow()
    }


  })
  
}

let lists = []

let currentList = {}

const $content = document.getElementById("content")
const $listTitle = document.getElementById("listTitle")
const $lists = document.getElementById("allLists")
const $toDos = document.getElementById("toDos")
const $newListBtn = document.getElementById("newListBtn")
const $newToDoBtn = document.getElementById("newToDoBtn")
const $form = document.getElementById("form")
const $submitBtn = document.getElementById("submitBtn")
const $cancelBtn = document.getElementById("cancelBtn")
const $loadListsBtn = document.getElementById("loadListsBtn")




$newListBtn.addEventListener("click", function (e) {
lists[lists.length] = new List()
currentList = lists[lists.length - 1] 
renderLists()
renderList()
})
$newToDoBtn.addEventListener("click", function (e) {
  let newToDo = new ToDo()
  for (let i = 0; i < lists.length; i++){
    if (currentList === lists[i]){
      lists[i].updateToDos(newToDo)
      currentList = lists[i] 
    }
  }

  renderList(currentList)
  })
$loadListsBtn.addEventListener("click", loadLists)



let list = new List("Default List")
lists[lists.length] = list


let item1 = new ToDo("Delete me with `delete`", "12hrs", 3, "Test Item")
let item2 = new ToDo("Edit me with `edit`", "6hrs", 5, "Test Item 2")
list.updateToDos(item1)
list.updateToDos(item2)
currentList = lists[0]
renderLists()
renderList()


// TO DO----- no pun intended

//change DELETE and EDIT button logic to have them as hidden buttons that become visible when the div is hovered over.


// if To Do clicked on, display information somehow

//add local storage fuctionality. Function already in place, just need to add saving the storage (during render lists?) and getting it at load

