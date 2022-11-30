function prepareListeningContentParams(sbksData, params) {
    params.fields = sbksData.listening_content_fields
    params.listening_queries = sbksData.listening_content_filters.listening_queries

    if (sbksData.listening_content_filters.order || sbksData.listening_content_filters.sort) {
        params.sort = [
            {
                field: sbksData.listening_content_filters.sort || 'comments',
                order: sbksData.listening_content_filters.order || 'desc'
            }
        ]
    }

    for (const [field, value] of Object.entries(sbksData.listening_content_filters)) {
        if (field === 'post_labels') {
            params.filter = params.filter || []
            params.filter.push({match_all: [{field: field, value: value}]})
        } else if (field !== 'sort' && field !== 'order' && field !== 'listening_queries') {
            params.filter = params.filter || []
            params.filter.push({field: field, value: value})
        }
    }

    return params
}

function processListeningContent(post) {
    let row = {}
    for (let [field, value] of Object.entries(post)) {
        let fieldObj = LISTENING_CONTENT_FIELDS[field]
        if (!fieldObj) {
            console.log(`Unknown field in the response: ${field}`)
            continue
        }

        if (fieldObj.type) {
            row[field] = value
            if (field === 'created_time') {
                row[field] = value.slice(0, -6)
            }
        } else if (fieldObj.array && fieldObj.subfields && Array.isArray(value)) {
            for (const [i, item] of Object.entries(value)) {
                if (i >= MAX_POSTS_ARRAY_DEPTH) {
                    break
                }

                for (const subField of Object.keys(fieldObj.subfields)) {
                    let formattedSubField = subField
                        .replace(/\./g, '_')
                        .replace(/-/g, '_')
                    row[`${field}_${formattedSubField}_${parseInt(i, 10) + 1}`] = item[subField]
                }
            }
        } else if (fieldObj.subfields && value) {
            for (const subField of Object.keys(value)) {
                let formattedSubField = subField
                    .replace(/\./g, '_')
                    .replace(/-/g, '_')
                row[`${field}_${formattedSubField}`] = value[subField]
            }
        }
    }

    return row
}

async function getListeningContentData(sbksData) {
    let dateRange = adjustDateRange(sbksData.date_range)

    let params = prepareListeningContentParams(sbksData, {
        date_start: dateRange.start,
        date_end: dateRange.end
    })

    apiResponse = await doApiCall(sbksData.listening_content_url, sbksData, params)
    let rows = []

    if (!apiResponse || !apiResponse.data) {
        return rows
    }

    for (const post of apiResponse.data.posts) {
        rows.push(processListeningContent(post))
    }

    return rows
}
