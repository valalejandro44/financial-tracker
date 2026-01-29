import { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";

const API_URL = "http://localhost:8000";

function App() {
    const [transactions, setTransactions] = useState([]);
    const [form, setForm] = useState({
        description: "",
        amount: "",
        type: "expense",
        category: "General",
    });

    useEffect(() => {
        fetch(`${API_URL}/transactions`)
            .then((res) => res.json())
            .then(setTransactions);
    }, []);

    function addTransaction(e) {
        e.preventDefault();

        fetch(`${API_URL}/transactions`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...form,
                amount: Number(form.amount),
            }),
        })
            .then((res) => res.json())
            .then((t) => {
                setTransactions([...transactions, t]);
                setForm({
                    description: "",
                    amount: "",
                    type: "expense",
                    category: "General",
                });
            });
    }

    const income = transactions
        .filter((t) => t.type === "income")
        .reduce((s, t) => s + t.amount, 0);

    const expenses = transactions
        .filter((t) => t.type === "expense")
        .reduce((s, t) => s + t.amount, 0);

    const balance = income - expenses;

    const expensesByCategory = {};
    transactions
        .filter((t) => t.type === "expense")
        .forEach((t) => {
            expensesByCategory[t.category] =
                (expensesByCategory[t.category] || 0) + t.amount;
        });

    return (
        <div className="container">
            <h1>💰 Finance Tracker</h1>

            <h2>Balance: ${balance.toFixed(2)}</h2>

            <form onSubmit={addTransaction}>
                <input
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                    }
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={form.amount}
                    onChange={(e) =>
                        setForm({ ...form, amount: e.target.value })
                    }
                />
                <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
                <input
                    placeholder="Category"
                    value={form.category}
                    onChange={(e) =>
                        setForm({ ...form, category: e.target.value })
                    }
                />
                <button>Add</button>
            </form>

            <Pie
                data={{
                    labels: ["Income", "Expenses"],
                    datasets: [
                        {
                            data: [income, expenses],
                        },
                    ],
                }}
            />

            <Bar
                data={{
                    labels: Object.keys(expensesByCategory),
                    datasets: [
                        {
                            label: "Expenses by Category",
                            data: Object.values(expensesByCategory),
                        },
                    ],
                }}
            />
        </div>
    );
}

export default App;
