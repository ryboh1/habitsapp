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
            
            let habitName;
            $('#listOfHabits label').remove();
            
            $.each(returnedOptions, (index, habit) => {
                if(habit == ""){
                    habit = "No Goal Set";
                    habitName = "";
                }
                else{
                    habitName = habit;
                }
                $("#listOfHabits").append(`<label class="habit-list">${habit}<input value="${habitName}" name="habits-group" type="radio" onclick="changeAnchorLink()"><span class="checkmark"></span></li>`);
            });
        });
    };
    
    this.getCheatSheetData = (theTable,theGoalTwo) =>{

        let theData = [theTable, theGoalTwo];
        ipcRenderer.send("cheat-sheet", theData);

        ipcRenderer.on("returned-data", (event, dataObject) =>{
            this.insertCheatSheetData(dataObject);
            
        })

    }

    this.insertCheatSheetData = (theObject) => {
        $.each(theObject, (name, value) => {
            $(`#${name}`).html(`${value}`);
        });
    };
};