let $listeningMetrics = $('#listeningMetrics')
let $listeningMetricsSpinner = $('#listeningMetricsSpinner').hide()

$(function () {
    $listeningMetrics.submit(onListeningMetricsSubmit)
})

async function onListeningMetricsSubmit(e) {
    e.preventDefault()
    $listeningMetricsSpinner.show()

    SBKS.listening_filters = []

    let post_fields = {}
    for (const item of $listeningMetrics.serializeArray()) {
        if (['', undefined, null].includes(item.value)) {
            continue
        }

        if (item.name === 'daterange') {
            SBKS.date_range = parseDateRange(item.value)
            continue
        }

        post_fields = processFormField(post_fields, item)
    }

    SBKS.listening_filters = post_fields

    tableau.connectionData = JSON.stringify(SBKS)
    invokeConnector(SBKS.data_source)
}

function renderListeningMetrics() {
    $mainMenu.show()
    $listeningMetrics.show()

    // Fix the positioning bug with select2
    $('select').each(function () {
        if ($(this).outerWidth() > 10) {
            $(this).css({width: `${$(this).outerWidth() - 1}px`})
        }
    })

    $('#listening_country').select2({
        multiple: true,
        data: facebookAdsFilter.country.map(country => {
            return {id: country.country_code, text: country.name}
        })
    })

    $('#listening_language').select2({
        multiple: true,
        data: LANGUAGES.map(label => {
            return {id: label.code, text: label.name}
        })
    })

    $('#listening_queries').select2({
        multiple: true,
        data: SBKS.listening_queries.map(query => {
            return {id: query.id, text: `${query.name} (${query.status || ' Status Unknown '})`}
        })
    })

    $('#listening_post_labels').select2({
        multiple: true,
        data: SBKS.post_labels.map(label => {
            return {id: label.id, text: label.name}
        })
    })

    $('#listeningMetricsSelect').empty().select2({
        data: Object.keys(LISTENING_METRICS).map(v => {
            return {id: v, text: v.charAt(0).toUpperCase() + v.slice(1).replace(/_/g, ' ')}
        })
    })

    $('#listeningDimensionsSelect').empty().select2({
        data: LISTENING_DIMENSIONS.map(v => {
            return {id: v, text: v.charAt(0).toUpperCase() + v.slice(1).replace(/_/g, ' ')}
        })
    })
    $('select.form-select[multiple]').select2()
}
