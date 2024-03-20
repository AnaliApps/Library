
let myLibrary = [];
let bookSubmit = document.getElementById("bookinfo");
let card = document.querySelector(".card-container");
function Book(name,author,year,id){
    this.name = name;
    this.author = author;
    this.year = year;
    this.id = id;
}
function refreshArr(Lib){
    return Lib.forEach((item)=>{
        let postCard = document.createElement("div");
        postCard.classList.add("innerCard");
        postCard.innerHTML = `
        <p class="id">${item.id}</p>
        <p>${item.name}</p>
        <p>${item.author}</p>
        <p>${item.year}</p>
        `
        let btnDel = document.createElement("button")
        btnDel.textContent = "Delete";
        btnDel.classList.add = "btnDel";
        postCard.appendChild(btnDel)
        card.appendChild(postCard)
    })
}
function addBookToLibrary(){
    let nameOfBook = document.getElementById("name").value;
    let bookAuthor = document.getElementById("author").value;
    let bookYear = document.getElementById("year").value;
    let id = Math.floor((Math.random() * 1000000) + 1);
    let book = new Book(nameOfBook,bookAuthor,bookYear,id);
    myLibrary = [...myLibrary,book]
    console.log(myLibrary)
    refreshArr(myLibrary)
    return myLibrary;
}
bookSubmit.addEventListener("submit",(e)=>{
    card = document.querySelector(".card-container");
    e.preventDefault();
    card.textContent = ''
    addBookToLibrary();
})
function deleteBtn(){
    card.addEventListener("click",(e)=>{
            myLibrary.forEach((item,index)=>{
                if(item.id === parseInt(e.target.parentNode.children[0].textContent)){
                    myLibrary.splice(index,1)
                    e.target.parentNode.remove()
                    console.log(myLibrary)
                }
            })
    })
}
deleteBtn()
