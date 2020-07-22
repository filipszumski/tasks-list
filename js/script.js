
{
    const tasks = [];

    const removeTask = (index) => {
        tasks.splice(index, 1);
        render();
    };

    const toggleTaskDone = (index) => {
        tasks[index].done = !tasks[index].done;
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

    const bindToggleEvent = () => {
        const taskToggleButton = document.querySelectorAll(".js-done");

        taskToggleButton.forEach((taskDoneButton, index) => {
            taskDoneButton.addEventListener("click", () => {
                toggleTaskDone(index)
            });
        });
    };

    const render = () => {
        const tasksList = document.querySelector(".js-tasks");

        let htmlString = "";

        for (const task of tasks) {

            htmlString += `
            <li class="section__listItem">
                    <button class="section__button section__button--done js-done">${task.done ? "&#10003;" : ""}</button>
                    <span class="${task.done ? "section__listItemText--done" : "section__listItemText"} js-taskText">${task.content}</span>
                    <button class="section__button section__button--remove js-delete">&#10005;</button>
                </li>
          `};

        tasksList.innerHTML = htmlString;

        bindRemoveEvent();
        bindToggleEvent();
    };

    const addNewTask = (newTask) => {
        tasks.push(
            {
                content: newTask.value.trim(),
                done: false,
            },
        );
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

    const init = () => {

        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);

    };
    init();
}

