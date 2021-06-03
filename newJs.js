
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

let lists = []

lists[0] = {
  "name" : "Default List",
  "toDos" : [
      {"name" : "Delete Me",
        "done" : false, 
        "delete" : function() {return("deleted")}},
      {"name" : "Edit Me",
        "done" : false }
  ],
  "completed" : []
}

let currentList = lists[0]

const saveLists = () => {
  console.log("saving Lists")
  window.localStorage.setItem('savedLists', JSON.stringify(lists))
  window.localStorage.setItem("currentList", JSON.stringify(currentList))
  console.log(lists)
}
const loadLists = () => {
  console.log("loading Lists")
  let storedLists = JSON.parse(window.localStorage.getItem("savedLists"))
  console.log(storedLists)
  lists = storedLists
  currentList = JSON.parse(window.localStorage.getItem("currentList"))
  renderLists() 
  renderList()

}
const newToDo = (newToDo) => {

  if (!currentList) return
  currentList["toDos"][currentList["toDos"].length] = {
    "name" : newToDo || prompt("name?") || "New To Do",
    "done" : false
  }
  renderList()
}
const newList = (theName, newToDos) => {
  console.log("new list")
  lists[lists.length] = {
    "name" :  theName || prompt("name?:") ||"New List " + (lists.length + 1),
    "toDos" : []
  }
  currentList = lists[lists.length - 1] 
  renderLists()
  renderList()
}
const renderLists = () => {
  if (lists.length == 0) {
    $lists.innerHTML = '-- Add a New List'
    $listTitle.textContent = "To Do List"
    return}

  $lists.innerHTML = ""
  for (let i = 0; i < lists.length; i++){
  $lists.innerHTML += `<div id="list${i}" class="list">${lists[i]["name"]}</div>`
  }
  let allLists = document.getElementsByClassName(`list`)
  for (let i = 0; i < allLists.length; i++){
    
     allLists[i].addEventListener("click", function (e) {
      for (let j = 0; j < allLists.length; j++){
       allLists[j].classList.remove("selected")
      }
    currentList = lists[i]

    $listTitle.textContent = `To Do List -- ${currentList["name"]}`
    allLists[i].classList.add("selected")
    renderList()
      
  })
}
}
const renderList = () => {
  $newToDoBtn.classList.remove("disabled")
  if (lists.length == 0) {
    $toDos.innerHTML = '<-- Add a New List'
    $newToDoBtn.classList.add("disabled")
    return}
  if (currentList["toDos"].length == 0) {
     $toDos.innerHTML = '-- Add a To Do'
     return}
  
  $toDos.innerHTML = ""
  
  for (let i = 0; i < currentList["toDos"].length; i++){
  $toDos.innerHTML += `<div id="toDo${i + 1}" class="toDo"><div id="toDoLabel${i+1}" class="toDoLabel">${currentList["toDos"][i].name}</div></div>`
  }
  let allToDos = document.getElementsByClassName(`toDo`)
  for (let i = 0; i < allToDos.length; i++){
     allToDos[i].addEventListener("dblclick", function (e) {
      if (e.target.id.indexOf("toDo") === 0 ){
        alert(`you double clicked ${currentList["toDos"][i].name}`)
      }
      
    
  })
  ////Where each To Do is made, including the Delete and Edit
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
        
        //editStuff(allToDos[i])
        alert("we'll get around to making edit work. come back later.")
        console.log('we would edit stuff here')
        renderList()
      })
      $deleteBtn.addEventListener("click", function (e) {
        //currentList.deleteToDo(currentList.updateToDos()[i])
        let toDoIndex = e.target.parentNode.parentNode.id.replace("toDo", "") - 1
        console.log(toDoIndex)
        deleteToDo(toDoIndex)
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

const deleteList = () => {
  let something = null
  
  //something is the placement of itself in its parent array
  if (lists.length > 1) {
    for (let i = 0; i < lists.length; i++) {
      if ((lists[i].name == currentList.name) && (lists[i]["toDos"] === currentList["toDos"])) something = i
    }
    lists.splice(something, 1)
    currentList = lists[0]
    renderLists()
    renderList()
    return
  }
  if (lists.length == 1) {
    lists.splice(0, 1)
    currentList = null
    
  }
  renderLists()
  renderList()
}
const deleteToDo = (something) => {
  (currentList["complete"]) ? currentList["complete"][currentList["complete"].length] = currentList["toDos"].splice(something, 1)[0] : currentList["complete"] = [currentList["toDos"].splice(something, 1)[0]]
  renderLists()
  renderList()
}

//////////////////////////////////////////////////////////
renderLists()
renderList()


//need to work on the Edit function

//could also color selected list to show it is selected. 

//could also add color preference switcher (theme)