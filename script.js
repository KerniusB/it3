let fullName = $("#fullName");
let form = $("form");
let age = $("#age");

$(document).ready(function () {
    registerListeners();
});


function registerListeners() {

    form.submit(function (event) {
        event.preventDefault();

        if(!fullName.val()){
            alert("Iveskite varda ir pavarde");
        }

        console.log(age.is);
        console.log(age.val()>0);

        if(isNaN(age.val()) && age.val()>0){
            alert("Iveskitye teigiama skaiciu");
         }
    });
}