const CopySessionDataService = (function (){
    let buttonEnabled = true

    function  sessionDataCopyHandler(event) {
        const sessionId = event.currentTarget.getAttribute("data-id")

        if(!buttonEnabled) {
            console.log(`Copy session data is not enabled: ${sessionId}`)
            return
        }

        buttonEnabled = false
        const sessionUrl = event.currentTarget.getAttribute("data-url")
        $.ajax({
            type: 'GET',
            url: sessionUrl,
        }).done(data => {
            //ADD DATE WHEN DATA WAS REQUESTED - MIGHT BE USEFUL
            data.sessionInfoDateTime = new Date().toISOString()
            const stringData = JSON.stringify(data, null, 2)
            $('#session-data-payload-collapse').collapse('hide')
            $('#session-data-payload').text(stringData)
            navigator.clipboard?.writeText(stringData)
            $('#session-data-modal').modal()
            buttonEnabled = true
        }).fail(( jqxhr, settings, exception ) => {
            console.log(`Error getting job information exception=${exception}`);
            buttonEnabled = true
        })
    }

    return { sessionDataCopyHandler }
})()