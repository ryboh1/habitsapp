function template(currentPagePath){

    this.currentPagePath = currentPagePath;

    this.loadTemplate = async (pageHeading) => { 
        /* When the load is complete the resolve function is then used */
            await new Promise(resolve => $('#nav').load('./nav.html', resolve));
            await new Promise(resolve => $("#currentPage").load(this.currentPagePath, resolve));
            await new Promise(resolve => $('#footer').load('./footer.html', resolve));
            $(`#${pageHeading}`).addClass("current-page");
          };
          
    this.loadForm = (currentForm) => {
        $("#create-forms").load(`create-forms.html #${currentForm}`);
        console.log("ran");
    }
    };