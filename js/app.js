const cardForm = document.querySelector('.card__form')
const inputEl = document.querySelector('.form__input')
const cardColl = document.querySelector('.card__collection')
const TODOS = JSON.parse(localStorage.getItem('todos')) || [
    {id: 1, title: 'Erta turish', status: true},
    {id: 2, title: 'Yuzni yuvish', status: false},
    {id: 3, title: 'Nonushta qilish', status: false},
]

function createList(data){
    while(cardColl.firstChild){
        cardColl.firstChild.remove()
    }
    data.forEach((list) => {
        const liEl = document.createElement('li')
        const checkText = document.createElement('div')
        const checkbox = document.createElement('div')
        const checkedbox = document.createElement('div')
        const givenTask = document.createElement('span')
        const trashBtn = document.createElement('button')
        const trashIcon = document.createElement('i')

        givenTask.innerHTML = `${list.title}`
        liEl.className = 'card__list'
        checkText.className = 'checktext'
        checkbox.className = 'checkbox'
        checkedbox.className = 'checkedbox'
        trashBtn.className = 'trashBtn'
        trashIcon.className = 'fa-solid fa-xmark'
    
        checkbox.appendChild(checkedbox)
        checkText.append(checkbox, givenTask)
        trashBtn.appendChild(trashIcon)
        liEl.append(checkText, trashBtn)
        cardColl.appendChild(liEl)

        if(list.status){
            checkbox.classList.add('checkbox__focused')
            checkedbox.style.display = 'block'
            givenTask.style.textDecoration = 'line-through'
        }else{
            checkbox.classList.remove('checkbox__focused')
            checkedbox.style.display = 'none'
            givenTask.style.textDecoration = 'none'
        }

        checkbox.addEventListener('click', () => {
            checkbox.classList.toggle('checkbox__focused')
            checkedbox.style.display = checkedbox.style.display === 'block' ? 'none' : 'block'
            if(checkedbox.style.display === 'block'){
                list.status = true
                givenTask.style.textDecoration = 'line-through'
            }else{
                list.status = false
                givenTask.style.textDecoration = 'none'
            }
            localStorage.setItem('todos', JSON.stringify(TODOS))
            createList(TODOS)
        })

        trashBtn.addEventListener('click', ()=> {
            const taskIndex = TODOS.findIndex(task => task.title === list.title)

            if(taskIndex !== -1){
                TODOS.splice(taskIndex, 1)
            }
            localStorage.setItem('todos', JSON.stringify(TODOS))
            createList(TODOS)
        })


    })
}

window.addEventListener('load', ()=> {
    createList(TODOS)
})

cardForm.addEventListener('submit', (e) => {
    e.preventDefault()
   if(!inputEl.value.trim()){
       alert('Error: Please, insert at least one character')
}else{
       let newList = {
           id: new Date().getTime(),
           title: inputEl.value,
           status: false
       }
       TODOS.push(newList)
       createList(TODOS)
       inputEl.value = ''
       localStorage.setItem('todos', JSON.stringify(TODOS))
   }
})

