const HPCStatusService = (function (){

    const CLUSTER_STATUS_MAP = {
        "up": { css: "ok", text: "No known issues" },
        "hasissues":  { css: "issues", text: "Experiencing issues" },
        "undermaintenance":  { css: "maintenance", text: "Under maintenance" },
        "unknown":  { css: "unknown", text: "Unknown" },
    }

    function addStatusWidget($statusContainer, status) {
        const statusElement =
            `<p class="hpc-status ${status.css}">
                Current status: <span>${status.text}</span>
             </p>`

        $statusContainer.html(statusElement)
    }

    function getStatus($statusContainer) {
        $.ajax({
            type: 'GET',
            url: 'https://fasrc.instatus.com/summary.json',
        })
            .done(data => {
                const statusCode = data && data.page && data.page.status ? data.page.status.toLowerCase() : 'unknown'
                const status = CLUSTER_STATUS_MAP[statusCode]
                addStatusWidget($statusContainer, status)
            })
            .fail(( jqxhr, settings, exception ) => {
                console.log(`Error getting FASRC cluster status. Exception=${exception}`)
                addStatusWidget($statusContainer, CLUSTER_STATUS_MAP['unknown'])
            })
    }

    $(function() {
        $("[data-toggle='hpc-status']").each((index, element) => {
            const $statusContainer = $(element)
            getStatus($statusContainer)
            console.log(`HPC Status attached to: ${$statusContainer.attr("id")}`)
        })
    });

    return { getStatus }
})()