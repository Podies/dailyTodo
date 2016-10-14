
// var addTodoButton = document.getElementById("");
// var todo = document.getElementById("input");
// var start = document.getElementById("from");
// var end = document.getElementById("to");

// function DailyTodo(date, todos, counter) {
//   this.date = new Date;
//   this.todos = {
//     id: "",
//     name : name,
//     from : from,
//     to : to
//   }
//   this.counter = counter
// }



// Add to Local Storage
// function addToStorage(){
//   addTodoButton.eventListener("click", function(){
// var localData = localStorage.getItem("dailyEntry") || [];
// localstorage.setItem("dailyEntry", new DailyTodo())

//   })
// }


// renderTodo
//  -check if localStorage exists
//    - if false - setItem localstorage "dailyEntry", [{'date': '12-10-2016', todos: [{id: 1, name: '', from: '', to: '', status: false}], counter: 1 }]
//    - If true - check today's date exists or not
//      - if true call buildDom
//      - if false add todays date and todo {'date': '12-10-2016', todos: [{id: 1, name: '', from: '', to: '', status: false}], counter: 1 } then call buildDom


// buildDom
//  - iterate over each todo in todays date- build actual html

function getTodayDate () {
  var date = new Date();
  var formatDate = date.getDate() + '-' + (date.getUTCMonth()+1) + '-'+ date.getUTCFullYear();
  return formatDate;
}

function generateTodoHTML(todo){
  var status = todo.status ? "checked" : "";
  return (
    `<div class="col-xs-7 col-sm-6 col-md-6 col-lg-6">
      <label class="label-control">
        Event
      </label>
      <input type="text" name="" id="input" value="${todo.name}" data-name="name" data-id="${todo.id}" onchange="updateStorage(event)" class="form-control">
    </div>
    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
      <label class="label-control">
        From
      </label>
      <input type="text" name="" id="input" value="${todo.from}" data-name="from" data-id="${todo.id}"  onchange="updateStorage()" class="form-control">
    </div>
    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
      <label class="label-control">
        To
      </label>
      <input type="text" name="" id="input" value="${todo.to}" data-name="to" data-id="${todo.id}" onchange="updateStorage()" class="form-control">
    </div>
    <div class="col-xs-12 col-sm-1 col-md-1 col-lg-1">
      <div class="checkbox text-right">
          <input type="checkbox" data-id="${todo.id}" onclick="toggleStatus(event)" ${status}>
      </div>
    </div>`
  )
}

// [{"date":"14-10-2016","todos":[{"id":1,"name":"Brink Milk ","from":"","to":"","status":false}],"counter":1}]
//Update Storage
function updateStorage(e) {
  var localData = JSON.parse(localStorage.getItem("dailyEntry"));
  var selectedId = e.currentTarget.getAttribute('data-id');
  var selectedElement = e.currentTarget.getAttribute('data-name');
  var value = e.currentTarget.value;
  // Filter Todays Todo
  var todaysTodo = localData.filter(function(todo) {
    return todo.date == getTodayDate();
  });
  //Get Current todo and Update
  var index;
  todaysTodo[0].todos.forEach(function(todo, i){
    if(todo.id == selectedId){
      index = i;
    }
  });
  // Find todo matching current id
  // update name/from/to of that todo
  localData[0]['todos'][index][selectedElement] = value;

  // Set localstorage
  localStorage.setItem("dailyEntry", JSON.stringify(localData));
}

function buildDom() {
  var localData = JSON.parse(localStorage.getItem("dailyEntry"));
  var formatDate = getTodayDate();
  var filteredTodos = localData.filter(function(item){
    return item.date === formatDate;
  });
  var generatedHTML = "";

  filteredTodos[0].todos.forEach(function(todo, i){
    generatedHTML += generateTodoHTML(todo);
  });
  document.getElementById('todo-list').innerHTML = generatedHTML;

  //
  calculatePercentage();
}


function renderTodo(){
  var localData = JSON.parse(localStorage.getItem("dailyEntry"));
  var formatDate = getTodayDate();

  if (localData)  {

    var filteredTodos = localData.filter(function(item){
      return item.date === formatDate;
    });

    if(filteredTodos.length == 0) {
      // Append todays todos
      localData.unshift({date: formatDate, todos: [{id: 1, name: '', from: '', to: '', status: false}], counter: 1 });
      localStorage.setItem('dailyEntry', JSON.stringify(localData));
    }

  } else {
    localStorage.setItem("dailyEntry", JSON.stringify([{date: formatDate, todos: [{id: 1, name: '', from: '', to: '', status: false}], counter: 1 }] ));
  }

  // buildDom
  buildDom();
}
function toggleStatus(e){
  var localData = JSON.parse(localStorage.getItem('dailyEntry'));
  var selectedId = e.currentTarget.getAttribute('data-id');

  localData[0].todos.forEach(function(todo, i){
    if(todo.id == selectedId) {
      todo.status = todo.status ? false : true;
    }
  });

  localStorage.setItem('dailyEntry', JSON.stringify(localData));
  buildDom();
}

function addNewTodo(){
 var localData = JSON.parse(localStorage.getItem("dailyEntry"));
 var currentCounter = localData[0].counter;
 localData[0].todos.push({id: currentCounter + 1, name: '', from: '', to: '', status: false});
 localData[0].counter = currentCounter + 1;
 localStorage.setItem('dailyEntry', JSON.stringify(localData));
 buildDom();
}

function calculatePercentage(){
  var localData = JSON.parse(localStorage.getItem("dailyEntry"));
  var totalTodos = localData[0].todos.length;
  var completedTodos = localData[0].todos.filter(function(todo){
    return todo.status == true;
  });

  completedTodos = completedTodos.length;

  var percentage = Math.ceil((completedTodos/totalTodos)*100);
  document.getElementById('percentage').innerHTML = percentage;

  if(percentage > 50){
    document.getElementById('left-half').style.transform = "rotate(180deg)";
    var rightPercentage = (percentage - 50)*3.6;
    document.getElementById('right-half').style.transform = "rotate(90deg)";
  } 

}

renderTodo();