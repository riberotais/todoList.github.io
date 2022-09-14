(function() {
	'use strict';
	var tasker = {
		init: function() {
			this.cacheDom();
			this.bindEvents();
			this.evalTasklist();
		},
		cacheDom: function() {
			this.taskInput = document.getElementById("input-task");
			this.addBtn = document.getElementById("add-task-btn");
			this.tasklist = document.getElementById("tasks");
			this.tasklistChildren = this.tasklist.children;
			this.errorMessage = document.getElementById("error");
		},
		bindEvents: function() {
			this.addBtn.onclick = this.addTask.bind(this);
			this.taskInput.onkeypress = this.enterKey.bind(this);
		},
		evalTasklist: function() {
			var i, chkBox, delBtn;
			//BIND CLICK EVENTS TO ELEMENTS
			for (i = 0; i < this.tasklistChildren.length; i += 1) {
				//ADD CLICK EVENT TO CHECKBOXES
				chkBox = this.tasklistChildren[i].getElementsByTagName("input")[0];
				chkBox.onclick = this.completeTask.bind(this, this.tasklistChildren[i], chkBox);
				//ADD CLICK EVENT TO DELETE BUTTON
				delBtn = this.tasklistChildren[i].getElementsByTagName("button")[0];
				delBtn.onclick = this.delTask.bind(this, i);
			}
		},
		render: function() {
			var taskLi, taskChkbx, taskVal, taskBtn, taskTrsh;
			//BUILD HTML
			taskLi = document.createElement("li");
			taskLi.setAttribute("class", "task");
			//CHECKBOX
			taskChkbx = document.createElement("input");
			taskChkbx.setAttribute("type", "checkbox");
			//USER TASK
			taskVal = document.createTextNode(this.taskInput.value);
			//DELETE BUTTON
			taskBtn = document.createElement("button");
			//TRASH ICON
			taskTrsh = document.createElement("i");
			taskTrsh.setAttribute("class", "fa fa-trash");
			//INSTERT TRASH CAN INTO BUTTON
			taskBtn.appendChild(taskTrsh);

			//APPEND ELEMENTS TO TASKLI
			taskLi.appendChild(taskChkbx);
			taskLi.appendChild(taskVal);
			taskLi.appendChild(taskBtn);

			//ADD TASK TO TASK LIST
			this.tasklist.appendChild(taskLi);

		},
		completeTask: function(i, chkBox) {
			if (chkBox.checked) {
				i.className = "task completed";
			} else {
				this.incompleteTask(i);
			}
		},
		incompleteTask: function(i) {
			i.className = "task";
		},
		enterKey: function(event) {
			if (event.keyCode === 13 || event.which === 13) {
				this.addTask();
			}
		},
		addTask: function() {
			var value = this.taskInput.value;
			this.errorMessage.style.display = "none";

			if (value === "") {
				this.error();
			} else {
				this.render();
				this.taskInput.value = "";
				this.evalTasklist();

			
			}
			tasksQty()
		},
		delTask: function(i) {
			this.tasklist.children[i].remove();
			this.evalTasklist();
		},
		error: function() {
			this.errorMessage.style.display = "block";
		}
	};

	tasker.init();
}());


// A $( document ).ready() block.
$( document ).ready(function() {
	tasksQty()
});




function tasksQty() {

	var completedTasks;
	var notCompletedTasks;
	var sumTasks;


	 completedTasks = document.getElementsByClassName('task completed').length
	 notCompletedTasks = document.querySelectorAll("li.task:not(.completed)").length

	 sumTasks = completedTasks + notCompletedTasks


	document.getElementById('tasksQty').textContent = notCompletedTasks+' tasks for you Today.'
	
  }



  $("#add-task-btn").click(function() {
	tasksQty()
  });

  $(document).on("click",".fa-trash",function() {
	tasksQty()
});


/*
// Get the input field
var input2 = document.getElementById("input-task");

// Execute a function when the user presses a key on the keyboard
input2.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("add-task-btn").click();

  }
});
*/
  

$(document).on('change', '.task input', function() {

	 setTimeout(() => {
		
		tasksQty()
	  }, "300")

  });









