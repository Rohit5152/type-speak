console.log("notes page");
showtime();
let addbtn = document.getElementById('addBtn')
addbtn.addEventListener("click", function (e) {

    let addtxt = document.getElementById("addTxt");
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    notesobj.push(addtxt.value);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    addtxt.value = "";
    // console.log(notesobj);
    showtime();
});
function showtime() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    let content = "";
    notesobj.forEach(function (element, index) {
        content += `
        
        <div class="card my-3 mx-3 cardnote" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${index + 1}</h5>
                <p class="card-text">${element}</p>
                <a id="${index}" onclick="deletenote(this.id)" class="btn btn-primary">Delete Note</a>
            </div>
        </div>
    `;
    });
    let notesele = document.getElementById('notes');
    if (notesobj.length != 0) {
        notesele.innerHTML = content;
    }
    else {
        notesele.innerHTML = `Nothing to show Add a note`;
    }
}
function deletenote(e) {
    // console.log("deleting"+e);
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    notesobj.splice(e, 1);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    showtime();

}
// Now for searching
let search = document.getElementById("searchtxt");
search.addEventListener("input", function () {
    let inputval = search.value.tolowercase();
    let notecard = document.getElementsByClassName("cardnote");
    Array.from(notecard).forEach(function (element) {
        let cardtxt = element.getElementsByTagName('p')[0].innerText;
        if (cardtxt.includes(inputval)) {
            element.style.display = "block";
        }
        else {
            element.style.display = 'none';
        }
    });
})