var medici = [{
    nume: "Mircea FILIP",
    titlu: "Medic Specialist Reumatolog",
    email: "mirceafilip@clinicamedicala.ro"
}];


function GetItems() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {

        if (xhr.status >= 200 && xhr.status < 300) {
            var obj = JSON.parse(xhr.response);
            var i, div, div1, para, mybr, elem, numedoctor, titludoctor, aemail, iddoctor;
            for (i = 0; i < obj.length; i++) {
                div = document.createElement("div");
                div1 = document.createElement("div");
                div.className = "medic";
                div1.className = "overlaymedic";
                para = document.createElement("p");
                para.className = "descriere";
                mybr = document.createElement("br");
                elem = document.createElement("img");
                elem.setAttribute("src", obj[i].url);
                para.appendChild(elem);
                para.appendChild(mybr);
                iddoctor = document.createElement("B");
                iddoctor.innerHTML = '#' + obj[i].id + ' ';
                para.appendChild(iddoctor);
                mybr = document.createElement("br");
                numedoctor = document.createElement("B");
                numedoctor.innerHTML = obj[i].nume;
                para.appendChild(numedoctor);
                mybr = document.createElement("br");
                para.appendChild(mybr);
                mybr = document.createElement("br");
                para.appendChild(mybr);
                titludoctor = document.createElement("B");
                titludoctor.innerHTML = obj[i].titlu;
                para.appendChild(titludoctor);
                div.appendChild(para);
                para = document.createElement("p");
                aemail = document.createElement("a");
                aemail.href = "mailto:" + obj[i].email;
                elem = document.createElement("img");
                elem.setAttribute("src", "poze/email.png");
                aemail.appendChild(elem);
                para.appendChild(aemail);
                div1.appendChild(para);
                div.appendChild(div1);
                document.getElementsByClassName("medici")[0].appendChild(div);
				medici.push(obj[i]);


            }
        } else {
            console.log('The request failed!');
        }
    };
    xhr.open("GET", 'http://localhost:3000/users', true);
    xhr.send();

}

GetItems();