// initialisation du socket
var socket = io.connect();

socket.on('news', function (data) {
    console.log(data.message);
});

if (localStorage.getItem("StLaQuestion") == null) {
    var LaQuestion = 0;
    localStorage.setItem("StLaQuestion", LaQuestion);
} else if (localStorage.getItem("StLaQuestion") == 10) {
    localStorage.clear();
    var LaQuestion = 0;
    localStorage.setItem("StLaQuestion", LaQuestion);
} else {
    var LaQuestion = localStorage.getItem("StLaQuestion");
}
var courses;
var Btn1 = document.getElementById('BTN1');
var Btn2 = document.getElementById('BTN2');
var Btn3 = document.getElementById('BTN3');
var Btn4 = document.getElementById('BTN4');

for (var i = 0; i < 10; i++) {
    var e = i + 1;
    var Para = "P"+ e;
    if (localStorage.getItem(Para) == null) {
        var smiley = '<i class="material-icons">sentiment_neutral</i>';
        localStorage.setItem(Para, smiley);
    } else {
        var smiley = localStorage.getItem(Para);
    }
    var nB = i + 1;
    var Para1 = document.createElement('p');
    Para1.innerHTML = nB + " : " + smiley;
    Para1.className = "valign-wrapper col s4 m3 l2";
    document.getElementById("lesP").appendChild(Para1);
}





    var Questions = new XMLHttpRequest();
    Questions.open('GET', 'http://localhost:3000/question.json');
    Questions.onreadystatechange = Truc;
    Questions.send(null);

    function Truc() {
        if (Questions.readyState === 4) {
            courses = JSON.parse(Questions.responseText);
            Btn1.innerHTML = courses.Questions[LaQuestion].Reponse1;
            Btn2.innerHTML = courses.Questions[LaQuestion].Reponse2;
            Btn3.innerHTML = courses.Questions[LaQuestion].Reponse3;
            Btn4.innerHTML = courses.Questions[LaQuestion].Reponse4;


        }
    }

    var player;

    function onYouTubeIframeAPIReady() {
        player = new YT.Player('video-placeholder', {
            width: 600,
            height: 400,
            videoId: courses.Questions[LaQuestion].Question,
            playerVars: {
                color: 'white',
                autoplay: 1,
                autohide: 1,
                controls: 0,
                rel: 0,
                showinfo: 0,
                iv_load_policy: 3,
                start: courses.Questions[LaQuestion].Start,
                end: courses.Questions[LaQuestion].End
            },
            events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange
            }
        });
    }
function onPlayerReady(event) {
    event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(Pause, courses.Questions[LaQuestion].Pause);
        done = true;
    }
}

    function Pause() {
        player.pauseVideo();
    }

    function initialize() {

        // Update the controls on load
        updateTimerDisplay();
        updateProgressBar();

        // Clear any old interval.
        clearInterval(time_update_interval);

        // Start interval to update elapsed time display and
        // the elapsed part of the progress bar every second.
        time_update_interval = setInterval(function () {
            updateTimerDisplay();
            updateProgressBar();
        }, 1000)
    }
function Rafraichir() {
    document.location.reload(true);
}

    /*switch (Btn) {
        case "Btn1":
            Btn = Btn1;
            break;
        case "Btn2":
            Btn = Btn2;
            break;
        case "Btn3":
            Btn = Btn3;
            break;
        case "Btn4":
            Btn = Btn4;
            break;
        default:
            alert("Probleme");
    }*//*
for (var i = 0; i < 5; i++) {
    var Btn = document.getElementsByTagName('a')[i];
    Btn.addEventListener("click", () => {
        console.log(this.id);
        if (this.id == courses.Questions[LaQuestion].Valid) {
            alert(this.id);
            /*var Nb = LaQuestion + 1;
            var p = document.getElementsByTagName('p')[LaQuestion];
            p.innerHTML = Nb + " : <i class=\"material-icons icovert\">mood</i>";
            ++LaQuestion;
            localStorage.setItem("StLaQuestion", LaQuestion);
            var StP = "P" + LaQuestion;
            localStorage.setItem(StP, "<i class=\"material-icons icovert\">mood</i>");
            player.playVideo();
            setTimeout(Rafraichir, courses.Questions[LaQuestion].Fin);
        } else {
            alert(this.id);
            var Nb = LaQuestion + 1;
            var p = document.getElementsByTagName('p')[LaQuestion];
            p.innerHTML = Nb + " : <i class=\"material-icons icorouge\">mood_bad</i>";
            ++LaQuestion;
            localStorage.setItem("StLaQuestion", LaQuestion);
            var StP = "P" + LaQuestion;
            localStorage.setItem(StP, "<i class=\"material-icons icorouge\">mood_bad</i>");
            player.playVideo();
            setTimeout(Rafraichir, courses.Questions[LaQuestion].Fin);
        }
    });

}*/


for (var i = 0; i < 5; i++) {
    var toto = document.getElementsByTagName('a')[i];
    (function(i){
        toto.addEventListener("click", function() {
            if (this.id == courses.Questions[LaQuestion].Valid) {
                var Nb = LaQuestion + 1;
                var p = document.getElementsByTagName('p')[LaQuestion];
                p.innerHTML = "<i class=\"material-icons icovert\">mood</i>";
                ++LaQuestion;
                localStorage.setItem("StLaQuestion", LaQuestion);
                var StP = "P" + LaQuestion;
                localStorage.setItem(StP, "<i class=\"material-icons icovert\">mood</i>");
                player.playVideo();
                setTimeout(Rafraichir, courses.Questions[LaQuestion].Fin);
                console.log('LED Color : ' +this.value);
                socket.emit('led:color',{color : "#00FF00"});
                selectCouleur.options[0].selected=true;
                event.preventDefault(); //évite l'action par défaut.
                event.stopPropagation(); // stoppe la propagation de l'événement.
            } else {
                var Nb = LaQuestion + 1;
                var p = document.getElementsByTagName('p')[LaQuestion];
                p.innerHTML = "<i class=\"material-icons icorouge\">mood_bad</i>";
                ++LaQuestion;
                localStorage.setItem("StLaQuestion", LaQuestion);
                var StP = "P" + LaQuestion;
                localStorage.setItem(StP, "<i class=\"material-icons icorouge\">mood_bad</i>");
                player.playVideo();
                setTimeout(Rafraichir, courses.Questions[LaQuestion].Fin);
                console.log('LED Color : ' +this.value);
                socket.emit('led:color',{color : "#FF0000"});
                selectCouleur.options[0].selected=true;
                event.preventDefault(); //évite l'action par défaut.
                event.stopPropagation(); // stoppe la propagation de l'événement.
            }
        });
    })(i)
}
/*boutonOn = document.getElementsByTagName('a')[1];
boutonOn.addEventListener('click',function(event){
    console.log('LED ON');
    socket.emit('led:on');
    boutonOn.disabled=true;
    boutonOff.disabled=false;
    inputCouleur.disabled=false;
    selectCouleur.disabled=false;
    boutonOff.focus();
    event.preventDefault(); //évite l'action par défaut.
    event.stopPropagation(); // stoppe la propagation de l'événement.
});
//Évément du boutonOff
boutonOff = document.getElementsByTagName('a')[2];
boutonOff.addEventListener('click',function(event){
    console.log('LED OFF');
    socket.emit('led:off');
    boutonOff.disabled=true;
    boutonOn.disabled=false;
    inputCouleur.disabled=true;
    selectCouleur.disabled=true;
    boutonOn.focus();
    event.preventDefault(); //évite l'action par défaut.
    event.stopPropagation(); // stoppe la propagation de l'événement.
});*/