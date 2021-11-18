//COMMMON CONSTANTS / FUNCTIONS
cy.sid = {
  //FOR LONG RUNNING CHECKS
  timeout: 60000,
  //SID DASHBOARD CREDENTIALS
  auth: {
    username: Cypress.env('dashboard_username'),
    password: Cypress.env('dashboard_password')
  },

  //SCREEN RESOLUTIONS => TO TEST IN DIFFERENT SCREEN SIZES
  screen: {
    height: 2000,
    smallWidth: 450,
    mediumWidth: 800,
    largeWidth: 1500,
    extralargeWidth: 2000,
  },

  //TO MAKE HTML STRING EASY TO COMPARE
  normalize: (s) => s ? s.replace(/(\s+|\n|\r\n|\r)/g, ' ').trim().toLowerCase() : "",

  //ESCAPE SPECIAL CHARATERS IN REGULAR EXPRESSIONS
  regexEscape: (s) => s ? s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : "",

  //REMOVE CHARACTERS AT THE END OF STRINGS
  trim: function (source, char) {
    if(!source || !char) {
      return source
    }

    var regExp = new RegExp(char + "+$");
    var result = source.replace(regExp, "");
  
    return result;
  },
}