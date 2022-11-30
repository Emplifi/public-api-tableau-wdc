function prepareListeningParams(sbksData, params) {
    params.listening_queries = sbksData.listening_filters.listening_queries || []

    params.metrics = (sbksData.listening_filters.metrics || []).map(metric => {
        return {'metric': metric}
    })

    if (sbksData.listening_filters.dimensions) {
        params.dimensions = (sbksData.listening_filters.dimensions || []).map(dimension => {
            return {'type': dimension}
        })
    }

    for(const [field, value] of Object.entries(sbksData.listening_filters)) {
        if (!value) {
            continue
        }

        if (field === 'post_labels') {
            params.filter = params.filter || []
            params.filter.push({match_all: [{field: 'post_labels', value: value}]})
        } else if (field !== 'metrics' && field !== 'dimensions' && field !== 'listening_queries') {
            params.filter = params.filter || []
            params.filter.push({field: field, value: value})
        }
    }

    return params
}

async function getListeningData(sbksData) {
    let dateRange = adjustDateRange(sbksData.date_range)

    let params = prepareListeningParams(sbksData, {
        date_start: dateRange.start,
        date_end: dateRange.end
    })

    apiResponse = await doApiCall(sbksData.listening_url, sbksData, params)
    let rows = []

    if (!apiResponse || !apiResponse.data) {
        return rows
    }

    if (apiResponse.header.length === 1) {
        processMetricItem(sbksData, apiResponse, apiResponse.data, 0, 0, {}, rows)
    } else {
        for (const [index, item] of Object.entries(apiResponse.data)) {
            processMetricItem(sbksData, apiResponse, item, 0, index, {}, rows)
        }
    }

    return rows
}
