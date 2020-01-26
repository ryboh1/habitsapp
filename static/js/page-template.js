function template(currentPagePath){

    this.currentPagePath = currentPagePath;

    this.loadTemplate = async (pageHeading,navPath, footerPath, theResolve) => { 
            
        await new Promise(resolve => $('#nav').load(`${navPath}`, resolve));
        await new Promise(resolve => $("#currentPage").load(this.currentPagePath, resolve));
        await new Promise(resolve => $('#footer').load(`${footerPath}`, resolve));

        $(`#${pageHeading}`).addClass("current-page");            
        if(theResolve != undefined){
            return theResolve("completed");
        }            
    };

    this.createResponsiveTabs = () => {
        $(".tab-list").each( function () {    
            /* variables for this tab-list*/
            let $this = $(this);
            let $tab = $this.find("li.active");
            let $link = $tab.find("a");
            let $panel = $($link.attr("href"));
        
            /*When Clicked on a tab run this function*/
            $this.on("click", ".tab-control", function (e) {
                
                e.preventDefault();
        
                let $link = $(this);
                let id = this.hash;
        
                if (id && !$link.is("active")) {
                    $panel.removeClass("active");
                    $tab.removeClass("active");
        
                $panel = $(id).addClass("active");
                $tab = $link.parent().addClass("active");
                }
            });
        });
    };

    let {ipcRenderer} = require("electron");

    this.submitForm = (formID, formIdentifier) => {
        const myData = $(`#${formID}`).serializeArray();
        ipcRenderer.sendSync(formIdentifier,myData);
    };

    this.getGoalOptions = (option) =>{
        ipcRenderer.send("goal-options", option);

        ipcRenderer.on("returned-options",(event, returnedOptions) => {
            let selectElement = document.getElementById("habit-list");
            let amountOfOptions = returnedOptions.length;
            let currentAmountOfOptions = selectElement.options.length;

            removeOldOptions(currentAmountOfOptions, selectElement);
            addNewOptions(amountOfOptions, selectElement, returnedOptions);
        });
    };
};

/*helper functions */

function removeOldOptions(theCurrentAmountOfOptions, theSelectedElement){
    for(let i = 0; i < theCurrentAmountOfOptions; i++){
        theSelectedElement.remove(theSelectedElement[i]);
    };
}

function addNewOptions(theAmountOfValues, theSelectedElement, theArgument){
    for(let i = 0; i < theAmountOfValues; i++){
        let theOption = document.createElement("option");
        theOption.text = theArgument[i];
        theSelectedElement.add(theOption);
    }
};