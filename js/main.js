showTask();
let addTaskInput =  document.getElementById("addtaskinput");
let addTaskBtn = document.getElementById("addtaskbtn");
addTaskBtn.addEventListener('click', function(){
    let addTaskInputValue = addTaskInput.value;
    // console.log(addTaskInputValue)
    if (addTaskInputValue.trim()!=0) {
        let webTask = localStorage.getItem("localTask");
        if (webTask === null) {
            taskObj = [];
            // console.log(taskObj)
        }else{
            taskObj = JSON.parse(webTask);
            // console.log(taskObj)
        }
        taskObj.push(addTaskInputValue);
        localStorage.setItem("localTask", JSON.stringify(taskObj));
    }
    addTaskInput.value = '';
    showTask();
});

// show input task
function showTask(){
    let webTask = localStorage.getItem("localTask");
    if (webTask === null) {
        taskObj = [];
        // console.log(taskObj)
    }else{
        taskObj = JSON.parse(webTask);
        // console.log(taskObj)
    }

    let html = '';
    let addedTaskList = document.getElementById("addedtasklist");
    taskObj.forEach((item, index) => {
        // console.log(item)
        html += ` <tr>
                        <th scope="row">${index+1}</th>
                        <td>${item}</td>
                        <td><button onclick="editTask(${index})" class="btn btn-primary"> <i class="fa fa-edit"></i> Edit </button> </td>
                        <td><button onclick="deleteItem(${index})" class="btn btn-danger"> <i class="fa fa-trash"></i> Delete </button> </td>
                 </tr>
      `
    });
    addedTaskList.innerHTML = html;
}

// Edit Task function
function editTask(indexId) {
    // console.log(indexId)
    let saveindex =  document.getElementById("saveindex");
    let addTaskBtn =  document.getElementById("addtaskbtn");
    let saveTaskBtn =  document.getElementById("savetaskbtn");
    saveindex.value = indexId;
    let webTask = localStorage.getItem("localTask");
    let taskObj = JSON.parse(webTask);
    //  console.log(taskObj[10])
    addTaskInput.value = taskObj[indexId];
    addTaskBtn.style.display = "none";
    saveTaskBtn.style.display = "block";
}

// save task button
let saveTaskBtn =  document.getElementById("savetaskbtn");
saveTaskBtn.addEventListener("click", function() {
    let webTask = localStorage.getItem("localTask");
    let taskObj = JSON.parse(webTask);
    let saveindex =  document.getElementById("saveindex").value;
    // console.log(saveindex)
    taskObj[saveindex] = addTaskInput.value;
    // console.log(taskObj[saveindex])
    localStorage.setItem("localTask", JSON.stringify(taskObj));
    addTaskBtn.style.display = "block";
    saveTaskBtn.style.display = "none";
    addTaskInput.value = '';
    showTask();
})
// Delete item
function deleteItem(indexId) {
    let webTask = localStorage.getItem("localTask");
    let taskObj = JSON.parse(webTask);
    taskObj.splice(indexId, 1)
    localStorage.setItem("localTask", JSON.stringify(taskObj));
    showTask();
}

// DeleteAll item
const deleteAllBtn = document.getElementById("deleteallbtn");
deleteAllBtn.addEventListener("click",function () {
    let addTaskBtn =  document.getElementById("addtaskbtn");
    let saveTaskBtn =  document.getElementById("savetaskbtn");
    let webTask = localStorage.getItem("localTask");
    if (webTask === null) {
        taskObj = [];
    }else{
        taskObj = JSON.parse(webTask);
        taskObj = [];
    }
    addTaskBtn.style.display = "block";
    saveTaskBtn.style.display = "none";
    localStorage.setItem("localTask", JSON.stringify(taskObj));
    showTask();
})

// search item from table
let searchtextbox = document.getElementById("searchtextbox");
searchtextbox.addEventListener("input", function () {
    let trList = document.querySelectorAll("tr");
    Array.from(trList).forEach(item=>{
        let searchText = item.getElementsByTagName("td")[0].innerText;
        let searchtexBoxValue = searchtextbox.value;
        let re = new RegExp(searchtexBoxValue, 'gi');
        if (searchText.match(re)) {
            item.style.display = "table-row";
        }else{
            item.style.display = "none";
        }
    })
})