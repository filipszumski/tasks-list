
{
    const tasks = [];

    const bindRemoveEvent = () => {
        const taskRemoveButton = document.querySelectorAll(".js-delete");

        taskRemoveButton.forEach((taskRemoveButton, index) => {
            taskRemoveButton.addEventListener("click", () => {
                tasks.splice(index, 1);
                render();
            });
        });
    };

    const bindToggleEvent = () => {
        const taskToggleButton = document.querySelectorAll(".js-done");


        taskToggleButton.forEach((taskDoneButton, index) => {
            taskDoneButton.addEventListener("click", () => {
                tasks[index].done = !tasks[index].done;
                render();
            });
        });
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

    const render = () => {
        const tasksList = document.querySelector(".js-tasks");

        let htmlString = "";

        for (const task of tasks) {

            htmlString += `
            <li class="section__listItem">
                    <button class="section__button js-done">${task.done ? "✅" : "&#129001;"}</button>
                    <span class="${task.done ? "section__listItemText--done" : "section__listItemText"} js-taskText">${task.content}</span>
                    <button class="section__button js-delete">&#10060;</button>
                </li>
          `};

        tasksList.innerHTML = htmlString;

        bindRemoveEvent();
        bindToggleEvent();
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

