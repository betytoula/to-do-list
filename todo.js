
var todoArray=[]; selectedIndex=-1;

function getSavedTodoItems(){
    const todoItems=localStorage.getItem('todoList');
    todoArray=JSON.parse(todoItems)|| [];
    displayTodoItems();
}
getSavedTodoItems();

function addTodoItem(){
    const todoinp=document.getElementById("todoinp")
    if(selectedIndex>=0){
       todoArray[selectedIndex].text=todoinp.value;
       selectedIndex=-1;
       document.getElementById("todobtn").innerHTML='<i class="fa fa-plus"></i>';
       document.getElementById("todobtn").classList.remove('edit');
    }else{
        todoArray.push({text:todoinp.value,isDone:false});
    }
    console.log('==todoarray==',todoArray);
    todoinp.value='';
    displayTodoItems();
    savetodoitems();
}

function savetodoitems(){
    const todoItems=JSON.stringify(todoArray)
   localStorage.setItem('todoList',todoItems);
}


function displayTodoItems(){
    document.getElementById("todolist").innerHTML='';
    todoArray.forEach((item,index)=>{
        appendTodoItem(item,index);
})
    if(!todoArray.length){
        document.getElementById("todolist").innerHTML='<p class="no-todo-items">No to do Items</p>';
    }
}
function appendTodoItem(item,index){
     const todoList=document.getElementById("todolist");
        const todoItem=document.createElement("li");
        todoItem.setAttribute('class','todo-item');
       
        if(item.isDone){
            todoItem.classList.add('done');
        }
        const todotext = '<span class="todotext">'+item.text+'</span>';
        const editButton= '<i class="fa fa-edit"  onclick="editItem( ' + index + ')"></i>'
        const removeButton= '<i class="fa fa-close" onclick="removeItem( ' + index + ')"></i>'
        const doneButton= '<i class="fa  fa-check" onclick="markasdone( ' + index + ')"></i>'
        todoItem.innerHTML=todotext+editButton+removeButton+doneButton;
        todoList.appendChild(todoItem);
}
function removeItem(index){
    todoArray.splice(index,1);
    displayTodoItems();
    savetodoitems();
    console.log('==removeItem==',todoArray)
}
 function markasdone(index){
    todoArray[index].isDone=!todoArray[index].isDone //pour enlever done
     displayTodoItems();
    savetodoitems();
     console.log('==markasdone==',todoArray[index])
 }
 function editItem(index){
    selectedIndex=index;
    console.log('==selectedIndex==',selectedIndex);
    document.getElementById("todoinp").value=todoArray[index].text;
    document.getElementById("todobtn").innerHTML='edit';
    document.getElementById("todobtn").classList.add('edit');
 }

 function logout() {
    alert('Logout successful. See you next time!');
    
}