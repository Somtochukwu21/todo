window.onload = function () {
  const todoList =
    document.querySelector(".addToDoBtn").parentElement.nextElementSibling;
  const toDoText = document.querySelector(".addToDoBtn").previousElementSibling;
  const todoCount = document.querySelector(".todoCount");
  const addToDoBtn = document.querySelector(".addToDoBtn");
  const clearAll = document.querySelector(".clearAll");
  const todo = new ToDo();

  addToDoBtn.onclick = () => {
    const todoValue = toDoText.value;
    if (!todoValue || todoValue.trim() === "") {
      return false;
    }

    const { domLi, domRemoveToDo } = todo.add(todoValue);
    todoList.appendChild(domLi);
    todoCount.textContent = todo.toDoCount;
    toDoText.value = null;

    todo.onRemove(domRemoveToDo, () => {
      todoCount.textContent = todo.toDoCount;
    });
  };

  clearAll.onclick = () => {
    todoList.innerHTML = null;
    todoCount.textContent = 0;
    todo.toDoCount = 0;
  };
};

class ToDo {
  
  toDoCount = 0;

  add(title) {
    const domLi = document.createElement("li");
    const domRemoveToDo = document.createElement("span");

    domLi.innerHTML = `<span>${title}</span>`;
    domRemoveToDo.innerHTML = "x";

    domLi.appendChild(domRemoveToDo);
    this.toDoCount += 1;

    return { domLi, domRemoveToDo };
  }

  onRemove(domRemoveToDo, cb) {
    domRemoveToDo.onclick = () => {
      domRemoveToDo.parentElement.remove();
      this.toDoCount -= 1;

      cb();
    };
  }
}
