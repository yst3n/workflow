let tasks = [];//global array holding tasks


async function loadTasks() {


    try {//try/catch catches errors that happen while running your code, such as a failed network request.
        const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=20")
        if (response.ok) {//response.ok checks whether the server returned a successful HTTP response.
            tasks = await response.json()
            console.log("Successfully fetched tasks")
            console.log("Tasks:", tasks);
            showTasks();
        }

        else {
            console.log("Error while fetching tasks")
        }
    }


    catch (error) {
        console.log("Fetch failed", error)//error contains information about what went wrong
    }



}
loadTasks();




function showTasks(filter) {




    let filteredTasks = tasks;



    if (filter == "completed") {
        filteredTasks = tasks.filter(task => task.completed == true);
    }

    if (filter == "pending") {
        filteredTasks = tasks.filter(task => task.completed !== true);
    }


    const search = document.getElementById("searchInput").value.toLowerCase();

    filteredTasks = filteredTasks.filter(task => task.title.toLowerCase().includes(search)
    );


    document.getElementById("taskCounter").textContent = filteredTasks.length;

    const listOfTasks = document.getElementById("taskList");
    listOfTasks.innerHTML = "";
    filteredTasks.forEach(task => {
        listOfTasks.innerHTML +=
            `<li class="list-group-item d-flex justify-content-between align-items-center">
        ${task.title}
        <div>
            <button class="btn btn-danger btn-sm" onclick="deleteTask(${task.id})">
                        Delete
                    </button>

            <button class="${task.completed ? "btn btn-warning btn-sm" : "btn btn-success btn-sm"}" onclick="completeTask(${task.id})">
                        ${task.completed ? "Undo" : "Complete"}
                    </button>
        </div> 
        
        </li>`
    });

    console.log("ShownTasks");
}


async function addTask() {
    const input = document.getElementById("taskInput");

    if (input.value.trim() === "") {

        console.log("Please enter a valid string")
        return;

    }
    const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
        method: 'POST',
        body: JSON.stringify({
            title: input.value,//binput waheda qed nibatulu lhtml tag
            completed: false,
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })

    if (response.ok) {
        const task = await response.json();

        tasks.push(task);
        showTasks();
        input.value = "";
        console.log(tasks);
    }


    else {
        console.log("Error while adding task")
    }



}


async function deleteTask(id) {


    try {
        const response = await (fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: 'DELETE',
        }))

        if (response.ok) {

            tasks = tasks.filter(task => task.id !== id);
            console.log("Successfully deleted task");
            console.log(tasks);
            showTasks();

        }

        else {
            console.log("Error while fetching tasks")
        }
    }


    catch (error) {
        console.log("Error occured during DELETE", error)
    }






}





async function completeTask(id) {


    const task = tasks.find(task => task.id === id);//qed insibu t task ma dik l id, muzajnix filter ax filter ha jatina larray shih just bl ogget taghna go fih

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                completed: !task.completed,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })


        if (response.ok) {

            task.completed = !task.completed;
            console.log("Successfully changed task completion")

            console.log(tasks);
            showTasks();



        }
        else {
            console.log("Error while updating task")
        }
    }


    catch (error) {

        console.log("Error while updating task", error)
    }


}






