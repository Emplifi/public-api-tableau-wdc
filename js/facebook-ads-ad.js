let $facebookAdsAd = $('#facebook_ads_ad')
let $fbAdsAdForm = $('#facebookAdsAdForm')

$(function () {
    $fbAdsAdForm.submit(onFbAdsAdSubmit)
})

function onFbAdsAdSubmit(e) {
    e.preventDefault()
    $('#fbAdsAdSpinner').show()

    let post_fields = {}

    for (const item of $fbAdsAdForm.serializeArray()) {
        if (['', undefined, null].includes(item.value)) {
            continue
        }

        if (item.name === 'daterange') {
            SBKS.date_range = parseDateRange(item.value)
            continue
        }

        post_fields = processFormField(post_fields, item)
    }

    SBKS.fb_ads_ad_params = {}
    for (const [field, value] of Object.entries(post_fields)) {
        if (['ad_type', 'country', 'objective', 'placements', 'platform', 'post_labels'].includes(field)) {
            SBKS.fb_ads_ad_params[field] = value
        }
    }

    if (post_fields.campaigns) {
        SBKS.fb_ads_ad_params.campaigns = post_fields.campaigns
    }
    if (post_fields.fields) {
        SBKS.fb_ads_ad_params.fields = post_fields.fields
    }
    if (post_fields.sort) {
        SBKS.fb_ads_ad_params.sort = {field: post_fields.sort, order: post_fields.order}
    }

    if (post_fields.ad_limit) {
        SBKS.fb_ads_ad_params.limit = parseInt(post_fields.ad_limit)
    }

    tableau.connectionData = JSON.stringify(SBKS)
    invokeConnector(SBKS.data_source)
}


function renderFacebookAdsAd() {
    $('#fbAdsAdSpinner').hide()
    renderFacebookAdsAdFiltersSorts()
    $facebookAdsAd.show()

    // Fix the positioning bug with select2
    $('select').each(function () {
        if($(this).outerWidth() > 10) {
            $(this).css({width: `${$(this).outerWidth() - 1}px`})
        }
    })

    let data = []
    for (const [field, config] of Object.entries(FACEBOOK_ADS_AD_FIELDS)) {
        let text = field.replace(/_/g, ' ')
        data.push({id: field, text: text.charAt(0).toUpperCase() + text.slice(1)})
    }
    $('#adFields').select2({multiple: true, data: data})
    $('#adCampaigns').select2({
        multiple: true,
        data: SBKS.campaigns.map(campaign => {
            return {id: `${campaign.ad_account_id}#${campaign.id}`, text: campaign.name}
        })
    })

    $('#ad_post_labels').select2({
        multiple: true,
        data: SBKS.post_labels.map(label => {
            return {id: label.id, text: label.name}
        })
    })


    $('select.form-select[multiple]').select2()
}

function renderFacebookAdsAdFiltersSorts() {
    facebookAdsFilter.country.forEach((item)=>{
        $(`#ad_country`).append($('<option>', {
                value: item.country_code,
                text: item.name.charAt(0).toUpperCase() + item.name.slice(1),
            })
        )
    })
}
