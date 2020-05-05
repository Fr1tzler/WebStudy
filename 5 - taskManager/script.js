class Task {
    constructor(date, content, id) {
        this.date = new Date(date);
        this.content = content;
        this.Id = Number(id);
    }
}

taskList = [];
currentId = 0;

function compareTasks(a, b) {
    return a.date - b.date;
}

function addTask() {
    let info = document.getElementById('taskInfo').value;
    let date = Date.parse(document.getElementById('taskDate').value);
    taskList.push(new Task(date, info, currentId));
    taskList.sort(compareTasks);
    currentId += 1;
    redrawTasks();
}

function redrawTasks() {
    let result = "";
    for (let i = 0; i < taskList.length; i++) {
        result += getTaskHTML(taskList[i]);
    }
    document.getElementById('taskList').innerHTML = result;
}

function getTaskHTML(task) {
    return '<div class="taskBlock" id="task1"><div class="taskTopBar"><p class="datetime">' + 
    getDate(task.date) + '</p><input type="button" id="btn' + task.Id + 
    '" value="X" onclick="deleteTask(' + task.Id + ');"></div><div class="taskText">' + 
    task.content + '</div></div>';
}

function getDate(date) {
    return date.getDate() + ' ' + getMonthFromNumber(date.getMonth()) + ' ' + date.getFullYear();
}

function getMonthFromNumber(number) {
    let monthList = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
    return monthList[number];
}

function deleteTask(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].Id == id) {
            taskList.splice(i, 1);
            break;
        }
    }
    redrawTasks();
}
