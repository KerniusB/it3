$(function () {

    let fullName = $("#fullName");
    let form = $("form");
    let age = $("#age");
    let birthday = $("#birthday");
    let easterEgg = $("#easterEgg");
    let editableAbout = $("#editableAbout");
    let container = $("#container");
    let deleteById = $("#deleteById");
    let textToBeDeleted = $("#textToBeDeleted");

    form.submit(function (event) {
        event.preventDefault();
        if (!inputValidation(event)) {
            return;
        }


        fetch('https://jsonblob.com/api/jsonBlob', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Expose-Headers': 'Location'
            },
            body: JSON.stringify($(this).serializeArray())
        })
                .then(res => {
                let location = res.headers.get('Location').replace('http://', 'https://');
                $('form').append('<a href="' + location + '" class="atkurti-forma">Data</a>');
            });

    });

    function inputValidation(value) {

        if (!fullName.val()) {
            alert("Iveskite varda ir pavarde");
            return false;
        }

        if (!isDateValid(birthday.val())) {
            alert("Blogai ivesta data")
            return false;
        }

        if (!isInt(age.val())) {
            alert("Iveskitye teigiama skaiciu");
            return false;
        }

        if (fullName.val() === "Elon Musk") {
            easterEgg.css('display', 'flex');
        }
        else {
            easterEgg.css('display', 'none');
        }

        return true;
    }

    function isDateValid(value) {
        let parsedDate = new Date(value);
        let splitDate = value.split('-');
        if (splitDate.length !== 3 || parsedDate.getMonth() + 1 != splitDate[1] || parsedDate.getDate() != splitDate[2])
            return false;
        return true;
    }

    function isInt(value) {
        var er = /^-?[0-9]+$/;
        return er.test(value);
    }

    function editBlogEntry() {
        editableAbout.attr("contenteditable", "true");
    }

    function saveBlogEntry() {
        editableAbout.attr("contenteditable", "false");
    }

    function darkMode() {
        document.getElementById("bodyAbout").style.backgroundColor = "DimGray";
    }

    function defaultMode() {
        document.getElementById("bodyAbout").style.backgroundColor = "White";
    }

    function addParagraph() {
        if (textToBeDeleted.val() !== "") {
            const para = document.createElement("p");
            const node = document.createTextNode(textToBeDeleted.val());
            para.appendChild(node);
            const element = document.getElementById("container");
            element.appendChild(para);
        }
    }

    function deleteParagraph() {
        if ($("#container > p")[deleteById.val()] !== undefined) {
            $("#container > p")[deleteById.val()].remove();
        }
    }




    // 4.2.
    $(document).on('click', '.atkurti-forma', function (e) {
        $('table.duomenys').remove();
        e.preventDefault();
        fetch($(this).attr('href'), {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    // 4.3.
                    let duomenuLentele = '<table class="duomenys"><thead><tr><th>Laukas</th><th>Reiksme</th></tr></thead><tbody>';
                    data.forEach(function (field) {
                        if (field['name'] && field['value']) {
                            duomenuLentele += '<tr><td>' + field['name'] + '</td><td>' + field['value'] + '</td></tr>';
                        }
                    });

                    duomenuLentele += '</tbody></table>';
                    $('main#bilietai').append(duomenuLentele);
                }
            })
    });


});