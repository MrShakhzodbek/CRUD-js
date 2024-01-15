function validateForm() {
    var name = document.getElementById("name").value
    var age = document.getElementById("age").value
    var address = document.getElementById("address").value
    var email = document.getElementById("email").value

    if (name === '') {
        alert('Name is required')
        return false
    }
    if (address === '') {
        alert('Address is required')
        return false
    }
    if (age === '') {
        alert('Age is required')
        return false
    }
    else if (isNaN(age) || age < 1) {
        alert('Age should be positive number')
        return false
    }
    if (email === '') {
        alert('Email is required')
        return false
    }
    else if (!email.includes('@')) {
        alert('Invalid emalid address')
        return false
    }

    return true
}


function showData() {
    var peopleList = JSON.parse(localStorage.getItem("peopleList")) || []
    var html = '';

    peopleList.forEach((element, index) => {
        html += '<tr>';
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.age + "</td>";
        html += "<td>" + element.address + "</td>";
        html += "<td>" + element.email + "</td>";
        html += `
                <td>
                <button onclick="deleteData(${index})" class="btn btn-danger">Delete</button>
                <button onclick="updateData(${index})" class="btn btn-warning">Edit</button>
                </td>
        `
        html += '</tr>'
    })

    document.getElementById('crudTable').getElementsByTagName('tbody')[0].innerHTML = html


}
document.onload = showData();

function addData() {

    if (validateForm()) {
        var name = document.getElementById("name").value;
        var age = document.getElementById("age").value;
        var address = document.getElementById("address").value;
        var email = document.getElementById("email").value;


        var peopleList = JSON.parse(localStorage.getItem("peopleList")) || []

        peopleList.push({
            name: name,
            age: age,
            address: address,
            email: email
        })

        localStorage.setItem("peopleList", JSON.stringify(peopleList))
        showData();
        document.getElementById("name").value = ''
        document.getElementById("age").value = ''
        document.getElementById("address").value = ''
        document.getElementById("email").value = ''

    }
}


function deleteData(index) {
    var peopleList = JSON.parse(localStorage.getItem("peopleList")) || [];
    peopleList.splice(index, 1)
    localStorage.setItem("peopleList", JSON.stringify(peopleList))
    showData();
}

function updateData(index) {
    var peopleList = JSON.parse(localStorage.getItem("peopleList") || [])


    document.getElementById("name").value = peopleList[index].name
    document.getElementById("age").value = peopleList[index].age
    document.getElementById("address").value = peopleList[index].address
    document.getElementById("email").value = peopleList[index].email

    document.getElementById('Submit').style.display = 'none'
    document.getElementById('Update').style.display = 'block'



    document.getElementById('Update').onclick = function () {
        if (validateForm()) {
            peopleList[index].name = document.getElementById("name").value;
            peopleList[index].age = document.getElementById("age").value;
            peopleList[index].address = document.getElementById("address").value;
            peopleList[index].email = document.getElementById("email").value;

            localStorage.setItem("peopleList", JSON.stringify(peopleList));
            showData();

            document.getElementById("name").value = ''
            document.getElementById("age").value = ''
            document.getElementById("address").value = ''
            document.getElementById("email").value = ''

            document.getElementById('Submit').style.display = 'block'
            document.getElementById('Update').style.display = 'none'
        }
    }
}