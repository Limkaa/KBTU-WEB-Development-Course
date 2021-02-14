const tasks = document.getElementById("tasks");
const input = document.getElementById("input");

function addTask() {
	const task = input.value;
	if (task.trim()) {
		const item = `
					<div class="item">
						<input type="checkbox" class="checkbox" job="complete" id="0">
						<span class="task-text">${task}</span>
						<img src="https://icons-for-free.com/iconfiles/png/512/trash+bin+icon-1320086460670911435.png" class="delete-icon" job="delete" id="0">
					</div>
					`;

		const position = "beforeend";

		tasks.insertAdjacentHTML(position, item);
	}
	input.value = "";
}

function completeTask(element) {
	element.parentNode.querySelector(".task-text").classList.toggle("stroked");
}

function deleteTask(element) {
	element.parentNode.parentNode.removeChild(element.parentNode);
}

tasks.addEventListener("click", function(event) {
	const element = event.target;
	const elementJob = element.attributes.job.value;

	if (elementJob == "complete") {
		completeTask(element); 
	} 
	else if (elementJob == "delete") {
		deleteTask(element);
	}
})