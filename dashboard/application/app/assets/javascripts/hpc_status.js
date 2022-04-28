const HPCStatusService = (function (){

    const STATUS_CONTAINER_SELECTOR = "[data-toggle='hpc-status'], [data-toggle='hpc-issues']"

    const CLUSTER_STATUS_MAP = {
        "up": { css: "ok", text: "No known issues", dataToggle: ['hpc-status'] },
        "hasissues":  { css: "issues", text: "Experiencing issues", dataToggle: ['hpc-status', 'hpc-issues']  },
        "undermaintenance":  { css: "maintenance", text: "Under maintenance", dataToggle: ['hpc-status', 'hpc-issues'] },
        "unknown":  { css: "unknown", text: "Unknown", dataToggle: ['hpc-status'] },
    }

    function addStatusWidget($statusContainer, status) {
        const statusElement =
            `<div className="status-container">
                <p class="hpc-status ${status.css}">
                   Current status: <span>${status.text}</span>
                </p>
             </div>`

        $statusContainer.html(statusElement)
    }

    function addStatusToContainers(status) {
        $(STATUS_CONTAINER_SELECTOR).each((index, element) => {
            const $statusContainer = $(element)
            const dataToggle = $statusContainer.attr("data-toggle")
            if (status.dataToggle.includes(dataToggle)) {
                addStatusWidget($statusContainer, status)
            }
        })
    }

    function getStatus() {
        $.ajax({
            type: 'GET',
            url: 'https://fasrc.instatus.com/summary.json',
        })
        .done(data => {
            let statusCode = data && data.page && data.page.status ? data.page.status.toLowerCase() : 'unknown'
            statusCode = 'undermaintenance'
            const status = CLUSTER_STATUS_MAP[statusCode] || CLUSTER_STATUS_MAP['unknown']
            addStatusToContainers(status)
        })
        .fail(( jqxhr, settings, exception ) => {
            console.log(`Error getting FASRC cluster status. Exception=${exception}`)
            addStatusToContainers(CLUSTER_STATUS_MAP['unknown'])
        })
    }

    $(function() {
        const statusContainers = $(STATUS_CONTAINER_SELECTOR).length
        if(statusContainers) {
            getStatus()
            console.log(`HPC Status executed. items=${statusContainers}`)
        }
    });

    return { getStatus }
})()