// COMMMON CONSTANTS / FUNCTIONS
cy.sid = {
  // FOR LONG RUNNING CHECKS. IN MILLISECONDS
  timeout: 120000,
  profiles: ['Sid', 'FASRC'],
  // SID DASHBOARD CREDENTIALS
  auth: {
    username: Cypress.env('dashboard_username'),
    password: Cypress.env('dashboard_password')
  },
  //QUERY PARAMS TO ENABLE/DISABLE FEATURES WHEN NEEDED
  query_params: {
  },
  ondemandApplications: [
    {"id": "main-genericrd", "token": "sys/GenericRD/main", "name": "Containerized FAS-RC Remote Desktop"},
    {"id": "main-rdesktop", "token": "sys/RemoteDesktop/main", "name": "Remote Desktop"},
    {"id": "main-omnisci", "token": "sys/OmniSci/main", "name": "OmniSci"},
    {"id": "main-postgresql", "token": "sys/Postgres/main", "name": "Postgresql db"},
    {"id": "main-totalview", "token": "sys/Totalview-Desktop/main", "name": "Desktop Environment for Totalview"},
    {"id": "main-matlab", "token": "sys/Matlab/main", "name": "Matlab"},
    {"id": "main-sas", "token": "sys/SAS/main", "name": "SAS"},
    {"id": "main-stata", "token": "sys/Stata/main", "name": "Stata"},
    {"id": "main-jbrowse", "token": "sys/JBrowse/main", "name": "JBrowse"},
    {"id": "main-jupyter", "token": "sys/Jupyter/main", "name": "Jupyter notebook / Jupyterlab"},
    {"id": "main-rstudio", "token": "sys/RStudioServer/main", "name": "RStudio Server"},
    {"id": "main-tensorboard", "token": "sys/TensorBoard/main", "name": "TensorBoard"},

    {"id": "dev-ql-matlab", "token": "sys/Matlab/ql_matlab_dev", "name": "Matlab"},
    {"id": "dev-ql-sas", "token": "sys/SAS/ql_sas_dev", "name": "SAS"},
    {"id": "dev-ql-stata", "token": "sys/Stata/ql_stata_dev", "name": "Stata"},
    {"id": "dev-ql-jupyter", "token": "sys/Jupyter/ql_jupyter_dev", "name": "Jupyter notebook / Jupyterlab"},
    {"id": "dev-ql-rstudio", "token": "sys/RStudioServer/ql_rstudio_dev", "name": "RStudio Server"},
    {"id": "dev-ql-rdesktop", "token": "sys/RemoteDesktop/ql_remotedesktop_dev", "name": "Remote Desktop"},

    {"id": "dev-app", "token": "sys/RstudioDev", "name": "Rstudio Dev"}
  ],
  // CONFIGURED LAUNCHERS
  launchers: [
    {"id": "dev-rstudio", "token": "sys/Rstudio", "name": "Rstudio Server"},
    {"id": "dev-rdesktop", "token": "sys/OdysseyRD", "name": "Remote Desktop"},

    {"id": "cannon-rstudio", "token": "sys/Rstudio", "name": "Rstudio Server"},
    {"id": "cannon-rdesktop", "token": "sys/NativeRD", "name": "FAS-RC Remote Desktop"},
    {"id": "cannon-jupyter", "token": "sys/Jupyter", "name": "Jupyter notebook / Jupyterlab"},
    {"id": "cannon-stata", "token": "sys/Stata", "name": "Stata"},
    {"id": "cannon-sas", "token": "sys/SAS", "name": "SAS"},
    {"id": "cannon-matlab", "token": "sys/Matlab", "name": "Matlab"},

    {"id": "fasse-rstudio", "token": "sys/Rstudio", "name": "Rstudio Server"},
    {"id": "fasse-rdesktop", "token": "sys/NativeRD", "name": "FAS-RC Remote Desktop"},
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