
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

function buildDom() {
  var localData = JSON.parse(localStorage.getItem("dailyEntry"));
  var formatDate = getTodayDate();
  var filteredTodos = localData.filter(function(item){
    return item.date === formatDate;
  });

  filteredTodos[0].todos.forEach(function(todo, i){
    var parentDiv = document.createElement("div");
    parentDiv.appendChild(document.createElement("input")); 
    parentDiv.appendChild(document.createElement("input")); 
    parentDiv.appendChild(document.createElement("input")); 
    
  });
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
      localStorage.setItem('dailyEntry', localData);
    }

  } else {
    localStorage.setItem("dailyEntry", JSON.stringify([{date: formatDate, todos: [{id: 1, name: '', from: '', to: '', status: false}], counter: 1 }] ));
  }

  // buildDom
  buildDom();
}

renderTodo();