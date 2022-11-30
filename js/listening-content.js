let $listeningContentDiv = $('#listeningContent')
let $listeningContent = $('#listeningContentForm')
let $listeningContentSpinner = $('#listeningContentSpinner').hide()

$(function () {
    $listeningContent.submit(onlisteningContentSubmit)
})

async function onlisteningContentSubmit(e) {
    e.preventDefault()
    $listeningContentSpinner.show()

    let post_fields = {}
    for (const item of $listeningContent.serializeArray()) {
        if (['', undefined, null].includes(item.value)) {
            continue
        }

        if (item.name === 'daterange') {
            SBKS.date_range = parseDateRange(item.value)
            continue
        }

        post_fields = processFormField(post_fields, item)
    }

    SBKS.listening_content_fields = post_fields.fields || []
    delete post_fields["fields"]
    SBKS.listening_content_filters = post_fields

    tableau.connectionData = JSON.stringify(SBKS)

    invokeConnector(SBKS.data_source)
}

function renderListeningContent() {
    $mainMenu.show()
    $listeningContentDiv.show()

    // Fix the positioning bug with select2
    $('select').each(function () {
        if($(this).outerWidth() > 10) {
            $(this).css({width: `${$(this).outerWidth() - 1}px`})
        }
    })

    $('#listening_content_country').select2({
        multiple: true,
        data: facebookAdsFilter.country.map(country => {
            return {id: country.country_code, text: country.name}
        })
    })

    $('#listening_content_language').select2({
        multiple: true,
        data: LANGUAGES.map(label => {
            return {id: label.code, text: label.name}
        })
    })

    $('#listening_content_queries').select2({
        multiple: true,
        data: SBKS.listening_queries.map(query => {
            return {id: query.id, text: `${query.name} (${query.status || ' Status Unknown '})`}
        })
    })

    $('#listening_content_post_labels').select2({
        multiple: true,
        data: SBKS.post_labels.map(label => {
            return {id: label.id, text: label.name}
        })
    })

    let listening_content_fields = []
    for (const field of Object.keys(LISTENING_CONTENT_FIELDS)) {
        let text = field.replace(/_/g, ' ')
        listening_content_fields.push({id: field, text: text.charAt(0).toUpperCase() + text.slice(1)})
    }

    $('#listening-content-fields')
        .select2({multiple: true, data: listening_content_fields})
        .val(['id', 'author', 'created_time', 'profileId']).change()

    $('select.form-select[multiple]').select2()
}
