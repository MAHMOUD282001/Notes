let textContent = document.querySelector("#text-content");

let addBtn = document.querySelector(".add");

let removeAll = document.querySelector(".remove-all");


let allNotes = document.querySelector(".all-notes");

// localStorage.clear();

//On Load --> Return Local Storage Content
window.onload = ()=>{
    if (localStorage.getItem("notes").length == 0) return;

    let notes = Array.from(JSON.parse(localStorage.getItem("notes")));
    
    notes.forEach(note => {
        allNotes.innerHTML += 
        `<div class = "note-content">
                <li class = "note">
                    <input readonly type="text" value="${note.note}" class="note-value">
                    <button class = "btn edit-save">Edit</button>
                    <button class = "btn delete">Delete</button>
                </li>
        </div>`
    });
    
    let noteValues = document.querySelectorAll(".note-value")
    
    let completednotes = document.querySelector(".completed span")
    
    
        notes.forEach((note,index) => {
            if(note.completed === true){
                noteValues[index].classList.add("line-through")
                
                completednotes.innerHTML++
                
            }
            
            else{
                noteValues[index].classList.remove("line-through")
                
            }
    })
    
    editAndSave()
    
    
    deleteItem()
    
    checkRemoveAll()
}


//Add Item To Local Storage and List
addBtn.addEventListener("click", ()=>{
    if (textContent.value === "" || textContent.value === " ") {
        alert("Please Add Your Note");
        return false;
    }
    
    if (document.querySelector(`input[value="${textContent.value}"]`)) {
        alert("Note exists");
        return false;
    }
    
    localStorage.setItem("notes", JSON.stringify([...JSON.parse(localStorage.getItem("notes") || "[]"), { note: textContent.value}]));
    
    
    
    
    allNotes.innerHTML += 
    `<div class = "note-content">
        <li class = "note">
            <input readonly type="text" value="${textContent.value}" class="note-value">
            <button class = "btn edit-save">Edit</button>
            <button class = "btn delete">Delete</button>
        </li>
    </div>`
    
    textContent.value = ""
    
    editAndSave()
    
    deleteItem()
    
    checkRemoveAll()
})




//Edit & Save Item In Local Storage & allnotes Container

function editAndSave(){
    let editSaveBtns = document.querySelectorAll(".edit-save")
    let noteValues = document.querySelectorAll(".note-value")
    
    editSaveBtns.forEach((editSaveBtn, index) =>{
        
            editSaveBtn.addEventListener("click", ()=>{
            
            
            if(editSaveBtn.innerHTML === "Edit"){
                
                editSaveBtn.innerHTML = "Save"
                
                noteValues[index].removeAttribute("readonly")
                
                noteValues[index].focus()
                
            }
            
            else if(editSaveBtn.innerHTML === "Save"){
                editSaveBtn.innerHTML = "Edit"
                
                noteValues[index].setAttribute("readonly", true)
                
                let newNotes = JSON.parse(localStorage.getItem("notes"));
                
                newNotes[index].note = noteValues[index].value
                
                localStorage.setItem("notes", JSON.stringify(newNotes))
                
            }
        })
        
    })
}






//Remove Item From Local Storage & allnotes Container

function deleteItem() {
    
    
    setInterval(()=>{
    let deleteBtns = document.querySelectorAll(".delete")
    let notes = document.querySelectorAll(".note")
    let noteValues = document.querySelectorAll(".note-value")
    
    
    
    
    deleteBtns.forEach((deleteBtn, index) =>{
        let newNotes = JSON.parse(localStorage.getItem("notes"));        
        
        
        deleteBtn.addEventListener("click", ()=>{            
            notes[index].classList.add("none")
            
            newNotes.forEach(note => {
                if (note.note === noteValues[index].value) {
                    
                    newNotes.splice(newNotes.indexOf(note), 1);
                    
                }                
              });
              
              localStorage.setItem("notes", JSON.stringify(newNotes));
              
              
            // Bugaya Soghayara Bs Halenaha
            if(localStorage.getItem("notes") === '[]'){
                allNotes.innerHTML = ""
                localStorage.clear()
                checkRemoveAll()
            }            
            
        })        
    })
    
    },10)
    
}






//Remove All notes From Local Storage & all Notes Container
removeAll.addEventListener("click", ()=>{
    allNotes.innerHTML = ""
    localStorage.clear()
    
    checkRemoveAll()
})



function checkRemoveAll(){
    if (localStorage.length !== 0){
        removeAll.classList.add("active")
    }
    
    else{
        removeAll.classList.remove("active")
    }
}
