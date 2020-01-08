/*jshint esversion: 6 */


var nume = document.getElementsByName('runame')[0];
var pw = document.getElementsByName('rpsw')[0];
var pwrepeat = document.getElementsByName('rpsw-repeat')[0];

// storing input from register-form
function store() {
    if (pwrepeat.value == pw.value) {

        var xhr = new XMLHttpRequest();
        xhr.onload = function() {

            if (xhr.status >= 200 && xhr.status < 300) {} else {
                console.log('The request failed!');
            }
        };
        xhr.open('POST', 'http://localhost:3000/users', true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send("nume=" + nume.value + "&parola=" + pw.value + "&email=" + document.getElementById('remail').value + "&url=" + document.getElementById('rsrc').value + "&titlu=" + document.getElementById('titlu').value);
        // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        localStorage.setItem('uname', nume.value);
        localStorage.setItem('psw', pw.value);

        Swal.fire({
            icon: 'success',
            title: 'Succes!',
            text: 'User inregistrat cu succes!'
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Parolele nu coincid!'
        });
    }
    return false;
}

function schimba() {
    var xhr = new XMLHttpRequest();
    var i, obj;
    xhr.onload = function() {

        if (xhr.status >= 200 && xhr.status < 300) {
            obj = JSON.parse(xhr.response);
            var email = document.getElementById('schimbamail').value;
            for (i = 0; i < obj.length; i++) {
                if (email == obj[i].email) {
                    var password = document.getElementById('schimbaparola').value;
                    obj[i].parola = password;
                    xhr = new XMLHttpRequest();
                    xhr.onload = function() {

                        if (xhr.readyState == 4 && xhr.status == "200") { 
							Swal.fire({
								icon: 'success',
								title: 'Succes!',
								text: 'Parola schimbata cu succes!'
							});
						} 
						else {

                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Parolele nu coincid!'
                            });
                        } 
                    };
                    i++;
                    xhr.open('PUT', 'http://localhost:3000/users/' + i, true);
                    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                    i--;
                    xhr.send(JSON.stringify(obj[i]));
                    break;
                }
            }
        } else {

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Parolele nu coincid!'
            });
        }
    };

    xhr.open('GET', 'http://localhost:3000/users', true);
    xhr.send();
    return false;
}

function stergemedic() {
    var xhr = new XMLHttpRequest();

    xhr.onload = function() {
        if (xhr.readyState == 4 && xhr.status == "200") {
            let timerInterval;
            Swal.fire({
                icon: 'success',
                title: 'Succes!',
                html: 'Medic sters cu succes!',
                timer: 2000,
                timerProgressBar: true,
                onBeforeOpen: () => {
                    Swal.showLoading();
                    timerInterval = setInterval(() => {
                        Swal.getContent().querySelector('b')
                            .textContent = Swal.getTimerLeft();
                    }, 100);
                },
                onClose: () => {
                    clearInterval(timerInterval);
                    window.location.reload();
                }
            }).then((result) => {
                if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.timer
                ) {
                    console.log('I was closed by the timer'); // eslint-disable-line
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ceva nu a mers bine!'
            });
        }
    };
    xhr.open("DELETE", 'http://localhost:3000/users/' + document.getElementById('nrmedic').value, true);
    xhr.send();

    return false;
}

function setari() {
    localStorage.setItem('fontsize', document.getElementById('fontInput').value);
    localStorage.setItem('bgcolor', document.getElementById('colorInput').value);
    fonload();
}


function fonload() {
    var fontsize = localStorage.getItem('fontsize');

    var bgcolor = localStorage.getItem('bgcolor');
    if (fontsize != 'undefined' && bgcolor != 'undefined') {
        document.body.style.backgroundColor = bgcolor;
        document.body.style.fontSize = fontsize + 'px';
    }
    var username = localStorage.getItem('userlogat');
    if (username !== null) {
        document.getElementById('loginnav').innerHTML = 'Bun venit ' + username;
    }

}
$('#sterge').click(function() {
    localStorage.clear();
    window.location.reload();
});

$('#stergemedici').click(function() {

    var modal = document.getElementById('id05');
    modal.style.display = 'block';
});
// check if stored data from register-form is equal to entered data in the   login-form
function check() {


    var xhr = new XMLHttpRequest();
    xhr.onload = function() {

        if (xhr.status >= 200 && xhr.status < 300) {
            var obj = JSON.parse(xhr.response);
            var i;
            // entered data from the login-form
            var userName = document.getElementsByName('uname')[0];
            var userPw = document.getElementsByName('psw')[0];
            var ok = 0;
            for (i = 0; i < obj.length; i++) {
                if (userName.value == obj[i].email && userPw.value == obj[i].parola) {
                    localStorage.setItem('userlogat', obj[i].nume);
                    console.log(i);
                    ok = 1;
                    let timerInterval;
                    Swal.fire({
                        icon: 'success',
                        title: 'Succes!',
                        html: 'Te-ai logat cu succes!',
                        timer: 2000,
                        timerProgressBar: true,
                        onBeforeOpen: () => {
                            Swal.showLoading();
                            timerInterval = setInterval(() => {
                                Swal.getContent().querySelector('b')
                                    .textContent = Swal.getTimerLeft();
                            }, 100);
                        },
                        onClose: () => {
                            clearInterval(timerInterval);
                            window.location.reload();
                        }
                    }).then((result) => {
                        if (
                            /* Read more about handling dismissals below */
                            result.dismiss === Swal.DismissReason.timer
                        ) {
                            console.log('I was closed by the timer'); // eslint-disable-line
                        }
                    });
                    break;
                }
            }
            if (ok === 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Username si parola gresite!'
                });
            }
        } else {
            console.log('The request failed!');
        }
    };
    xhr.open('GET', 'http://localhost:3000/users', true);
    xhr.send();
    return false;
}


function newaccount() {
    var modal = document.getElementById('id01');
    modal.style.display = "none";
    modal = document.getElementById('id02');
    modal.style.display = 'block';
    return false;
}

function forgotpassword() {
    var modal = document.getElementById('id01');
    modal.style.display = "none";
    modal = document.getElementById('id04');
    modal.style.display = 'block';
    return false;
}



window.onclick = function(event) {
	
	var modal1 = document.getElementById('id01');
	var modal2 = document.getElementById('id02');
	var modal3 = document.getElementById('id03');
	var modal4 = document.getElementById('id04');
	var modal5 = document.getElementById('id05');
	var modal6 = document.getElementById('id06');
    if (event.target == modal1) {
        modal1.style.display = "none";
    }
    if (event.target == modal2) {
        modal2.style.display = "none";
    }
    if (event.target == modal3) {
        modal3.style.display = "none";
    }
    if (event.target == modal4) {
        modal4.style.display = "none";
    }
    if (event.target == modal5) {
        modal5.style.display = "none";
    }
    if (event.target == modal6) {
        modal6.style.display = "none";
    }
};


function updateTextInput(val) {
    document.getElementById('textInput').value = val;
}



var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
$('#rspw').keyup(function() {
    if (strongRegex.test(pw.value)) {
        pw.style.backgroundColor = "green";
    } else if (mediumRegex.test(pw.value)) {
        pw.style.backgroundColor = "yellow";
    } else {
        pw.style.backgroundColor = "red";
    }
});
$('#rspwr').keyup(function() {
    if (pw.value != pwrepeat.value) {
        document.getElementById("raspuns").innerHTML = "✗   Parolele nu coincid!";
        document.getElementById("raspuns").style.color = "red";
    } else {
        document.getElementById("raspuns").innerHTML = "";
    }
});


$('form > input, textarea').keyup(function() {

    var empty = false;


    $('input, textarea').each(function() {
        if ($(this).val() === '') {
            empty = true;
        }
    });

    if (empty) {
        $('#sub').attr('disabled', 'disabled');
    } else {
        $('#sub').removeAttr('disabled');
    }
});

$("#id01").submit(function(e) {
    e.preventDefault();
});
$("#id02").submit(function(e) {
    e.preventDefault();
});
$("#id03").submit(function(e) {
    e.preventDefault();
});
$("#id04").submit(function(e) {
    e.preventDefault();
});
$("#id05").submit(function(e) {
    e.preventDefault();
});

$(document).keyup(function(e) {
    if (e.key === "Escape") { // escape key maps to keycode `27`
        document.getElementById('id01').style.display = 'none';
        document.getElementById('id02').style.display = 'none';
        document.getElementById('id03').style.display = 'none';
        document.getElementById('id04').style.display = 'none';
        document.getElementById('id05').style.display = 'none';
        document.getElementById('id06').style.display = 'none';
    }
});


function random_bg_color() {
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    var bgColor = "rgb(" + x + "," + y + "," + z + ")";
    console.log(bgColor);

    document.body.style.backgroundColor = bgColor;
    interval = setTimeout(random_bg_color, 5000);
}

function stop_bg_color() {

    clearInterval(interval);
}

function clicklogare() {
    var username = localStorage.getItem('userlogat');
	if(document.getElementById('loginnav').innerHTML == 'Bun venit ' + username)
	{
		document.getElementById('id06').style.display='block';
	}
	else
	{
		document.getElementById('id01').style.display='block';
	}
}