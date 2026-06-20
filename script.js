//localStorage.clear();

var demoaccount = false;

const Moneycontent = document.getElementById("contMoney1");

var lastUser = "";

if(!localStorage.getItem("lastUser")){

    location.href = "Inscription.html";

}else{

    lastUser = JSON.parse(localStorage.getItem("lastUser"));

}

if(!localStorage.getItem("isdemoAccount")){

    /*/////// INITIALISATION /*//////

    localStorage.setItem("isdemoAccount", JSON.stringify(demoaccount));

}else{

    demoaccount = JSON.parse(localStorage.getItem("isdemoAccount"));

}



const Num = ["651884649", "658136305"];

var actifXtiques = {



    debut: new Date(),

    fin: new Date(),

    value: 0.00,

    currvalue: 0.00,

    percentProfit: 0.00

};



let demoacc = {

    sold : 0.00,

    listeActifs : [],

    statActif : [],

    numAccount: "",

    ListTransac : [],

    Account : {

        email: "",

        Num: 123,

        password: ""

    }

};

var Realacc = {

    sold : 0,

    listeActifs : [],

    statActif : [],

    numAccount: "",

    ListTransac : [],

    

};









/*/////////////////// GESTION DES MENU DES NOTIFICATION AVEC UN ENTIER ///////////////////*/

let numMenu = 0;

let confirmDeposite = false;

/*/////////////////// GESTION DU TYPE DU DASHBOARD  /////////////////////*/

document.getElementById("BtnDeonect").addEventListener("click", async ()  =>{

    var Bl = confirm("voulez-vous Deconnecter la session ?.");

    if(Bl === true){

        await sleep(2000);

        localStorage.removeItem("lastUser");

        location.reload();

    }

});

const BtnDemo = document.getElementById("demoBtn");

const BtnsAcc = Array.from(BtnDemo.children);

const CaptionAccount = BtnDemo.parentElement.children[0];



const InputNum = document.getElementById("number");

const InputIDTransac = document.getElementById("IDdetransaction");

const BtnTransac = Array.from(document.getElementById("numaccoutn").parentElement.children[1].children);



const windowsNotif = document.getElementById("windows");

const bodyNotif = windowsNotif.children[0].children[1].children[1];

const BtnValidNotif = Array.from(windowsNotif.children[0].children[2].children);

const BtnMObileMoney = Array.from(windowsNotif.children[1].children[2].children[0].children[0].children);

const BodyDescrip = windowsNotif.children[1].children[1].children[1];////////////

const XtiqueMoney = Array.from(windowsNotif.children[1].children[2].children[0].children);

const parrainBtn = document.getElementById("parrainBtn");



const putInvest = document.getElementById("PutInvestment");

const TableInvests = Array.from(document.getElementsByClassName("plan"));

const inputvalueInvest = putInvest.children[2].children[0].children[1].children[1];

const vaidInvest = Array.from(document.getElementById("validateInvest").children);

const TruthMoney = document.getElementById("CurrMoney");



const windowsConfirm = windowsNotif.children[0];

const windowsDeposite = windowsNotif.children[1];

const SectDeposite = windowsDeposite.children[2].children;



const BtnValidDeposite = Array.from(windowsDeposite.children[3].children);



const depositeValue = document.getElementById("inputDeposite");



const BodyTransac = Array.from(document.getElementsByClassName("space"))[1];



var BtnCopy = document.getElementById("BtnCopy");





/////////////////////// CHARGEMENTS DES DONNEE DE LA SESSION DERNIERE /////////////////

if(localStorage.getItem("DemoSet"+lastUser)){

   demoacc = JSON.parse(localStorage.getItem("DemoSet"+lastUser));

   InputNum.value = demoacc.Account.Num;

   document.getElementById("numaccoutn").children[0].textContent = "Compte N°"+demoacc.numAccount;

   InputNum.parentElement.children[2].addEventListener("click", async () =>{

    let newVal = InputNum.value;

    demoacc.Account.Num = newVal;

    localStorage.setItem("DemoSet"+lastUser, JSON.stringify(demoacc));

    InputNum.value = "value is saved ✅";

    await sleep(1500);

    InputNum.value = newVal;

   })

}

const linksBtn = Array.from(document.getElementById("links").children);

linksBtn.forEach( B =>  {

    B.addEventListener("click",async () => {

        if(linksBtn.indexOf(B) === 1){

            location.href = "https://signal.group/#CjQKIEqgSMIyU1Nlej91yZgKxq85SAVVf_8JutzRD4xpAcFtEhA0lt4_xXpIvWs1rQYITHzk";

        }else{

                        windowsConfirm.style.display = "block";

                        putInvest.style.display = "none";

                        windowsDeposite.style.display = "none";



                        windowsNotif.style.pointerEvents = "all";

                        windowsNotif.style.opacity = "1";

                        windowsNotif.style.transform = "scale(1)";

                        bodyNotif.innerHTML = "<b><i>Information : </i></b>patienter...";

                        await sleep(1000);

                        bodyNotif.innerHTML = "<b><i>Information : </i></b>Re-Fetch => HostBuild...";

                        await sleep(3000);

                        bodyNotif.innerHTML = "<b><i>Information : </i></b>🔴Error: #38<br>la liscense n'a pas éte renouveler <br> vous pouvez toujours nous contacter par WhatsApp si jamais le service par Email ne reponds pas!";

                        numMenu = 1;

        }

    })



});

    InitTransact();

    

var Index = 0;

const hours = [11, 1, 10, 17, 27, 5, 3, 18, 15, 47, 30, 17, 10, 24, 3];

TableInvests.forEach(B =>{

    

    B.children[2].addEventListener("click", ()=>{

        Index = TableInvests.indexOf(B);

        putInvest.children[0].textContent = "offre N°" + (Index+1);

        putInvest.children[1].children[0].children[1].textContent = B.children[1].children[0].children[0].textContent;

        putInvest.children[1].children[1].children[1].textContent = B.children[1].children[1].children[0].textContent;

        putInvest.children[1].children[2].children[1].textContent = hours[Index] + " Heur(s)";

        putInvest.children[2].children[1].children[0].textContent = "Gain ("+B.children[0].textContent+")";



        inputvalueInvest.value = 0;

        let percent = Number.parseFloat(B.children[0].textContent), Dur = (Number.parseFloat(putInvest.children[1].children[2].children[1].textContent) * 60 *60 *1000);

        demoacc.statActif[Index].percentProfit = percent;

        demoacc.statActif[Index].duration = Dur;

        

        putInvest.children[2].children[1].children[1].textContent = "XAF 0.00";

        putInvest.children[2].children[2].children[1].textContent = "XAF 0.00";



        windowsConfirm.style.display = "none";

        putInvest.style.display = "flex";

        windowsDeposite.style.display = "none";

        windowsNotif.style.pointerEvents = "all";

        windowsNotif.style.opacity = "1";

        windowsNotif.style.transform = "scale(1)";

    });

});

vaidInvest.forEach(el => {

    el.addEventListener("click", async ()=>{

        var Index1 = vaidInvest.indexOf(el);

        if(Index1 === 0){

            if(Number.parseFloat(inputvalueInvest.value) < (demoaccount === true? demoacc.sold : Realacc.sold)){

                if(confirmDeposite === false){

                    windowsConfirm.style.display = "none";

                    putInvest.style.display = "flex";

                     windowsDeposite.style.display = "none";



                    windowsNotif.style.pointerEvents = "all";

                    windowsNotif.style.opacity = "0";

                    windowsNotif.style.transform = "scale(5)";

                    await sleep(2000);

                    numMenu = 4;

                    bodyNotif.innerHTML = "<b><i>Information : </i></b>avant de continuer, rassurez-vous que vous ayez choisit la meilleure offre selon vos besoins car, apres avoir cliquez sur <b>valider</b> l'offre vous ne pourrais plus <b>faire machine arriere</b><br>bien évidement si vous rentrer puis cliquez sur <b>Rejetter</b>, vous annulez toute <b>Souscription</b>";

                    windowsConfirm.style.display = "block";

                    putInvest.style.display = "none";

                    windowsDeposite.style.display = "none";



                    windowsNotif.style.pointerEvents = "all";

                    windowsNotif.style.opacity = "1";

                    windowsNotif.style.transform = "scale(1)";



                }else{/////////////////////// terminer l'achat et consideration de la valeur ///////

                    windowsNotif.style.pointerEvents = "none";

                    windowsNotif.style.opacity = "0";

                    windowsNotif.style.transform = "scale(5)";

                    confirmDeposite = false;



                    demoacc.sold -= Number.parseFloat(inputvalueInvest.value);

                    

                    SetTransaction(true, new Date(), Number.parseFloat(inputvalueInvest.value), demoacc.sold);

                    demoacc.statActif[Index].debut = new Date(); 

                    demoacc.statActif[Index].value = Number.parseFloat(inputvalueInvest.value);

                    demoacc.listeActifs.push(Index);

                    demoacc.listeActifs[demoacc.listeActifs.length-1] = Index;

                    

                    localStorage.setItem("DemoSet"+lastUser, JSON.stringify(demoacc));///////////////////// SAUVEGARDE DES ITEMS DE LA SESSION ////////////

                }

            }else{

                windowsNotif.style.pointerEvents = "all";

                windowsNotif.style.opacity = "0";

                windowsNotif.style.transform = "scale(5)";

                await sleep(500);

                windowsNotif.style.pointerEvents = "all";

                windowsNotif.style.opacity = "1";

                windowsNotif.style.transform = "scale(1)";

                bodyNotif.innerHTML ="<b><i>Information : </i></b> ⚠️inpossible, votre solde est plus petit ou bien égale à la valeur sasit"; 



                windowsConfirm.style.display = "block";

                putInvest.style.display = "none";

                windowsDeposite.style.display = "none";

                numMenu = 5;

            }

        }else{

            windowsConfirm.style.display = "none";

            putInvest.style.display = "flex";

            windowsDeposite.style.display = "none";

            windowsNotif.style.pointerEvents = "none";

            windowsNotif.style.opacity = "0";

            windowsNotif.style.transform = "scale(5)";

        }



    });

});

////////////////////// changer de type de compte //////////////////////////



    BtnsAcc.forEach(A => {



            const V = ["Demo", "Reel"];

            const I = BtnsAcc.indexOf(A);

            if(demoaccount && I === 0 || !demoaccount && I === 1){

                return;

            }

        A.addEventListener("click", async ()=> {

            var isDemo = confirm("desirez vous passez en mode: "+V[I]);

            if(isDemo){

                demoaccount = I == 0? true : false;

                localStorage.setItem("isdemoAccount", demoaccount);



                if(I == 0){

                    A.style.backgroundColor = "rgb(123, 255, 0)";

                    A.style.border = "none";



                    BtnsAcc[1].style.backgroundColor = "transparent";

                    BtnsAcc[1].style.border = "2px solid rgba(255, 187, 0, 1)";



                    CaptionAccount.innerHTML = 'Compte  <span style="font-size: 30px; color: green; margin: 0 10px 0 10px;">Demo</span><img style="width: 30px;" src="image/validate.webp" alt=""><span style="font-size: 30px; justify-self: center; margin: 0 0 0 25px;">&#9660;</span>';

                    



                }else{

                    A.style.backgroundColor = "rgb(123, 255, 0)";

                    A.style.border = "none";



                    BtnsAcc[0].style.border = "2px solid rgba(255, 187, 0, 1)";

                    BtnsAcc[0].style.backgroundColor = "transparent";



                    CaptionAccount.innerHTML = 'Compte  <span style="font-size: 30px; color: green; margin: 0 10px 0 10px;">Reel</span><img style="width: 30px;" src="image/validate.webp" alt=""><span style="font-size: 30px; justify-self: center; margin: 0 0 0 25px;">&#9660;</span>';

                    



                }

                await sleep(500);

                windowsConfirm.style.display = "block";

                windowsDeposite.style.display = "none";

                putInvest.style.display = "none";

                windowsNotif.style.pointerEvents = "all";

                windowsNotif.style.opacity = "1";

                windowsNotif.style.transform = "scale(1)";



                bodyNotif.innerHTML = "vous ete en compte "+V[I];



                await sleep(1500);

                windowsConfirm.style.display = "block";

                windowsDeposite.style.display = "none";

                putInvest.style.display = "none";

                windowsNotif.style.pointerEvents = "none";

                windowsNotif.style.opacity = "0";

                windowsNotif.style.transform = "scale(5)";

                await sleep(1000);

                location.reload();

            }

        })



});

    if(demoaccount){

        BtnsAcc[0].style.backgroundColor = "rgb(123, 255, 0)";

        BtnsAcc[0].style.border = "none";

        BtnsAcc[1].style.backgroundColor = "transparent";

        BtnsAcc[1].style.border = "2px solid rgba(255, 187, 0, 1)";



        CaptionAccount.innerHTML = 'Compte  <span style="font-size: 30px; color: green; margin: 0 10px 0 10px;">Demo</span><img style="width: 30px;" src="image/validate.webp" alt=""><span style="font-size: 30px; justify-self: center; margin: 0 0 0 25px;">&#9660;</span>';

        Moneycontent.textContent = "XAF "+ new Intl.NumberFormat('en-US',{

        minimumFractionDigits: 2,

             minimumFractionDigits: 2

        }).format(demoacc.sold);

        

    }

    if(demoaccount === false){

        BtnsAcc[1].backgroundColor = "rgb(123, 255, 0)";

        BtnsAcc[1].border = "none";

        BtnsAcc[0].style.backgroundColor = "transparent";

        BtnsAcc[0].style.border = "2px solid rgba(255, 187, 0, 1)";

        



        CaptionAccount.innerHTML = 'Compte  <span style="font-size: 30px; color: green; margin: 0 10px 0 10px;">Reel</span><img style="width: 30px;" src="image/validate.webp" alt=""><span style="font-size: 30px; justify-self: center; margin: 0 0 0 25px;">&#9660;</span>';

        Moneycontent.textContent = "XAF "+ new Intl.NumberFormat('en-US',{

        minimumFractionDigits: 2,

             minimumFractionDigits: 2

        }).format(Realacc.sold);

    }

    ////////////////// Changer d'operateur de retrait ////////////////////////

    var MTN = true;

    BtnMObileMoney.forEach(B => {

        var Index = BtnMObileMoney.indexOf(B);

        B.addEventListener("click", () => {

            if(Index === 0){

                BtnMObileMoney[0].style.backgroundColor = "rgb(123, 255, 0)";

                BtnMObileMoney[0].style.border = "none";

                BtnMObileMoney[0].style.color = "black";



                BtnMObileMoney[1].style.backgroundColor = "transparent";

                BtnMObileMoney[1].style.border = "2px solid aliceblue";

                BtnMObileMoney[1].style.color = "white";

                MTN = true;



                XtiqueMoney[1].innerHTML = '<span>Noms :</span><span style="font-size: 18px; letter-spacing: 2px; text-transform: uppercase;">ULRICH GABIN TCHINDA TCHADJUI';

                XtiqueMoney[2].innerHTML = '<span>Numero (🇨🇲) :</span><span><span style="font-size: 20px;">'+Num[MTN=== true? 0:1]+'</span><span>Copier</span></span>';

                //XtiqueMoney[3].innerHTML = '<span>⚠️Important</span><input type="tel" name="" placeholder="ID Transaction" id="IDdetransaction">';



                

                BtnCopy = document.getElementById("BtnCopy");



            }else{

                BtnMObileMoney[1].style.backgroundColor = "rgb(123, 255, 0)";

                BtnMObileMoney[1].style.border = "none";

                BtnMObileMoney[1].style.color = "black";



                BtnMObileMoney[0].style.backgroundColor = "transparent";

                BtnMObileMoney[0].style.border = "2px solid aliceblue";

                BtnMObileMoney[0].style.color = "white";

                MTN = false;



                XtiqueMoney[1].innerHTML = '<span>Noms :</span><span style="font-size: 18px; letter-spacing: 2px; text-transform: uppercase;">DZENE MADZEFOA';

                XtiqueMoney[2].innerHTML = '<span>Numero (🇨🇲) :</span><span><span style="font-size: 20px;">'+Num[MTN=== true? 0:1]+'</span><span>Copier</span></span>';

                //XtiqueMoney[3].innerHTML = '<span>⚠️Important</span><input type="tel" name="" placeholder="ID Transaction" id="IDdetransaction">';

                

                

                BtnCopy = document.getElementById("BtnCopy");

            }

                if(navigator.clipboard){

                    

                    navigator.clipboard.writeText(Num[MTN=== true? 0:1]);

                }else{

                    alert("echec de la copy");

                }



        })

    })

    BtnCopy.addEventListener("click", ()=>{

        if(navigator.clipboard){

            

            navigator.clipboard.writeText(Num[MTN=== true? 0:1]);

        }else{

            alert("echec de la copy");

        }

    });

    //////////////////  INPUT NUMERO TELEPHONE //////////////////

InputNum.addEventListener("input", ()=> {

    InputNum.value = InputNum.value.replace(/[^0-9+]/g, '');

});

InputIDTransac.addEventListener("input", ()=> {

    InputIDTransac.value = InputIDTransac.value.replace(/[^0-9+]/g, '');

});

inputvalueInvest.addEventListener("input", ()=> {

    inputvalueInvest.value = inputvalueInvest.value.replace(/[^0-9+]/g, '');



    let perc = demoacc.statActif[Index].percentProfit/ (100+0.0);

    putInvest.children[2].children[1].children[1].textContent = "XAF "+new Intl.NumberFormat('en-US', {minimumFractionDigits: 2,minimumFractionDigits: 2}).format(inputvalueInvest.value*perc); // gain

    putInvest.children[2].children[2].children[1].textContent = "XAF "+new Intl.NumberFormat('en-US', {minimumFractionDigits: 2,minimumFractionDigits: 2}).format(inputvalueInvest.value*(1+perc)); // total profit + valeur

});

    ////////////////// DEPOT/RETRAIT ////////////////////////////

    BtnTransac.forEach(B => {

        B.addEventListener("click", ()=>{

            var Index = BtnTransac.indexOf(B);

            windowsConfirm.style.display = "block";

            putInvest.style.display = "none";

            windowsDeposite.style.display = "none";

            windowsNotif.style.pointerEvents = "all";

            windowsNotif.style.opacity = "1";

            windowsNotif.style.transform = "scale(1)";

            if(Index === 0){

                numMenu = 0;/*/////// depot ///*/

                bodyNotif.innerHTML = demoaccount?"<b><i>Information : </i></b> vous êtes actuelement en mode DEMO et vous désirez augmenter des fonds à"+

                "votre solde <br> Cependant, il y'a de notez que l'argent investie ou bien incrementer à votre solde est <b>Purement VIRTUEL</b> <br>et ne sera en aucun cas soumis à des transactions autres que les <b>Investissements</b> sur la plateforme et ne peut être soumis à des transactions de retrait. <br>du fait que vous soyez en <b>Mode DEMO</b>":"<b><i>informations :</i></b> du fait que l'état du compte soit actif et de plus en mode <b>Reel</b>, <br>il est facile et rapide d'augmenter les fonds sur votre compte afin de continuer à utiliser notre plateforme";



            }else{

                

                

                if(demoaccount){

                    

                    if(demoacc.sold >= 2000){

                        bodyNotif.innerHTML = "<b><i>Information : </i></b> desolé mais il est Impossible de <b>retirer</b> des fonds d'un compte <b>DEMO<}, 12)
