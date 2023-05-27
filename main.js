const form = document.getElementById('addForm');
const amount = document.getElementById('amount');
const desc = document.getElementById('description');
const category = document.getElementById('category');
const expenseList = document.getElementById('expenses');

form.addEventListener('submit', addExpense);

window.addEventListener('DOMContentLoaded', () => {
    axios.get('http://localhost:4000/expenses')
        .then(response => {
            // console.log(response.data);
            for(let i=0;i<response.data.length;i++){
                showExpensesOnScreen(response.data[i]);
            }
        })
        .catch(err => {
            console.log(err);
        })
})

function addExpense(e){
    e.preventDefault();

    let obj = {
        amount: amount.value,
        description: desc.value,
        category: category.value
    }

    axios.post('http://localhost:4000/expenses', obj)
        .then(response => {
            showExpensesOnScreen(response.data);
        })
        .catch(err => console.log(err))
}

function showExpensesOnScreen(obj) {
    const parentElement = document.getElementById('expenses');
    const childHTML = `<li id='${obj.id}'>${obj.amount} - ${obj.category} - ${obj.description}
                       <button onclick="deleteExpense('${obj.id}')">Delete</button>
                       <form method='POST'>
                       <input type="hidden" value='${obj.id}' name="expenseId">
                       <button onclick="editExpense('${obj.id}')">Edit</button>
                       </form>
                       </li>`
    parentElement.innerHTML = parentElement.innerHTML + childHTML;
}

function deleteExpense(id) {
    const parentElement = document.getElementById('expenses');
    const childElement = document.getElementById(id);
    //console.log(id);
    axios.delete(`http://localhost:4000/expenses/${id}`)
        .then(response => {
            console.log('Deletion was successful!!');
            parentElement.removeChild(childElement);
        })
        .catch(err => console.log(err))
}

function editExpense(id) {
    console.log(id);
    //axios.put(`http://localhost:4000/expenses/`)
}