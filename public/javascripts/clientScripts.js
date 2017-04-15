// use jquery for delete confirmation box

$('.confirmation').on('click', function() {
    return confirm('Are you sure you want to delete this?');
});




function clickTable(clickedRow) {
window.location.href="manageEmployees/viewEmployeeCertifications/" + clickedRow.id;
}

function OnSelectedIndexChanged(finterBY)
{
let text = finterBY.options[finterBY.selectedIndex].value
   console.log(text);

let searchByTxtBox = document.getElementById("filterText");
searchByTxtBox.placeholder="Search Employee By " + text;
filterTable();
}

function toggleCategorySearch(checkboxObj)
{
  console.log("yes im working " +  checkboxObj.checked);
 
  
  if(checkboxObj.checked == true)
  {
    console.log("in if");
 document.getElementById("hideablediv").style.display = 'block';
filterWithCategory();

  }
else{
      console.log("in else");

  document.getElementById("hideablediv").style.display = 'none';
   filterTable();

}
 
}
function filterWithCategory()
{
  let input = document.getElementById("filterText");
  let filter = input.value.toUpperCase();
  let table = document.getElementById("filterTable");
  let tr = table.getElementsByTagName("tr");
  let finterBY = document.getElementById("sortBy");
  let categorySearchText = document.getElementById("filterCategory");
  let filterCategory = categorySearchText.value.toUpperCase();
  var filterByValue = finterBY.options[finterBY.selectedIndex].value;

  if(filterCategory != "")
  {
    for (let i = 0; i < tr.length; i++) 
    {
      let td = tr[i].getElementsByTagName("td")[3];
      if (td) 
      {
        let imgs = td.getElementsByTagName('img');
        if (imgs.length > 0) 
        {
            for (let x=0; x < imgs.length; x++)
            {
              currentImgTitle = (imgs[x].title).toUpperCase();
                console.log(imgs[x].title);
                if(currentImgTitle.indexOf(filterCategory) > -1)
                {

                  
                 //   tr[i].style.display = "";

                      if(filterByValue == "First Names")
                      {
                            let td1 = tr[i].getElementsByTagName("td")[0];
                            if (td1) 
                            {
                                if (td1.innerHTML.toUpperCase().indexOf(filter) > -1) 
                                {
                                  console.log(tr[i].id + "  -   i have a cartificate with " + filterCategory + " in it");
                                    tr[i].style.display = "";
                                } 
                                else 
                                {
                                    tr[i].style.display = "none";
                                }
                            }
                      }
                      if(filterByValue == "Last Names")
                      {
                            let td1 = tr[i].getElementsByTagName("td")[1];
                            if (td1) 
                            {
                                if (td1.innerHTML.toUpperCase().indexOf(filter) > -1) 
                                {
                                  console.log(tr[i].id + "  -   i have a cartificate with " + filterCategory + " in it");
                                   tr[i].style.display = "";
                                } 
                                else 
                                {
                                   tr[i].style.display = "none";
                                }
                            }
                      }
                      if(filterByValue == "Departments")
                      {
                            let td = tr[i].getElementsByTagName("td")[2];
                            if (td1) 
                            {
                                if (td1.innerHTML.toUpperCase().indexOf(filter) > -1) 
                                {
                                  console.log(tr[i].id + "  -   i have a cartificate with " + filterCategory + " in it");
                                    tr[i].style.display = "";
                                } 
                                else 
                                {
                                   tr[i].style.display = "none";
                                }
                            }
                      }
                    break;
                }
                else
                {
                   console.log(tr[i].id + "  -   i dont have a cartificate with " + filterCategory + " in it")
                   tr[i].style.display = "none";
                }
            }
            
        }
        else
        {
          console.log(tr[i].id + "  -   i dont have a cartificate with " + filterCategory + " in it")
          tr[i].style.display = "none";
        }
      }
    } // loop for each table row
  }
  else
  {
    console.log("  no text in categories! running filterTable() ")
    filterTable();
  }
}

function filterTable() {
  // Declare variables
 let input = document.getElementById("filterText");
  let filter = input.value.toUpperCase();
 let table = document.getElementById("filterTable");
  let tr = table.getElementsByTagName("tr");
  let finterBY = document.getElementById("sortBy");
var filterByValue = finterBY.options[finterBY.selectedIndex].value;

if(enableCertificateSearch.checked != true || (enableCertificateSearch.checked == true && filterCategory.text == ""))
{
  


if(filterByValue == "First Names")
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

else if(filterByValue == "Last Names")
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

else if(filterByValue == "Departments")
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
else{
  filterWithCategory();
}

}


