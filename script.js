// Donors from localStorage
let donors = JSON.parse(localStorage.getItem("donors")) || [];

// Toggle variables
let showAllToggle = false;
let adminShowToggle = false;

// Add Donor (newest on top)
function addDonor(){
    let name = document.getElementById("name").value.trim();
    let blood = document.getElementById("blood").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let location = document.getElementById("location").value.trim();

    if(!name || !blood || !phone || !location){
        alert("Please fill all fields!");
        return;
    }

    donors.unshift({name,blood,phone,location});
    localStorage.setItem("donors", JSON.stringify(donors));
    clearForm();
    if(showAllToggle) showDonors();
    if(adminShowToggle) showDonorsAdmin();
}

// Clear input fields
function clearForm(){
    document.getElementById("name").value="";
    document.getElementById("blood").value="";
    document.getElementById("phone").value="";
    document.getElementById("location").value="";
}

// Toggle Show All on Search Page
function toggleShowAll(){
    showAllToggle = !showAllToggle;
    let btn = document.getElementById("showAllBtn");
    if(showAllToggle){
        btn.innerText = "Hide All";
        showDonors();
    } else {
        btn.innerText = "Show All";
        let table = document.getElementById("donorTable");
        if(table) table.innerHTML="";
    }
}

// Show Donors on Search Page
function showDonors(){
    if(!showAllToggle) return;
    let table = document.getElementById("donorTable");
    if(!table) return;

    table.innerHTML="";
    donors.forEach(d=>{
        table.innerHTML+=`
        <tr>
        <td>${d.name}</td>
        <td>${d.blood}</td>
        <td>${d.phone}</td>
        <td>${d.location}</td>
        <td><a href="tel:${d.phone}"><button>Call</button></a></td>
        </tr>`;
    });
}

// Search Donor
function searchDonor(){
    let blood = document.getElementById("searchBlood").value.toLowerCase();
    let location = document.getElementById("searchLocation").value.toLowerCase();

    let table = document.getElementById("donorTable");
    if(!table) return;
    table.innerHTML="";

    let filtered = donors.filter(d =>
        d.blood.toLowerCase().includes(blood) &&
        d.location.toLowerCase().includes(location)
    );

    if(filtered.length==0){
        table.innerHTML="<tr><td colspan='5'>No donor found!</td></tr>";
        return;
    }

    filtered.forEach(d=>{
        table.innerHTML+=`
        <tr>
        <td>${d.name}</td>
        <td>${d.blood}</td>
        <td>${d.phone}</td>
        <td>${d.location}</td>
        <td><a href="tel:${d.phone}"><button>Call</button></a></td>
        </tr>`;
    });
}

// Toggle Show Donor List in Admin Panel
function toggleAdminShow(){
    adminShowToggle = !adminShowToggle;
    let btn = document.getElementById("showAdminBtn");
    if(adminShowToggle){
        btn.innerText = "Hide Donor List";
        showDonorsAdmin();
    } else {
        btn.innerText = "Show Donor List";
        let table = document.getElementById("donorTableAdmin");
        if(table) table.innerHTML="";
    }
}

// Show Donors in Admin Panel
function showDonorsAdmin(){
    if(!adminShowToggle) return;
    let table = document.getElementById("donorTableAdmin");
    if(!table) return;

    table.innerHTML="";
    donors.forEach((d,i)=>{
        table.innerHTML+=`
        <tr>
        <td>${d.name}</td>
        <td>${d.blood}</td>
        <td>${d.phone}</td>
        <td>${d.location}</td>
        <td><button onclick="deleteDonor(${i})">Delete</button></td>
        </tr>`;
    });
}

// Delete Donor (Admin Only)
function deleteDonor(index){
    if(confirm("Are you sure want to delete this donor?")){
        donors.splice(index,1);
        localStorage.setItem("donors", JSON.stringify(donors));
        if(adminShowToggle) showDonorsAdmin();
        if(showAllToggle) showDonors();
    }
}

// Initial load on Search Page
if(showAllToggle) showDonors();
if(adminShowToggle) showDonorsAdmin();