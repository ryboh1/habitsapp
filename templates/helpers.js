function template(){

    this.loadTemplate = async (currentPage) => { 
        /* When the load is complete the resolve function is then used */
            await new Promise(resolve => $('#nav').load('./nav.html', resolve))
            await new Promise(resolve => $('#footer').load('./footer.html', resolve))
            $(`#${currentPage}`).addClass("current-page")
          }        
    };