let $communityPostsDiv = $('#communityPosts')
let $communityPosts = $('#communityPostsForm')
let $communityPostsSpinner = $('#communityPostsSpinner').hide()

$(function () {
    $communityPosts.submit(onCommunityPostsSubmit)
})

async function onCommunityPostsSubmit(e) {
    e.preventDefault()
    $communityPostsSpinner.show()

    let post_fields = {}
    for (const item of $communityPosts.serializeArray()) {
        if (['', undefined, null].includes(item.value)) {
            continue
        }

        if (item.name === 'daterange') {
            SBKS.date_range = parseDateRange(item.value)
            continue
        }

        post_fields = processFormField(post_fields, item)
    }

    SBKS.community_posts_fields = post_fields.fields || []
    delete post_fields["fields"]
    SBKS.community_posts_filters = post_fields

    tableau.connectionData = JSON.stringify(SBKS)

    invokeConnector(SBKS.data_source)
}

function renderCommunityPosts() {
    $communityPostsDiv.show()

    // Fix the positioning bug with select2
    $('select').each(function () {
        if($(this).outerWidth() > 10) {
            $(this).css({width: `${$(this).outerWidth() - 1}px`})
        }
    })

    $('#community_posts_content_label_groups').select2({
        multiple: true,
        data: SBKS.content_label_groups.map(label => {
            return {id: label.id, text: label.name}
        })
    }).change(function () {
        let self = $(this)

        for (const label_group_id of self.val()) {
            let label_group = SBKS.content_label_groups.find(lg => lg.id === label_group_id)

            if (label_group) {
                $('#community_post_labels').val(
                    ($('#community_post_labels').val() || []).concat(label_group.label_ids || [])
                ).change()
            }
        }
    }).trigger('change')

    $('#community_post_labels').select2({
        multiple: true,
        data: SBKS.post_labels.map(label => {
            return {id: label.id, text: label.name}
        })
    })

    $('select[data-fields]').each(function () {
        let data = []
        for (const field of Object.keys(COMMUNITY_POSTS_FIELDS)) {
            let text = field.replace(/_/g, ' ')
            data.push({id: field, text: text.charAt(0).toUpperCase() + text.slice(1)})
        }

        $(this).select2({multiple: true, data: data}).val(['id', 'author', 'created_time', 'profileId']).change()
    })

    $('select.form-select[multiple]').select2()
}
