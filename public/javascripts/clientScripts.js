// use jquery for delete confirmation box

$('.confirmation').on('click', function() {
    return confirm('Are you sure you want to delete this?');
});


function clickTable(clickedRow) {
console.log(clickedRow.id);
window.location.href="manageEmployees/viewEmployeeCertifications/" + clickedRow.id;

}



function filterTable() {
  // Declare variables
 let input = document.getElementById("filterText");
  let filter = input.value.toUpperCase();
 let table = document.getElementById("filterTable");
  let tr = table.getElementsByTagName("tr");
  let finterBY = document.getElementById("sortBy");
var filterByValue = finterBY.options[finterBY.selectedIndex].value;


if(filterByValue == "fn")
{
for (let i = 0; i < tr.length; i++) {
   let td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

if(filterByValue == "ln")
{
    for (let i = 0; i < tr.length; i++) {
   let td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  } 
}

if(filterByValue == "dpt")
{
    for (let i = 0; i < tr.length; i++) {
   let td = tr[i].getElementsByTagName("td")[2];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }

}

else
{
    console.log("Something went wrong")
}

  // Loop through all table rows, and hide those who don't match the search query
  
  
}

