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
          
    this.loadForm = () => {
        $("#create-form").load(`./create/create-forms.html #goal`);
    }
    };