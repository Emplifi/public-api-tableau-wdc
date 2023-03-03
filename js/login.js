let $login = $('#login')
let $loginSpinner = $('#loginSpinner').hide()

async function fetchProfilesAndLabels() {
    SBKS.profiles = {}

    let requests = {}
    for (const network of SBKS.networks) {
        requests[network] = callSbksApi(`3/${network}/profiles`, 'GET')
    }

    let profile_labels_request = callSbksApi('3/profile/labels', 'GET')
    let post_labels_request = callSbksApi('3/post/labels', 'GET')
    let content_label_groups_request = callSbksApi('3/post/label-groups', 'GET')
    let listening_queries_request = callSbksApi('3/listening/queries', 'GET')
    await Promise.all(Object.values(requests))
    for (const [network, coroutine] of Object.entries(requests)) {
        let response = {success: false}
        try {
            response = await coroutine
        } catch (err) {
            showModal('Profiles API error', err.toString())
            return
        }

        if (!response.success) {
            showModal(
                'API authorization failed',
                `API connection failed.<br><br><code>${JSON.stringify(response.errors)}</code>`
            )
            return -1
        }
        if (response.profiles.length) {
            SBKS.profiles[network] = response.profiles

            for(const profile of SBKS.profiles[network]) {
                profile.name = profile.name || profile.id
                SBKS.profile_name_by_id[profile.id] = profile.name
                if (profile.community_enabled) {
                    SBKS.community_enabled = true
                    $('#communityMenuItem').css('display', 'block')
                }
            }

            SBKS.profiles[network].sort((a, b) => {
                return a.name.localeCompare(b.name)
            })

            SBKS.profiles_with_no_labels[network] = SBKS.profiles[network]
                .filter(profile => !profile.profile_labels.length)
                .map(profile => profile.id)
        }
    }

    try {
        let profile_labels_response = await profile_labels_request
        if (profile_labels_response.success) {
            profile_labels_response.data.sort((a, b) => {
                return a.name.localeCompare(b.name)
            })
            for (const label of profile_labels_response.data) {
                label.selected_profiles = []
            }
            SBKS.profile_labels = profile_labels_response.data
        }
        let post_labels_response = await post_labels_request
        if (post_labels_response.success) {
            post_labels_response.data.sort((a, b) => {
                return a.name.localeCompare(b.name)
            })
            SBKS.post_labels = post_labels_response.data
        }
        let content_label_groups_response = await content_label_groups_request
        if (content_label_groups_response.success) {
            content_label_groups_response.data.sort((a, b) => {
                return a.name.localeCompare(b.name)
            })
            SBKS.content_label_groups = content_label_groups_response.data
        }
        let listening_queries_response = await listening_queries_request
        if (listening_queries_response.success) {
            listening_queries_response.queries.sort((a, b) => {
                return a.name.localeCompare(b.name)
            })
            SBKS.listening_queries = listening_queries_response.queries
        }
    } catch (err) {
        showModal('Labels API error', err.toString())
    }

    if ($.isEmptyObject(SBKS.profiles)) {
        showModal('Profiles not available', 'Your account doesn\'t have any profiles connected.')
        return
    }
}

async function onLoginSubmit(e) {
    e.preventDefault()
    $loginSpinner.show()

    tableau.username = $('#token').val()
    tableau.password = $('#secret').val()

    let today = moment()
    let yearAgo = today.clone().subtract(1, 'years')

    let result = await fetchProfilesAndLabels()
    if (result === -1){
        $loginSpinner.hide()
        return
    }

    try {
        await setAdAccounts(yearAgo.format('YYYY-MM-DD'), today.format('YYYY-MM-DD'), false)
        await setCampaigns(yearAgo.format('YYYY-MM-DD'), today.format('YYYY-MM-DD'))
    } catch (e) {
        console.log("Ads error", e)
    }

    $login.hide()
    if (SBKS.data_source === 'facebook_ads' || SBKS.data_source === 'facebook_ads_ad') {
        renderAdAccounts()
    } else if (SBKS.data_source === 'listening_content') {
        renderListeningContent()
    } else if (SBKS.data_source === 'listening') {
        renderListeningMetrics()
    } else {
        renderProfiles()
    }
}

function showModal(title, body) {
    $('#modalTitle').text(title)
    $('#modalBody').html(body)
    let modal = new bootstrap.Modal(document.getElementById('modal'))
    $('#modalButton').click((e)=> {modal.hide()})
    modal.show()
}

$(function () {
    $login.submit(onLoginSubmit)

    $('#profiles .back, #listeningContent .back, #listeningMetrics .back').click(function () {
        $('[id$=Spinner], #profiles, #profileSearch, #mainMenu, #listeningContent, #listeningMetrics').hide()
        $('#login').show()
    })

    $('#profileMetrics .back,#aggregatedPostMetrics .back,#posts .back,#communityPosts .back,#communityMetrics .back')
        .click(function () {
            $('[id$=Spinner], #profileMetrics, #aggregatedPostMetrics, #posts, #communityPosts, #communityMetrics').hide()
            $('#profiles, #mainMenu, #profileSearch').show()
        })

    $('#facebook_ads .back, #facebook_ads_ad .back').click(function () {
        $('[id$=Spinner], #facebook_ads, #facebook_ads_ad').hide()
        $('#profiles, #mainMenu, #profileSearch').show()
    })
})
