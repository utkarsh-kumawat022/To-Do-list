document.addEventListener("DOMContentLoaded", () =>{
    let input = document.getElementById("todo-input");
    let button = document.getElementById("add-task-btn");
    let todo_list = document.getElementById("todo-list");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || []
    tasks.forEach((task) => rendertask(task))

    button.addEventListener("click", ()=>{
        const taskText = input.value.trim()
        if(taskText === "") return;
        const taskobj = {
            id: Date.now(),
            text: taskText,
            completed: false,
        };
        tasks.push(taskobj)
        rendertask(taskobj)
        savetask()
        console.log(tasks);
    })
    function rendertask(task){
        const li = document.createElement("li")
        li.setAttribute("data-id", task.id)
        if(task.completed) li.classList.add("completed")
        li.innerHTML = `<span> ${task.text}</span>
         <button>delete</button>`
        li.addEventListener("click", (e) => {
            if(e.target.tagName === "BUTTON") return
            task.completed = !task.completed
            li.classList.toggle("completed")
            savetask()
        })
        li.querySelector("button").addEventListener("click", (e) => {
            e.stopPropagation()
            tasks = tasks.filter((t) => t.id !== tasks.id)
            li.remove()
            savetask()
        })
        todo_list.appendChild(li)
    }
    function savetask(){
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }
})