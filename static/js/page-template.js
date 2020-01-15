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

    this.submitForm = (formID) => {
        let {ipcRenderer} = require("electron");
        const myData = $(`#${formID}`).serialize();
        ipcRenderer.sendSync("create-form-data",myData);
    };

};