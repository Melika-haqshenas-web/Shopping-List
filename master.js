let subBtn = document.getElementById('submit-button')
let inp = document.getElementById('Shop')
let list = document.getElementById('list')
let show = document.getElementById('show')
let alertshow = document.getElementById('alert')
let clearAll = document.getElementById('clearAll')
let _delBtn = document.querySelectorAll('.delete-btn')
let data = []

let flag = 0

let myData = localStorage.getItem('mydata')
myData = JSON.parse(myData)

if(myData != null){
    myData.map((val) =>{
        let art = document.createElement('article')
        art.innerHTML = `
            <p class="title">${val.input}</p>
            <div>
                <!-- edit btn -->
                <button type="button" class="edit-btn">
                    <i class="bi bi-pencil-square" onclick='editItems("${val.input}" , event)'></i>
                </button>
                <!-- delete btn -->
                <button type="button" class="delete-btn" onclick='clearItems(event)'>
                    <i class="bi bi-trash3-fill" onclick='clearItems(event)'></i>
                </button>
            </div>
        `
        list.appendChild(art)
        show.style.visibility = 'visible'
    })
}

data = myData
_delBtn = document.querySelectorAll('.delete-btn')


function done(){
    console.log(myData);
    if(inp.value == ''){
        noValue()
    }else{
        let _input = inp.value
        let art = document.createElement('article')
        art.innerHTML = `
            <p class="title">${inp.value}</p>
            <div>
                <!-- edit btn -->
                <button type="button" class="edit-btn">
                    <i class="bi bi-pencil-square" onclick='editItems("${inp.value}" , event)'></i>
                </button>
                <!-- delete btn -->
                <button type="button" class="delete-btn" onclick='clearItems(event)'>
                    <i class="bi bi-trash3-fill" onclick='clearItems(event)'></i>
                </button>
            </div>
        `
        list.appendChild(art)
        show.style.visibility = 'visible'
        _delBtn = document.querySelectorAll('.delete-btn')
        successShow()
        storageData(_input)
        
    }
}

subBtn.addEventListener('click', () =>{
    if(flag == 0){
        done()
    }
})

inp.addEventListener('keyup' , ({key}) =>{
    if (key === "Enter" && flag == 0) {
        done()
    }
})

function editItems(value , p){
    flag = 1;
    inp.value = value;
    inp.focus();
    subBtn.innerHTML = "edit";

    subBtn.addEventListener("click", () => {
      if (flag == 1) {
        doneEdit(value , p)
      }
    });

    inp.addEventListener('keyup' , ({key}) =>{
        if (key === "Enter" && flag == 1) {
            doneEdit(value , p)
        }
    })
}
 function doneEdit(value , p){
    if(inp.value == ''){
        noValue()
    }else{
        let parent = p.target.parentElement.parentElement.parentElement;
        myData = localStorage.getItem('mydata')        
        myData = JSON.parse(myData)
        parent.innerHTML =`<p class="title">${inp.value}</p>
            <div>
                <!-- edit btn -->
                <button type="button" class="edit-btn">
                    <i class="bi bi-pencil-square" onclick='editItems("${inp.value}" , event)'></i>
                </button>
                <!-- delete btn -->
                <button type="button" class="delete-btn" onclick='clearItems(event)'>
                    <i class="bi bi-trash3-fill" onclick='clearItems(event)'></i>
                </button>
            </div>`;
        let items = myData.map((val) =>{
            console.log(val.input);
            console.log(value);
            if(val.input == value){
                val.input = inp.value
            }
            return val;
        })
        localStorage.setItem("mydata", JSON.stringify(items));
        inp.value = null;
        inp.focus();
        subBtn.innerHTML = "Submit";
        flag = 0;
        changeItmes()
    }
 }

function clearItems(e){
    if(flag == 1){
        inp.value = null;
        inp.focus();
        subBtn.innerHTML = "Submit";
        flag = 0;
    }
    let btnDel = e.target.parentElement.parentElement.parentElement
    btnDel.remove()
    let allp = document.querySelectorAll('#list>article')
    if(allp.length == '0'){
        show.style.visibility = 'hidden'
    }
    alertshow.innerHTML = 'items remove'
    alertshow.classList.add('alert-delete')
    inp.value = null
    inp.focus()
    setTimeout(() => {
        alertshow.innerHTML = ''
        alertshow.classList.remove('alert-delete')
    }, 600);
    flag = 0;
    _delBtn = document.querySelectorAll('.delete-btn')
    
}




function storageData(_input){
    const sampleObj = {
        input : _input
    }
    data.push(sampleObj)
    let MyData = JSON.stringify(data)
    localStorage.setItem("mydata", MyData )
}



function noValue(){
    alertshow.innerHTML = 'please enter value'
    alertshow.classList.add('alert-delete')
    inp.value = null
    inp.focus()
    setTimeout(() => {
        alertshow.innerHTML = null
        alertshow.classList.remove('alert-delete')
    }, 600);
}

function successShow(){
    alertshow.innerHTML = 'items added to the list'
    alertshow.classList.add('alert-success')
    inp.value = null
    inp.focus()
    setTimeout(() => {
        alertshow.innerHTML = ''
        alertshow.classList.remove('alert-success')
    }, 600);
}

function changeItmes(){
    alertshow.innerHTML = 'value changed'
    alertshow.classList.add('alert-success')
    inp.value = null
    inp.focus()
    setTimeout(() => {
        alertshow.innerHTML = ''
        alertshow.classList.remove('alert-success')
    }, 600);
}

function emtyShow(){
    alertshow.innerHTML = 'empty list'
    alertshow.classList.add('alert-delete')
    inp.value = null
    inp.focus()
    setTimeout(() => {
        alertshow.innerHTML = ''
        alertshow.classList.remove('alert-delete')
    }, 600);
}

console.log(_delBtn);
_delBtn.forEach((val , i) =>{
    val.addEventListener('click' , ()=>{
        myData = localStorage.getItem('mydata')        
        myData = JSON.parse(myData)
        myData.splice(i , 1)
        let MyData = JSON.stringify(myData)
        localStorage.setItem('mydata' , MyData)
    })
})

clearAll.addEventListener('click' , () =>{
    show.style.visibility = 'hidden'
    let allp = document.querySelectorAll('#list>article')
    allp.forEach((val) =>{
        val.remove()
    })
    emtyShow()

    myData = localStorage.getItem('mydata')        
    myData = JSON.parse(myData)
    myData = []
    
    let MyData = JSON.stringify(myData)
    console.log(MyData);
    localStorage.setItem('mydata' , MyData)
    window.location.reload()
})

console.log(_delBtn);