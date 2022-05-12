var selectedRow = null;

function onFormSubmit(){
    console.log(formData);
    if(validate()){
        var formData = readFormData();
        console.log(formData);
        if(selectedRow == null){
            insertNewRecord(formData);
        }else{
            updateRecord(formData);
        }
        
        resetForm();
    }
}

function readFormData(){

    var formData = {};
    formData["fullname"] = document.getElementById("fullname").value;
    formData["code"] = document.getElementById("code").value;
    formData["domaine"] = document.getElementById("domaine").value;
    formData["address"] = document.getElementById("address").value;
    formData["mail"] = document.getElementById("mail").value;
    formData["typeProfil"] = document.getElementById("typeProfil").value;

    return formData;
}

function insertNewRecord(data){
    var table = document.getElementById("emplist").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);

    cell2 = newRow.insertCell(0);
    cell2.innerHTML = data.code;

    cell1 = newRow.insertCell(1);
    cell1.innerHTML = data.fullname;

    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.domaine;

    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.address;

    cell4 = newRow.insertCell(4);
    cell4.innerHTML = data.mail;

    cell4 = newRow.insertCell(5);
    cell4.innerHTML = data.typeProfil;

    cell4 = newRow.insertCell(6);
    cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                        <a  onClick="onDelete(this)">Delete</a>`;
}

function resetForm(){
    document.getElementById('code').value = '';
    document.getElementById('fullname').value = '';
    document.getElementById('domaine').value = '';
    document.getElementById('address').value = '';
    document.getElementById('mail').value = '';
    document.getElementById('typeProfil').value = '';
    selectedRow = null;
}

function onEdit(td){
    selectedRow = td.parentElement.parentElement;
    document.getElementById('code').value = selectedRow.cells[0].innerHTML;
    document.getElementById('fullname').value = selectedRow.cells[1].innerHTML;
    document.getElementById('domaine').value = selectedRow.cells[2].innerHTML;
    document.getElementById('address').value = selectedRow.cells[3].innerHTML;
    document.getElementById('mail').value = selectedRow.cells[4].innerHTML;
    document.getElementById('typeProfil').value = selectedRow.cells[5].innerHTML;
}

function updateRecord(formData){

    selectedRow.cells[0].innerHTML = formData.code;
    selectedRow.cells[1].innerHTML = formData.fullname;
    selectedRow.cells[2].innerHTML = formData.domaine;
    selectedRow.cells[3].innerHTML = formData.address;
    selectedRow.cells[4].innerHTML = formData.mail;
    selectedRow.cells[5].innerHTML = formData.typeProfil;

}

function onDelete(td){
    if(confirm('Are you sure to delete this record?')){
        row = td.parentElement.parentElement;
        document.getElementById("emplist").deleteRow(row.rowIndex);
        resetForm();
    }
    
}

function validate(){
    isValid = true;
    if(document.getElementById('fullname').value == "" || document.getElementById('code').value == ""){
        isValid = false;
        document.getElementById('fullNameValidationError').classList.remove("hide");
        document.getElementById('codeValidationError').classList.remove("hide");
    }
    else{
        isValid = true;
        if(!document.getElementById('fullNameValidationError').classList.remove("hide")){
            document.getElementById('fullNameValidationError').classList.add("hide");
        }
        if(!document.getElementById('codeValidationError').classList.remove("hide")){
            document.getElementById('codeValidationError').classList.add("hide");
        }
    }

    return isValid;
}