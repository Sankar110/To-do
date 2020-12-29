// Selecting Elements and classes

const clear = document.getElementById("clear");
const list = document.getElementById("list");
const input = document.getElementById("input");

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-o";
const LINE_THROUGH ="lineThrough"

let LIST, id;

let data = localStorage.getItem("TODO");

// Checking if there is localstorage in data 

if (data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
}
    else{
        LIST = [];
        id = 0;
    }

// Loading localstorage elements

function loadList(array){
    array.forEach(function(item){
        addTodo(item.name , item.id , item.done , item.trash);
    })
}

// Clear all button

clear.addEventListener("click" , function(){
    localStorage.clear();
    location.reload();
})


//Todo function
// Creates <li> element and positions it

function addTodo(toDo , id , done , trash){
    if(trash){return;}

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    
    const item = `
    <li class="item">
    <div class="left">
    <input type="checkbox" job="complete" id="${id}" class="co"></input>
    <p class="text ${LINE}">${toDo}</p>
    </div>
    <i class="fa fa-trash-o" job="delete" id="${id}" class="co"></i>
    </li>
    `;

    const position = "beforeend";

    list.insertAdjacentHTML(position , item);
}

//Get value from input and submit on enter

document.addEventListener("keyup", function(event){
    if(event.keyCode==13){
        const toDo = input.value;
        if(toDo){
            addTodo(toDo , id , false , false);

            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });

            id++;

            localStorage.setItem("TODO",JSON.stringify(LIST));
        }
        input.value="";
    }
});

// Remove item

function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

list.addEventListener("click", function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if(elementJob == "delete"){
            removeToDo(element);
        }
        else{
            return false;
    }

    localStorage.setItem("TODO",JSON.stringify(LIST));
})
