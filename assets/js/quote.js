
    /**Building Type Variables */
    let BType = document.getElementById("building-type");
    let Qone = document.getElementById("number-of-apartments");
    let Qtwo = document.getElementById("number-of-floors");
    let Qthree = document.getElementById("number-of-basements");
    let Qfour = document.getElementById("number-of-companies");
    let Qfive = document.getElementById("number-of-elevators");
    let Qsix = document.getElementById("number-of-corporations");
    let Qseven = document.getElementById("number-of-parking-spots");
    let Qeight = document.getElementById("maximum-occupancy");
    let Qnine = document.getElementById("business-hours");

    /**Radio button Variables */
    var stnd = document.getElementById("inpStandard");
    var prem = document.getElementById("inpPremium");
    var exel = document.getElementById("inpExelium");

    /**Stepper Variables */
    var numApt = document.getElementById("inpNumApt");
    var numFloors = document.getElementById("inpNumFloors");
    var numBase = document.getElementById("inpNumBase");
    var numComp = document.getElementById("inpNumComp");
    var cge = document.getElementById("inpCageAmnt");
    var numCorp = document.getElementById("inpNumCorp");
    var numParking = document.getElementById("inpNumParking");
    var maxOccu = document.getElementById("inpMaxOccu");
    var bussHours = document.getElementById("inpBussHours");

    /**Price Fields*/
    var elvAmnt = document.getElementById("finalElvAmnt");
    var elvPrice = document.getElementById("elvPrice");
    var elvTotalPrice = document.getElementById("elvTPrice");
    var elvinstallFee = document.getElementById("installFee");
    var elvfinalPrice = document.getElementById("finalPrice");

    /**Variables for calculations */
    var fee = 0;
    var standardFee = .1;
    var premiumFee = .13;
    var exeliumFee = .16;

    //residential
    var res1 = numApt.value / numFloors.value; 
    var res2 = Math.round(res1 / 6);

    //commercial / hybrid
    var totalNumOccu = maxOccu * numFloors;
    var elvsNeeded = totalNumOccu / 1000;
    var columnsNeeded = numFloors + numBase;
    var finalColumnsNeeded = columnsNeeded / 20;
    var elvsPerColumn = elvsNeeded / finalColumnsNeeded;
    var totalElvsNeeded = elvsPerColumn * finalColumnsNeeded;

    //currency formatter
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    function showHideOptions() {

        if(BType.value == 1) {
            Qone.style.display = 'block';
            Qtwo.style.display = 'block';
            Qthree.style.display = 'block';
            Qfour.style.display = 'none';
            Qfive.style.display = 'none';
            Qsix.style.display = 'none';
            Qseven.style.display = 'none';
            Qeight.style.display = 'none';
            Qnine.style.display = 'none';
        }

        else if (BType.value == 2) {
            Qfour.style.display = 'block';
            Qtwo.style.display = 'block';
            Qthree.style.display = 'block';
            Qseven.style.display = 'block';
            Qfive.style.display = 'block';
            Qone.style.display = 'none';
            Qsix.style.display = 'none';
            Qeight.style.display = 'none';
            Qnine.style.display = 'none';
        }

        else if (BType.value == 3) {
            Qsix.style.display = 'block';
            Qtwo.style.display = 'block';
            Qthree.style.display = 'block';
            Qseven.style.display = 'block';
            Qeight.style.display = 'block';
            Qone.style.display = 'none';
            Qfour.style.display = 'none';
            Qfive.style.display = 'none';
            Qnine.style.display = 'none';
        }

        else if (BType.value == 4) {
            Qtwo.style.display = 'block';
            Qfour.style.display = 'block';
            Qthree.style.display = 'block';
            Qseven.style.display = 'block';
            Qnine.style.display = 'block';
            Qeight.style.display = 'block';
            Qone.style.display = 'none';
            Qfive.style.display = 'none';
            Qsix.style.display = 'none';
        }
    }


    /**Residential elevator shafts needed */
	function planSelect() {

        if (stnd.checked == true) {
            elvPrice.value = "7565";
            console.log("Standard")
        }
        else if (prem.checked == true) {
            elvPrice.value = "12345";
            console.log("Premium")
        }
        else if (exel.checked == true) {
            elvPrice.value = "15400";
            console.log("Excelium")
        }
		
        totalPrice()
        installationFee()
        finalPrice ()

       formatAll ()
	}
    
    /**Elevators needed */
    function cagesNeeded() {

        //residential
        res1 = numApt.value / numFloors.value; 
        res2 = Math.round(res1 / 6); 

        //corporate/hybrid
        totalNumOccu = maxOccu * numFloors;
        elvsNeeded = totalNumOccu / 1000;
        columnsNeeded = numFloors + numBase;
        finalColumnsNeeded = columnsNeeded / 20;
        elvsPerColumn = elvsNeeded / finalColumnsNeeded;
        totalElvsNeeded = elvsPerColumn * finalColumnsNeeded;

        //Amount of Elevators needed
        //commercial
        if (BType.value == 2) {
            elvAmnt.value = cge.value;
            console.log(elvAmnt.value);
        }
        //residential
        else if (BType.value == 1) {
            elvAmnt.value = res2;
            console.log("res elvAmnt:", elvAmnt.value);
        } 
        //corporate / hybrid
        else if (BType.value == 3 || 4) {
            elvAmnt.value = Math.round(totalElvsNeeded);
        }

    } 

    function totalPrice() {
        elvAmnt;
        elvPrice;

        elvTotalPrice.value = (elvAmnt.value * elvPrice.value);

        console.log("total price:", elvTotalPrice.value);
    }

    function installationFee() {
        fee;
        standardFee;
        premiumFee;
        exeliumFee
        
        if (BType.value == 1) {
            fee = (standardFee * Number(elvTotalPrice.value));
            console.log ("fee vairables:", fee);
        }
        //residential
        else if (BType.value == 2) {
            fee = (premiumFee * elvTotalPrice.value);
        } 
        //corporate / hybrid
        else if (BType.value == 3) {
            fee = (exeliumFee * elvTotalPrice.value);
        }
        elvinstallFee.value = fee;
        console.log("fee's are:" , fee);
    }

    function finalPrice () {
        elvfinalPrice.value = Number(elvTotalPrice.value) + Number(elvinstallFee.value);
        console.log(elvTotalPrice.value, elvinstallFee.value)
    }

    function formatAll () {
        formatter;
        elvTotalPrice;
        elvPrice;
        elvinstallFee;
        elvfinalPrice;

        elvTotalPrice.value = formatter.format(elvTotalPrice.value);
        elvPrice.value = formatter.format(elvPrice.value);
        elvinstallFee.value = formatter.format(elvinstallFee.value);
        elvfinalPrice.value = formatter.format(elvfinalPrice.value);
    }
    
