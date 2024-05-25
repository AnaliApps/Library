class Book{
    constructor(title,author,pages,id,status){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.id = id;
        this.status = status;
    }
    static getId(){
        this.id = Math.floor((Math.random() * 1000000) + 1);
        return this.id;
    }
}


(function(){
    let myLibrary = [];
    let bookSubmit = document.getElementById("bookinfo");
    let card = document.querySelector(".card-container");
    let formCont = document.querySelector(".form-container");
    let btnAdd = document.querySelector("#add");
    let search = document.querySelector("#search").value;

bookSubmit.noValidate = true;
bookSubmit.addEventListener('submit',formValidate)
function formValidate(e){    
    const form = e.target
    const field = [...form.elements].slice(0,3)
    field.forEach(i=>{
        i.setCustomValidity('')
        i.parentElement.classList.remove('invalid')
    })

    const err = form.title.value || form.author.value || form.pages.value ? '' : 'error'
    form.title.setCustomValidity(err)
    form.author.setCustomValidity(err)
    form.pages.setCustomValidity(err)

    if(!form.checkValidity()){
        e.preventDefault()
        e.stopImmediatePropagation()
        field.forEach(item =>{
            if(!item.checkValidity()){
                item.parentElement.classList.add('invalid');
            }
        })
    }
    
}
function bookRead(){
    let ele = document.getElementsByName("read");
    let res = '';
    ele.forEach((item)=>{
        if(item.checked){
            res += item.value;
        }
    })
    return res
}

function addBookToLibrary(){
    let titleOfBook = document.getElementById("title").value;
    let bookAuthor = document.getElementById("author").value;
    let bookPages = document.getElementById("pages").value;
    let bookStatus = bookRead();
    let book = new Book(titleOfBook,bookAuthor,bookPages,Book.getId(),bookStatus)
    myLibrary = [...myLibrary,book]
    displayUI(myLibrary);
}

function displayUI(Lib){
    return Lib.forEach((item)=>{
                let postCard = document.createElement("div");
                postCard.classList.add("innerCard");
                postCard.innerHTML = `
                <p class="id">${item.id}</p>
                <p>Title : ${item.title}</p>
                <p>Author: ${item.author}</p>
                <p>Pages : ${item.pages}</p>
                <p class="read">Read  : ${item.status}</p>
                `
                let btnDel = document.createElement("button")
                btnDel.textContent = "Delete";
                btnDel.classList.add = "btnDel";
                let statusBtn = document.createElement("button")
                statusBtn.textContent = "Read";
                statusBtn.classList.add = "statusBtn";
                postCard.appendChild(btnDel)
                postCard.appendChild(statusBtn);
                card.appendChild(postCard)
            })
}

function toggleStatus(choice){
        let res = ''
        if(choice === "No"){
            res = "Yes"
        }else if(choice === "Yes"){
            res = "No"
        }
        return res;
}

function deleteOrToggleBtn(){
    card.addEventListener("click",(e)=>{
            myLibrary.forEach((item,index)=>{
                if((item.id === parseInt(e.target.parentNode.children[0].textContent)&&(e.target.textContent === "Delete"))){
                    myLibrary.splice(index,1)
                    e.target.parentNode.remove()
                }else if(item.id === parseInt(e.target.parentNode.children[0].textContent)&&(e.target.textContent === "Read")){
                    item.status = toggleStatus(item.status)
                    e.target.parentNode.children[4].textContent = `Read : ${item.status}`;
                 }
            })

    })
}

bookSubmit.addEventListener("submit",e =>{
    card = document.querySelector(".card-container");
    e.preventDefault();
    card.textContent = ''
    addBookToLibrary()
    formCont.style.display = "none";
    card.style.width = "100vw";
    document.getElementById("title").value = ''
    document.getElementById("author").value = ''
    document.getElementById("pages").value = ''
})

btnAdd.addEventListener("click",()=>{
    formCont.style.left = "0%";
    formCont.style.display = "block";
});
deleteOrToggleBtn()
})()
