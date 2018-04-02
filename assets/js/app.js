//define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//load all events
loadEventListeners();

//load all Event Listerners
function loadEventListeners(){
    //DOM event listeners
    document.addEventListener('DOMContentLoaded',getTasks);
    //Add task events
    form.addEventListener('submit',addTask);
    //remove task event
    taskList.addEventListener('click', removeTask);
    //clear task event
    clearBtn.addEventListener('click',clearTasks);
    //filter task events
    filter.addEventListener('keyup',filterTasks);
}
//get task from ls
function getTasks(){
    let tasks; 
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
    //create li Element
    const li = document.createElement('li');
    li.className = 'collection-item';
    //create text node and apend
    li.appendChild(document.createTextNode(task));

    //li link
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-trash"></i>';
    li.appendChild(link);
    //append li to ul
    taskList.appendChild(li);
    });
}
//add task
function addTask(e){
    if (taskInput.value === ''){
        alert('add a task');
    }
//create li Element
    const li = document.createElement('li');
    li.className = 'collection-item';
    //create text node and apend
    li.appendChild(document.createTextNode(taskInput.value));

    //li link
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-trash"></i>';
    li.appendChild(link);
    //append li to ul
    taskList.appendChild(li);
    
    //store task in lLs
    
    storeTaskInLocalStorage(taskInput.value);

    //clear input
    taskInput.value = '';

    e.preventDefault(); 
}
function storeTaskInLocalStorage(task){
    let tasks; 
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function removeTask(e){
   if(e.target.parentElement.classList.contains('delete-item')){
       if(confirm('are you sure?')){
         e.target.parentElement.parentElement.remove();
           //remove task from ls
           removeTaskFromLocalStorage(e.target.parentElement.parentElement);
       }
    }          
}
//remove form Ls
function removeTaskFromLocalStorage(taskItem){
    let tasks; 
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    } 
    tasks.forEach(function(task,index){
        if(taskItem.textContent === task){
            tasks.splice(index,1);
        }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
function clearTasks(){
    //taskList.innerHTML = '';
    //faster way
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild)
    }
    clearTasksFromLocalStorage();
}
//clear task from ls
function clearTasksFromLocalStorage(){
    localStorage.clear();
}
//filtering task
function filterTasks(e){
    const text = e.target.value.toLocaleLowerCase();
   document.querySelectorAll('.collection-item').forEach(function(task){
       const item = task.firstChild.textContent;
       if(item.toLowerCase().indexOf(text) != -1){
          task.style.display = 'block';
      }else{
          task.style.display = 'none';
      }
   });
}