
{
    let tasks = [];
    let hideDoneTasks = false;

    const removeTask = (index) => {

        tasks = [
            ...tasks.slice(0, index),
            ...tasks.slice(index + 1),
        ];

        render();
    };

    const toggleTaskDone = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            {
                ...tasks[index],
                done: !tasks[index].done,
            },
            ...tasks.slice(index + 1),
        ];

        render();
    };

    const addNewTask = (newTask) => {

        tasks = [
            ...tasks,
            { content: newTask.value.trim(), done: false }
        ];

        render();
    };

    const markAllAsDone = () => {

        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));

        render();
    };

    const toggleHideDoneTasks = () => {

        if (tasks.some(task => task.done)) {
            hideDoneTasks = !hideDoneTasks;
        }

        render();
    };

    const bindRemoveEvent = () => {
        const taskRemoveButton = document.querySelectorAll(".js-delete");

        taskRemoveButton.forEach((taskRemoveButton, index) => {
            taskRemoveButton.addEventListener("click", () => {
                removeTask(index)
            });
        });
    };

    const bindToggleDoneEvent = () => {
        const taskToggleButton = document.querySelectorAll(".js-done");

        taskToggleButton.forEach((taskDoneButton, index) => {
            taskDoneButton.addEventListener("click", () => {
                toggleTaskDone(index)
            });
        });
    };

    const bindButtonsEvents = () => {
        const markAllAsDoneButton = document.querySelector(".js-markAllAsDoneButton")
        const hideDoneTasksButton = document.querySelector(".js-hideDoneTasksButton")

        if (tasks.length) {
            markAllAsDoneButton.addEventListener("click", markAllAsDone);
            hideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
        }
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTask = document.querySelector(".js-newTask");
        if (newTask.value.trim() !== "") {
            addNewTask(newTask);
            newTask.value = ""
        }
        newTask.focus();
    };

    const renderTasks = () => {
        const tasksList = document.querySelector(".js-tasks");

        const tasksToHTML = tasks.map((task) =>
            `<li class="tasks__listItem ${task.done && hideDoneTasks ? "tasks__listItem--hidden" : ""}">
                <button class="tasks__button tasks__button--done js-done">
                ${task.done ? "&#10003;" : ""}
                </button>
                <span class="${task.done ? "tasks__listItemText--done" : "tasks__listItemText"} js-taskText">
                ${task.content}
                </span>
                <button class="tasks__button tasks__button--remove js-delete">
                &#10005;
                </button>
            </li>`
        );

        tasksList.innerHTML = tasksToHTML.join("");
    };

    const renderButtons = () => {
        const tasksButtons = document.querySelector(".js-buttons")

        let buttonsToHTML = "";

        if (tasks.length) {
            buttonsToHTML = `
        <button
        class="buttons__button js-hideDoneTasksButton">
            ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
        </button>
        <button 
        class="buttons__button js-markAllAsDoneButton" ${tasks.every((task) => task.done) ? "disabled" : ""}>
            Ukończ wszystkie
        </button>
        `;
        };

        tasksButtons.innerHTML = buttonsToHTML;
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindRemoveEvent();
        bindToggleDoneEvent();
        bindButtonsEvents();
    };

    const init = () => {

        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);

    };
    init();
}

