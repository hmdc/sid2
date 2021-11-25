describe('Sid Dashboard - API', () => {

  const baseUrl = Cypress.env('dashboard_baseUrl')
  const rootPath = Cypress.env('dashboard_rootPath')
  const auth = cy.sid.auth
  const launchers = cy.sid.launchers
  const activeLaunchers = cy.sid.launchers.filter(l => Cypress.env('active_launchers').includes(l.id))
  const interactiveApps = Cypress.env('dashboard_applications')
  Cypress.config('baseUrl', baseUrl);

  const configureRequest = (path, requestMethod='GET', body=null) => {
    const requestOptions = {
      url: `${rootPath}${path}`,
      method: requestMethod,
      failOnStatusCode: false,
      auth
     }

     if(body) {
      requestOptions.body = body
     }

     return requestOptions
  }

  const assertLaunchers = (launchers, apiLaunchers) => {
    launchers.forEach(launcher => {
      const apiLauncher = apiLaunchers.filter(l => l.metadata.id === launcher.id)
      expect(apiLauncher.length).to.equal(1)
      // CHECK BASIC ATTRIBUTES
      expect(apiLauncher[0]).to.have.property('metadata')
      expect(apiLauncher[0].metadata).to.have.property('id')
      expect(apiLauncher[0].metadata).to.have.property('type')
      expect(apiLauncher[0].metadata).to.have.property('status')
      expect(apiLauncher[0]).to.have.property('form')
      expect(apiLauncher[0].form).to.have.property('token')
      expect(apiLauncher[0].form).to.have.property('cluster')
      expect(apiLauncher[0]).to.have.property('view')
      expect(apiLauncher[0].view).to.have.property('logo')
      expect(apiLauncher[0].view).to.have.property('p1')
      expect(apiLauncher[0].view).to.have.property('p2')
      expect(apiLauncher[0].view).to.have.property('p3')

      expect(apiLauncher[0].metadata.id).to.equal(launcher.id)
      expect(apiLauncher[0].metadata.status).to.match(/active/i)
      expect(apiLauncher[0].form.token).to.equal(launcher.token)
      expect(apiLauncher[0].view.p1).to.match(new RegExp(launcher.name, 'i'))
    })
  }

  const assertInteractiveSession = (responseBody, input) => {
    expect(responseBody.id).to.equal(input.sessionId)
    expect(responseBody.clusterId).to.equal(input.cluster)
    expect(responseBody.token).to.equal(input.token)

    expect(responseBody).to.have.property('createdAt')
    expect(responseBody).to.have.property('jobId')
    expect(responseBody).to.have.property('status')
    expect(responseBody).to.have.property('type')
    expect(responseBody).to.have.property('info')
    expect(responseBody).to.have.property('completionInfo')
  }

  const checkInteractiveSession = (sessionId, launcherInfo) => {
    cy.log(`Requesting sessionId: ${sessionId}`)
    cy.task('log', `Requesting sessionId: ${sessionId}`)
    cy.request(configureRequest(`/ws/sessions/${sessionId}`))
    .then(getSessionResponse => {
      expect(getSessionResponse.status).to.eq(200)
      assertInteractiveSession(getSessionResponse.body, {
        sessionId: sessionId,
        cluster: launcherInfo.form.cluster,
        token: launcherInfo.form.token
      })
    })
  }

  const deleteInteractiveSession = sessionId => {
    cy.log(`Deleting sessionId: ${sessionId}`)
    cy.task('log', `Deleting sessionId: ${sessionId}`)
    cy.request(configureRequest(`/ws/sessions/${sessionId}`, 'DELETE'))
    .then(deleteResponse => {
      expect(deleteResponse.status).to.eq(204)
    })
  }

  it('API: GET /clusters - Should get cluster information', () => {
    cy.request(configureRequest('/ws/clusters'))
    .then(response => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('uname')
      expect(response.body.uname).to.equal(cy.sid.auth.username)

      expect(response.body).to.have.property('groups')
      
      expect(response.body).to.have.property('clusters')
      expect(response.body.clusters.length).to.be.at.least(1)
      expect(response.body.clusters[0]).to.have.property('id')
      expect(response.body.clusters[0]).to.have.property('name')
      expect(response.body.clusters[0]).to.have.property('defaultPartition')
      expect(response.body.clusters[0]).to.have.property('userPartitions')
    })
  })

  it('API: GET /launchers - Should get launcher information', () => {
    cy.request(configureRequest('/ws/launchers'))
    .then(response => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('items')
      expect(response.body.items.length).to.equal(launchers.length)
      //VERIFY ALL EXPECTED LAUNCHERS ARE RETURNED
      assertLaunchers(launchers, response.body.items)
      //CHECK OPERATIONAL LAUNCHERS => THIS IS ENVIRONMENT DEPENDENT
      const operationalLaunchers = response.body.items.filter(l => l.metadata.operational)
      expect(operationalLaunchers.length).to.equal(activeLaunchers.length)
      assertLaunchers(activeLaunchers, response.body.items)
    })
  })

  it('API: GET /sessions - Should get recently created session', () => {
    // FIND OPERATIONAL LAUNCHER
    cy.request(configureRequest('/ws/launchers'))
    .then(launchersResponse => {
      const launcherInfo = launchersResponse.body.items.filter(l => l.metadata.operational)[0]
      cy.log(`Creating session for: ${launcherInfo.metadata.id}`)
      cy.task('log', `Creating session for: ${launcherInfo.metadata.id}`)
      cy.request(configureRequest('/ws/sessions', 'POST', launcherInfo.form))
      .then(createResponse => {
        expect(createResponse.status).to.eq(200)
        const sessionId = createResponse.body.id
        // GET ALL SESSIONS. ENSURE NEW SESSION IS RETURNED
        cy.request(configureRequest('/ws/sessions'))
        .then(sessionsResponse => {
          expect(sessionsResponse.status).to.eq(200)
          expect(sessionsResponse.body).to.have.property('items')
          expect(sessionsResponse.body.items.length).to.be.at.least(1)
          const createdSession = sessionsResponse.body.items.filter(s => s.id === sessionId)
          // CREATED SESSION SHOULD BE IN ITEMS
          expect(createdSession.length).to.equal(1)
          // ASSERT SESSION DATA
          assertInteractiveSession(createdSession[0], {
            sessionId: sessionId,
            cluster: launcherInfo.form.cluster,
            token: launcherInfo.form.token
          })
        })
        //DELETE SESSION
        deleteInteractiveSession(sessionId)
      })
    })
  })

  it('API: GET /sessions/<sesionId> - Should return 404 when sessionId is not found', () => {
    cy.request(configureRequest('/ws/sessions/12345'))
    .then(response => {
      expect(response.status).to.eq(404)
      expect(response.body).to.have.property('message')
      // SHOULD RETURN THE SESSION ID IN THE MESSAGE
      expect(response.body.message).to.match(/12345/i)
    })
  })

  it('API: POST /sessions - Should return 400 response when missing token', () => {
    cy.request(configureRequest('/ws/sessions', 'POST', {}))
    .then(response => {
      expect(response.status).to.eq(400)
      expect(response.body).to.have.property('message')
      expect(response.body.message).to.match(/missing token/i)
    })
  })

  it('API: POST /sessions - Should return 400 when token is invalid', () => {
    cy.request(configureRequest('/ws/sessions', 'POST', {token: 'invalid'}))
    .then(response => {
      expect(response.status).to.eq(400)
      expect(response.body).to.have.property('message')
    })
  })

  it('API: POST /sessions - Should create, get, and delete an interactive session', () => {
    // FIND OPERATIONAL LAUNCHER
    cy.request(configureRequest('/ws/launchers'))
    .then(launchersResponse => {
      const launcherInfo = launchersResponse.body.items.filter(l => l.metadata.operational)[0]
      cy.log(`Creating session for: ${launcherInfo.metadata.id}`)
      cy.task('log', `Creating session for: ${launcherInfo.metadata.id}`)
      cy.request(configureRequest('/ws/sessions', 'POST', launcherInfo.form))
      .then(createResponse => {
        expect(createResponse.status).to.eq(200)
        expect(createResponse.body).to.have.property('id')
        // GET SESSION INFO
        const sessionId = createResponse.body.id
        checkInteractiveSession(sessionId, launcherInfo)
        //DELETE SESSION
        deleteInteractiveSession(sessionId)
      })
    })
  })

  it('API: DELETE /sessions/<sesionId> - Should return 404 when sessionId is not found', () => {
    cy.request(configureRequest('/ws/sessions/12345', 'DELETE'))
    .then(response => {
      expect(response.status).to.eq(404)
      expect(response.body).to.have.property('message')
      // SHOULD RETURN THE SESSION ID IN THE MESSAGE
      expect(response.body.message).to.match(/12345/i)
    })
  })

})