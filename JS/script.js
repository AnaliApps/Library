
let myLibrary = [];
let bookSubmit = document.getElementById("bookinfo");
let card = document.querySelector(".card-container");
let formCont = document.querySelector(".form-container");
let btnAdd = document.querySelector("#add");
function Book(title,author,pages,id,status){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.id = id;
    this.status = status;
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
function refreshArr(Lib){
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
function addBookToLibrary(){
    let titleOfBook = document.getElementById("title").value;
    let bookAuthor = document.getElementById("author").value;
    let bookPages = document.getElementById("pages").value;
    let id = Math.floor((Math.random() * 1000000) + 1);
    let status = bookRead();
    let book = new Book(titleOfBook,bookAuthor,bookPages,id,status);
    myLibrary = [...myLibrary,book]
    console.log(myLibrary)
    refreshArr(myLibrary)
}

btnAdd.addEventListener("click",()=>{
    formCont.style.left = "0%";
    formCont.style.display = "block";
});
bookSubmit.addEventListener("submit",(e)=>{
    card = document.querySelector(".card-container");
    e.preventDefault();
    card.textContent = ''
    addBookToLibrary();
    formCont.style.display = "none";
    card.style.width = "100vw";
})
function toggle(choice){
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
                    console.log(myLibrary)
                }else if(item.id === parseInt(e.target.parentNode.children[0].textContent)&&(e.target.textContent === "Read")){
                    toggle(item.status)
                    item.status = toggle(item.status)
                    e.target.parentNode.children[4].textContent = `Read : ${item.status}`;
                 }
            })

    })
}
deleteOrToggleBtn()
