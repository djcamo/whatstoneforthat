
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjdGZpb2hmZWd0dGZhcGlhem5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njc4ODc3ODEsImV4cCI6MTk4MzQ2Mzc4MX0.p_NdRX7tlhnAYxH1v2wSS85C620dxSpEhH-C3jwYBh8";
const url = "https://ectfiohfegttfapiazni.supabase.co";
const database = supabase.createClient(url, key);

const add = document.querySelector("#add");
const deleteList = document.querySelector("#deleteList");
const refreshList = document.querySelector("#refreshList");
const addItems = document.querySelector("#addItems");

const renderItems = async () => {
    let content = document.getElementById("content");
    const res = await database
        .from("items")
        .select("*")
        .order('ticked', { ascending: true })
        .order('name', { ascending: true });
    if (res) {
        // let html = `<ul class="table-view">`;
        let html = ``;
        let checked;
        res.data.forEach(element => {
            if(element['ticked'] == true){
                checked = 'checked';
            }else{
                checked = '';
            }
            html += `<ion-item><ion-checkbox justify="space-between" onclick="tickItem(${element['id']})" ${checked}>${element['name']}</ion-checkbox></ion-item>`;
        });
        // html += `</ul>`;

        content.innerHTML = html;
        item = "";
    }
}

renderItems();

// signupLink.addEventListener("click", async (e) => {
//     e.preventDefault();
//     login.style.display = 'none';
//     addItems.style.display = 'none';
//     content.style.display = 'none';
//     signup.style.display = 'block';
// })

// loginLink.addEventListener("click", async (e) => {
//     e.preventDefault();
//     login.style.display = 'block';
//     addItems.style.display = 'none';
//     content.style.display = 'none';
//     signup.style.display = 'none';
// })

// login.addEventListener("click", async (e) => {
//     e.preventDefault();
//     login.style.display = 'none';
//     addItems.style.display = 'block';
//     content.style.display = 'block';
//     deleteList.style.display = 'block';
//     logout.style.display = 'block';
//     renderItems();
// })

// logout.addEventListener("click", async (e) => {
//     e.preventDefault();
//     login.style.display = 'block';
//     addItems.style.display = 'none';
//     content.style.display = 'none';
//     deleteList.style.display = 'none';
//     logout.style.display = 'none';
//     renderItems();
// })

add.addEventListener("click", async (e) => {
    e.preventDefault();
    let item = document.querySelector("#item").value;
    if(item != ''){
        let res = await database.from("items").insert({
            name: item,
        })
        if (res) {
            document.querySelector("#item").value = "";
            renderItems();
        }
    }

})

deleteList.addEventListener("click", async (e) => {
    e.preventDefault();

    let res = await database
    .from("items")
    .delete()
    .eq('ticked', true)
    if (res) {
        renderItems();
    }
})

deleteList.addEventListener("click", async (e) => {
    e.preventDefault();
    renderItems();
})

const tickItem = async (id) => {
    //* check status
    let checked;
    let seletedItem = await database
        .from("items")
        .select("*")
        .eq('id', id)
    if(seletedItem.data[0].ticked == true) {
        checked = false;
    }else{
        checked = true;
    }
    //* change status
    let update = await database
    .from("items")
    .update({
        ticked: checked,
    })
    .eq('id', id)
    if (update) {
        renderItems();
    }
}




