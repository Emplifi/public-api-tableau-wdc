function prepareFbAdsAdParams(sbksData) {
    let dateRange = adjustDateRange(sbksData.date_range)
    let params = sbksData.fb_ads_ad_params
    params.ad_accounts = sbksData.profiles_selected.facebook_ads
    params.date_start = dateRange.start
    params.date_end = dateRange.end

    return params
}

function processFbAdsAdPost(post) {
    let row = {}
    for (let [field, value] of Object.entries(post)) {
        let fieldObj = FACEBOOK_ADS_AD_FIELDS[field]
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

async function getFbAdsAdData(sbksData) {
    let params = prepareFbAdsAdParams(sbksData)

    apiResponse = await doApiCall(sbksData.fb_ads_ad_url, sbksData, params)
    let rows = []
    if (!apiResponse || !apiResponse.data) {
        return rows
    }

    for (const post of apiResponse.data.posts) {
        rows.push(processFbAdsAdPost(post))
    }

    return rows
}
