exports.sqlQueries = function sqlQueries(theConnection){

    this.connection = theConnection;
  
    this.queryDatabase = (theSQLCommand) => {

        this.connection.query(theSQLCommand, (err, result) => {
          if(err) throw err;
        });
      };

    this.getValue = (theSQLCommand,theResolve) => {
      let theValue;

      this.connection.query(theSQLCommand, (err, result) => {
        if(err) throw erro;
        theValue = result[0]["@@IDENTITY"];
        theResolve(theValue);
      });
    };

  };