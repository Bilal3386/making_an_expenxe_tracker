function saveToLocalStorage(event) {
    event.preventDefault()
    const experience  = event.target.experience.value
    const description = event.target.description.value
    const category = event.target.category.value
    const obj = {experience, description, category}
    localStorage.setItem(obj.experience, JSON.stringify(obj))
    showNewUserOnScreen(obj)
}

window.addEventListener('DOMContentLoaded', () =>
{
    const localStorageObj = localStorage
    const localStorageKeys = Object.keys(localStorageObj)
    for(let i=0; i<localStorageKeys.length; i++)
    {
        const key = localStorageKeys[i]
        const userDetailsString = localStorageObj[key]
        const  userDetailsObj = JSON.parse(userDetailsString)
        showNewUserOnScreen(userDetailsObj)
    }
}
)

function showNewUserOnScreen(user) 
{
    document.getElementById('experience').value = '';
    document.getElementById('description').value = '';
    document.getElementById('category').value ='';
    if(localStorage.getItem(user.experience) !== null)
    {
        removeUserFromScreen(user.experience)
    }
    const parentNode = document.getElementById('userList');
    const childHTML = `<li id=${user.experience}> ${user.experience} - ${user.description} 
    <button style="margin: 10px 2px; background: green; color:white" onclick=editUser('${user.experience}','${user.description}','${user.category}')>Edit</button>
    <button style="margin: 10px 2px" onclick=deleteUser('${user.experience}')>Delete</button></li>`
    parentNode.innerHTML = parentNode.innerHTML + childHTML
}
function editUser(experience, description, category)
{
    document.getElementById('experience').value = experience;
    document.getElementById('description').value = description;
    document.getElementById('category').value = category;
    deleteUser(experience)
}

function deleteUser(obj)
{
    localStorage.removeItem(obj)
    removeUserFromScreen(obj)
}

function removeUserFromScreen(obj) 
{
    const parentNode = document.getElementById('userList')
    const childNodeToBeDeleted = document.getElementById(obj)
    console.log(childNodeToBeDeleted)
    if(childNodeToBeDeleted)
    {
        parentNode.removeChild(childNodeToBeDeleted)
    }
}