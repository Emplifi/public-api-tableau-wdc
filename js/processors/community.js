function prepareCommunityParams(sbksData, params) {
    params.metrics = (sbksData.community_metrics || []).map(metric => {
        return {'metric': metric}
    })

    params.dimensions = (sbksData.community_dimensions || []).map(dimension => {
        if (['date', 'response_date'].includes(dimension) && sbksData.time_dimension) {
            return {'type': dimension, 'aggregation': sbksData.time_dimension}
        }

        return {'type': dimension}
    })

    if (sbksData.community_profile_labels) {
        params.filter = params.filter || []
        params.filter.push({match_all: [{field: 'profile_labels', value: sbksData.community_profile_labels}]})
    }

    if (sbksData.community_post_labels) {
        params.filter = params.filter || []
        params.filter.push({match_all: [{field: 'post_labels', value: sbksData.community_post_labels}]})
    }

    return params
}


async function getCommunityData(sbksData) {
    let selectedProfiles = []
    let dateRange = adjustDateRange(sbksData.date_range)
    for (const [network, network_profiles] of Object.entries(sbksData.profiles_selected)) {
        for (const profileId of Object.keys(network_profiles)) {
            selectedProfiles.push({id: profileId, platform: network})
        }
    }

    let params = prepareCommunityParams(sbksData, {
        date_start: dateRange.start,
        date_end: dateRange.end,
        profiles: selectedProfiles
    })

    apiResponse = await doApiCall(sbksData.communityUrl, sbksData, params)
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
