class getDataFromApi {
    url = "";
    data = null;

    constructor(newURL) {
        this.url = newURL;
    }

    async getData() {
        if (this.data === null) {

            await fetch(this.url)
                .then(function (response) {
                    return response.json();
                }).then((data) => {
                    this.data = data;
                });

        }
        return this.data;
    }
}

class Header {

    headerElement;
    figureElement;
    logoIElement;
    logoHeadingElement;
    avatarWrapperElement
    avatarBodyElement;
    avatarHeadElement;
    avatarElement;

    placeToRenderHeader;

    constructor(placeToRenderHeader) {
        this.placeToRenderHeader = document.getElementsByTagName(placeToRenderHeader)[0];

        this.headerElement = document.createElement("header");
        this.headerElement.classList = "header";

        this.figureElement = document.createElement("figure");
        this.figureElement.classList = "header__logo";

        this.logoIElement = document.createElement("i");
        this.logoIElement.classList = "fa-solid fa-money-bill-1-wave";

        this.logoHeadingElement = document.createElement("h2");
        this.logoHeadingElement.classList = "header__banky"
        this.logoHeadingElement.innerText = "Banky";

        this.avatarWrapperElement = document.createElement("div");
        this.avatarWrapperElement.classList = "avatarWrapper";

        this.avatarElement = document.createElement("figure");
        this.avatarElement.classList = "avatar";

        this.avatarHeadElement = document.createElement("div");
        this.avatarHeadElement.classList = "header__avatarHead";

        this.avatarBodyElement = document.createElement("div");
        this.avatarBodyElement.classList = "header__avatarBody";

    }
    render() {
        this.placeToRenderHeader.appendChild(this.headerElement);
        this.headerElement.appendChild(this.figureElement);
        this.figureElement.appendChild(this.logoIElement);
        this.figureElement.appendChild(this.logoHeadingElement);
        this.headerElement.appendChild(this.avatarWrapperElement);
        this.avatarWrapperElement.appendChild(this.avatarElement);
        this.avatarElement.appendChild(this.avatarHeadElement);
        this.avatarElement.appendChild(this.avatarBodyElement);


    }
}

class bankyMain {
    placeToRenderBankyMain;
    leftSection;
    rightSection;



    constructor(placeToRenderBankyMain) {
        this.placeToRenderBankyMain = document.getElementsByTagName(placeToRenderBankyMain)[0];

        this.mainElement = document.createElement("main");
        this.mainElement.classList = "banky";

        this.leftSection = new bankyLeftSection(this.mainElement);
        this.rightSection = new bankyRightSection(this.mainElement, this);

    }

    makeButtonsFromData(data) {
        this.rightSection.makeButtonsFromData(data);
    }

    makeTransactionsFromData(data) {
        this.leftSection.makeTransactionsFromData(Object.entries(data)[0][0],data);
    }

    callFromRightSection(account,data) {
        this.leftSection.makeTransactionsFromData(account,data);
    }

    render() {
        this.placeToRenderBankyMain.appendChild(this.mainElement);

        this.leftSection.render();
        this.rightSection.render();
    }
}

class bankyLeftSection {

    mainElement;

    constructor(mainElement) {
        this.mainElement = mainElement;
        this.leftSectionElement = document.createElement("section");
        this.leftSectionElement.classList = "banky__section banky__section--left";

        this.bankyHeaderElement = document.createElement("header");
        this.bankyHeaderElement.classList = "banky__header";

        this.bankyHeaderWrapElement = document.createElement("div");

        this.bankyLogoElement = document.createElement("figure");
        this.bankyLogoElement.classList = "banky__logo";

        this.bankyLogoIElement = document.createElement("i");
        this.bankyLogoIElement.classList = "fa-solid fa-house";

        this.bankyLogoText = document.createElement("h1");
        this.bankyLogoText.classList = "banky__money";
       

        this.eyeButton = document.createElement("button");
        this.eyeButton.classList = "banky__eyeButton";
        this.eyeButton.onclick = this.eyeButtonClicked;

        this.eyeFigure = document.createElement("figure");
        this.eyeFigure.classList = "banky__eye";

        this.eyeI = document.createElement("i");
        this.eyeI.classList = "fa-solid fa-eye";

        this.transactionsElement = document.createElement("ul");
        this.transactionsElement.classList = "banky__transactions";

       
    }
    eyeButtonClicked = () => {
        this.transactionsElement.classList.toggle("banky__transactions--blur");
        this.bankyLogoText.classList.toggle("banky__money--blur")
}

    makeTransactionsFromData(accountToShow,data) {
        let totalMoney = 0;

        for (let i = 0; i < data[accountToShow].length; i++){
            totalMoney += data[accountToShow][i]["amount"];
        }
        this.bankyLogoText.innerText = "Saldo: " + "$" + totalMoney;

        this.transactionsElement.innerHTML = "";


        for (let i = 0; i < data[accountToShow].length; i++){
            this.transactionElement = document.createElement("li");
            this.transactionElement.classList = "banky__transaction";
    
            this.transactionFrom = document.createElement("h3");
            this.transactionFrom.classList = "banky__name"
            this.transactionFrom.innerText = data[accountToShow][i]["from/to"];
    
            this.transactionAmount = document.createElement("h3");
            this.transactionAmount.classList = "banky__amount"
            this.transactionAmount.innerText = data[accountToShow][i]["amount"];
    

            this.transactionsElement.appendChild(this.transactionElement);
            this.transactionElement.appendChild(this.transactionFrom);
            this.transactionElement.appendChild(this.transactionAmount);
        }


    }

    render() {
        this.mainElement.appendChild(this.leftSectionElement);

        this.leftSectionElement.appendChild(this.bankyHeaderElement);
        this.bankyHeaderElement.appendChild(this.bankyHeaderWrapElement);
        this.bankyHeaderWrapElement.appendChild(this.bankyLogoElement)
        this.bankyLogoElement.appendChild(this.bankyLogoIElement);
        this.bankyHeaderWrapElement.appendChild( this.bankyLogoText);
        this.bankyHeaderWrapElement.appendChild(this.eyeButton);
        
        this.eyeButton.appendChild(this.eyeFigure);
        this.eyeFigure.appendChild(this.eyeI);
        this.leftSectionElement.appendChild(this.transactionsElement);

        
        this.transferButtonElement = document.createElement("button");
        this.transferButtonElement.classList = "banky__transferButton";
        this.transferButtonElement.innerText = "Overboeken";
        this.leftSectionElement.appendChild(this.transferButtonElement)
    

    }
}

class bankyRightSection {

    mainElement;
    bankyMain
    constructor(mainElement, bankyMain, ) {
        this.mainElement = mainElement;
        this.bankyMain = bankyMain;

        this.rightSectionElement = document.createElement("section")
        this.rightSectionElement.classList = "banky__section banky__section--right"

        this.BankyAccountsElement = document.createElement("ul");
        this.BankyAccountsElement.classList = "banky__accounts"

       
    }

    makeButtonsFromData(data) {
        Object.entries(data).forEach( (entry) => {
            this.BankyAccountElement = document.createElement("li");
            this.BankyAccountElement.classList = "banky__account";
            this.BankyAccountElement.onclick = () => {
                this.bankyMain.callFromRightSection(entry[0], data);
            }
    
            this.SwitchAccountButton = document.createElement("button");
            this.SwitchAccountButton.classList = "banky__switchAccound";
    
            this.bankyHouseLogoElement = document.createElement("figure");
            this.bankyHouseLogoElement.classList = "banky__logo";
    
            this.houseIElement = document.createElement("i");
            this.houseIElement.classList = (entry[1][0]["logo"]);

            this.nameOfAccount = document.createElement("h4");
            this.nameOfAccount.classList = "banky__nameOfAccount";
            this.nameOfAccount.innerText = entry[0];
    
            this.BankyAccountsElement.appendChild(this.BankyAccountElement);
            this.BankyAccountElement.appendChild(this.SwitchAccountButton);
            this.SwitchAccountButton.appendChild(this.bankyHouseLogoElement);
            this.bankyHouseLogoElement.appendChild(this.houseIElement);
            this.BankyAccountElement.appendChild(this.nameOfAccount);
        })
    }

    render() {
    
        this.mainElement.appendChild(this.rightSectionElement);
        this.rightSectionElement.appendChild(this.BankyAccountsElement);
     
    }
}

class App {
    bankyHeader;
    bankyMain;
    getDataFromApi;


    constructor() {
        this.Header = new Header("body");
        this.bankyMain = new bankyMain("body");

        this.getDataFromApi = new getDataFromApi("./data/tranactions.json")

        this.getDataFromApi
            .getData().then((data) => {
                this.bankyMain.makeTransactionsFromData(data);
                this.bankyMain.makeButtonsFromData(data);
            });

        this.Header.render();
        this.bankyMain.render();
    }

}

const app = new App();