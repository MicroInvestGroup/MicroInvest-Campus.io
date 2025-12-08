let Notifs = [];

var demoacc0 = {
    sold : 0.00,
    listeActifs : [],
    statActif : [
        {
            debut: new Date(),
            duration : 0.00,
            value: 0.00,
            percentProfit: 0.0,
        }
    ],
    numAccount: "",
    ListTransac : [],
    Account : {
        email: "",
        Num: 123,
    }
};
var lastUser = "";
const BodyNotif = document.getElementById("BodyNotif");
/*/////////////////// page inscription ////////////////////////*/
const BodyInscr = document.getElementById("Inscription");
const inputEmail = BodyInscr.children[1];
const inputNum = BodyInscr.children[2];
const inputPassWord = BodyInscr.children[3];
    BodyInscr.children[2].addEventListener("input", ()=>{
        BodyInscr.children[2].value = BodyInscr.children[2].value.replace(/[^0-9+]/g, '');
    });

    const ValidateBtn = BodyInscr.children[5];
    const regexEmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/, regexPassWord = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{7,}$/, regexNum = /^68/;
    ValidateBtn.addEventListener("click", async () => {
        
        if(regexEmail.test(inputEmail.value)){         // email verification //
            if(inputNum.value){          // Number verification //
                if(localStorage.getItem("DemoSet"+inputEmail.value.trim())){
                    var demoacc1 = JSON.parse(localStorage.getItem("DemoSet"+inputEmail.value.trim()));
                    if(inputNum.value.trim() == demoacc1.Account.Num){
                       var Bl =  confirm("voulez-vous connectez la session No: "+demoacc1.numAccount);
                       if(Bl === true){
                            demoacc0 = JSON.parse(localStorage.getItem("DemoSet"+inputEmail.value.trim()));
                            localStorage.setItem("DemoSet"+demoacc0.Account.email, JSON.stringify(demoacc0));
                            lastUser = demoacc0.Account.email;
                            localStorage.setItem("lastUser", JSON.stringify(lastUser));
                            location.href = "index.html";
                        }
                            
                    }else{
                        Notifs.push(
                            "numero de télèphone incorrect, <br> veuillez renseignez un numéro de télèphone correct afin de vous connecter."
                        )
                    }
                }else{
                        // inscription terminer //

                        let numAcc = [Math.floor(Math.random() * (100 - 1)), Math.floor(Math.random() * (10000 - 1))];

                        demoacc0.Account.email = inputEmail.value.trim();
                        demoacc0.Account.Num = inputNum.value.trim();
                        demoacc0.Account.password = inputPassWord.value.trim();
                        demoacc0.numAccount = numAcc[0]+"*****"+numAcc[1];
                        lastUser = demoacc0.Account.email;
                        localStorage.setItem("lastUser", JSON.stringify(lastUser));
                        ////////////////////// buttons investir /////////////////////////
                        for (let index = 0; index < 15; index++) {
                            demoacc0.statActif.push({
                                debut: new Date(),
                                duration: 0.00,
                                value: 0.00,
                                percentProfit: 0.00,
                            });
                        }
                        if(localStorage.getItem("DemoSet"+demoacc0.Account.email)){
                            demoacc0 = JSON.parse(localStorage.getItem("DemoSet"+demoacc0.Account.email));
                            localStorage.setItem("DemoSet"+demoacc0.Account.email, JSON.stringify(demoacc0));
                        }else{
                            localStorage.setItem("DemoSet"+demoacc0.Account.email, JSON.stringify(demoacc0));
                        }
                        Notifs.push(
                            "inscription terminer avec succes, initialisation...."
                        )
                        await sleep(3000);
                        location.href = "index.html";
                }
            }else{
                Notifs.push(
                    "bien vouloir respecter la structure minimale d'un Numero de télèphone !!,<br> le numero saisit n'est pas correct 🔴"
                )
            }
        }else{
                Notifs.push(
                "s'il vous-plaît respecter la structure minimale d'une ardresse Gmail !!,<br> l'adresse sasit est Incorect 🔴")

        }

    });

/*////////////////// fin page inscription ///////////////////////////*/

async function  PushNotif(){
    
    if(Notifs.length > 0){
        BodyNotif.style.transform = "translateX(0%)";
        BodyNotif.children[1].innerHTML = Notifs[0];
        await sleep(5000);
        BodyNotif.style.transform = "translateX(100%)";
        Notifs.splice(0);
    }
}

setInterval(() => {
    PushNotif();
}, 500);
function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}