import React, { useState, useEffect, useMemo } from "react";
import "./Plan.css";
import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";
import WeddingManager from "../models/WeddingModel";
import type { Guest, Expense, Task } from "../models/WeddingModel";



function Plan() {
 
  const [guests, setGuests] = useState<Guest[]>([]);
  const [guestInput, setGuestInput] = useState("");
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [expenseName, setExpenseName] = useState("");
  const [expenseVal, setExpenseVal] = useState<number | "">("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState("");

  const manager = useMemo(() => new WeddingManager(), []);
  const [filter, setFilter] =
  useState<"all" | "confirmed">("all");
  const filteredGuests =
  filter === "all"
    ? guests
    : guests.filter((g) => g.confirmed);
  const [currentPage, setCurrentPage] = useState(1);
  const guestsPerPage = 5;
  const currentGuests = filteredGuests.slice(
  (currentPage - 1) * guestsPerPage,
  currentPage * guestsPerPage
);
const totalPages = Math.ceil(
  filteredGuests.length / guestsPerPage
);
  useEffect(() => {
    const savedTasks = localStorage.getItem("wedding_tasks");
    if (savedTasks) setTasks(JSON.parse(savedTasks));
    const savedGuests = localStorage.getItem("wedding_guests");
    const savedExpenses = localStorage.getItem("wedding_expenses");

    if (savedGuests) {
      setGuests(JSON.parse(savedGuests));
    }

    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wedding_tasks", JSON.stringify(tasks));
    localStorage.setItem("wedding_guests", JSON.stringify(guests));
    localStorage.setItem("wedding_expenses", JSON.stringify(expenses));
  }, [guests, expenses, tasks]);

  const handleAddGuest = (e: React.FormEvent) => {
    e.preventDefault();

    if (!guestInput.trim()) return;

    setGuests([
      ...guests,
      {
        id: Date.now(),
        name: guestInput,
        confirmed: false,
      },
    ]);

    setGuestInput("");
  };

  const toggleGuest = (id: number) => {
  setGuests(
    guests.map((g) =>
      g.id === id
        ? { ...g, confirmed: !g.confirmed }
        : g
    )
  );
};

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();

    if (!expenseName.trim() || !expenseVal) return;

    setExpenses([
      ...expenses,
      {
        id: Date.now(),
        item: expenseName,
        amount: Number(expenseVal),
      },
    ]);

    setExpenseName("");
    setExpenseVal("");
  };
  const addTask = (e: React.FormEvent) => {
  e.preventDefault();

  if (!taskInput.trim()) return;

  setTasks([
    ...tasks,
    {
      id: Date.now(),
      text: taskInput,
      done: false,
    },
  ]);

  setTaskInput("");
};

const toggleTask = (id: number) => {
  setTasks(
    tasks.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t
    )
  );
};

const deleteTask = (id: number) => {
  setTasks(tasks.filter((t) => t.id !== id));
};

  return (
    <div className="plan-container">
      <main className="main-grid">

        {/* LEVA KOLONA */}
        <div className="sidebar">

          <div className="card-dark">
            <h3 className="card-title">Lista Gostiju</h3>
           <div className="filter-buttons">
  <button
    type="button"
    className={filter === "all" ? "active" : ""}
    onClick={() => setFilter("all")}
  >
    All
  </button>

  <button
    type="button"
    className={filter === "confirmed" ? "active" : ""}
    onClick={() => setFilter("confirmed")}
  >
    Confirmed
  </button>

  
</div>  

            <form onSubmit={handleAddGuest} className="input-group">
              <InputField
              value={guestInput}
              onChange={(e) => setGuestInput(e.target.value)}
              placeholder="Ime gosta..."
              />

             <CustomButton
              text="+"
              type="submit"
              className="add-button"
              />
            </form>

            <ul className="item-list">
              {currentGuests.map((g) => (
                <li key={g.id} className="list-item">
                  <span
                    onClick={() => toggleGuest(g.id)}
                    className={g.confirmed ? "confirmed" : ""}
                  >
                    {g.confirmed ? "✓ " : "○ "}
                    {g.name}
                  </span>

                  <button
                    className="del-btn"
                    onClick={() =>
                      setGuests(guests.filter((x) => x.id !== g.id))
                    }
                  >
                    x
                  </button>
                </li>
              ))}
            </ul>
            <div className="pagination">
  <button
    type="button"
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(currentPage - 1)}
  >
    Prev
  </button>

  {filteredGuests.length > 0 && (
  <span>
    {currentPage}/{totalPages}
  </span>
)}
  <button
    type="button"
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage(currentPage + 1)}
  >
    Next
  </button>
</div>
          </div>

          <div className="card-dark">
            <h3 className="card-title">Budžet</h3>

            <form onSubmit={handleAddExpense} className="input-group">
              <InputField
              value={expenseName}
              onChange={(e) => setExpenseName(e.target.value)}
              placeholder="Npr. Restoran"
              />

              <InputField
              value={expenseVal}
              type="number"
              onChange={(e) => setExpenseVal(e.target.value === "" ? "": 
                Number(e.target.value)
              ) 
            }
            placeholder="€"
            />

             <CustomButton
             text="+"
             type="submit"
             className="add-button"
             />
            </form>

            <ul className="item-list">
              {expenses.map((e) => (
                <li key={e.id} className="list-item">
                  <span>
                    {e.item}: {manager.formatPrice(e.amount)}
                  </span>

                  <button
                    className="del-btn"
                    onClick={() =>
                      setExpenses(expenses.filter((x) => x.id !== e.id))
                    }
                  >
                    x
                  </button>
                </li>
              ))}
            </ul>

            <div className="total-box">
              Ukupno: {manager.formatPrice(manager.calculateTotal(expenses))}
            </div>
          </div>

        </div>

        <div>
          <div className="progress-card">
            <h3>Planning Progress</h3>

            <div className="progress-circle">
              <span className="percentage">
                {manager.calculateProgress(guests)}%
              </span>
            </div>

            <p>Confirmed guests progress</p>
          </div>
        </div>

        <div className="sidebar">

          <div className="card-light">
            <h3>To Do List</h3>
            <form onSubmit={addTask} className="input-group">
              <InputField
              value={taskInput}
              placeholder="Nova obaveza..."
              onChange={(e) => setTaskInput(e.target.value)}
              />

              <CustomButton
              text="+"
              type="submit"
              className="add-button"
              />
        </form>

  <ul className="item-list">
    {tasks.map((task) => (
      <li key={task.id} className="list-item">
        <span
          onClick={() => toggleTask(task.id)}
          style={{
            cursor: "pointer",
            textDecoration: task.done
              ? "line-through"
              : "none",
          }}
        >
          {task.done ? "✓ " : "○ "}
          {task.text}
        </span>

        <button
          onClick={() => deleteTask(task.id)}
          className="del-btn"
        >
          x
        </button>
      </li>
    ))}
  </ul>
</div>

          <div className="calendar-box">
            <h4>August 2026</h4>

            <div className="calendar-grid">
              {[...Array(31)].map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}

export default Plan;


