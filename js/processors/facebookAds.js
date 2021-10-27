async function getFbAdsData(sbksData) {
    let dateRange = adjustDateRange(sbksData.date_range)
    const payloads = getFacebookAdsPayloads(dateRange, sbksData.adaccounts, sbksData.campaigns, sbksData.fb_ads)

}

function getFacebookAdsPayloads (dateRange, adAccounts, adCampaigns, fbAdsConfig) {
    const adAccountChunks = chunkArray(adAccounts.map((acc) => acc.id), MAX_AD_ACCOUNTS)
    const adCampaignChunks = chunkArray(adCampaigns.map((acc) => acc.id), MAX_AD_CAMPAIGNS)
    const rangeChunks = splitDateRange(dateRange.start, dateRange.end, MAX_DAYS)

    const filters = buildFacebookFilters(fbAdsConfig.filters)
    const metrics = fbAdsConfig.fields.map((field) => {return {metric: field}})
    const metricsIndexes = {}
    for (const [index, metric] of Object.entries(metrics)) {
        metricsIndexes[metric] = index
    }
    const dimensions = buildFacebookDimensions(
        fbAdsConfig["dimensions"],
        fbAdsConfig["sorts"],
        metricsIndexes,
    )

    const payloads = []
    for (const [start, end] of Object.entries(rangeChunks)) {
        for (const accounts_chunk of adAccountChunks) {
            for (const campaigns_chunk of adCampaignChunks) {
                const payload = {
                    'date_start': start,
                    'date_end': end,
                    'ad_accounts': accounts_chunk,
                    'metrics': metrics,
                    'dimensions': dimensions,
                }
                if (filters.length !== 0) {
                    payload['filter'] = filters
                }
                if (adCampaigns.length !== 0 && adCampaigns[0] !== '') {
                    payload['ad_campaigns'] = campaigns_chunk
                }
                payloads.push(payload)
            }
        }
    }
    return payloads
}

function buildFacebookFilters(filters) {
    return Object.keys(filters).map((filter) => {
        return {
            field: filter,
            value: filters[filter],
        }
    })
}

function buildFacebookDimensions (dimensions, sorts, metricsIndexes) {
    const dimensionsApiFormat = []
    for (const dimension of dimensions) {
        let group = {}
        if (sorts.sort && !facebookDimensions.includes(sorts.sort)) {
            group = {
                'sort': {
                    'key': 'value',
                    'order': sorts.order,
                    'valueIndex': Number(metricsIndexes[sorts.sort]),
                },
            }
        } else if (sorts && dimension === sorts.sort) {
            group = {
                'sort': {
                    'key': 'field',
                    'order': sorts.order,
                },
            }
        }
        group['limit'] = (
            dimension === 'campaign' ? sorts.campaign_limit : dimension === 'country' ? sorts.country_limit : 2000
        )
        dimensionsApiFormat.push(
            {
                type: dimension,
                group: group,
                other: false,
            }
        )
    }
    return dimensionsApiFormat
}
