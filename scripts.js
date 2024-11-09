// python -m http.server

/* Trash code - Need to clean up and add comments and stuff*/
/* When the user clicks on the button, toggle between hiding and showing the dropdown content */

const FILE_NAME = 'weaponData.csv'
const WEAP_NUM_SKIP_LINE = 1;
const ELEM_TABL_COL = 9;   
const STATUS_TABL_COL = 9;
const MATERIA_TABL_COL = 8;
const UNIQUE_TABL_COL = 12;
const MAX_POT_INDEX = 6;   // Index into the maxPot for sorting
let weaponDatabase = [];
function ecSearch() {  document.getElementById("ecDropdown").classList.toggle("show");
    var divToPrint = document.getElementById('Output');                       
    divToPrint.innerHTML = ''
}

/* Create a table to display the result */
function tableCreate(user_row, user_col, list, header) {
    //body reference 
    var body = document.getElementById('Output'); 

    // header
    const h1 = document.createElement("h1"); 
    const textNode = document.createTextNode(header);
    h1.className = "weaponHeader";
    h1.appendChild(textNode);
    body.appendChild(h1);
  
    // create <table> and a <tbody>
    var tbl = document.createElement("table");

    // Different format for each table 
    if (user_col == ELEM_TABL_COL) {
        tbl.className = "elemTable";
    }
    else if (user_col == MATERIA_TABL_COL) {
        tbl.className = "materiaTable";
    }
    else if (user_col == STATUS_TABL_COL) {
        tbl.className = "statusTable";
    }
    else if (user_col == UNIQUE_TABL_COL) {
        tbl.className = "uniqueTable";
    }
    else
    {
        tbl.className = "effectTable";
    }
    var tblBody = document.createElement("tbody");

    // create <tr> and <td>
    for (var j = 0; j < user_row; j++) {
        var row = document.createElement("tr");

        for (var i = 0; i < user_col; i++) {
            var cell;
            if (j == 0) {
                cell = document.createElement("th");
                cell.onclick = function () {
                    sortTable(this);
                };
            }
            else {
                cell = document.createElement("td");
            }
            var cellText;
            cellText = document.createTextNode(list[j][i]);
            cell.appendChild(cellText);
            row.appendChild(cell);
        }

        tblBody.appendChild(row);
    }

    // append the <tbody> inside the <table>
    tbl.appendChild(tblBody);

    // put <table> in the <body>
    body.appendChild(tbl);

    // tbl border attribute to 
    tbl.setAttribute("border", "2");  
}

function sortTable(cell) {
    // Grab the table node
    var table = cell.parentNode.parentNode;
    var col = 0;
    var asc = true;
    var swap = true;
    var shouldSwap = false;
    var count = 0;
    var isNumber = false;

    for (var i = 0; i < table.rows[0].cells.length; i++) {
        if (table.rows[0].cells[i].innerHTML == cell.innerHTML) {
            col = i;
            if (cell.innerHTML == "Pot%" || cell.innerHTML == "Max%" || cell.innerHTML == "Duration (s)"
                || cell.innerHTML == "% per ATB") {
                isNumber = true;
            }
        }
    }

    while (swap) {
        swap = false;
        var rows = table.rows;

        // Skip header row
        for (var i = 1; i < (rows.length - 1); i++) {
            shouldSwap = false;
            // get current row and the next row
            var x = rows[i].getElementsByTagName("td")[col];
            var y = rows[i + 1].getElementsByTagName("td")[col];
            var xValue = x, yValue = y;

            if (isNumber) {
                xValue = parseFloat(x.innerHTML);
                yValue = parseFloat(y.innerHTML);
            }
            else {
                xValue = x.innerHTML;
                yValue = y.innerHTML;
            }

            if (asc) {
                // Check if switch based on ascendence 

                if (xValue > yValue) {
                    shouldSwap = true;
                    break;
                }
            }
            else {
                // Check if switch based on descendence 
                if (xValue < yValue) {
                    shouldSwap = true;
                    break;
                }
            }
        }
        if (shouldSwap) {
            // Swap
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            swap = true;
            count++;
        }
        else {
            if (count == 0 && asc) {
                asc = false;
                swap = true;
            }
        }
    }   
                    
}
function readDatabase() {
    if (weaponDatabase[0] != null) {
        return;
    }

    var location = window.location.href;
    var directoryPath = location.substring(0, location.lastIndexOf("/") + 1);
    result = loadFile(directoryPath + FILE_NAME);

    if (result != null) {
        // By lines
        var lines = result.split('\n');

        for (var line = WEAP_NUM_SKIP_LINE; line < lines.length-1; line++) {

            var row = CSVToArray(lines[line], ',');
            var i = 0;
            let weapData = [];
            weapData.push({ name: 'name', value: row[i][0] });
            weapData.push({ name: 'charName', value: row[i][1] });
            weapData.push({ name: 'sigil', value: row[i][2] });
            weapData.push({ name: 'atb', value: row[i][3] });
            weapData.push({ name: 'type', value: row[i][4] });    // dmg type
            weapData.push({ name: 'element', value: row[i][5] });
            weapData.push({ name: 'range', value: row[i][6] });
            weapData.push({ name: 'effect1Target', value: row[i][7] });
            weapData.push({ name: 'effect1', value: row[i][8] });
            weapData.push({ name: 'effect1Pot', value: row[i][9] });
            weapData.push({ name: 'effect1MaxPot', value: row[i][10] });
            weapData.push({ name: 'effect2Target', value: row[i][11] });
            weapData.push({ name: 'effect2', value: row[i][12] });
            weapData.push({ name: 'effect2Pot', value: row[i][13] });
            weapData.push({ name: 'effect2MaxPot', value: row[i][14] });
            var m = 15;
            weapData.push({ name: 'effect3Target', value: row[i][m] }); m++;
            weapData.push({ name: 'effect3', value: row[i][m] }); m++;
            weapData.push({ name: 'effect3Pot', value: row[i][m] }); m++;
            weapData.push({ name: 'effect3MaxPot', value: row[i][m] }); m++;
            weapData.push({ name: 'support1', value: row[i][m] }); m++;
            weapData.push({ name: 'support2', value: row[i][m] }); m++;
            weapData.push({ name: 'support3', value: row[i][m] }); m++;
            weapData.push({ name: 'rAbility1', value: row[i][m] }); m++;
            weapData.push({ name: 'rAbility2', value: row[i][m] }); m++;
            weapData.push({ name: 'potOb10', value: row[i][m] }); m++;
            weapData.push({ name: 'maxPotOb10', value: row[i][m] }); m++;
            weapData.push({ name: 'effect1Dur', value: row[i][m] }); m++;
            weapData.push({ name: 'effect2Dur', value: row[i][m] }); m++;
            weapData.push({ name: 'effect3Dur', value: row[i][m] }); m++;
            weapData.push({ name: 'condition1', value: row[i][m] }); m++;
            weapData.push({ name: 'condition2', value: row[i][m] }); m++;
            weapData.push({ name: 'condition3', value: row[i][m] }); m += 15;
            weapData.push({ name: 'effectRange', value: row[i][m] }); m++;

            if (row[i][m] == 0) {
                weapData.push({ name: 'uses', value: "No Limit" });
            }
            else {
                weapData.push({ name: 'uses', value: row[i][m] });
            }
            m++;

            weaponDatabase.push(weapData);
            console.log(weapData);
        }
    }
}

// Find elements in an array
function findElement(arr, propName, propValue) {
    for (var i = 0; i < arr.length; i++)
        if (arr[i][propName] == propValue)
            return arr[i];
}
function getValueFromDatabaseItem(item, name) {
    var i = findElement(item, "name", name);

    return i["value"];
}
function findWeaponWithProperty(arr, propName, propValue) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].name == propName) {
            if (arr[i].value.indexOf(propValue) >= 0) {
                return true;
            }
        }
    }

    return false;
}

function elementalCompare(a, b) {
    var aItem = parseFloat(a[MAX_POT_INDEX]);
    var bItem = parseFloat(b[MAX_POT_INDEX]);
    if (aItem < bItem) {
        return 1;
    }
    if (aItem > bItem) {
        return -1;
    }
    return 0;
}
function filterFire() {
    printElemWeapon("Fire");
}
function filterIce() {
    printElemWeapon("Ice");
}

function filterLightning() {
    printElemWeapon("Lightning");
}

function filterWater() {
    printElemWeapon("Water");
}

function filterWind() {
    printElemWeapon("Wind");
}

function filterEarth() {
    printElemWeapon("Earth");
}

function filterNonElem() {
    printElemWeapon("None");
}

/* I should clean this up and make only 1 function calling into all of these filters... */
function filterMatkDown() {
    document.getElementById("ecDropdown").classList.toggle("show");

    var header = "Weapon with [Debuff] MATK:";
    printWeaponEffect("[Debuff] MATK", header);
}
function filterPatkDown() {
    document.getElementById("ecDropdown").classList.toggle("show");

    var header = "Weapon with [Debuff] PATK:";
    printWeaponEffect("[Debuff] PATK", header);
}
function filterPdefDown() {
    document.getElementById("ecDropdown").classList.toggle("show");

    var header = "Weapon with [Debuff] PDEF:";
    printWeaponEffect("[Debuff] PDEF", header);
}
function filterMdefDown() {
    document.getElementById("ecDropdown").classList.toggle("show");

    var header = "Weapon with [Debuff] MDEF:";
    printWeaponEffect("[Debuff] MDEF", header);
}

function filterPatkUp() {
    document.getElementById("ecDropdown").classList.toggle("show");

    var header = "Weapon with [Buff] PATK:";
    printWeaponEffect("[Buff] PATK", header);
}
function filterMatkUp() {
    document.getElementById("ecDropdown").classList.toggle("show");

    var header = "Weapon with [Buff] MATK:";
    printWeaponEffect("[Buff] MATK", header);
}

function filterPdefUp() {
    document.getElementById("ecDropdown").classList.toggle("show");

    var header = "Weapon with [Buff] PDEF:";
    printWeaponEffect("[Buff] PDEF", header);
}
function filterMdefUp() {
    document.getElementById("ecDropdown").classList.toggle("show");

    var header = "Weapon with [Buff] MDEF:";
    printWeaponEffect("[Buff] MDEF", header);
}

function filterHeal() {
    document.getElementById("ecDropdown").classList.toggle("show");

    var header = "Non-Regen Healing Weapon (> 25% Potency):";
    printWeaponElem("Heal", header);

    var header = "Regen Healing Weapon:";
    printRegenWeapon(header);

    var header = "Weapon with All (Cure) Materia Slot:";
    printWeaponMateria("All (Cure)", header);
}

function filterCircleSigilMateria() {
    document.getElementById("ecDropdown").classList.toggle("show");

    var header = "Weapon with ◯ Sigil Materia Slot:";
    printWeaponMateria("Circle", header);
}


function filterTriangleSigilMateria() {
    document.getElementById("ecDropdown").classList.toggle("show");

    var header = "Weapon with △ Sigil Materia Slot:";
    printWeaponMateria("Triangle", header);
}

function filterXSigilMateria() {
    document.getElementById("ecDropdown").classList.toggle("show");

    var header = "Weapon with ✕ Sigil Materia Slot:";
    printWeaponMateria("X Sigil", header);
}

function filterDiamondMateria() {
    document.getElementById("ecDropdown").classList.toggle("show");

    var header = "Weapon with ◊ Sigil:";
    printWeaponSigil("Diamond", header);
}

function filterUniqueEffect() {
    document.getElementById("ecDropdown").classList.toggle("show");

    var header = "Weapon Applying Status:";
    printWeaponUniqueEffect("[Status Apply]", header);

    var header = "Weapon Removing Status:";
    printWeaponUniqueEffect("[Status Cleanse]", header);

    header = "Weapon with Dispel Effect:";
    printWeaponUniqueEffect("[Dispel", header);

    header = "Weapon with Haste Effect:";
    printWeaponEffect("Haste", header);

    header = "Weapon with Unique Effect:";
    printWeaponUniqueEffect("[Unique+]", header);
}

function printElemWeapon(elem) {
    document.getElementById("ecDropdown").classList.toggle("show");
    var elemResist, elemEnchant, elemMateria;

    if (elem == "Lightning") {
        elemResist = "[Resist] Thunder"; // For whatever reseaon, Lightning resist is listed as "[Resist] Thunder";
        elemEnchant = "[Enchant] Thunder";
        elemMateria = "Light";
    }
    else {
        elemResist = "[Resist] " + elem;
        elemEnchant = "[Enchant] " + elem;
        elemMateria = elem;
    }

    var header = "Weapon with C-Abilities - " + elem;
    printWeaponElem(elem, header);

    if (elem != "None") {
        header = "Weapon with [Debuff] " + elem + " Resist Down:";
        printWeaponEffect(elemResist, header);

        header = "Weapon with [Buff] " + elem + " Damage Up:";
        printWeaponEffect(elemEnchant, header);

        header = "Weapon with " + elem + " Materia Slot:";
        printWeaponMateria(elemMateria, header);
    }
}

function printWeaponElem(elem, header) {
    readDatabase();
    let elemental;
    if (elem != "Heal") {
        elemental = [["Weapon Name", "Char", "AOE", "Type", "ATB", "Uses", "Pot%", "Max%", "% per ATB", "Condition"]];
    }
    else {
        elemental = [["Weapon Name", "Char", "AOE", "Type", "ATB", "Uses", "Target", "Pot%", "Max%", "% per ATB"]];
    }

    for (var i = 0; i < weaponDatabase.length; i++) {
        var found = findWeaponWithProperty(weaponDatabase[i], 'element', elem);
        if (found) {
            if (elem == "Heal") {
                // Low % heal is not worth it - set threshold at 50
                if (parseInt(getValueFromDatabaseItem(weaponDatabase[i], "potOb10")) < 25)
                    continue;
            }

            // Make a new row and push them into the list
            let row = [];

            row.push(getValueFromDatabaseItem(weaponDatabase[i], "name"));
            row.push(getValueFromDatabaseItem(weaponDatabase[i], "charName"));
            row.push(getValueFromDatabaseItem(weaponDatabase[i], "range"));
            row.push(getValueFromDatabaseItem(weaponDatabase[i], "type"));

            var atb = getValueFromDatabaseItem(weaponDatabase[i], "atb");
            row.push(atb);

            row.push(getValueFromDatabaseItem(weaponDatabase[i], "uses"));

            if (elem == "Heal") {
                row.push(getValueFromDatabaseItem(weaponDatabase[i], "effect1Target"));
            }

            var pot, maxPot;            

            pot = parseInt(getValueFromDatabaseItem(weaponDatabase[i], "potOb10"));
            row.push(pot);

            maxPot = parseInt(getValueFromDatabaseItem(weaponDatabase[i], "maxPotOb10"));
            row.push(maxPot);

            // % per ATB
            if (atb != 0) {
                row.push((maxPot / atb).toFixed(0));
            }
            else {
                row.push(maxPot);
            }

            if (elem != "Heal") {
                // @todo: Need to figure out a good way to deal with this stupid weapon
                if ((maxPot > pot) || (getValueFromDatabaseItem(weaponDatabase[i], "name") == "Bahamut Greatsword")){
                    row.push(getValueFromDatabaseItem(weaponDatabase[i], "condition1"));
                }
                else {
                    row.push("");
                }
            }

            elemental.push(row);
        }

        elemental.sort(elementalCompare);
    }

    tableCreate(elemental.length, elemental[0].length, elemental, header);
}


function printWeaponSigil(sigil, header) {
    readDatabase();
    let materia = [["Weapon Name", "Char", "AOE", "Type", "Elem", "ATB", "Uses", "Pot%", "Max%"]];

    for (var i = 0; i < weaponDatabase.length; i++) {
        if (findWeaponWithProperty(weaponDatabase[i], 'sigil', sigil)) {
            let row = [];
            
            row.push(getValueFromDatabaseItem(weaponDatabase[i], "name"));
            row.push(getValueFromDatabaseItem(weaponDatabase[i], "charName"));
            row.push(getValueFromDatabaseItem(weaponDatabase[i], "range"));
            row.push(getValueFromDatabaseItem(weaponDatabase[i], "type"));
            row.push(getValueFromDatabaseItem(weaponDatabase[i], "element"));
            row.push(getValueFromDatabaseItem(weaponDatabase[i], "atb"));
            row.push(getValueFromDatabaseItem(weaponDatabase[i], "uses"));
            row.push(getValueFromDatabaseItem(weaponDatabase[i], "potOb10"));
            row.push(getValueFromDatabaseItem(weaponDatabase[i], "maxPotOb10"));

            materia.push(row);
        }
    }

    tableCreate(materia.length, materia[0].length, materia, header);
}
function printWeaponMateria(elemMateria, header) {
    readDatabase();
    let materia = [["Weapon Name", "Char", "AOE", "Type", "Elem", "ATB", "Uses", "Pot%", "Max%"]];

    for (var i = 0; i < weaponDatabase.length; i++) {
        if (findWeaponWithProperty(weaponDatabase[i], 'support1', elemMateria) ||
            findWeaponWithProperty(weaponDatabase[i], 'support2', elemMateria) ||
            findWeaponWithProperty(weaponDatabase[i], 'support3', elemMateria)) {

            let row = [];
            row.push(getValueFromDatabaseItem(weaponDatabase[i], "name"));
            row.push(getValueFromDatabaseItem(weaponDatabase[i], "charName"));
            row.push(getValueFromDatabaseItem(weaponDatabase[i], "range"));
            row.push(getValueFromDatabaseItem(weaponDatabase[i], "type"));
            row.push(getValueFromDatabaseItem(weaponDatabase[i], "element"));
            row.push(getValueFromDatabaseItem(weaponDatabase[i], "atb"));
            row.push(getValueFromDatabaseItem(weaponDatabase[i], "uses"));
            row.push(getValueFromDatabaseItem(weaponDatabase[i], "potOb10"));
            row.push(getValueFromDatabaseItem(weaponDatabase[i], "maxPotOb10"));

            materia.push(row);
        }
    }

    tableCreate(materia.length, materia[0].length, materia, header);
}

function printRegenWeapon(header) {
    readDatabase();
    let effect = [["Name", "Char", "AOE", "Type", "ATB", "Uses", "Target", "Duration (s)", "Pot%", "Max%", "% per ATB"]];
    var text = "Regen";

    for (var i = 0; i < weaponDatabase.length; i++) {
        if (findWeaponWithProperty(weaponDatabase[i], 'element', "Heal")) {
            if ((found = findWeaponWithProperty(weaponDatabase[i], 'effect1', text)) || findWeaponWithProperty(weaponDatabase[i], 'effect2', text)) {
                // Make a new row and push them into the list
                let row = [];

                row.push(getValueFromDatabaseItem(weaponDatabase[i], "name"));
                row.push(getValueFromDatabaseItem(weaponDatabase[i], "charName"));
                row.push(getValueFromDatabaseItem(weaponDatabase[i], "effectRange"));
                row.push(getValueFromDatabaseItem(weaponDatabase[i], "type"));

                var atb = getValueFromDatabaseItem(weaponDatabase[i], "atb");
                row.push(atb);

                row.push(getValueFromDatabaseItem(weaponDatabase[i], "uses"));

                var dur, pot, maxPot;

                if (found) {
                    row.push(getValueFromDatabaseItem(weaponDatabase[i], "effect1Target"));

                    dur = parseInt(getValueFromDatabaseItem(weaponDatabase[i], "effect1Dur"));
                    row.push(dur);               
                }
                else {
                    row.push(getValueFromDatabaseItem(weaponDatabase[i], "effect2Target"));

                    dur = parseInt(getValueFromDatabaseItem(weaponDatabase[i], "effect2Dur"));
                    row.push(dur);
                }

                pot = parseInt(getValueFromDatabaseItem(weaponDatabase[i], "potOb10"));
                row.push(pot);
                maxPot = pot;   

                if (dur != 0) {
                    // Regen is 15% per tick every 3s + initial tick for total
                    maxPot = Math.floor(dur / 3) * 15 + pot;
                }
                row.push(maxPot);

                if (atb != 0) {
                    row.push((maxPot / atb).toFixed(0));
                }
                else {
                    row.push(maxPot);
                }

                effect.push(row);
            }
        }
    }

    tableCreate(effect.length, effect[0].length, effect, header);
}

function printWeaponEffect(text, header) {
    readDatabase();
    let effect = [["Name", "Char", "AOE", "Type", "Elem", "ATB", "Uses", "Target", "Pot", "Max Pot", "Duration (s)", "Condition"]];  

    for (var i = 0; i < weaponDatabase.length; i++) {
        if ((found = findWeaponWithProperty(weaponDatabase[i], 'effect1', text)) || (found2 = findWeaponWithProperty(weaponDatabase[i], 'effect2', text))
            || findWeaponWithProperty(weaponDatabase[i], 'effect3', text)) {
            // Make a new row and push them into the list
            let row = [];

            row.push(getValueFromDatabaseItem(weaponDatabase[i], "name"));
            row.push(getValueFromDatabaseItem(weaponDatabase[i], "charName"));
            row.push(getValueFromDatabaseItem(weaponDatabase[i], "effectRange"));
            row.push(getValueFromDatabaseItem(weaponDatabase[i], "type"));
            row.push(getValueFromDatabaseItem(weaponDatabase[i], "element"));
            row.push(getValueFromDatabaseItem(weaponDatabase[i], "atb"));
            row.push(getValueFromDatabaseItem(weaponDatabase[i], "uses"));

            if (found) {
                row.push(getValueFromDatabaseItem(weaponDatabase[i], "effect1Target"));  
                row.push(getValueFromDatabaseItem(weaponDatabase[i], "effect1Pot"));
                row.push(getValueFromDatabaseItem(weaponDatabase[i], "effect1MaxPot"));
                row.push(getValueFromDatabaseItem(weaponDatabase[i], "effect1Dur"));
                row.push(getValueFromDatabaseItem(weaponDatabase[i], "condition1"));
            }
            else if (found2) {
                row.push(getValueFromDatabaseItem(weaponDatabase[i], "effect2Target"));  
                row.push(getValueFromDatabaseItem(weaponDatabase[i], "effect2Pot"));
                row.push(getValueFromDatabaseItem(weaponDatabase[i], "effect2MaxPot"));
                row.push(getValueFromDatabaseItem(weaponDatabase[i], "effect2Dur"));
                row.push(getValueFromDatabaseItem(weaponDatabase[i], "condition2"));
            }
            else {
                row.push(getValueFromDatabaseItem(weaponDatabase[i], "effect3Target"));
                row.push(getValueFromDatabaseItem(weaponDatabase[i], "effect3Pot"));
                row.push(getValueFromDatabaseItem(weaponDatabase[i], "effect3MaxPot"));
                row.push(getValueFromDatabaseItem(weaponDatabase[i], "effect3Dur"));
                row.push(getValueFromDatabaseItem(weaponDatabase[i], "condition3"));
            }

            effect.push(row);
        }
    }

    tableCreate(effect.length, effect[0].length, effect, header);
}

function printWeaponUniqueEffect(text, header) {
    readDatabase();
    let effect = [["Name", "Char", "AOE", "Type", "Elem", "ATB", "Uses", "Target1", "Effect1", "Condition1", "Target2", "Effect2", "Condition2"]];

    for (var i = 0; i < weaponDatabase.length; i++) {
        if ((found = findWeaponWithProperty(weaponDatabase[i], 'effect1', text)) ||
            findWeaponWithProperty(weaponDatabase[i], 'effect2', text)) {
            let row = [];

            row.push(getValueFromDatabaseItem(weaponDatabase[i], "name"));
            row.push(getValueFromDatabaseItem(weaponDatabase[i], "charName"));
            row.push(getValueFromDatabaseItem(weaponDatabase[i], "effectRange"));
            row.push(getValueFromDatabaseItem(weaponDatabase[i], "type"));
            row.push(getValueFromDatabaseItem(weaponDatabase[i], "element"));
            row.push(getValueFromDatabaseItem(weaponDatabase[i], "atb"));
            row.push(getValueFromDatabaseItem(weaponDatabase[i], "uses"));

            row.push(getValueFromDatabaseItem(weaponDatabase[i], "effect1Target"));
            var str = getValueFromDatabaseItem(weaponDatabase[i], "effect1");
            var indexOfFirst = str.indexOf(text);
            if (indexOfFirst >= 0) {
                var newstr = str.substring(indexOfFirst + text.length + 1);
                row.push(newstr);
            }
            else {
                row.push(str);
            }

            row.push(getValueFromDatabaseItem(weaponDatabase[i], "condition1"));

            row.push(getValueFromDatabaseItem(weaponDatabase[i], "effect2Target"));

            var str = getValueFromDatabaseItem(weaponDatabase[i], "effect2");
            var indexOfFirst = str.indexOf(text);
            if (indexOfFirst >= 0) {
                var newstr = str.substring(indexOfFirst + text.length + 1);
                row.push(newstr);
            }
            else {
                row.push(str);
            }

            row.push(getValueFromDatabaseItem(weaponDatabase[i], "condition2"));


            effect.push(row);
        }
    }

    tableCreate(effect.length, effect[0].length, effect, header);
}

// Load file from local server
function loadFile(filePath) {
    var result = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    xmlhttp.send();
    if (xmlhttp.status == 200) {
        result = xmlhttp.responseText;
    }
    return result;
}


// ref: http://stackoverflow.com/a/1293163/2343
// This will parse a delimited string into an array of
// arrays. The default delimiter is the comma, but this
// can be overriden in the second argument.
function CSVToArray( strData, strDelimiter ){
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");
//    console.log(strData);
    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
    (
        // Delimiters.
        "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

        // Quoted fields.
        "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

        // Standard fields.
        "([^\"\\" + strDelimiter + "\\r\\n]*))"
    ),
    "gi"
    );


    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];

    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;


    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec( strData )){

    // Get the delimiter that was found.
    var strMatchedDelimiter = arrMatches[ 1 ];

    // Check to see if the given delimiter has a length
    // (is not the start of string) and if it matches
    // field delimiter. If id does not, then we know
    // that this delimiter is a row delimiter.
    if (
        strMatchedDelimiter.length &&
        strMatchedDelimiter !== strDelimiter
    ){

        // Since we have reached a new row of data,
        // add an empty row to our data array.
        arrData.push( [] );

    }

    var strMatchedValue;

    // Now that we have our delimiter out of the way,
    // let's check to see which kind of value we
    // captured (quoted or unquoted).
    if (arrMatches[ 2 ]){

        // We found a quoted value. When we capture
        // this value, unescape any double quotes.
        strMatchedValue = arrMatches[ 2 ].replace(
        new RegExp( "\"\"", "g" ),
        "\""
        );

    } else {

        // We found a non-quoted value.
        strMatchedValue = arrMatches[ 3 ];

    }


    // Now that we have our value string, let's add
    // it to the data array.
    arrData[ arrData.length - 1 ].push( strMatchedValue );
    }

    // Return the parsed data.
    return( arrData );
}
