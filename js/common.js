// Chunk an array into chunks with maximum size of `chunk_size`
function chunkArray(myArray, chunk_size) {
    let index = 0
    let tempArray = []
    const arrayLength = myArray.length

    for (index = 0; index < arrayLength; index += chunk_size) {
        tempArray.push(myArray.slice(index, index + chunk_size))
    }

    return tempArray
}

// Split profiles into batches in order to avoid API limits
function splitProfiles(start, end, profiles) {
    const dayEnd = moment(end)
    const dayStart = moment(start)
    const sbksData = JSON.parse(tableau.connectionData)

    let maxProfiles = MAX_PROFILES
    if (
        profiles && profiles.length > 25
        && dayEnd.diff(dayStart, 'months', true) > 3.0
        && sbksData.time_dimension !== 'date.month'
    ) {
        maxProfiles = 25
    }

    return chunkArray(profiles, maxProfiles)
}

// Split date range into batches in order to avoid API limits
function splitDateRange(start, end, profiles) {
    const dayEnd = moment(end)
    const dayStart = moment(start)
    const sbksData = JSON.parse(tableau.connectionData)

    let months = MAX_MONTHS
    if (
        profiles && profiles.length > 25
        && dayEnd.diff(dayStart, 'months', true) > 3.0
        && sbksData.time_dimension !== 'date.month'
    ) {
        months = 3
    }

    let dates = Array.from(moment.range(dayStart, dayEnd).by('months', {step: months}))
    dates.push(dayEnd)

    let ranges = {}, startDate = null
    for (const date of dates) {
        if (!startDate) {
            startDate = date
            continue
        }

        ranges[startDate.format('YYYY-MM-DD')] = date.format('YYYY-MM-DD')
        startDate = date.add(1, 'day')
    }

    return ranges
}

// Merge function used for combining metrics of two responses with same dimensions
function combineMerge(target, source, options) {
    let destination = target.slice()

    for (const [index, item] of source.entries()) {
        if (typeof destination[index] === 'undefined') {
            destination[index] = options.cloneUnlessOtherwiseSpecified(item, options)
        } else if (options.isMergeableObject(item)) {
            destination[index] = deepmerge(target[index], item, options)
        } else if (target.indexOf(item) === -1) {
            destination.push(item)
        }
    }

    return destination
}

// Intersection of two lists
function intersect(a, b) {
    return a.filter(Set.prototype.has, new Set(b))
}

function parseDateRange(value) {
    let [start, end] = value.split(' - ')
    start = moment(start, 'MM/DD/YYYY')
    end = moment(end, 'MM/DD/YYYY')

    return {
        start: start.format('YYYY-MM-DD'),
        end: end.format('YYYY-MM-DD'),
        end_today: end.isSame(moment(), 'day')
    }
}

// When current date was selected as end date, shift the range to end today
function adjustDateRange(dateRange) {
    let start = moment(dateRange.start, 'YYYY-MM-DD')
    let end = moment(dateRange.end, 'YYYY-MM-DD')

    if (dateRange.end_today) {
        end = moment()
        start = start.add(moment().diff(end, 'days'), 'days')
    }

    return {start: start.format('YYYY-MM-DD'), end: end.format('YYYY-MM-DD')}
}

$(function () {
    window['moment-range'].extendMoment(moment)

    $('input[name=daterange]').daterangepicker({
        startDate: moment().subtract(29, 'days'),
        endDate: moment(),
        minDate: '01/01/2008',
        maxDate: moment(),
        alwaysShowCalendars: true,
        showDropdowns: true,
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment()
                .subtract(1, 'month').endOf('month')],
            'This Year': [moment().startOf('year'), moment()],
            'Last Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year')
                .endOf('year')]
        }
    })

    $('#daterangeAccounts').daterangepicker({startDate: moment().subtract(1, 'years'),})
})
