window.addEventListener('load', init);

//-----------------------------------------------------------------------//

function Item(name, inventory, baseProduction, production, basePrice, price, marketPrice, description) {
    if (typeof(name) == "string") {
        this.name = name;
    }

    if (Number.isInteger(inventory)) {
        this.inventory = inventory;
    }

    this.baseProduction = baseProduction;

    this.production = production;

    if (Number.isInteger(basePrice)) {
        this.basePrice = basePrice;
    }

    if (Number.isInteger(price)) {
        this.price = price;
    }

    if (Number.isInteger(marketPrice)) {
        this.marketPrice = marketPrice;
    }

    if (typeof(description) == "string") {
        this.description = description;
    }
}

Item.prototype.getButton = function(number) {
    return `<button id="${number}-item-button" class="item-button"
    onclick="buyItem(${number});"
    onmousemove="ShowContent('${number}-item-description'); return true;"
    onmouseover="ShowContent('${number}-item-description'); return true;"
    onmouseout="HideContent('${number}-item-description'); return true;">
    <img id="item-button-image" src="media/items/svg/item-${number}.svg"/>
    <div id="item-inventory-${number}" class="item-inventory">${this.inventory}</div>
    <div id="name">${this.name}</div>
    <div id="price">
    <img class="money-simbol" src="media/other/svg/money.svg"/>
    <p id="price-value-${number}" class="item-price">${formatNumber(this.marketPrice)}</p>
    </div>
    </button>`;
};

Item.prototype.getDescription = function(number) {
    return `<span id="${number}-item-description" class="item-description description">
    <div id="description-container">
    <img id="description-image" src="media/items/svg/item-${number}.svg"/>
    <div id="description-price">
    <img class="money-simbol" src="media/other/svg/money.svg"/>
    <p id="${number}-description-price-value" class="description-price-value">${formatNumber(this.marketPrice)}</p>
    </div>
    <div id="description-name">${this.name}</div>
    <div id="description-owned">[owned:
    <div id="${number}-description-inventory-value" class="description-inventory-value">${this.inventory}</div>
    ]</div>
    <img id="description-separation" src="media/other/svg/description-separation.svg"/>
    ${this.description}
    <img id="description-separation" src="media/other/svg/description-separation.svg"/>
    <div id="description-production">Each ${this.name.toLowerCase()} produces 
    <div id="${number}-description-production-value" class="description-production-value">${formatNumber(this.production)}</div>
     coins per second.</div>
    </div>
    <div id="description-total-production">
    <div id="${number}-description-inventory-production-value" class="description-inventory-production-value">${this.inventory}</div>
     ${this.name.toLowerCase()} producing 
    <div id="${number}-description-total-production-value" class="description-total-production-value">${formatNumber(this.production * this.inventory)}</div>
     coins per second.</div>
    </div>
    </span>`;
};

function Trinket(name, group, inventory, price, unlockCondition, lock, power, description) {
    if (typeof(name) == "string") {
        this.name = name;
    }

    if (typeof(group) == "string") {
        this.group = group;
    }

    if (typeof inventory === "boolean") {
        this.inventory = inventory;
    }

    if (Number.isInteger(price)) {
        this.price = price;
    }

    if (Number.isInteger(unlockCondition)) {
        this.unlockCondition = unlockCondition;
    }

    if (typeof lock === "boolean") {
        this.lock = lock;
    }

    this.power = power

    if (typeof(description) == "string") {
        this.description = description;
    }
}

Trinket.prototype.getButton = function(number) {
    return `<button id="${number}-trinket-button" class="trinket-button invisible-button"
    onclick="buyTrinket(${number});"
    onmousemove="ShowContent('${number}-trinket-description'); return true;"
    onmouseover="ShowContent('${number}-trinket-description'); return true;"
    onmouseout="HideContent('${number}-trinket-description'); return true;">
    <img id="trinket-button-image" src="media/trinkets/svg/trinket-${number}.svg"/>
    <img id="${number}-trinket-owned" class="invisible-owned trinket-owned" src="media/other/svg/owned.svg"/>
    </button>`;
};

Trinket.prototype.getDescription = function(number) {
    return `<span id="${number}-trinket-description" class="trinket-description description">
    <div id="description-container">
    <img id="description-image" src="media/trinkets/svg/trinket-${number}.svg"/>
    <div id="description-price">
    <img class="money-simbol" src="media/other/svg/money.svg"/>
    <p class="description-price-value">${formatNumber(this.price)}</p>
    </div>
    <div id="description-name">${this.name}</div>
    <div id="description-group">[type:
    <div class="description-group-value">${this.group}</div>
    ]</div>
    <img id="description-separation" src="media/other/svg/description-separation.svg"/>
    ${this.description}
    <img id="description-separation" src="media/other/svg/description-separation.svg"/>
    <div id="description-${number}-trinket-owned" class="description-trinket-owned">Click to purchase.</div>
    </div>
    </span>`;
};

function Code(name, inventory, price, description) {
    if (typeof(name) == "string") {
        this.name = name;
    }

    if (typeof inventory === "boolean") {
        this.inventory = inventory;
    }

    if (Number.isInteger(price)) {
        this.price = price;
    }

    if (typeof(description) == "string") {
        this.description = description;
    }
}

Code.prototype.getButton = function(number) {
    let state;
    let codeClass;
    if (this.inventory) {
        state = "set";
        codeClass = "visible-owned code-owned";
    } else {
        state = "buy";
        codeClass = "invisible-owned code-owned";
    }

    return `<button id="${number}-code-button" class="code-button"
    onclick="${state}Code(${number});"
    onmousemove="ShowContent('${number}-code-description'); return true;"
    onmouseover="ShowContent('${number}-code-description'); return true;"
    onmouseout="HideContent('${number}-code-description'); return true;">
    <img id="code-button-image" src="media/codes/svg/code-${number}.svg"/>
    <img id="${number}-code-owned" class="${codeClass}" src="media/other/svg/owned.svg"/>
    </button>`;
};

Code.prototype.getDescription = function(number) {
    let finalText;
    if (this.inventory) {
        finalText = "Click to use this language."
    } else {
        finalText = "Click to purchase."
    }
    
    return `<span id="${number}-code-description" class="code-description description">
    <div id="description-container">
    <img id="description-image" src="media/codes/svg/code-${number}.svg"/>
    <div id="description-price">
    <img class="money-simbol" src="media/other/svg/money.svg"/>
    <p class="description-price-value">${formatNumber(this.price)}</p>
    </div>
    <div id="description-code-name">${this.name}</div>
    <img id="description-separation" src="media/other/svg/description-separation.svg"/>
    ${this.description}
    <img id="description-separation" src="media/other/svg/description-separation.svg"/>
    <div id="description-${number}-code-owned" class="description-code-owned">${finalText}</div>
    </div>
    </span>`;
};

//-----------------------------------------------------------------------//

var items = [
             new Item("Automatic test", 0, 0.1, 0.1, 15, 15, 15,
             "Autotests once every 10 seconds."),
             new Item("Library", 0, 1, 1, 100, 100, 100,
             "Improve your code through libraries that you hardly understand."),
             new Item("Documentation", 0, 8, 8, 1100, 1100, 1100,
             "Who are you kidding? Luckily you have put your name in the code."),
             new Item("IDE", 0, 47, 47, 12000, 12000, 12000,
             "The suit does not make the man, but in this case it helps."),
             new Item("Git repository", 0, 260, 260, 130000, 130000, 130000,
             "Store your code and record your progress."),
             new Item("Screen", 0, 1400, 1400, 1400000, 1400000, 1400000,
             "They are never enough. Or at least I think so..."),
             new Item("Employee", 0, 7800, 7800, 20000000, 20000000, 20000000,
             "They work hard and program for you, what else do you want?"),
             new Item("Software company", 0, 44000, 44000, 330000000, 330000000, 330000000,
             "The beginning of your empire starts here...")
            ];

var trinkets = [
               new Trinket("Reinforced Finger", "Typing", false, 100, 100, true, 2,
               "Type code is twice as efficent."),
               new Trinket("Magic Fingers", "Typing", false, 500, 500, true, 2,
               "Type code is twice as efficent."),
               new Trinket("Alert(\"Error here\")", "Automatic Test", false, 500, 1, true, 2,
               "Automatic tests are twice as efficent."),
               new Trinket("Plastic Library", "Library", false, 1000, 1, true, 2,
               "Libraries are twice as efficent."),
               new Trinket("Console.log(\"F\")", "Automatic Test", false, 2000, 5, true, 2,
               "Automatic tests are twice as efficent."),
               new Trinket("Iron Library", "Library", false, 5000, 5, true, 2,
               "Libraries are twice as efficent."),
               new Trinket("Pianist Fingers", "Typing", false, 10000, 25000, true, 2,
               "Type code is twice as efficent."),
               new Trinket("Plastic Documentation", "Documentation", false, 11000, 1, true, 2,
               "Documentations are twice as efficent.Documentations are twice as efficent."),
               new Trinket("Noob Test", "Automatic Test", false, 20000, 25, true, 2,
               "Automatic tests are twice as efficent."),
               new Trinket("Steel Library", "Library", false, 50000, 25, true, 2,
               "Libraries are twice as efficent."),
               new Trinket("Laptop Keyboard", "Typing Special", false, 50000, 1000, true, 0.01,
               "Typing gains +1% of your total production."),
               new Trinket("Iron Documentation", "Documentation", false, 55000, 5, true, 2,
               "Documentations are twice as efficent."),
               new Trinket("Ambidextrous", "Typing", false, 100000, 500000, true, 0.1,
               "Type code gain +0.1 coins for each item owned."),
               new Trinket("Notepad", "IDE", false, 120000, 1, true, 2,
               "IDEs are twice as efficent."),
               new Trinket("Steel Documentation", "Documentation", false, 550000, 25, true, 2,
               "Documentations are twice as efficent."),
               new Trinket("Sublimetext", "IDE", false, 600000, 5, true, 2,
               "IDEs are twice as efficent."),
               new Trinket("Versions of the code", "Git Repository", false, 1300000, 1, true, 2,
               "Git repositories are twice as efficent."),
               new Trinket("Average Test", "Automatic Test", false, 2000000, 50, true, 2,
               "Automatic tests are twice as efficent."),
               new Trinket("Titanium Library", "Library", false, 5000000, 50, true, 2,
               "Libraries are twice as efficent."),
               new Trinket("Membrane Keyboard", "Typing Special", false, 5000000, 100000, true, 0.01,
               "Typing gains +1% of your total production."),
               new Trinket("Emmet", "IDE", false, 6000000, 25, true, 2,
               "IDEs are twice as efficent."),
               new Trinket("Code Backups", "Git Repository", false, 6500000, 5, true, 2,
               "Git repositories are twice as efficent."),
               new Trinket("Polydactyly", "Typing", false, 10000000, 100000000, true, 5,
               "Multiplies the gain from Ambidextrous by 5."),
               new Trinket("Monochrome Monitor", "Screen", false, 14000000, 1, true, 2,
               "Screens are twice as efficent."),
               new Trinket("Titanium Documentation", "Documentation", false, 55000000, 50, true, 2,
               "Documentations are twice as efficent."),
               new Trinket("Google Drive", "Git Repository", false, 65000000, 25, true, 2,
               "Git repositories are twice as efficent."),
               new Trinket("Color CRT", "Screen", false, 70000000, 5, true, 2,
               "Screens are twice as efficent."),
               new Trinket("Carpal Tunnel Prevention", "Typing", false, 100000000, 1000000000, true, 10,
               "Multiplies the gain from Ambidextrous by 10."),
               new Trinket("Good Test", "Automatic Test", false, 200000000, 100, true, 2,
               "Automatic tests are twice as efficent."),
               new Trinket("Noob Employee", "Employee", false, 200000000, 1, true, 2,
               "Employees are twice as efficent."),
               new Trinket("Adamantium Library", "Library", false, 500000000, 100, true, 2,
               "Libraries are twice as efficent."),
               new Trinket("Mechanical Keyboard", "Typing Special", false, 500000000, 10000000, true, 0.01,
               "Typing gains +1% of your total production."),
               new Trinket("More Plugins", "IDE", false, 600000000, 50, true, 2,
               "IDEs are twice as efficent."),
               new Trinket("Flat TFT", "Screen", false, 700000000, 25, true, 2,
               "Screens are twice as efficent."),
               new Trinket("Shortcut Rookie", "Typing", false, 1000000000, 10000000000, true, 20,
               "Multiplies the gain from Ambidextrous by 20."),
               new Trinket("The \"I know HTML\" guy", "Employee", false, 1000000000, 5, true, 2,
               "Employees are twice as efficent."),
               new Trinket("One Person Company", "Software Company", false, 3300000000, 1, true, 2,
               "Software companies are twice as efficent."),
               new Trinket("Adamantium Documentation", "Documentation", false, 5500000000, 100, true, 2,
               "Documentations are twice as efficent."),
               new Trinket("GitHub", "Git Repository", false, 6500000000, 50, true, 2,
               "Git repositories are twice as efficent."),
               new Trinket("Shortcut Apprentice", "Typing", false, 10000000000, 20000000000, true, 20,
               "Multiplies the gain from Ambidextrous by 20."),
               new Trinket("Multilanguage Knower", "Employee", false, 10000000000, 25, true, 2,
               "Employees are twice as efficent."),
               new Trinket("Garage Company", "Software Company", false, 16500000000, 5, true, 2,
               "Software companies are twice as efficent."),
               new Trinket("TDD", "Automatic Test", false, 20000000000, 150, true, 2,
               "Automatic tests are twice as efficent."),
               new Trinket("Mythril Library", "Library", false, 50000000000, 150, true, 2,
               "Libraries are twice as efficent."),
               new Trinket("PBT Keycaps", "Typing Special", false, 50000000000, 1000000000, true, 0.01,
               "Typing gains +1% of your total production."),
               new Trinket("Visual Studio Code", "IDE", false, 60000000000, 100, true, 2,
               "IDEs are twice as efficent."),
               new Trinket("Wide Aspect Ratio", "Screen", false, 70000000000, 50, true, 2,
               "Screens are twice as efficent."),
               new Trinket("Startup", "Software Company", false, 165000000000, 25, true, 2,
               "Software companies are twice as efficent."),
               new Trinket("Mythril Documentation", "Documentation", false, 550000000000, 150, true, 2,
               "Documentations are twice as efficent."),
               new Trinket("Correct Commits", "Git Repository", false, 650000000000, 100, true, 2,
               "Git repositories are twice as efficent."),
               new Trinket("Junior Engineer", "Employee", false, 1000000000000, 50, true, 2,
               "Employees are twice as efficent."),
               new Trinket("Custom Keyboard", "Typing Special", false, 5000000000000, 100000000000, true, 0.01,
               "Typing gains +1% of your total production."),
               new Trinket("WebStorm", "IDE", false, 6000000000000, 150, true, 2,
               "IDEs are twice as efficent."),
               new Trinket("1080p IPS", "Screen", false, 7000000000000, 100, true, 2,
               "Screens are twice as efficent."),
               new Trinket("Shortcut Master", "Typing", false, 10000000000000, 1000000000000, true, 20,
               "Multiplies the gain from Ambidextrous by 20."),
               new Trinket("Average Company", "Software Company", false, 16500000000000, 50, true, 2,
               "Software companies are twice as efficent."),
               new Trinket("Antibugs Test", "Automatic Test", false, 20000000000000, 200, true, 2,
               "Automatic tests are twice as efficent."),
               new Trinket("Daedric Library", "Library", false, 50000000000000, 200, true, 2,
               "Libraries are twice as efficent."),
               new Trinket("Terminal + Git", "Git Repository", false, 65000000000000, 150, true, 2,
               "Git repositories are twice as efficent."),
               new Trinket("Software Engineer", "Employee", false, 100000000000000, 100, true, 2,
               "Employees are twice as efficent."),
               new Trinket("Lubricated Switches", "Typing Special", false, 500000000000000, 10000000000000, true, 0.01,
               "Typing gains +1% of your total production."),
               new Trinket("Daedric Documentation", "Documentation", false, 550000000000000, 200, true, 2,
               "Documentations are twice as efficent."),
               new Trinket("4K IPS", "Screen", false, 700000000000000, 150, true, 2,
               "Screens are twice as efficent."),
               new Trinket("Silicon Valley", "Software Company", false, 1650000000000000, 100, true, 2,
               "Software companies are twice as efficent."),
               new Trinket("VIM", "IDE", false, 6000000000000000, 200, true, 2,
               "IDEs are twice as efficent."),
               new Trinket("Shortcut Legend", "Typing", false, 10000000000000000, 100000000000000, true, 20,
               "Multiplies the gain from Ambidextrous by 20."),
               new Trinket("Senior Software Enginieer", "Employee", false, 10000000000000000, 150, true, 2,
               "Employees are twice as efficent."),
               new Trinket("Godlike Test", "Automatic Test", false, 20000000000000000, 250, true, 2,
               "Automatic tests are twice as efficent."),
               new Trinket("Optical Switches", "Typing Special", false, 50000000000000000, 1000000000000000, true, 0.01,
               "Typing gains +1% of your total production."),
               new Trinket("Dark Matter Library", "Library", false, 50000000000000000, 250, true, 2,
               "Libraries are twice as efficent."),
               new Trinket("Git Shortcuts", "Git Repository", false, 65000000000000000, 200, true, 2,
               "Git repositories are twice as efficent."),
               new Trinket("Silicon Valley King", "Software Company", false, 165000000000000000, 150, true, 2,
               "Software companies are twice as efficent."),
               new Trinket("Dark Matter Documentation", "Documentation", false, 550000000000000000, 250, true, 2,
               "Documentations are twice as efficent."),
               new Trinket("4K HDR OLED", "Screen", false, 700000000000000000, 200, true, 2,
               "Screens are twice as efficent.")
              ];

var codes = [
             new Code("HTML", true, 0,
             "Easy to use, difficult to master."),
             new Code("CSS", false, 10000,
             "Very funny when you know what you are doing."),
             new Code("JavaScript", false, 1000000,
             "Too much libraries, but not in my code :D")
            ];

var money = 0; //100000000000000000000
var totalProduction = 0;

var moneyFromType = 0;

var currentSentence = "";
var currentCharacter = "";

var characterPosition = 0;
var hitPosition = 0;
var errorPosition = 0;

var userProduction = 1;
var baseUserProduction = 1;
var ambidextrousEffect = 0.1;
var isAmbidextrousOn = false;
var typingSpecialEffect = 0;

var marketMultiplier = 1;
var marketState = "buy";

var buyMultiplierPrice = 1.20;
var sellMultiplierPrice = 0.25;

var codeType = 0;
var codeValue = -1;

//-----------------------------------------------------------------------//

const correctCode = document.getElementById("correct-code");
const incorrectCode = document.getElementById("incorrect-code");
const currentCode = document.getElementById("current-code");

const leftPositionCode = document.getElementById("left-position-code");

const scrollArea = document.getElementById("scroll-area");

const codeInput = document.getElementById("code-input");

const counterDisplay = document.getElementById("counter");
const productionDisplay = document.getElementById("production");

const codesHorizontalGapTitle = document.getElementById("codes-horizontal-gap-title");
const trinketsHorizontalGapTitle = document.getElementById("trinkets-horizontal-gap-title");
const itemsHorizontalGapTitle = document.getElementById("items-horizontal-gap-title");

const buyButton = document.getElementById("buy-button");
const sellButton = document.getElementById("sell-button");

const allMultiplierButton = document.getElementById("market-multiplier-button-all");

const codesButtons = document.getElementById("codes-buttons");
var codeButtons;
const codesDescriptions = document.getElementById("codes-descriptions");
var codeDescriptions;
const trinketsButtons = document.getElementById("trinkets-buttons");
var trinketButtons;
const trinketsDescriptions = document.getElementById("trinkets-descriptions");
var trinketDescriptions;
const itemsButtons = document.getElementById("items-buttons");
var itemButtons;
const itemsDescriptions = document.getElementById("items-descriptions");
var itemDescriptions;

var unlockedTrinkets;

//-----------------------------------------------------------------------//

function showRandomCode(code) {
    characterPosition = 0;
    hitPosition = 0;
    errorPosition = 0;
    scrollArea.scrollLeft = 0;
    scrollArea.scrollTop = 0;

    let randomIndex = 0;
    do {
        randomIndex = Math.floor(Math.random() * code.length);
    } while (codeValue == randomIndex)

    codeValue = randomIndex;

    currentSentence = code[codeValue];

    currentCode.innerHTML = replaceSpecialCharacters(currentSentence);
    currentCharacter = currentSentence.slice(characterPosition, characterPosition+1);
    codeInput.value = "";

    correctCode.innerHTML = "";
    incorrectCode.innerHTML = "";
}

function startMatch() {
    if (matchCharacters()) {
        correctCode.innerHTML = correctCode.innerHTML + replaceSpecialCharacters(currentCharacter);
        currentCode.innerHTML = replaceSpecialCharacters(currentSentence.slice(characterPosition));

        currentCharacter = currentSentence.slice(characterPosition, characterPosition+1);
        if (hitPosition < characterPosition) {
            hitPosition++;
            money += userProduction;
            moneyFromType += userProduction;
        }
    }
    if (matchCode()) {
        setCode(codeType);
    }
}

function matchCharacters() {
    if (codeInput.value.slice(characterPosition, characterPosition+1) === currentCharacter) {
        characterPosition++;

        for (i = 0; i < trinkets.length; i++) {
            if (trinkets[i].lock) {
                switch (trinkets[i].group) {
                    case "Typing":
                        if (moneyFromType >= trinkets[i].unlockCondition) {
                            trinketButtons[i].setAttribute("class", "trinket-button unlocked-button invisible-button");
                            trinkets[i].lock = false;
                        }
                        break
                    case "Automatic Test":
                        if (items[0].inventory >= trinkets[i].unlockCondition) {
                            trinketButtons[i].setAttribute("class", "trinket-button unlocked-button invisible-button");
                            trinkets[i].lock = false;
                        }
                        break
                    case "Library":
                        if (items[1].inventory >= trinkets[i].unlockCondition) {
                            trinketButtons[i].setAttribute("class", "trinket-button unlocked-button invisible-button");
                            trinkets[i].lock = false;
                        }
                        break
                    case "Documentation":
                        if (items[2].inventory >= trinkets[i].unlockCondition) {
                            trinketButtons[i].setAttribute("class", "trinket-button unlocked-button invisible-button");
                            trinkets[i].lock = false;
                        }
                        break
                    case "IDE":
                        if (items[3].inventory >= trinkets[i].unlockCondition) {
                            trinketButtons[i].setAttribute("class", "trinket-button unlocked-button invisible-button");
                            trinkets[i].lock = false;
                        }
                        break
                    case "Git Repository":
                        if (items[4].inventory >= trinkets[i].unlockCondition) {
                            trinketButtons[i].setAttribute("class", "trinket-button unlocked-button invisible-button");
                            trinkets[i].lock = false;
                        }
                        break
                    case "Screen":
                        if (items[5].inventory >= trinkets[i].unlockCondition) {
                            trinketButtons[i].setAttribute("class", "trinket-button unlocked-button invisible-button");
                            trinkets[i].lock = false;
                        }
                        break
                    case "Employee":
                        if (items[6].inventory >= trinkets[i].unlockCondition) {
                            trinketButtons[i].setAttribute("class", "trinket-button unlocked-button invisible-button");
                            trinkets[i].lock = false;
                        }
                        break
                    case "Software Company":
                        if (items[7].inventory >= trinkets[i].unlockCondition) {
                            trinketButtons[i].setAttribute("class", "trinket-button unlocked-button invisible-button");
                            trinkets[i].lock = false;
                        }
                        break
                    case "Typing Special":
                        if (moneyFromType >= trinkets[i].unlockCondition) {
                            trinketButtons[i].setAttribute("class", "trinket-button unlocked-button invisible-button");
                            trinkets[i].lock = false;
                        }
                        break
                }
            }
        }
    
        unlockedTrinkets = document.getElementsByClassName("unlocked-button");
        for (i = 0; i < Math.min(6, unlockedTrinkets.length); i++) {
            unlockedTrinkets[i].setAttribute("class", "trinket-button unlocked-button visible-button");
        }
        for (i = 6; i < unlockedTrinkets.length; i++) {
            unlockedTrinkets[i].setAttribute("class", "trinket-button unlocked-button invisible-button");
        }

        return true;
    } else {
        errorPosition = codeInput.value.length;
        incorrectCode.innerHTML = replaceSpecialCharacters(currentSentence.slice(characterPosition, errorPosition));
        if (characterPosition > codeInput.value.length) {
            characterPosition = codeInput.value.length;
            scrollArea.scrollTop = codeInput.value.length;
            currentCharacter = currentSentence.slice(characterPosition, characterPosition+1);
            correctCode.innerHTML = replaceSpecialCharacters(currentSentence.slice(0, characterPosition));
        }
        currentCode.innerHTML = replaceSpecialCharacters(currentSentence.slice(errorPosition));

        return false;
    }
}

function matchCode() {
    if (hitPosition == currentSentence.length) {
        return true;
    } else {
        return false;
    }
}

//-----------------------------------------------------------------------//

function openCodesMarket() {
    codesHorizontalGapTitle.innerHTML = "Codes";
}

function closeCodesMarket() {
    codesHorizontalGapTitle.innerHTML = "";
}

function openTrinketsMarket() {
    trinketsHorizontalGapTitle.innerHTML = "Trinkets";
    if (unlockedTrinkets != undefined) {
        for (i = 0; i < unlockedTrinkets.length; i++) {
            unlockedTrinkets[i].setAttribute("class", "trinket-button unlocked-button visible-button");
        }
    }
}

function closeTrinketsMarket() {
    trinketsHorizontalGapTitle.innerHTML = "";
    if (unlockedTrinkets != undefined) {
        for (i = 0; i < Math.min(6, unlockedTrinkets.length); i++) {
            unlockedTrinkets[i].setAttribute("class", "trinket-button unlocked-button visible-button");
        }
        for (i = 6; i < unlockedTrinkets.length; i++) {
            unlockedTrinkets[i].setAttribute("class", "trinket-button unlocked-button invisible-button");
        }
    }
}

function openItemsMarket() {
    itemsHorizontalGapTitle.innerHTML = "Items";
}

function closeItemsMarket() {
    itemsHorizontalGapTitle.innerHTML = "";
}

function optionButtonOver(id) {
    document.getElementById(id).style.textShadow =
    "0px 1px 0px #000,0px 0px 1px #fff,0px 0px 4px #fff";
}

function optionButtonOut(id) {
    document.getElementById(id).style.textShadow =
    "none";
}

//-----------------------------------------------------------------------//

function buyCode(code) {
    if (money >= codes[code].price) {
        money -= codes[code].price;
        codes[code].inventory = true;

        codeButtons[code].setAttribute("onclick", `setCode(${code});`);
        document.getElementById("description-" + code + "-code-owned").innerHTML = "Click to use this language.";
        document.getElementById(code + "-code-owned").setAttribute("class", "visible-owned code-owned");
    } else {
        alert("Sorry, but you don't have enought money.");
    }
}

function setCode(code) {
    codeType = code;
    
    switch(true) {
        case (codeType == 0):
            showRandomCode(htmlCode);
            break
        case (codeType == 1):
            showRandomCode(cssCode);
            break
        case (codeType == 2):
            showRandomCode(javascriptCode);
            break
    }
}

function buyTrinket(trinket) {
    if (money >= trinkets[trinket].price) {
        money -= trinkets[trinket].price;
        trinkets[trinket].inventory = true;

        let actualButton;
        for (i = 0; i < trinketButtons.length; i++) {
            if (trinketButtons[i].id == (trinket + "-trinket-button")) {
                actualButton = trinketButtons[i];
            }
        }
        document.getElementById("description-" + trinket + "-trinket-owned").innerHTML = "OWNED";
        document.getElementById(trinket + "-trinket-owned").setAttribute("class", "visible-owned trinket-owned");
        actualButton.setAttribute("onclick", "");
        
        activateTrinketPower(trinket);
    } else {
        alert("Sorry, but you don't have enought money.");
    }
}

function activateTrinketPower(trinket) {
    switch(trinkets[trinket].group) {
        case "Typing":
            switch(true) {
                case (trinkets[trinket].power == 2):
                    baseUserProduction *= 2;
                    userProduction *= 2;
                    break
                case (trinkets[trinket].power == 0.1):
                    isAmbidextrousOn = true;
                    break
                case (trinkets[trinket].power > 2):
                    ambidextrousEffect *= trinkets[trinket].power;
                    break
            }
            break
        case "Typing Special":
            typingSpecialEffect += trinkets[trinket].power;
            break
        case "Automatic Test":
            items[0].production *= trinkets[trinket].power;
            break
        case "Library":
            items[1].production *= trinkets[trinket].power;
            break
        case "Documentation":
            items[2].production *= trinkets[trinket].power;
            break
        case "IDE":
            items[3].production *= trinkets[trinket].power;
            break
        case "Git Repository":
            items[4].production *= trinkets[trinket].power;
            break
        case "Screen":
            items[5].production *= trinkets[trinket].power;
            break
        case "Employee":
            items[6].production *= trinkets[trinket].power;
            break
        case "Software Company":
            items[7].production *= trinkets[trinket].power;
            break
    }

    for (i = 0; i < items.length; i++) {
        document.getElementById(i + "-description-production-value")
            .innerHTML = items[i].production;
        document.getElementById(i + "-description-total-production-value")
            .innerHTML = formatNumber((items[i].production * items[i].inventory).toFixed(1));
    }
}

function setMarketState(state) {
    marketState = state;
    if (marketState == "buy") {
        buyButton.style.color = "white";
        buyButton.style.textShadow = "0px 1px 0px #000,0px 0px 1px #fff,0px 0px 4px #fff";
        sellButton.style.color = "gray";
        sellButton.style.textShadow = "none";
        allMultiplierButton.setAttribute("class", "invisible-button");
        if (marketMultiplier > 100) {
            marketMultiplier = 100;

            let button100 = document.getElementById("market-multiplier-button-100");
            let buttonAll = document.getElementById("market-multiplier-button-all");
            button100.style.color =
                "white";
            button100.style.textShadow =
                "0px 1px 0px #000,0px 0px 1px #fff,0px 0px 4px #fff";
            buttonAll.style.color =
                "gray";
            buttonAll.style.textShadow =
                "none";
        }
    } else {
        sellButton.style.color = "white";
        sellButton.style.textShadow = "0px 1px 0px #000,0px 0px 1px #fff,0px 0px 4px #fff";
        buyButton.style.color = "gray";
        buyButton.style.textShadow = "none";
        allMultiplierButton.setAttribute("class", "visible-button");
    }
    reloadItemMarket();
}

function setMarketMultiplier(number) {
    if (number == "all") {
        marketMultiplier = Number.MAX_VALUE;
    } else {
        marketMultiplier = number;
    }

    let button1 = document.getElementById("market-multiplier-button-1");
    let button10 = document.getElementById("market-multiplier-button-10");
    let button100 = document.getElementById("market-multiplier-button-100");
    let buttonAll = document.getElementById("market-multiplier-button-all");

    switch (number) {
        case 1:
            button1.style.color =
                "white";
            button1.style.textShadow =
                "0px 1px 0px #000,0px 0px 1px #fff,0px 0px 4px #fff";
            button10.style.color =
                "gray";
            button10.style.textShadow =
                "none";
            button100.style.color =
                "gray";
            button100.style.textShadow =
                "none";
            buttonAll.style.color =
                "gray";
            buttonAll.style.textShadow =
                "none";
            break;
        case 10:
            button1.style.color =
                "gray";
            button1.style.textShadow =
                "none";
            button10.style.color =
                "white";
            button10.style.textShadow =
                "0px 1px 0px #000,0px 0px 1px #fff,0px 0px 4px #fff";
            button100.style.color =
                "gray";
            button100.style.textShadow =
                "none";
            buttonAll.style.color =
                "gray";
            buttonAll.style.textShadow =
                "none";
            break;
        case 100:
            button1.style.color =
                "gray";
            button1.style.textShadow =
                "none";
            button10.style.color =
                "gray";
            button10.style.textShadow =
                "none";
            button100.style.color =
                "white";
            button100.style.textShadow =
                "0px 1px 0px #000,0px 0px 1px #fff,0px 0px 4px #fff";
            buttonAll.style.color =
                "gray";
            buttonAll.style.textShadow =
                "none";
            break;
        case "all":
            button1.style.color =
                "gray";
            button1.style.textShadow =
                "none";
            button10.style.color =
                "gray";
            button10.style.textShadow =
                "none";
            button100.style.color =
                "gray";
            button100.style.textShadow =
                "none";
            buttonAll.style.color =
                "white";
            buttonAll.style.textShadow =
                "0px 1px 0px #000,0px 0px 1px #fff,0px 0px 4px #fff";
            break;
    }

    reloadItemMarket();
}

function buyItem(item) {
    if (money >= items[item].marketPrice) {
        money -= items[item].marketPrice;
        items[item].inventory += marketMultiplier;
        for (i = 0; i < marketMultiplier; i++) {
            items[item].price = Math.floor(items[item].price * buyMultiplierPrice);
        }

        for (i = 0; i < trinkets.length; i++) {
            if (trinkets[i].lock) {
                switch (trinkets[i].group) {
                    case "Typing":
                        if (moneyFromType >= trinkets[i].unlockCondition) {
                            trinketButtons[i].setAttribute("class", "trinket-button unlocked-button invisible-button");
                            trinkets[i].lock = false;
                        }
                        break
                    case "Automatic Test":
                        if (items[0].inventory >= trinkets[i].unlockCondition) {
                            trinketButtons[i].setAttribute("class", "trinket-button unlocked-button invisible-button");
                            trinkets[i].lock = false;
                        }
                        break
                    case "Library":
                        if (items[1].inventory >= trinkets[i].unlockCondition) {
                            trinketButtons[i].setAttribute("class", "trinket-button unlocked-button invisible-button");
                            trinkets[i].lock = false;
                        }
                        break
                    case "Documentation":
                        if (items[2].inventory >= trinkets[i].unlockCondition) {
                            trinketButtons[i].setAttribute("class", "trinket-button unlocked-button invisible-button");
                            trinkets[i].lock = false;
                        }
                        break
                    case "IDE":
                        if (items[3].inventory >= trinkets[i].unlockCondition) {
                            trinketButtons[i].setAttribute("class", "trinket-button unlocked-button invisible-button");
                            trinkets[i].lock = false;
                        }
                        break
                    case "Git Repository":
                        if (items[4].inventory >= trinkets[i].unlockCondition) {
                            trinketButtons[i].setAttribute("class", "trinket-button unlocked-button invisible-button");
                            trinkets[i].lock = false;
                        }
                        break
                    case "Screen":
                        if (items[5].inventory >= trinkets[i].unlockCondition) {
                            trinketButtons[i].setAttribute("class", "trinket-button unlocked-button invisible-button");
                            trinkets[i].lock = false;
                        }
                        break
                    case "Employee":
                        if (items[6].inventory >= trinkets[i].unlockCondition) {
                            trinketButtons[i].setAttribute("class", "trinket-button unlocked-button invisible-button");
                            trinkets[i].lock = false;
                        }
                        break
                    case "Software Company":
                        if (items[7].inventory >= trinkets[i].unlockCondition) {
                            trinketButtons[i].setAttribute("class", "trinket-button unlocked-button invisible-button");
                            trinkets[i].lock = false;
                        }
                        break
                    case "Typing Special":
                        if (moneyFromType >= trinkets[i].unlockCondition) {
                            trinketButtons[i].setAttribute("class", "trinket-button unlocked-button invisible-button");
                            trinkets[i].lock = false;
                        }
                        break
                }
            }
        }
    
        unlockedTrinkets = document.getElementsByClassName("unlocked-button");
        for (i = 0; i < Math.min(6, unlockedTrinkets.length); i++) {
            unlockedTrinkets[i].setAttribute("class", "trinket-button unlocked-button visible-button");
        }
        for (i = 6; i < unlockedTrinkets.length; i++) {
            unlockedTrinkets[i].setAttribute("class", "trinket-button unlocked-button invisible-button");
        }

        reloadItemMarket();
    } else {
        alert("Sorry, but you don't have enought money.");
    }
}

function sellItem(item) {
    money += items[item].marketPrice;

    let multiplier
    if (marketMultiplier > items[item].inventory) {
        multiplier = items[item].inventory;
    } else {
        multiplier = marketMultiplier;
    }
    items[item].inventory -= multiplier;

    for (i = 0; i < multiplier; i++) {
        items[item].price = Math.round(items[item].price / buyMultiplierPrice);
    }
    reloadItemMarket();
}

function reloadItemMarket() {
    let totalPrice = [0];
    if (marketState == "buy") {;
        for (item = 0; item < items.length; item ++) {
            totalPrice[item] = calculateItemBuyPrice(item);
        }
    } else {
        for (item = 0; item < items.length; item ++) {
            totalPrice[item] = calculateItemSellPrice(item);
        }
    }

    for (i = 0; i < items.length; i++) {
        document.getElementById("price-value-" + i)
            .innerHTML = formatNumber(totalPrice[i]);
        itemButtons[i].setAttribute("onclick", `${marketState}Item(${i});`);
        document.getElementById(i + "-description-price-value")
            .innerHTML = formatNumber(totalPrice[i]);
        document.getElementById(i + "-description-inventory-value")
            .innerHTML = items[i].inventory;
        document.getElementById(i + "-description-inventory-production-value")
            .innerHTML = items[i].inventory;
        document.getElementById(i + "-description-total-production-value")
            .innerHTML = formatNumber((items[i].production * items[i].inventory).toFixed(1));
    }
}

function calculateItemBuyPrice(item) {
    let aux = items[item].price;
    let totalPrice = 0;

    for (i = 0; i < marketMultiplier; i++) {
        totalPrice += aux;
        aux = Math.floor(aux * buyMultiplierPrice);
    }
    
    items[item].marketPrice = totalPrice;
    return totalPrice;
}

function calculateItemSellPrice(item) {
    let auxBuy = items[item].price;
    let auxSell = Math.floor(auxBuy * sellMultiplierPrice);
    let totalPrice = 0;

    let multiplier;
    if (marketMultiplier > items[item].inventory) {
        multiplier = items[item].inventory;
    } else {
        multiplier = marketMultiplier;
    }

    for (i = 0; i < multiplier; i++) {
        totalPrice += auxSell;
        auxBuy = Math.round(auxBuy / buyMultiplierPrice);
        auxSell = Math.floor(auxBuy * sellMultiplierPrice);
    }

    items[item].marketPrice = totalPrice;
    return totalPrice;
}

//-----------------------------------------------------------------------//

function init() {
    showRandomCode(htmlCode);

    for (i = 0; i < codes.length; i++) {
        codesButtons.innerHTML += codes[i].getButton(i);
        codesDescriptions.innerHTML += codes[i].getDescription(i);
    }
    codeButtons = document.getElementsByClassName("code-button");
    codeDescriptions = document.getElementsByClassName("code-description");

    for (i = 0; i < trinkets.length; i++) {
        trinketsButtons.innerHTML += trinkets[i].getButton(i);
        trinketsDescriptions.innerHTML += trinkets[i].getDescription(i);
    }
    trinketButtons = document.getElementsByClassName("trinket-button");
    trinketDescriptions = document.getElementsByClassName("trinket-description");

    for (i = 0; i < items.length; i++) {
        itemsButtons.innerHTML += items[i].getButton(i);
        itemsDescriptions.innerHTML += items[i].getDescription(i);
    }
    itemButtons = document.getElementsByClassName("item-button");
    itemDescriptions = document.getElementsByClassName("item-description");

    let all = document.getElementsByClassName("no-highlight");
    for (let a of all) {
        a.onselectstart = function () { return false; }
    }

    attachEvent(codeInput, "cut");
    attachEvent(codeInput, "copy");
    attachEvent(codeInput, "paste");
}

function production() {
    totalProduction = 0;
    userProduction = baseUserProduction;
    let totalItems = 0;
    for(i = 0; i < items.length; i++) {
        money += items[i].inventory * items[i].production;
        totalProduction += items[i].inventory * items[i].production;
        totalItems += items[i].inventory;
    }
    if (isAmbidextrousOn) {
        userProduction += totalItems * ambidextrousEffect;
    }
    userProduction += totalProduction * typingSpecialEffect;
}

function render() {
    counterDisplay.innerHTML = `${formatNumber(Math.floor(money))}`;
    productionDisplay.innerHTML = `per second: ${formatNumber(totalProduction.toFixed(1))}`;
    for (i = 0; i < items.length; i++) {
        document.getElementById("item-inventory-" + i)
            .innerHTML = items[i].inventory;
        
        let price = document.getElementById("price-value-" + i);
        if (items[i].marketPrice > money) {
            price.style.color = "lightcoral";
        } else {
            price.style.color = "lightgreen";
        }
    }
}

//-----------------------------------------------------------------------//

var FPSProduction = 1;

setInterval(function() {
    production();
}, 1000/FPSProduction);


var FPS = 30;

setInterval(function() {
    render();
    startMatch();
}, 1000/FPS);

//-----------------------------------------------------------------------//

function save() {
    localStorage.setItem("money", money);
    localStorage.setItem("money-from-type", moneyFromType);
    for(it = 0; it < items.length; it++) {
        localStorage.setItem("item-inventory-" + it, items[it].inventory);
    }
    for(co = 0; co < codes.length; co++) {
        localStorage.setItem("code-inventory-" + co, codes[co].inventory);
    }
    for(tr = 0; tr < trinkets.length; tr++) {
        localStorage.setItem("trinket-inventory-" + tr, trinkets[tr].inventory);
    }

    localStorage.setItem("is-save", true);
    alert("The game has been saved successfully!");
}

function load() {
    let isSave = (localStorage.getItem("is-save") === "true");
    if (isSave) {
        totalProduction = 0;
        userProduction = 1;
        baseUserProduction = 1;
        ambidextrousEffect = 0.1;
        isAmbidextrousOn = false;
        typingSpecialEffect = 0;

        money = parseInt(localStorage.getItem("money"));
        moneyFromType = parseInt(localStorage.getItem("money-from-type"));
        for(it = 0; it < items.length; it++) {
            items[it].inventory = parseInt(localStorage.getItem("item-inventory-" + it));
            items[it].production = items[it].baseProduction;
            reloadItemPrice(it);
        }

        for(co = 0; co < codes.length; co++) {
            codes[co].inventory = (localStorage.getItem("code-inventory-" + co) === "true");

            if (codes[co].inventory) {
                codeButtons[co].setAttribute("onclick", `setCode(${co});`);
                document.getElementById("description-" + co + "-code-owned").innerHTML = "Click to use this language.";
                document.getElementById(co + "-code-owned").setAttribute("class", "visible-owned code-owned");
            } else {
                codeButtons[co].setAttribute("onclick", `buyCode(${co});`);
                document.getElementById("description-" + co + "-code-owned").innerHTML = "Click to purchase.";
                document.getElementById(co + "-code-owned").setAttribute("class", "invisible-owned code-owned");
            }
        }

        for (tr = 0; tr< trinkets.length; tr++) {
            if (trinkets[tr].lock) {
                switch (trinkets[tr].group) {
                    case "Typing":
                        if (moneyFromType >= trinkets[tr].unlockCondition) {
                            trinketButtons[tr].setAttribute("class", "trinket-button unlocked-button invisible-button");
                            trinkets[tr].lock = false;
                        }
                        break
                    case "Automatic Test":
                        if (items[0].inventory >= trinkets[tr].unlockCondition) {
                            trinketButtons[tr].setAttribute("class", "trinket-button unlocked-button invisible-button");
                            trinkets[tr].lock = false;
                        }
                        break
                    case "Library":
                        if (items[1].inventory >= trinkets[tr].unlockCondition) {
                            trinketButtons[tr].setAttribute("class", "trinket-button unlocked-button invisible-button");
                            trinkets[tr].lock = false;
                        }
                        break
                    case "Documentation":
                        if (items[2].inventory >= trinkets[tr].unlockCondition) {
                            trinketButtons[tr].setAttribute("class", "trinket-button unlocked-button invisible-button");
                            trinkets[tr].lock = false;
                        }
                        break
                    case "IDE":
                        if (items[3].inventory >= trinkets[tr].unlockCondition) {
                            trinketButtons[tr].setAttribute("class", "trinket-button unlocked-button invisible-button");
                            trinkets[tr].lock = false;
                        }
                        break
                    case "Git Repository":
                        if (items[4].inventory >= trinkets[tr].unlockCondition) {
                            trinketButtons[tr].setAttribute("class", "trinket-button unlocked-button invisible-button");
                            trinkets[tr].lock = false;
                        }
                        break
                    case "Screen":
                        if (items[5].inventory >= trinkets[tr].unlockCondition) {
                            trinketButtons[tr].setAttribute("class", "trinket-button unlocked-button invisible-button");
                            trinkets[tr].lock = false;
                        }
                        break
                    case "Employee":
                        if (items[6].inventory >= trinkets[tr].unlockCondition) {
                            trinketButtons[tr].setAttribute("class", "trinket-button unlocked-button invisible-button");
                            trinkets[tr].lock = false;
                        }
                        break
                    case "Software Company":
                        if (items[7].inventory >= trinkets[tr].unlockCondition) {
                            trinketButtons[tr].setAttribute("class", "trinket-button unlocked-button invisible-button");
                            trinkets[tr].lock = false;
                        }
                        break
                    case "Typing Special":
                        if (moneyFromType >= trinkets[tr].unlockCondition) {
                            trinketButtons[tr].setAttribute("class", "trinket-button unlocked-button invisible-button");
                            trinkets[tr].lock = false;
                        }
                        break
                }
            } else {
                switch (trinkets[tr].group) {
                    case "Typing":
                        if (moneyFromType < trinkets[tr].unlockCondition) {
                            trinketButtons[tr].setAttribute("class", "trinket-button invisible-button");
                            trinkets[tr].lock = true;
                        }
                        break
                    case "Automatic Test":
                        if (items[0].inventory < trinkets[tr].unlockCondition) {
                            trinketButtons[tr].setAttribute("class", "trinket-button invisible-button");
                            trinkets[tr].lock = true;
                        }
                        break
                    case "Library":
                        if (items[1].inventory < trinkets[tr].unlockCondition) {
                            trinketButtons[tr].setAttribute("class", "trinket-button invisible-button");
                            trinkets[tr].lock = true;
                        }
                        break
                    case "Documentation":
                        if (items[2].inventory < trinkets[tr].unlockCondition) {
                            trinketButtons[tr].setAttribute("class", "trinket-button invisible-button");
                            trinkets[tr].lock = true;
                        }
                        break
                    case "IDE":
                        if (items[3].inventory < trinkets[tr].unlockCondition) {
                            trinketButtons[tr].setAttribute("class", "trinket-button invisible-button");
                            trinkets[tr].lock = true;
                        }
                        break
                    case "Git Repository":
                        if (items[4].inventory < trinkets[tr].unlockCondition) {
                            trinketButtons[tr].setAttribute("class", "trinket-button invisible-button");
                            trinkets[tr].lock = true;
                        }
                        break
                    case "Screen":
                        if (items[5].inventory < trinkets[tr].unlockCondition) {
                            trinketButtons[tr].setAttribute("class", "trinket-button invisible-button");
                            trinkets[tr].lock = true;
                        }
                        break
                    case "Employee":
                        if (items[6].inventory < trinkets[tr].unlockCondition) {
                            trinketButtons[tr].setAttribute("class", "trinket-button invisible-button");
                            trinkets[tr].lock = true;
                        }
                        break
                    case "Software Company":
                        if (items[7].inventory < trinkets[tr].unlockCondition) {
                            trinketButtons[tr].setAttribute("class", "trinket-button invisible-button");
                            trinkets[tr].lock = true;
                        }
                        break
                    case "Typing Special":
                        if (moneyFromType < trinkets[tr].unlockCondition) {
                            trinketButtons[tr].setAttribute("class", "trinket-button invisible-button");
                            trinkets[tr].lock = true;
                        }
                        break
                }
            }
        }

        unlockedTrinkets = document.getElementsByClassName("unlocked-button");
        for (tr = 0; tr < Math.min(6, unlockedTrinkets.length); tr++) {
            unlockedTrinkets[tr].setAttribute("class", "trinket-button unlocked-button visible-button");
        }
        for (tr = 6; tr < unlockedTrinkets.length; tr++) {
            unlockedTrinkets[tr].setAttribute("class", "trinket-button unlocked-button invisible-button");
        }

        for(tr = 0; tr < trinkets.length; tr++) {
            trinkets[tr].inventory = (localStorage.getItem("trinket-inventory-" + tr) === "true");

            if (trinkets[tr].inventory) {
                let actualButton;
                for (t = 0; t < trinketButtons.length; t++) {
                    if (trinketButtons[t].id == (tr + "-trinket-button")) {
                        actualButton = trinketButtons[t];
                    }
                }
                document.getElementById("description-" + tr + "-trinket-owned").innerHTML = "OWNED";
                document.getElementById(tr + "-trinket-owned").setAttribute("class", "visible-owned trinket-owned");
                actualButton.setAttribute("onclick", "");
                
                activateTrinketPower(tr);
            } else {
                let actualButton;
                for (t = 0; t < trinketButtons.length; t++) {
                    if (trinketButtons[t].id == (tr + "-trinket-button")) {
                        actualButton = trinketButtons[t];
                    }
                }
                document.getElementById("description-" + tr + "-trinket-owned").innerHTML = "Click to purchase.";
                document.getElementById(tr + "-trinket-owned").setAttribute("class", "invisible-owned trinket-owned");
                actualButton.setAttribute("onclick", `buyTrinket(${tr});`);
            }
        }
        alert("The game has been loaded successfully!");
    } else {
        alert("Sorry, but there is no saved game.");
    }
}

function reloadItemPrice(item) {
    items[item].price = items[item].basePrice;
    for (ite = 0; ite < items[item].inventory; ite++) {
        items[item].price = Math.floor(items[item].price * buyMultiplierPrice);
    }
    reloadItemMarket();
}

//-----------------------------------------------------------------------//

function formatNumber(value) {
    let aux = value.toString();
    let length = aux.length;
    let slices = [""];

    let decimalIndex = aux.search(/\./);
    let decimal = "";
    if (decimalIndex != -1) {
        decimal = aux.slice(decimalIndex + 1);
        aux = aux.slice(0, decimalIndex);
        length = aux.length;
    }

    let i = 0;
    while (length > 0) {
        if (length - 3 >= 0) {
            slices[i] = aux.slice(length - 3, length);
            i++;
            length -= 3;
        } else {
            slices[i] = aux.slice(0, length);
            length = 0;
        }
    }

    let replaced;
    switch(true) {
        case (value < 1000):
            aux = "";
            for (i = 1; i <= slices.length; i++) {
                aux =  aux + slices[slices.length - i];
            }
            if (decimal != "") {
                aux = aux + "." + decimal;
            }
            break
        case (value < 1000000):
            if (slices[1] == "") {
                aux = slices[slices.length - 1];
            } else {
                aux = slices[slices.length - 1] + "," + slices[slices.length - 2];
            }
            break
        default:
            replaced = slices[slices.length - 2].replace(/0+$/, '');
            if (replaced == "") {
                aux = slices[slices.length - 1];
            } else {
                aux = slices[slices.length - 1] + "." + replaced;
            }
            switch (true) {
                case (value < 1000000000):
                    aux = aux + " million";
                    break
                case (value < 1000000000000):
                    aux = aux + " billion";
                    break
                case (value < 1000000000000000):
                    aux = aux + " trillion";
                    break
                case (value < 1000000000000000000):
                    aux = aux + " quadrillion";
                    break
                case (value < 1000000000000000000000):
                    aux = aux + " quintillion";
                    break
                case (value < 1000000000000000000000000):
                    aux = aux + " sextillion";
                    break
            } 
            break
    }
    return aux;
 }

function replaceSpecialCharacters(text) {
    let aux = text.replace(/&/g, "&amp;");
    aux = aux.replace(/\"/g, "&quot;");
    aux = aux.replace(/\'/g, "&#039;");
    aux = aux.replace(/</g, "&lt;");
    aux = aux.replace(/>/g, "&gt;");
    aux = aux.replace(/\t/g, "|    ");

    return aux;
}

function insertTab(item, event) {
    scrollArea.scrollLeft = leftPositionCode.offsetLeft - 200;
    scrollArea.scrollTop = Math.max(correctCode.offsetHeight, incorrectCode.offsetHeight) - 125;

	var keyCode = event.keyCode ? event.keyCode : event.charCode ? event.charCode : event.which;
	if (keyCode == 9 && !event.shiftKey && !event.ctrlKey && !event.altKey) {
		var itemScroll = item.scrollTop;
		if (item.setSelectionRange) {
			var selectionStart = item.selectionStart;	
			var selectionEnd = item.selectionEnd;
			item.value = item.value.substring(0, selectionStart) + "\t" + item.value.substr(selectionEnd);
			item.setSelectionRange(selectionStart + 1, selectionStart + 1);
			item.focus();
		}
		else if (item.createTextRange) {
			document.selection.createRange().text = "\t";
			event.returnValue = false;
		}

		item.scrollTop = itemScroll;
		if (event.preventDefault) {
			event.preventDefault();
		}
		return false;
	}
	return true;
}

function attachEvent(control, eventName) {
    if (control.addEventListener) {
        control.addEventListener(eventName, function (e) {
            e.preventDefault();
        }, false);
    } else if (control.attachEvent) {
        control.attachEvent('on' + eventName, function () {
            return false;
        });
    }
}

//-----------------------------------------------------------------------//

// Copyright 2006,2007 Bontrager Connection, LLC
// https://www.willmaster.com/
// Version: July 28, 2007
// & Modified by MKoding (Mikel Romano)
var cX = 0;
var cY = 0;
var rX = 0;
var rY = 0;

var typeContent;
var numberContent;

function UpdateCursorPosition(e) {
  cX = e.pageX;
  cY = e.pageY;
}

function UpdateCursorPositionDocAll(e) {
  cX = event.clientX;
  cY = event.clientY;
}

if (document.all) {
  document.onmousemove = UpdateCursorPositionDocAll;
} else {
  document.onmousemove = UpdateCursorPosition;
}

function AssignPosition(d) {
  if (self.pageYOffset) {
    rX = self.pageXOffset;
    rY = self.pageYOffset;
  } else if (document.documentElement && document.documentElement.scrollTop) {
    rX = document.documentElement.scrollLeft;
    rY = document.documentElement.scrollTop;
  } else if (document.body) {
    rX = document.body.scrollLeft;
    rY = document.body.scrollTop;
  }

  if (document.all) {
    cX += rX;
    cY += rY;
  }

  d.style.right = 400 + "px";
  d.style.top = cY - 20 + "px";
}

function HideContent(d) {
  if (d.length < 1) {
    return;
  }
  document.getElementById(d).style.display = "none";
}

function ShowContent(d) {
    if (d.length < 1) {
        return;
    }

    var dd = document.getElementById(d);
    AssignPosition(dd);
     dd.style.display = "block";
}

function ReverseContentDisplay(d) {
  if (d.length < 1) {
    return;
  }

  var dd = document.getElementById(d);

  AssignPosition(dd);

  if (dd.style.display == "none") {
    dd.style.display = "block";
  } else {
    dd.style.display = "none";
  }
}


//-----------------------------------------------------------------------//

const htmlCode = [
`<html>
\t<body>
\t\t<!-- print name to the screen -->
\t\tJohn
\t</body>
</html>`,

`<html>
\t<body>
\t\t<!-- print the numbers 1 to 10 to the screen -->
\t\t1 2 3 4 5 6 7 8 9 10
\t</body>
</html>`,

`<html>
\t<head>
\t\t<!--set the title of the page-->
\t\t<title>This is a webpage</title>
\t</head>
\t<body>
\t\t<p class="note">
\t\t\tThe title tag goes in the head section of an HTML document.
\t\t</p>
\t</body>
</html>`,

`<html>
\t<head>
\t\t<!--set the title of the page to the current date-->
\t\t<title>January 9th, 2009</title>
\t</head>
\t<body>
\t\t<!--print a message-->
\t\tWhen was this webpage created?
\t\tCheck page's title for the answer.
\t</body>
</html>`,

`<html>
\t<head>
\t\t<title>Print some text</title>
\t</head>
\t<body>
\t\t<!--print a message-->
\t\tThe giraffe is a very interesting animal.
\t</body>
</html>`,

`<html>
\t<body>
\t\ta<sub>1</sub>
\t\t<br/>
\t\t<br/>
\t\t2<sup>2</sup> = 4
\t\t<br/>
\t\t3<sup>2</sup> = 9
\t</body>
</html>`,

`<html>
\t<body>
\t\t<p>
\t\t\tComputer programming is defined as telling a computer what to do
\t\t</p>
\t</body>
</html>`,

`<html>
\t<body>
\t\t<b>Hardware devices</b>

\t\t<ol type="I">
\t\t\t<li>CD-ROM drive</li>
\t\t\t<li>Hard disk</li>
\t\t\t<li>Modem</li>
\t\t</ol>

\t\t<b>Web languages</b>

\t\t<ul type="square">
\t\t\t<li>HTML</li>
\t\t\t<li>CSS</li>
\t\t\t<li>Javascript</li>
\t\t</ul>
\t</body>
</html>`,

`<html>
\t<body>
\t\t<a href="http://www.google.com">
\t\t\tSearch the web with Google!
\t\t</a>
\t</body>
</html>`,

`<html>
\t<head>
\t\t<title>Five images</title>
\t</head>
\t<body>
\t\t<img src="/images/apple.jpg" alt="Apple" title="Apple"/>
\t</body>
</html>`
];

const cssCode = [
`body {
\tbackground-color: blue;
}
h1 {
\tbackground-color: purple;
}
h2 {
\tcolor: #FA8072; // salmon
}
p {
\tcolor: rgba(244, 145, 14, 0.80); // bright orange
}`,

`/* Phone Portrait */
@media only screen
and (min-device-width: 375px)
and (max-device-width: 667px)
and (-webkit-min-device-pixel-ratio: 2)
and (orientation: portrait) {
\tfont-size: 20px;
}

/* Phone Landscape */
@media only screen
and (min-device-width: 375px)
and (max-device-width: 667px)
and (-webkit-min-device-pixel-ratio: 2)
and (orientation: landscape) {
\tfont-size: 12px;
}`,

`body {
\tbackground-color: orange;
}
h1 {
\tbackground-color: yellow;
}
h2 {
\tbackground-color: #ffffff;
}
p {
\tbackground-color: #fa05ff;
}`,

`body {
\tbackground-image: url('images/ob020.jpg');
\tbackground-repeat: repeat-x;
}`,

`body {
\tbackground-image: url(/images/apple.jpg);
\tbackground-repeat: repeat;
}`,

`p {
\tdisplay: inline;
}
img, span {
\tdisplay: block;
}`,

`a.internal {
\tcolor: #2C7d91;
}

/* the "visited" pseudo-class sets the color of visited links*/
a.internal:visited {
\tcolor: #78546f;
}

/* the "hover" pseudo-class sets the color of links when you move the mouse over them */
a.internal:hover {
\tbackground-color: #C4D8FF;
\tcolor: #000000;
}

/* the "active" pseudo-class sets the color of links when they are clicked on */
a.internal:active {
\tcolor:#007900;
}`
];

const javascriptCode = [
`var number = prompt("Give me a number and I'll tell you if it's odd or even!");

if (typeof(number) == "number") {
\tif (number % 2 == 0) {
\t\talert("It's odd")
\t} else {
\t\talert("It's even")
\t}
} else {
\talert("Insert a valid value (1, 2, 3, ...)")
}`,

`function Pokemon(name, number, attacks) {
\tif (typeof(name) == "string") {
\t\tthis.name = name;
\t} else {
\t\talert("Insert a valid name value. EXAMPLE: Pikachu, Charmander, ...")
\t}

\tif (Number.isInteger(number)) {
\t\tthis.number = number;
\t} else {
\t\talert("Insert a valid value for number. EXAMPLE: 1, 2, 3, ...")
\t}

\tif (Array.isArray(attacks)) {
\t\tthis.attacks = attacks;
\t} else {
\t\talert("Insert a valid value for attacks. EXAMPLE: ['tackle', 'thunderbolt', 'growl']")
\t}
\tthis.attacks = attacks;
}

Pokemon.prototype.attack = function(number) {
\tif (this.attacks.length >= number && 0 < number) {
\t\talert (this.name + ' use attack ' + this.attacks[number-1]);
\t} else {
\t\talert("Enter a valid attack value (between 1 and " + this.attacks.length + ")")
\t}
};

var pokemon1 = new Pokemon("Pikachu", 25, ["tackle", "thunderbolt", "growl"]);
pokemon1.attack(2);`,

`function replaceSpecialCharacters(text) {
\tlet aux = text.replace(/&/g, "&amp;");
\taux = aux.replace(/\"/g, "&quot;");
\taux = aux.replace(/\'/g, "&#039;");
\taux = aux.replace(/</g, "&lt;");
\taux = aux.replace(/>/g, "&gt;");

\treturn aux;
}`,

`function insertTab(item, event) {
\tscrollArea.scrollLeft = leftPositionCode.offsetLeft - 200;
\tscrollArea.scrollTop = Math.max(correctCode.offsetHeight, incorrectCode.offsetHeight) - 125;

\tvar keyCode = event.keyCode ? event.keyCode : event.charCode ? event.charCode : event.which;
\tif (keyCode == 9 && !event.shiftKey && !event.ctrlKey && !event.altKey) {
\t\tvar itemScroll = item.scrollTop;
\t\tif (item.setSelectionRange) {
\t\t\tvar selectionStart = item.selectionStart;	
\t\t\tvar selectionEnd = item.selectionEnd;
\t\t\titem.value = item.value.substring(0, selectionStart) + "\t" + item.value.substr(selectionEnd);
\t\t\titem.setSelectionRange(selectionStart + 1, selectionStart + 1);
\t\t\titem.focus();
\t\t} else if (item.createTextRange) {
\t\t\tdocument.selection.createRange().text = "\t";
\t\t\tevent.returnValue = false;
\t\t}

\t\titem.scrollTop = itemScroll;
\t\tif (event.preventDefault) {
\t\t\tevent.preventDefault();
\t\t}
\t\treturn false;
\t}
\treturn true;
}`,

`function attachEvent(control, eventName) {
\tif (control.addEventListener) {
\t\tcontrol.addEventListener(eventName, function (e) {
\t\t\te.preventDefault();
\t\t}, false);
\t} else if (control.attachEvent) {
\t\tcontrol.attachEvent('on' + eventName, function () {
\t\t\treturn false;
\t\t});
\t}
}`
];