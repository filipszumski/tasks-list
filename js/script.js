
{
    let tasks = [];

    const removeTask = (index) => {

        tasks = [
            ...tasks.slice(0, index),
            ...tasks.slice(index + 1),
        ];

        render();
    };

    const toggleTaskDone = (index) => {
        tasks.map((task, taskIndex) => {
            if (index === taskIndex) {
                task.done = !task.done
            };
        })
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

    const addNewTask = (newTask) => {

        tasks = [
            ...tasks,
            { content: newTask.value.trim(), done: false }
        ];

        render();
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

    renderTasks = () => {
        const tasksList = document.querySelector(".js-tasks");

        let htmlString = "";

        for (const task of tasks) {

            htmlString += `
            <li class="tasks__listItem">
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
                ;
        };
        tasksList.innerHTML = htmlString;
    };

    renderButtons = () => {
        const hideDoneTasksButton = document.querySelector(".js-hideDoneTasksButton")
        const markAllAsDoneButton = document.querySelector(".js-markAllAsDoneButton")

        const isThereAnyTask = tasks.some(task => task.content = true)

        if (isThereAnyTask === true) {
            hideDoneTasksButton.classList.add("tasks__button1--display")
            markAllAsDoneButton.classList.add("tasks__button1--display")
        };
    };

    bindMarkAllAsDoneButtonEvents = () => {
        const markAllAsDoneButton = document.querySelector(".js-markAllAsDoneButton")

        const isEveryTaskDone = tasks.every(task => task.done === true);

        if (isEveryTaskDone === true) {
            markAllAsDoneButton.disabled = true;
        } else {
            markAllAsDoneButton.disabled = false;
        }

        markAllAsDoneButton.addEventListener("click", () => {

            tasks.map(task => task.done = true);

            render();
        });
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindRemoveEvent();
        bindToggleDoneEvent();
        bindMarkAllAsDoneButtonEvents();
        //bindbuttonEvents
    };

    const init = () => {

        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);

    };
    init();
}

