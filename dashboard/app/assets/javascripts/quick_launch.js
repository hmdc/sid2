const LaunchButtonService = (function (){
    function showError() {
        $("#launch-button-error").fadeOut(1000).fadeIn(1000)
    }

    function showSpinner(launchButtonId) {
        $(`#${launchButtonId} .launch-button-spinner`).show()
    }
    function hideSpinner(launchButtonId) {
        $(`#${launchButtonId} .launch-button-spinner`).delay(1000).fadeOut(200)
    }

    function reloadSessions(reloadSessionsUrl) {
        return $.getScript(reloadSessionsUrl)
    }

    function submitJobToCluster(event) {
        const launchButtonId = event.currentTarget.id
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
            $("#sessions-container").prepend(`<div id="${data.id}"></div>`);
            reloadSessions(reloadSessionsUrl)
                .fail(( jqxhr, settings, exception ) => {
                    console.log(`Error getting session data exception=${exception}`);
                })
                .always(() => {
                    hideSpinner(launchButtonId)
                });
        })
        .fail(( jqxhr, settings, exception ) => {
            console.log(`Error submitting job exception=${exception}`);
            hideSpinner(launchButtonId)
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