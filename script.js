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
                        bodyNotif.innerHTML = "<b><i>Information : </i></b> desolé mais il est Impossible de <b>retirer</b> des fonds d'un compte <b>DEMO</b><br><br>📍<b><i>Les Fonds </i></b> provenant d'un <b>compte DEMO</b> sont purement Virtuel et de ce fait, <br>ne peut en aucun cas être rétirer sur vortre Compte d'argent Mobile!!<br>Cependant, vous pouvez effectuer une <b>REGRESSION</b de votre Sold de maniere à vous émmerger dans le mode<br><br><b><i>voullez-vous procédez à une regression ?</i></b>";
                        numMenu = 2;
                    }else{
                        numMenu = 1;
                        bodyNotif.innerHTML = "<b><i>Information : </i></b> un sold DEMO doit être superieur à XAF 2000, pour éffectuer une regression!!";
                    }
                }else{
                    numMenu = 1;
                    if(Realacc.sold >= 2000){

                    }else{
                        bodyNotif.innerHTML = "<b><i>Information : </i></b> un sold REEL doit être superieur à XAF 2000, pour éffectuer un retrait sur votre compte d'argent mobile!!";
                    }
                }
            }
        })
    })

    BtnValidNotif[0].addEventListener("click", async ()=>{
        if(numMenu === 0){
            // ouverture de la fenetre de depot
            windowsNotif.style.pointerEvents = "all";
            windowsNotif.style.opacity = "0";
            windowsNotif.style.transform = "scale(5)";
            await sleep(500);
            windowsConfirm.style.display = "none";
            windowsDeposite.style.display = "block";
            putInvest.style.display = "none";

            SectDeposite[demoaccount? 1 : 0].style.display = "flex";
            SectDeposite[demoaccount? 0 : 1].style.display = "none";
            SectDeposite[2].textContent = demoaccount? "min = XAF 700.00,        max = XAF 1,000,000,000.00" : "min = XAF 1,999.00,        max = XAF 800,000.00" 
            windowsNotif.style.opacity = "1";
            windowsNotif.style.transform = "scale(1)";

            BodyDescrip.innerHTML = demoaccount?"<div>💠 saisir la somme à incrementer sur votre compte DEMO.</div><br><div>💠 <b><i>Remarque : </i></b> vous pouvez effectuer des grandes transaction sur votre comtpe DEMO, mais afin de respecter les Standard de la realité(Compte REEL), des limites ont été mise en place !! de même que sur votre solde.</div><br><div>💠 l'argent ajouter sur votre compte DEMO ne peut être rétirer sur votre COMPTE d'argent Mobile!!, il ne sert qu'a vous montrer l'étendus de notre plateforme.</div>":"<div>💠 faire un depôt est facile et très rapide il suffit juste de faire le transfert de votre compte d'argent mobile vers les adresses ci-dessous et puis saisir l'ID de transaction et nous n'envoyer par Courrier.</div><br><div>💠 il est inutile de faire un depôt pour votre compte sans au prealable envoyer l'ID de la transaction par le bias ci-dessous.</div><br><div>💠 un message peut interrompre le processus si le montant saisit ne respecte pas nos standard sur le Depôt(min et max).</div>"
        }else if(numMenu === 1){
            // sortir de la fenetre de depot apres l'avoir effectuer
            windowsNotif.style.pointerEvents = "none";
            windowsNotif.style.opacity = "0";
            windowsNotif.style.transform = "scale(5)";
        }else if(numMenu === 2){
            windowsNotif.style.pointerEvents = "all";
            windowsNotif.style.opacity = "0";
            windowsNotif.style.transform = "scale(5)";
            await sleep(1000);
            windowsConfirm.style.display = "none";
            windowsDeposite.style.display = "block";
            putInvest.style.display = "none";

            windowsNotif.style.pointerEvents = "all";
            windowsNotif.style.opacity = "1";
            windowsNotif.style.transform = "scale(1)";

            SectDeposite[demoaccount? 1 : 0].style.display = "flex";
            SectDeposite[demoaccount? 0 : 1].style.display = "none";
            SectDeposite[2].textContent = "min = XAF 2,000.00,        max = XAF 50,000,000.00";
            numMenu = 3;
        }else if(numMenu === 4){
            windowsNotif.style.pointerEvents = "all";
            windowsNotif.style.opacity = "0";
            windowsNotif.style.transform = "scale(5)";
            await sleep(2000);
            windowsNotif.style.pointerEvents = "all";
            windowsNotif.style.opacity = "1";
            windowsNotif.style.transform = "scale(1)";
            numMenu = 0;
            confirmDeposite = true;
            windowsConfirm.style.display = "none";
            windowsDeposite.style.display = "none";
            putInvest.style.display = "flex";
        }else if(numMenu === 5){
            windowsConfirm.style.display = "none";
            putInvest.style.display = "flex";
            windowsDeposite.style.display = "none";
            numMenu = 0;
        }

    });
    BtnValidNotif[1].addEventListener("click", async ()=>{
        windowsNotif.style.pointerEvents = "none";
        windowsNotif.style.opacity = "0";
        windowsNotif.style.transform = "scale(5)";
        if(numMenu === 0){
            depositeValue.value = null;
        }
    });
    BtnValidDeposite.forEach( B =>  {
        var Index = BtnValidDeposite.indexOf(B);
        B.addEventListener("click",async ()=>{
            if(Index === 0){
                if(demoaccount){
                    if((numMenu === 3 && depositeValue.value >= 2000 && depositeValue.value <= 50000000) || (numMenu != 3 && depositeValue.value >= 700 && depositeValue.value <= 1000000000)){
                        windowsNotif.style.pointerEvents = "all";
                        windowsNotif.style.opacity = "0";
                        windowsNotif.style.transform = "scale(5)";

                        await sleep(4000);
                        windowsNotif.style.pointerEvents = "none";
                        demoacc.sold += (numMenu != 3 && depositeValue.value >= 700 && depositeValue.value <= 1000000000)? Number.parseFloat(depositeValue.value) : -Number.parseInt(depositeValue.value);
                        demoacc.sold = clamp(demoacc.sold, 0, 10000000000);
                        SetTransaction((numMenu != 3 && depositeValue.value >= 700 && depositeValue.value <= 1000000000)?false:true, new Date(), depositeValue.value, demoacc.sold);
                        ///////////////////// SAUVEGARDE DES ITEMS DE LA SESSION ////////////
                        Moneycontent.textContent = "XAF "+puttNumberToFormat(demoacc.sold, 2);
                        depositeValue.value = null;
                    }else{
                        numMenu = numMenu === 3? 2 :0;
                        bodyNotif.innerHTML = "<b><i>Information :</i></b> pour un compte <b>DEMO</b>, il est important de saisir le montant, <br>tout en respectant les limites initier par la <b>Plateform</b><br> Cependant nous vous Promettons d'améliorer nos Standard afin de toujours vous satisfaire.";
                        windowsNotif.style.pointerEvents = "all";
                        windowsNotif.style.opacity = "0";
                        windowsNotif.style.transform = "scale(5)";
                        await sleep(500);
                        windowsNotif.style.pointerEvents = "all";
                        windowsNotif.style.opacity = "1";
                        windowsNotif.style.transform = "scale(1)";

                        windowsConfirm.style.display = "block";
                        windowsDeposite.style.display = "none";
                        putInvest.style.display = "none";
                    }
                    
                }else{
                    if(InputIDTransac.value >= 10){
                        if(confirmDeposite === false){
                            windowsNotif.style.pointerEvents = "all";
                            windowsNotif.style.opacity = "1";
                            windowsNotif.style.transform = "scale(1)";

                            windowsConfirm.style.display = "block";
                            windowsDeposite.style.display = "none";
                            putInvest.style.display = "none";
                            bodyNotif.innerHTML = "⚠️⚠️ <b><i><h3>Information :</h3></i></b> Avant de continuer ?, Rassurer-vous d'avoir :<br> saisit l'ID exact de la Transaction, <br> sinon votre demande de depôt ne sera jamais validé !!";

                            confirmDeposite = true;
                        }else{
                            windowsNotif.style.pointerEvents = "all";
                            windowsNotif.style.opacity = "0";
                            windowsNotif.style.transform = "scale(5)";
                            await sleep(4500);
                            windowsNotif.style.pointerEvents = "all";
                            windowsNotif.style.opacity = "1";
                            windowsNotif.style.transform = "scale(1)";

                            windowsConfirm.style.display = "block";
                            putInvest.style.display = "none";
                            windowsDeposite.style.display = "none";
                            bodyNotif.innerHTML = "✅ demande de depôt bien envoyer, vous serez Créditer d'ici quelques instant.<br>le temps de verifier la Transaction côté serveur✔️✔️";
                            confirmDeposite = false;
                            numMenu = 1;
                        }
                    }else{
                            windowsNotif.style.pointerEvents = "all";
                            windowsNotif.style.opacity = "1";
                            windowsNotif.style.transform = "scale(1)";

                            windowsConfirm.style.display = "block";
                            putInvest.style.display = "none";
                            windowsDeposite.style.display = "none";
                            bodyNotif.innerHTML = "<b>Erreur #025</b>⁉️<br> l'ID de Transaction semble avoir un format incorrect";
                    }

                }
            }else{
                windowsNotif.style.pointerEvents = "none";
                windowsNotif.style.opacity = "0";
                windowsNotif.style.transform = "scale(5)";
                depositeValue.value = null;
            }
        })

    })
/*/////////////////// gestion de parrainage ///////////////////*/
var cont = document.getElementById("ParrLink");
parrainBtn.addEventListener("click", ()=>{
    cont.style.display = cont.style.display === "none"? "flex" : "none";
    cont.children[0].textContent = window.location.href;
});
cont.children[1].addEventListener("click", ()=>{
    if(navigator.clipboard.writeText){
        navigator.clipboard.writeText(cont.children[0].textContent);
        alert("texte copier dans le presse papier");
    }else{
        alert("Impossible d'effectuer la copie de texte");
    }
});
/*///////////////////  GESTION DES MENUS DU SITE WEB /////////*/
const nav = document.getElementById("NavBar1"), nav1 = document.getElementById("NavBar");
const navs = Array.from(nav.children), navs1 = Array.from(nav1.children);
const menu = Array.from(document.getElementsByName("menu"));

for(let i = 0; i < navs.length; i++){
    navs[i].addEventListener("click", () =>{
        deasableMenu(i);
    });

    navs1[i].addEventListener("click", () => {
        deasableMenu(i);
    });
}
deasableMenu(0);
function deasableMenu(index){
    for (let i  = 0; i < menu.length; i++) {
        if(index != i){
            menu[i].style.display = "none";
        }else{
            menu[i].style.display = "flex";
        }
        
    }
}


/*////////////////// async operation /////////////////////////////////////*/
function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}
function clamp(val, min, max){
    return Math.max(min, Math.min(max, val));
}
function retNum(b){
    return Num[b === true? 0 : 1]; 
}
function puttNumberToFormat(num, digit){
    return new Intl.NumberFormat('en-US',{
        minimumFractionDigits: digit,
        minimumFractionDigits: digit
    }).format(num);
}

function SetTransaction(retrait1, date1, amount, newSold)
{
    BodyTransac.innerHTML = "<h1>Relever de Transaction</h1>";

    if(demoacc.ListTransac.length == 16){
        demoacc.ListTransac.splice(0);
    }
    demoacc.ListTransac.push({
        retrait: retrait1,
        date: date1,
        montant: amount,
        Sold: newSold,
    })
    let ListT = demoaccount === true? demoacc.ListTransac : Realacc.ListTransac;
    
    if(ListT.length > 0){
        for(let i = ListT.length-1; i >= 0; i--){
            console.log(i)
            BodyTransac.innerHTML += ('<div style="border: 2px solid '+(ListT[i].retrait === true?'red':'green')+';" class="TransactContent" id="TransactContent">'+
                        '<div><span>'+(ListT[i].retrait === true?'Retrait':'Depot')+'</span><span>'+new Date(ListT[i].date).toUTCString()+'</span></div>'+
                        '<div><div><span>Montant Transaction</span><span>Nouveau Solde</span></div>'+
                        '<div><span>XAF '+puttNumberToFormat(ListT[i].montant, 2) +'</span><span>XAF '+puttNumberToFormat(ListT[i].Sold, 2) +'</span></div>'+
                        '</div></div>');
        }
    }else{
        BodyTransac.innerHTML += '<div>0  élèment(s)</div>'
    }
    localStorage.setItem("DemoSet"+lastUser, JSON.stringify(demoacc));
}
function InitTransact(){
    
    BodyTransac.innerHTML = "<h1>Relever de Transaction</h1>";
    if(demoacc.ListTransac.length == 16){
        demoacc.ListTransac.splice(0);
    }
    let ListT = demoaccount === true? demoacc.ListTransac : Realacc.ListTransac;
    if(ListT.length > 0){
        for(let i = demoacc.ListTransac.length-1; i >= 0; i--){
            console.log(ListT.length);
            BodyTransac.innerHTML += ('<div style="border: 2px solid '+(ListT[i].retrait === true?'red':'green')+';" class="TransactContent" id="TransactContent">'+
                        '<div><span>'+(ListT[i].retrait === true?'Retrait':'Depot')+'</span><span>'+new Date(ListT[i].date).toUTCString() +'</span></div>'+
                        '<div><div><span>Montant Transaction</span><span>Nouveau Solde</span></div>'+
                        '<div><span>XAF '+puttNumberToFormat(ListT[i].montant, 2) +'</span><span>XAF '+puttNumberToFormat(ListT[i].Sold, 2) +'</span></div>'+
                        '</div></div>');
        }
    }else{
        BodyTransac.innerHTML += '<div>0  élèment(s)</div>'
    }
}

var TProfits = 0;
setInterval(() =>{
    demoacc.sold = clamp(demoacc.sold, 0, 10000000000);
    TruthMoney.textContent = "XAF "+ puttNumberToFormat(demoaccount === true? (demoacc.sold + TProfits) : Realacc.sold, 7);
    Moneycontent.textContent = "XAF "+puttNumberToFormat(demoaccount === true? demoacc.sold : Realacc.sold, 2);
}, 3000);

setInterval(() =>{
    ///////////////// comptabilisation de l'argent du joueur en fonction des actifs en cours ///////////////////
    if(demoaccount){
        TProfits = 0;
        for(let i = 0; i < TableInvests.length; i++){

            if(demoacc.listeActifs.includes(i)){
                let statis = demoacc.statActif[i];
                statis.debut = new Date(statis.debut);

                // calcule du rapport + valeur en temps reel
                let Durree = statis.duration;
                let now = new Date();
                let elapsed = now - statis.debut;
                let ratio = elapsed / Durree;
                ratio = clamp(ratio, 0, 1);
                var num = statis.value*(1+statis.percentProfit/100) * ratio;

                TProfits += num;
                if(ratio >= 1){
                    demoacc.sold += num;
                    demoacc.listeActifs.splice(demoacc.listeActifs.indexOf(i));
                    SetTransaction(false, new Date(), num, demoacc.sold);
                }
                
                TableInvests[i].children[1].children[3].innerHTML = 'status: <span>En Cours...</span> <img src="image/denied.webp" >'
                TableInvests[i].children[1].children[4].innerHTML = puttNumberToFormat(num, 7) + "<span>XAF</span>";
                TableInvests[i].children[2].innerHTML = "SALE ("+puttNumberToFormat((ratio*100), 3)+" %)";
                TableInvests[i].children[2].style.backgroundColor = "red";
                TableInvests[i].children[2].style.cursor = "progress";
                TableInvests[i].children[2].style.pointerEvents = "none";
            }else{
                TableInvests[i].children[1].children[3].innerHTML = 'status: <span>Disponible</span> <img src="image/validate.webp" alt="">'
                TableInvests[i].children[1].children[4].innerHTML = puttNumberToFormat(0, 7) + "<span>XAF</span>";
                TableInvests[i].children[2].innerHTML = "Investir ?";
                TableInvests[i].children[2].style.backgroundColor = "#FFB300";
                TableInvests[i].children[2].style.cursor = "pointer";
                TableInvests[i].children[2].style.pointerEvents = "all";
            }

            
        }
        TruthMoney.textContent = "XAF "+ puttNumberToFormat(demoaccount === true? (demoacc.sold + TProfits) : Realacc.sold, 7);
       
    } TruthMoney.style.backgroundColor = demoaccount === true? "orange" : "blue";

}, 12)