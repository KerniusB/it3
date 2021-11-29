window.addEventListener("load", function () {
    var websiteColors = document.getElementById("color-picker");
    document.getElementById("color-picker").addEventListener("change", () => {
        if (!websiteColors.value) {
            document.body.removeAttribute('class');
        } else {
            document.body.removeAttribute('class');
            document.body.classList.add(websiteColors.value);
        }

        console.log(document.body);
    })
});