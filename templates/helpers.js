function template(currentPagePath){

    this.currentPagePath = currentPagePath;

    this.loadTemplate = async (pageHeading) => { 
        /* Waits for navbar to be loaded first */
            await new Promise(resolve => $('#nav').load('./nav.html', resolve));

            $("#currentPage").load(this.currentPagePath);
            $('#footer').load('./footer.html');
            $(`#${pageHeading}`).addClass("current-page");
          };
          
    this.loadForm = () => {
        $("#currentForm").load(`./create-forms.html`);
    }
    };