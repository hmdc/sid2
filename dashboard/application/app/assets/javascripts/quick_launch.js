const LaunchButtonService = (function (){
    let buttonsEnabled = true
    const DISABLE_BUTTON_HTML =`<div class="launch-button-overlay launch-button-disabled"></div>`
    const SPINNER_HTML =`<div class="launch-button-overlay launch-button-spinner"><div class="spinner-border" role="status"></div></div>`

    function showError() {
        $("#launch-button-error").fadeOut(1000).fadeIn(1000)
    }

    function showWaitingFeedback(activeButtonId) {
        buttonsEnabled = false
        $("[data-toggle='launch-button']").not(`#${activeButtonId}`).prepend(DISABLE_BUTTON_HTML)
        $(`#${activeButtonId}`).prepend(SPINNER_HTML)
    }

    function hideWaitingFeedback(activeButtonId) {
        $('.launch-button-spinner').delay(1000).fadeOut(300)
        $('.launch-button-disabled').delay(1000).fadeOut(300)
        setTimeout(() => {
            buttonsEnabled = true
            $('.launch-button-spinner').remove()
            $('.launch-button-disabled').remove()
        }, 1300)
    }

    function reloadSessions(sessionId, reloadSessionsUrl) {
        $("#sessions-container").prepend(`<div id="${sessionId}"></div>`);
        return $.getScript(reloadSessionsUrl)
    }

    function submitJobToCluster(event) {
        const launchButtonId = event.currentTarget.id
        if(!buttonsEnabled) {
            console.log(`QuickLaunchButton is not enabled: ${launchButtonId}`)
            return
        }
        const submitJobUrl = event.currentTarget.getAttribute("data-url")
        const reloadSessionsUrl = event.currentTarget.getAttribute("data-reload-url")
        showWaitingFeedback(launchButtonId)
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
                    hideWaitingFeedback(launchButtonId)
                });
        })
        .fail(( jqxhr, settings, exception ) => {
            console.log(`Error submitting job exception=${exception}`);
            hideWaitingFeedback(launchButtonId)
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

    return {showError, showWaitingFeedback, hideWaitingFeedback, reloadSessions, submitJobToCluster}
})()