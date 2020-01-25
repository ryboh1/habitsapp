exports.sqlQueries = function sqlQueries(theConnection){

    this.connection = theConnection;
  
    this.queryDatabase = (theSQLCommand) => {
        this.connection.query(theSQLCommand, (err, result) => {
          if(err) throw err;
        });
      };

      
    this.getValue = (theSQLCommand,theResolve) => {
      this.connection.query(theSQLCommand, (err, result) => {
        if(err) throw err;
        theResolve(result);
      });
    };

  };