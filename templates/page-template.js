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
        const tabs = document.querySelectorAll("[data-tab-target]");
        const allTabContents = document.querySelectorAll("[data-tab-content")

        tabs.forEach(tab => {
            tab.addEventListener("click", () =>{
                allTabContents.forEach(tabContent =>{
                    tabContent.classList.remove("active");
                });
            
            let amountOfTabs = Object.keys($("[data-tab-target]")).length;
            const currentTarget = $(tab.dataset.tabTarget);
            for(let i = 0; i < amountOfTabs; i++ ){
                let eachTab = $("[data-tab-target]")[i];
                $(eachTab).removeClass("active");
            };
            $(currentTarget).addClass("active");
            $(tab).addClass("active")
            });
        });
    }

    this.submitForm = (formID) => {
        let {ipcRenderer} = require("electron");
        const myData = $(`#${formID}`).serialize();
        ipcRenderer.sendSync("create-form-data",myData);
    };

};