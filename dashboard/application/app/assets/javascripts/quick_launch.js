const LaunchButtonService = (function (){
    let buttonEnabled = true

    function pushAnalytics(launchButtonId) {
        dataLayer && dataLayer.push({'event':'launcherClick','launcherButtonId':launchButtonId});
    }

    function showError() {
        $("#launch-button-error").fadeOut(1000).fadeIn(1000)
    }

    function showSpinner(launchButtonId) {
        buttonEnabled = false
        $(`#${launchButtonId} .launch-button-spinner`).show()
    }
    function hideSpinner(launchButtonId) {
        $(`#${launchButtonId} .launch-button-spinner`).delay(1000).fadeOut(200)
        buttonEnabled = true
    }

    function reloadSessions(sessionId, reloadSessionsUrl) {
        $("#sessions-container").prepend(`<div id="${sessionId}"></div>`);
        return $.getScript(reloadSessionsUrl)
    }

    function submitJobToCluster(event) {
        const launchButtonId = event.currentTarget.id
        if(!buttonEnabled) {
            console.log(`QuickLaunchButton is not enabled: ${launchButtonId}`)
            return
        }
        const submitJobUrl = event.currentTarget.getAttribute("data-url")
        const reloadSessionsUrl = event.currentTarget.getAttribute("data-reload-url")
        showSpinner(launchButtonId)
        const payload = launchButtons[launchButtonId]
        $.ajax({
            dataType: 'json',
            type: 'POST',
            contentType: 'application/json',
            url: submitJobUrl,
            data: JSON.stringify(payload),
        })
        .done(data => {
            reloadSessions(data.id, reloadSessionsUrl)
                .fail(( jqxhr, settings, exception ) => {
                    console.log(`Error getting session data exception=${exception}`);
                })
                .always(() => {
                    //ONLY SHOW THE FIRST launchButtons['maxSessions'] SESSIONS
                    const maxSessions = launchButtons['maxSessions']
                    $(`#sessions-container > div:nth-child(${maxSessions})`).nextAll().fadeOut(1000, function() { $(this).remove(); })
                    hideSpinner(launchButtonId)
                    pushAnalytics(launchButtonId);
                });
        })
        .fail(( jqxhr, settings, exception ) => {
            console.log(`Error submitting job exception=${exception}`);
            hideSpinner(launchButtonId)
            pushAnalytics(launchButtonId);
            showError()
        })
    }

    $(function() {
        $("[data-toggle='launch-button']").each((index, element) => {
            const launchButton = $(element);
            const launchButtonId = $(launchButton).attr("id")
            launchButton.on("click", submitJobToCluster)
            console.log(`Launch button handler attached: ${launchButtonId}`)
        })
    });

    return {showError, showSpinner, hideSpinner, reloadSessions, submitJobToCluster}
})()