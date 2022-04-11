function prepareCommunityPostsParams(sbksData, params) {
    params.fields = sbksData.community_posts_fields

    if (sbksData.community_posts_filters.order) {
        params.sort = [
            {field: 'created_time', order: sbksData.community_posts_filters.order}
        ]
        delete sbksData.community_posts_filters['order']
    }

    if (sbksData.community_posts_filters.limit) {
        params.limit = parseInt(sbksData.community_posts_filters.limit)
        delete sbksData.community_posts_filters['limit']
    }

    for (const [field, value] of Object.entries(sbksData.community_posts_filters)) {
        if (field === 'post_labels') {
            params.filter = params.filter || []
            params.filter.push({match_all: [{field: field, value: value}]})
        } else {
            params.filter = params.filter || []
            params.filter.push({field: field, value: value})
        }
    }
    return params
}

function processPost(post) {
    let row = {}
    for (let [field, value] of Object.entries(post)) {
        let fieldObj = COMMUNITY_POSTS_FIELDS[field]
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

async function getCommunityPostsData(sbksData) {
    let selectedProfiles = []
    let dateRange = adjustDateRange(sbksData.date_range)
    for (const [network, network_profiles] of Object.entries(sbksData.profiles_selected)) {
        for (const profileId of Object.keys(network_profiles)) {
            selectedProfiles.push({id: profileId, platform: network})
        }
    }

    let params = prepareCommunityPostsParams(sbksData, {
        date_start: dateRange.start,
        date_end: dateRange.end,
        profiles: selectedProfiles
    })

    apiResponse = await doApiCall(sbksData.communityPostsUrl, sbksData, params)
    let rows = []

    if (!apiResponse || !apiResponse.data) {
        return rows
    }

    for (const post of apiResponse.data.posts) {
        rows.push(processPost(post))
    }

    return rows
}
