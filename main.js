function sel(selector) {
    return document.querySelector(selector);
}
let form = document.forms.form;
class User {
    constructor(uId, uLogin, uPass, uEmail) {
        this.id = uId;
        this.login = uLogin;
        this.password = uPass;
        this.email = uEmail;
    }
}
let editableUserId;
let arrUsers = [];
sel('.btn-add-user').addEventListener('click', function () {
    let id = 0;
    let login = form.login.value;
    let password = form.pass.value;
    let email = form.email.value;
    let user = new User(id, login, password, email);
    arrUsers.push(user);
    sel('tbody').innerHTML = '';
    arrUsers.forEach((user, index) => { user.id = index + 1; addUser(user); });
    form.reset();
});
function addUser(user) {
    let tr = document.createElement('tr');
    tr.innerHTML = `
    <td>${user.id}</td>
    <td>${user.login}</td>
    <td>${user.password}</td>
    <td>${user.email}</td>
    <td ><button type="button" id="${user.id}" class="edit-block">Edit</button></td>
    <td><button id="${user.id}" type="button" class="delete-block">Delete</button></td>
    `;
    sel('tbody').appendChild(tr);
}
sel('tbody').addEventListener('click', editUserOrDeleteUser);
function editUserOrDeleteUser(e) {
    if (e.target.className === 'delete-block') {
        deleteUser(e);
    }
    if (e.target.className === 'edit-block') {
        editUser(e);
    }
}
function deleteUser(e) {
    const USERID = e.target.id;
    const INDEX = arrUsers.findIndex((user) => user.id === +USERID);
    if (INDEX !== -1) {
        arrUsers.splice(INDEX, 1);
    }
    render();
}
function editUser(e) {
    sel('.btn-add-user').style.display = 'none';
    sel('.save-user').style.display = 'block';
    const USERID = e.target.id;
    const INDEX = arrUsers.find((user) => user.id === +USERID);
    editableUserId = INDEX.id;
    form.login.value = INDEX.login;
    form.pass.value = INDEX.password;
    form.email.value = INDEX.email;
}
sel('.save-user').addEventListener('click', editElement);
function editElement() {
    sel('.btn-add-user').style.display = 'block';
    sel('.save-user').style.display = 'none';
    arrUsers.forEach((user) => {
        user.id === editableUserId ?
            user.login = form.login.value :
            user.password = form.pass.value;
        user.email = form.email.value;
    });
    form.reset();
    render();
}
function render() {
    sel('tbody').innerHTML = '';
    arrUsers.forEach((user, index) => { user.id = index + 1; addUser(user); });
}
