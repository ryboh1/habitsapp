function template(currentPagePath){

    this.currentPagePath = currentPagePath;

    this.loadTemplate = async (pageHeading,navPath, footerPath, theResolve) => { 
            /* waits for nav, current page and footer to load before proceeding*/
            await new Promise(resolve => $('#nav').load(`${navPath}`, resolve));
            await new Promise(resolve => $("#currentPage").load(this.currentPagePath, resolve));
            await new Promise(resolve => $('#footer').load(`${footerPath}`, resolve));
            
            $(`#${pageHeading}`).addClass("current-page");
            
            if(theResolve == undefined){
                return;
            }
            
            return theResolve("completed");
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
            for(let i = 0; i < amountOfTabs; i++ ){
                let eachTab = $("[data-tab-target]")[i];
                $(eachTab).removeClass("active");
            };

            const currentTarget = $(tab.dataset.tabTarget);
            $(currentTarget).addClass("active");
            $(tab).addClass("active")

            
            });
        });


    }
};
