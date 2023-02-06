// COMMMON CONSTANTS / FUNCTIONS
cy.sid = {
  // FOR LONG RUNNING CHECKS. IN MILLISECONDS
  timeout: 120000,
  // SID DASHBOARD CREDENTIALS
  auth: {
    username: Cypress.env('dashboard_username'),
    password: Cypress.env('dashboard_password')
  },
  //QUERY PARAMS TO ENABLE/DISABLE FEATURES WHEN NEEDED
  query_params: {
  },
  // CONFIGURED LAUNCHERS
  launchers: [
    {"id": "dev-rstudio", "token": "sys/Rstudio", "name": "Rstudio Server"},
    {"id": "dev-rdesktop", "token": "sys/OdysseyRD", "name": "Remote Desktop"},

    {"id": "cannon-rstudio", "token": "sys/RStudioServer", "name": "RStudio Server"},
    {"id": "cannon-rdesktop", "token": "sys/RemoteDesktop", "name": "Remote Desktop"},
    {"id": "cannon-jupyter", "token": "sys/Jupyter", "name": "Jupyter notebook / Jupyterlab"},
    {"id": "cannon-stata", "token": "sys/Stata", "name": "Stata"},
    {"id": "cannon-sas", "token": "sys/SAS", "name": "SAS"},
    {"id": "cannon-matlab", "token": "sys/Matlab", "name": "Matlab"},

    {"id": "fasse-rstudio", "token": "sys/RStudioServer", "name": "RStudio Server"},
    {"id": "fasse-rdesktop", "token": "sys/RemoteDesktop", "name": "Remote Desktop"},
    {"id": "fasse-jupyter", "token": "sys/Jupyter", "name": "Jupyter notebook / Jupyterlab"},
    {"id": "fasse-stata", "token": "sys/Stata", "name": "Stata"},
    {"id": "fasse-sas", "token": "sys/SAS", "name": "SAS"}
  ],

  // SPECIFIC CONFIG FOR SUPPORT TICKET FEATURE
  supportTicket: {
    //NOT ALL ENVIRONMENTS SUPPORT TICKET CREATION
    creationEnabled: true,
    queue: ""
  },

  // SCREEN RESOLUTIONS => TO TEST IN DIFFERENT SCREEN SIZES
  screen: {
    height: 2000,
    smallWidth: 450,
    mediumWidth: 800,
    largeWidth: 1500,
    extralargeWidth: 2000,
  },

  // TO MAKE HTML STRING EASY TO COMPARE
  normalize: (s) => s ? s.replace(/(\s+|\n|\r\n|\r)/g, ' ').trim().toLowerCase() : "",

  // ESCAPE SPECIAL CHARATERS IN REGULAR EXPRESSIONS
  regexEscape: (s) => s ? s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : "",

  // REMOVE CHARACTERS AT THE END OF STRINGS
  trim: function (source, char) {
    if(!source || !char) {
      return source
    }

    var regExp = new RegExp(char + "+$");
    var result = source.replace(regExp, "");
  
    return result;
  },
}