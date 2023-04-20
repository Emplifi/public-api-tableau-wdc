// SHARED CONFIG
let SBKS = {
    apiUrl: 'https://api.emplifi.io/',
    postsUrl: {
        facebook: '3/facebook/page/posts',
        instagram: '3/instagram/profile/posts',
        youtube: '3/youtube/profile/videos',
        twitter: '3/twitter/profile/tweets',
        linkedin: '3/linkedin/profile/posts',
        pinterest: '3/pinterest/profile/posts',
        vkontakte: '3/vkontakte/profile/posts',
        tiktok: '3/tiktok/profile/posts'
    },
    communityUrl: '3/community/metrics',
    communityPostsUrl: '3/community/posts',
    fb_ads_url: '3/facebook/ads/metrics',
    fb_ads_ad_url: '3/facebook/ads/posts',
    listening_content_url: '3/listening/posts',
    listening_url: '3/listening/metrics',
    data_source: 'profile',
    networks: ['facebook', 'instagram', 'twitter', 'youtube', 'linkedin', 'pinterest', 'vkontakte', 'tiktok'],
    icons: {
        facebook: 'logo-facebook',
        instagram: 'logo-instagram',
        twitter: 'logo-twitter',
        youtube: 'logo-youtube',
        linkedin: 'logo-linkedin',
        pinterest: 'logo-pinterest',
        vk: 'logo-vk',
        tiktok: 'logo-tiktok'
    },
    profiles: {},
    adaccounts: [],
    campaigns: [],
    date_range: {},
    profiles_selected: {},
    profile_labels: [],
    content_label_groups: [],
    listening_queries: [],
    listening_content_fields: [],
    listening_content_filters: {},
    listening_filters: {},
    post_labels: [],
    profile_labels_selected: [],
    profile_metrics: {},
    profile_dimensions: {},
    profiles_with_no_labels: {},
    profile_name_by_id: {},
    aggregated_post_metrics: [],
    aggregated_post_dimensions: [],
    posts_filters: {},
    posts_networks: {},
    gender_age_version: 1,
    fb_ads: {
        filters: {},
        sorts: {},
        conf: {},
    },
    fb_ads_ad_params: {},
    community_enabled: false
}

// PROFILES
let PROFILE_COMMON_DIMENSIONS = ['profile', 'profile_label']
let PROFILE_METRICS = {
    facebook: {
        'fans_change': PROFILE_COMMON_DIMENSIONS,
        'fans_lifetime': PROFILE_COMMON_DIMENSIONS,
        'insights_activity': PROFILE_COMMON_DIMENSIONS.concat(['activity_type']),
        'insights_activity_unique': PROFILE_COMMON_DIMENSIONS.concat(
            ['activity_type', 'gender_age', 'city', 'country', 'locale']
        ),
        'insights_engaged_users': PROFILE_COMMON_DIMENSIONS,
        'insights_fan_adds': PROFILE_COMMON_DIMENSIONS.concat(['like_source']),
        'insights_fan_adds_unique': PROFILE_COMMON_DIMENSIONS.concat(['like_source']),
        'insights_fan_removes': PROFILE_COMMON_DIMENSIONS,
        'insights_fan_removes_unique': PROFILE_COMMON_DIMENSIONS.concat(['unlike_source']),
        'insights_fans_lifetime': PROFILE_COMMON_DIMENSIONS.concat(['gender_age', 'city', 'country', 'locale']),
        'insights_fans_online': PROFILE_COMMON_DIMENSIONS.concat(['hour_of_day']),
        'insights_impressions': PROFILE_COMMON_DIMENSIONS.concat(['activity_type', 'post_attribution']),
        'insights_negative_feedback': PROFILE_COMMON_DIMENSIONS,
        'insights_positive_feedback': PROFILE_COMMON_DIMENSIONS.concat(['positive_feedback_type']),
        'insights_post_clicks': PROFILE_COMMON_DIMENSIONS.concat(['click_type']),
        'insights_post_clicks_unique': PROFILE_COMMON_DIMENSIONS.concat(['click_type']),
        'insights_post_impressions': PROFILE_COMMON_DIMENSIONS.concat(['post_attribution']),
        'insights_post_reach': PROFILE_COMMON_DIMENSIONS.concat(['post_attribution', 'frequency_distribution']),
        'insights_reach': PROFILE_COMMON_DIMENSIONS.concat(['gender_age', 'post_attribution']),
        'insights_reach_28_days': PROFILE_COMMON_DIMENSIONS.concat(['gender_age']),
        'insights_reach_7_days': PROFILE_COMMON_DIMENSIONS.concat(['gender_age']),
        'insights_reach_engagement': PROFILE_COMMON_DIMENSIONS,
        'insights_reactions': PROFILE_COMMON_DIMENSIONS.concat(['reaction_type']),
        'insights_video_complete_views_30s': PROFILE_COMMON_DIMENSIONS.concat(['play_type', 'post_attribution']),
        'insights_video_complete_views_30s_repeat_views': PROFILE_COMMON_DIMENSIONS,
        'insights_video_complete_views_30s_unique': PROFILE_COMMON_DIMENSIONS,
        'insights_video_repeat_views': PROFILE_COMMON_DIMENSIONS,
        'insights_video_views': PROFILE_COMMON_DIMENSIONS.concat(['play_type', 'post_attribution']),
        'insights_video_views_unique': PROFILE_COMMON_DIMENSIONS,
        'insights_views': PROFILE_COMMON_DIMENSIONS
    },
    instagram: {
        'followers_change': PROFILE_COMMON_DIMENSIONS,
        'followers_lifetime': PROFILE_COMMON_DIMENSIONS,
        'following_change': PROFILE_COMMON_DIMENSIONS,
        'following_lifetime': PROFILE_COMMON_DIMENSIONS,
        'insights_followers': PROFILE_COMMON_DIMENSIONS.concat(['country', 'locale', 'city', 'gender_age']),
        'insights_impressions': PROFILE_COMMON_DIMENSIONS,
        'insights_impressions_28_days': PROFILE_COMMON_DIMENSIONS,
        'insights_impressions_7_days': PROFILE_COMMON_DIMENSIONS,
        'insights_profile_clicks': PROFILE_COMMON_DIMENSIONS.concat(['click_target']),
        'insights_profile_views': PROFILE_COMMON_DIMENSIONS,
        'insights_reach': PROFILE_COMMON_DIMENSIONS,
        'insights_reach_28_days': PROFILE_COMMON_DIMENSIONS,
        'insights_reach_7_days': PROFILE_COMMON_DIMENSIONS
    },
    twitter: {
        'ff_ratio': PROFILE_COMMON_DIMENSIONS,
        'followers_change': PROFILE_COMMON_DIMENSIONS,
        'followers_lifetime': PROFILE_COMMON_DIMENSIONS,
        'following_change': PROFILE_COMMON_DIMENSIONS,
        'following_lifetime': PROFILE_COMMON_DIMENSIONS,
        'listed_change': PROFILE_COMMON_DIMENSIONS,
        'listed_lifetime': PROFILE_COMMON_DIMENSIONS
    },
    youtube: {
        'interaction_change': PROFILE_COMMON_DIMENSIONS.concat(['interaction_type']),
        'interactions_per_1k_fans': PROFILE_COMMON_DIMENSIONS,
        'subscribers_change': PROFILE_COMMON_DIMENSIONS,
        'subscribers_lifetime': PROFILE_COMMON_DIMENSIONS,
        'video_lifetime': PROFILE_COMMON_DIMENSIONS,
        'viewed_time_change': PROFILE_COMMON_DIMENSIONS,
        'views_change': PROFILE_COMMON_DIMENSIONS
    },
    linkedin: {
        'followers_change': PROFILE_COMMON_DIMENSIONS,
        'followers_lifetime': PROFILE_COMMON_DIMENSIONS,
        'insights_engagements': PROFILE_COMMON_DIMENSIONS,
        'insights_impressions': PROFILE_COMMON_DIMENSIONS,
        'insights_impressions_engagement_rate': PROFILE_COMMON_DIMENSIONS,
        'insights_post_clicks': PROFILE_COMMON_DIMENSIONS,
        'insights_reach': PROFILE_COMMON_DIMENSIONS,
        'insights_reach_engagement_rate': PROFILE_COMMON_DIMENSIONS
    },
    pinterest: {
        'boards_change': PROFILE_COMMON_DIMENSIONS,
        'boards_lifetime': PROFILE_COMMON_DIMENSIONS,
        'followers_change': PROFILE_COMMON_DIMENSIONS,
        'followers_lifetime': PROFILE_COMMON_DIMENSIONS,
        'following_change': PROFILE_COMMON_DIMENSIONS,
        'following_lifetime': PROFILE_COMMON_DIMENSIONS,
        'pins_lifetime': PROFILE_COMMON_DIMENSIONS
    },
    tiktok: {
        'insights_engagements': PROFILE_COMMON_DIMENSIONS,
        'insights_fans_change': PROFILE_COMMON_DIMENSIONS,
        'insights_fans_lifetime': PROFILE_COMMON_DIMENSIONS,
        'insights_profile_views': PROFILE_COMMON_DIMENSIONS,
        'insights_video_views': PROFILE_COMMON_DIMENSIONS
    }
}

// AGGREGATED POST
let common_agg_dimensions = ['platform', 'profile', 'post_labels', 'profile_label']
let insights_engagements = common_agg_dimensions.concat(['media_type', 'content_type'])
let engagement_rate = insights_engagements.concat(['published_status', 'sentiment_type'])
let insights_video_views = common_agg_dimensions.concat(['content_type', 'published_status', 'sentiment_type'])
let interactions = engagement_rate.concat(['interaction_type'])
let likes = common_agg_dimensions.concat(['media_type', 'sentiment_type'])
let sentiment_manual_auto = common_agg_dimensions.concat(['media_type', 'sentiment'])
let shares = insights_engagements.concat(['published_status'])
let user_posts_responded = insights_engagements.concat(['response_time'])

let AGGREGATED_POST_METRICS = {
    facebook: {
        'engagement_rate': engagement_rate,
        'insights_engagements': insights_engagements,
        'insights_impressions': engagement_rate,
        'insights_impressions_engagement_rate': insights_engagements,
        'insights_post_clicks': common_agg_dimensions.concat(['content_type', 'media_type', 'published_status']),
        'insights_reach_engagement': common_agg_dimensions.concat(['content_type', 'media_type', 'published_status']),
        'insights_reach_per_content': engagement_rate,
        'insights_video_views': insights_video_views,
        'interactions': interactions,
        'interactions_per_1k_fans': engagement_rate,
        'likes': likes,
        'number_of_comments': engagement_rate,
        'page_posts': engagement_rate,
        'page_shares': common_agg_dimensions,
        'sentiment_manual_auto': sentiment_manual_auto,
        'shares': shares,
        'user_posts': insights_engagements,
        'user_posts_average_response_time': insights_engagements,
        'user_posts_responded': user_posts_responded,
        'user_posts_response_rate': insights_engagements,
        'user_questions': insights_engagements,
        'user_questions_average_response_time': insights_engagements,
        'user_questions_responded': user_posts_responded,
        'user_questions_response_rate': engagement_rate
    },
    instagram: {
        'engagement_rate': engagement_rate,
        'insights_completion_rate': common_agg_dimensions.concat(['media_type']),
        'insights_engagements': insights_engagements,
        'insights_impressions': engagement_rate,
        'insights_impressions_engagement_rate': insights_engagements,
        'insights_post_saves': insights_engagements,
        'insights_reach_engagement': common_agg_dimensions.concat(['content_type', 'media_type', 'published_status']),
        'insights_reach_per_content': engagement_rate,
        'insights_story_exits': common_agg_dimensions.concat(['media_type']),
        'insights_story_taps_back': common_agg_dimensions.concat(['media_type']),
        'insights_story_taps_forward': common_agg_dimensions.concat(['media_type']),
        'insights_video_views': insights_video_views,
        'interactions': interactions,
        'interactions_per_1k_fans': engagement_rate,
        'likes': likes,
        'number_of_comments': engagement_rate,
        'page_posts': engagement_rate,
        'sentiment_manual_auto': sentiment_manual_auto
    },
    twitter: {
        'engagement_rate': engagement_rate,
        'insights_engagements': insights_engagements,
        'insights_impressions': engagement_rate,
        'insights_impressions_engagement_rate': insights_engagements,
        'insights_media_views': common_agg_dimensions.concat(['content_type', 'media_type', 'sentiment_type']),
        'insights_video_views': insights_video_views,
        'interactions': interactions,
        'interactions_per_1k_fans': engagement_rate,
        'likes': likes,
        'number_of_comments': engagement_rate,
        'page_posts': engagement_rate,
        'page_replies': common_agg_dimensions,
        'page_shares': common_agg_dimensions,
        'profile_tweets': common_agg_dimensions.concat(['media_type']),
        'sentiment_manual_auto': sentiment_manual_auto,
        'shares': shares,
        'user_posts': insights_engagements,
        'user_posts_average_response_time': insights_engagements,
        'user_posts_responded': user_posts_responded,
        'user_posts_response_rate': insights_engagements,
        'user_questions': insights_engagements,
        'user_questions_average_response_time': insights_engagements,
        'user_questions_responded': user_posts_responded,
        'user_questions_response_rate': engagement_rate
    },
    youtube: {
        'engagement_rate': engagement_rate,
        'insights_engagements': insights_engagements,
        'insights_video_views': insights_video_views,
        'interactions': interactions,
        'interactions_per_1k_fans': engagement_rate,
        'likes': likes,
        'number_of_comments': engagement_rate,
        'page_posts': engagement_rate
    },
    linkedin: {
        'engagement_rate': engagement_rate,
        'insights_engagements': insights_engagements,
        'insights_impressions': engagement_rate,
        'insights_impressions_engagement_rate': insights_engagements,
        'insights_post_clicks': common_agg_dimensions.concat(['content_type', 'media_type', 'published_status']),
        'insights_video_views': insights_video_views,
        'insights_video_views_unique': insights_video_views,
        'insights_view_time': common_agg_dimensions,
        'interactions': interactions,
        'interactions_per_1k_fans': engagement_rate,
        'likes': likes,
        'number_of_comments': engagement_rate,
        'page_posts': engagement_rate,
        'sentiment_manual_auto': sentiment_manual_auto,
        'insights_post_clicks': common_agg_dimensions.concat(['content_type', 'media_type', 'published_status'])
    },
    pinterest: {
        'interactions': interactions,
        'number_of_comments': engagement_rate,
        'page_posts': engagement_rate,
        'page_shares': common_agg_dimensions,
        'shares': shares
    },
    vkontakte: {
        'engagement_rate': engagement_rate,
        'interactions': interactions,
        'interactions_per_1k_fans': engagement_rate,
        'number_of_comments': engagement_rate,
        'page_posts': engagement_rate,
        'shares': shares,
        'user_questions': insights_engagements
    },
    tiktok: {
        'insights_avg_time_watched': common_agg_dimensions,
        'insights_completion_rate': common_agg_dimensions.concat(['media_type']),
        'insights_engagements': insights_engagements,
        'insights_reach_engagement': common_agg_dimensions.concat(['content_type', 'media_type', 'published_status']),
        'insights_reach_per_content': engagement_rate,
        'insights_video_views': insights_video_views,
        'insights_view_time': common_agg_dimensions,
        'number_of_comments': engagement_rate,
        'page_posts': engagement_rate
    }
}

// POSTS
let ID_NAME_URL = {
    id: tableau.dataTypeEnum.string,
    name: tableau.dataTypeEnum.string,
    url: tableau.dataTypeEnum.string
}

let POSTS_SORT_FIELDS = {
    'comments': ['facebook', 'instagram', 'youtube', 'linkedin', 'pinterest', 'vkontakte'],
    'created_time': ['facebook', 'instagram', 'youtube', 'linkedin', 'pinterest', 'vkontakte', 'tiktok'],
    'interactions': ['facebook', 'instagram', 'youtube', 'linkedin', 'pinterest', 'vkontakte'],
    'interactions_per_1k_fans': ['facebook', 'instagram', 'youtube', 'linkedin', 'pinterest', 'vkontakte'],
    'reactions': ['facebook', 'linkedin'],
    'reactions_by_type.anger': ['facebook'],
    'reactions_by_type.haha': ['facebook'],
    'reactions_by_type.like': ['facebook'],
    'reactions_by_type.love': ['facebook'],
    'reactions_by_type.sorry': ['facebook'],
    'reactions_by_type.wow': ['facebook'],
    'shares': ['facebook', 'pinterest', 'vkontakte'],
    'insights_avg_time_watched': ['tiktok'],
    'insights_comments': ['tiktok'],
    'insights_completion_rate': ['tiktok'],
    'insights_engaged_users': ['facebook'],
    'insights_engagements': ['tiktok'],
    'insights_likes': ['tiktok'],
    'insights_post_clicks': ['facebook'],
    'insights_reach_by_post_attribution.organic': ['facebook'],
    'insights_reach_by_post_attribution.paid': ['facebook'],
    'insights_reach_engagement_rate': ['tiktok'],
    'insights_shares': ['tiktok'],
    // 'insights_reach_engagement_rate': ['facebook'],
    'insights_video_view_time_average': ['facebook'],
    'insights_video_views_10s': ['facebook'],
    'insights_video_views_by_post_attribution.organic': ['facebook'],
    'insights_video_views_by_post_attribution.paid': ['facebook'],
    'likes': ['instagram', 'youtube', 'vkontakte'],
    'insights_impressions': ['instagram'],
    'insights_reach': ['instagram'],
    'insights_saves': ['instagram'],
    'insights_story_completion_rate': ['instagram'],
    'insights_story_exits': ['instagram'],
    'insights_story_taps_back': ['instagram'],
    'insights_story_taps_forward': ['instagram'],
    'insights_video_views': ['instagram', 'tiktok'],
    'insights_view_time': ['tiktok'],
    'dislikes': ['youtube'],
    'duration': ['youtube', 'tiktok'],
    'video_view_time': ['youtube'],
    'video_views': ['youtube']
}

let POSTS_FILTER_FIELDS = {
    content_type: {
        facebook: ['post', 'shared'],
        instagram: ['post', 'story'],
        twitter: [],
        youtube: [],
        linkedin: [],
        pinterest: ['post', 'shared'],
        vkontakte: [],
        tiktok: []
    },
    grade: {
        facebook: ['A+', 'A', 'B', 'C', 'D'],
        instagram: ['A+', 'A', 'B', 'C', 'D'],
        youtube: [],
        twitter: [],
        linkedin: [],
        pinterest: [],
        vkontakte: [],
        tiktok: []
    },
    media_type: {
        facebook: ['status', 'link', 'video', 'note', 'poll', 'offer', 'photo', 'carousel'],
        instagram: ['video', 'photo', 'carousel', 'video_igtv', 'reel'],
        youtube: ['video'],
        twitter: [],
        linkedin: ['status', 'link', 'video', 'photo', 'album', 'carousel'],
        pinterest: [],
        vkontakte: ['status', 'photo', 'video', 'link', 'note', 'poll', 'album'],
        tiktok: []
    },
    origin: {
        facebook: ['User-Generated Content', 'Brand\'s Content'],
        instagram: ['User-Generated Content', 'Brand\'s Content'],
        youtube: [],
        twitter: ['User-Generated Content', 'Brand\'s Content'],
        linkedin: [],
        pinterest: [],
        vkontakte: ['User-Generated Content', 'Brand\'s Content'],
        tiktok: []
    },
    post_attribution: {
        facebook: ['organic', 'paid'],
        instagram: ['organic', 'paid'],
        youtube: [],
        twitter: [],
        linkedin: [],
        pinterest: [],
        vkontakte: [],
        tiktok: []
    },
    video_type: {
        facebook: ['crosspost', 'crosspostable', 'live', 'shared'],
        instagram: [],
        youtube: [],
        twitter: [],
        linkedin: [],
        pinterest: [],
        vkontakte: [],
        tiktok: []
    },
    post_labels: { // From API
        facebook: [],
        instagram: [],
        youtube: [],
        twitter: [],
        linkedin: [],
        pinterest: [],
        vkontakte: [],
        tiktok: []
    }
}

let POSTS_FIELDS = {
    attachments: {
        networks: ['facebook', 'instagram', 'linkedin', 'pinterest', 'vkontakte', 'tiktok'],
        array: true,
        subfields: {
            title: tableau.dataTypeEnum.string,
            description: tableau.dataTypeEnum.string,
            type: tableau.dataTypeEnum.string,
            url: tableau.dataTypeEnum.string,
            image_url: tableau.dataTypeEnum.string
        }
    },
    author: {
        networks: ['facebook', 'instagram', 'youtube', 'linkedin', 'pinterest', 'vkontakte', 'tiktok'],
        subfields: ID_NAME_URL
    },
    channel: {networks: ['youtube'], subfields: ID_NAME_URL},
    comments: {
        networks: ['facebook', 'instagram', 'youtube', 'linkedin', 'pinterest', 'vkontakte'],
        type: tableau.dataTypeEnum.int
    },
    comments_sentiment: {
        networks: ['facebook', 'instagram'],
        subfields: {
            positive: tableau.dataTypeEnum.int,
            neutral: tableau.dataTypeEnum.int,
            negative: tableau.dataTypeEnum.int
        }
    },
    content: {
        networks: ['facebook', 'instagram', 'linkedin', 'pinterest', 'vkontakte'],
        type: tableau.dataTypeEnum.string
    },
    content_type: {
        networks: ['facebook', 'instagram', 'linkedin', 'pinterest', 'vkontakte', 'tiktok'],
        type: tableau.dataTypeEnum.string
    },
    created_time: {
        networks: ['facebook', 'instagram', 'youtube', 'linkedin', 'pinterest', 'vkontakte', 'tiktok'],
        type: tableau.dataTypeEnum.datetime
    },
    deleted: {networks: ['facebook'], type: tableau.dataTypeEnum.bool},
    description: {networks: ['youtube'], type: tableau.dataTypeEnum.string},
    dislikes: {networks: ['youtube'], type: tableau.dataTypeEnum.int},
    duration: {networks: ['youtube', 'tiktok'], type: tableau.dataTypeEnum.int},
    grade: {networks: ['facebook', 'instagram'], type: tableau.dataTypeEnum.string},
    hidden: {networks: ['facebook'], type: tableau.dataTypeEnum.bool},
    id: {
        networks: ['facebook', 'instagram', 'youtube', 'twitter', 'linkedin', 'pinterest', 'vkontakte', 'tiktok'],
        type: tableau.dataTypeEnum.string
    },
    interactions: {
        networks: ['facebook', 'instagram', 'youtube', 'linkedin', 'pinterest', 'vkontakte'],
        type: tableau.dataTypeEnum.int
    },
    interactions_per_1k_fans: {
        networks: ['facebook', 'instagram', 'youtube', 'linkedin', 'pinterest', 'vkontakte'],
        type: tableau.dataTypeEnum.float
    },
    link: {networks: ['tiktok'], type: tableau.dataTypeEnum.string},
    likes: {networks: ['instagram', 'youtube', 'vkontakte'], type: tableau.dataTypeEnum.int},
    media: {networks: ['tiktok'], type: tableau.dataTypeEnum.string},
    media_type: {
        networks: ['facebook', 'instagram', 'youtube', 'linkedin', 'pinterest', 'vkontakte'],
        type: tableau.dataTypeEnum.string
    },
    message: {networks: ['tiktok'], type: tableau.dataTypeEnum.string},
    origin: {networks: ['facebook', 'twitter', 'vkontakte'], type: tableau.dataTypeEnum.string},
    page: {networks: ['facebook', 'instagram', 'linkedin', 'vkontakte'], subfields: ID_NAME_URL},
    post_attribution: {
        networks: ['facebook', 'instagram'],
        subfields: {
            status: tableau.dataTypeEnum.string,
            type: tableau.dataTypeEnum.string
        }
    },
    post_labels: {
        networks: ['facebook', 'instagram', 'youtube', 'twitter', 'linkedin', 'pinterest', 'vkontakte', 'tiktok'],
        array: true,
        subfields: {
            id: tableau.dataTypeEnum.string,
            name: tableau.dataTypeEnum.string
        }
    },
    profile: {networks: ['twitter', 'pinterest'], subfields: ID_NAME_URL},
    published: {networks: ['facebook'], type: tableau.dataTypeEnum.bool},
    reactions: {networks: ['facebook', 'linkedin'], type: tableau.dataTypeEnum.int},
    reactions_by_type: {
        networks: ['facebook'],
        subfields: {
            like: tableau.dataTypeEnum.int,
            love: tableau.dataTypeEnum.int,
            wow: tableau.dataTypeEnum.int,
            haha: tableau.dataTypeEnum.int,
            sorry: tableau.dataTypeEnum.int,
            anger: tableau.dataTypeEnum.int
        }
    },
    sentiment: {networks: ['facebook', 'instagram'], type: tableau.dataTypeEnum.string},
    shares: {networks: ['facebook', 'pinterest', 'vkontakte'], type: tableau.dataTypeEnum.int},
    spam: {networks: ['facebook'], type: tableau.dataTypeEnum.bool},
    universal_video_id: {networks: ['facebook'], type: tableau.dataTypeEnum.int},
    url: {
        networks: ['facebook', 'instagram', 'youtube', 'linkedin', 'pinterest', 'vkontakte'],
        type: tableau.dataTypeEnum.string
    },
    video: {
        networks: ['facebook'],
        subfields: {
            id: tableau.dataTypeEnum.string,
            length: tableau.dataTypeEnum.int,
            crosspost: tableau.dataTypeEnum.bool,
            crosspostable: tableau.dataTypeEnum.bool,
            live: tableau.dataTypeEnum.bool,
            shared: tableau.dataTypeEnum.bool
        }
    },
    video_view_time: {networks: ['youtube'], type: tableau.dataTypeEnum.int},
    video_views: {networks: ['youtube'], type: tableau.dataTypeEnum.int},
    insights_avg_time_watched: {networks: ['tiktok'], type: tableau.dataTypeEnum.int},
    insights_clicks: {networks: ['linkedin'], type: tableau.dataTypeEnum.int},
    insights_comments: {networks: ['tiktok', 'linkedin'], type: tableau.dataTypeEnum.int},
    insights_completion_rate: {networks: ['tiktok'], type: tableau.dataTypeEnum.float},
    insights_content_impressions: {networks: ['linkedin'], type: tableau.dataTypeEnum.int},
    insights_impressions_by_traffic_source: {
        networks: ['tiktok'],
        subfields: {
            impression_source: tableau.dataTypeEnum.string,
            percentage: tableau.dataTypeEnum.float
        }
    },
    insights_likes: {networks: ['tiktok'], type: tableau.dataTypeEnum.int},
    insights_shares: {networks: ['tiktok'], type: tableau.dataTypeEnum.int},
    insights_view_time: {networks: ['tiktok', 'linkedin'], type: tableau.dataTypeEnum.int},
    insights_viewers_by_country: {
        networks: ['tiktok'],
        subfields: {
            country: tableau.dataTypeEnum.string,
            percentage: tableau.dataTypeEnum.float
        }
    },
    insights_engaged_users: {networks: ['facebook'], type: tableau.dataTypeEnum.int},
    insights_engagements: {networks: ['facebook', 'tiktok', 'linkedin'], type: tableau.dataTypeEnum.int},
    insights_engagement: {networks: ['instagram', 'youtube'], type: tableau.dataTypeEnum.int},
    insights_engagement_by_engagement_type: {
        networks: ['instagram'],
        subfields: {
            comments: tableau.dataTypeEnum.int,
            likes: tableau.dataTypeEnum.int,
            saves: tableau.dataTypeEnum.int
        }
    },
    insights_impressions: {networks: ['facebook', 'instagram'], type: tableau.dataTypeEnum.int},
    insights_impressions_engagement_rate: {networks: ['facebook', 'instagram', 'linkedin'], type: tableau.dataTypeEnum.float},
    insights_impressions_by_post_attribution: {
        networks: ['facebook'],
        subfields: {
            paid: tableau.dataTypeEnum.int,
            organic: tableau.dataTypeEnum.int,
            viral: tableau.dataTypeEnum.int
        }
    },
    insights_interactions: {networks: ['facebook'], type: tableau.dataTypeEnum.int},
    insights_interactions_by_interaction_type: {
        networks: ['facebook'],
        subfields: {
            comment: tableau.dataTypeEnum.int,
            like: tableau.dataTypeEnum.int,
            share: tableau.dataTypeEnum.int
        }
    },
    insights_negative_feedback_unique: {networks: ['facebook'], type: tableau.dataTypeEnum.int},
    insights_post_clicks: {networks: ['facebook'], type: tableau.dataTypeEnum.int},
    insights_post_clicks_by_clicks_type: {
        networks: ['facebook'],
        subfields: {
            link_clicks: tableau.dataTypeEnum.int,
            button_clicks: tableau.dataTypeEnum.int,
            other_clicks: tableau.dataTypeEnum.int,
            photo_views: tableau.dataTypeEnum.int,
            video_plays: tableau.dataTypeEnum.int
        }
    },
    insights_post_clicks_unique: {networks: ['facebook'], type: tableau.dataTypeEnum.int},
    insights_reach: {networks: ['facebook', 'instagram', 'tiktok'], type: tableau.dataTypeEnum.int},
    insights_reach_by_post_attribution: {
        networks: ['facebook'],
        subfields: {
            paid: tableau.dataTypeEnum.int,
            organic: tableau.dataTypeEnum.int,
            viral: tableau.dataTypeEnum.int
        }
    },
    insights_reach_engagement_rate: {networks: ['facebook', 'instagram', 'tiktok'], type: tableau.dataTypeEnum.float},
    insights_reactions: {networks: ['facebook', 'linkedin'], type: tableau.dataTypeEnum.int},
    insights_reactions_by_type: {
        networks: ['facebook'],
        subfields: {
            like: tableau.dataTypeEnum.int,
            love: tableau.dataTypeEnum.int,
            wow: tableau.dataTypeEnum.int,
            haha: tableau.dataTypeEnum.int,
            sorry: tableau.dataTypeEnum.int,
            anger: tableau.dataTypeEnum.int
        }
    },
    insights_saves: {networks: ['instagram'], type: tableau.dataTypeEnum.int},
    insights_story_completion_rate: {networks: ['instagram'], type: tableau.dataTypeEnum.float},
    insights_story_exits: {networks: ['instagram'], type: tableau.dataTypeEnum.int},
    insights_story_replies: {networks: ['instagram'], type: tableau.dataTypeEnum.int},
    insights_story_taps_back: {networks: ['instagram'], type: tableau.dataTypeEnum.int},
    insights_story_taps_forward: {networks: ['instagram'], type: tableau.dataTypeEnum.int},
    insights_video_view_time: {networks: ['facebook'], type: tableau.dataTypeEnum.int},
    insights_video_view_time_average: {networks: ['facebook'], type: tableau.dataTypeEnum.float},
    insights_video_view_time_by_distribution: {
        networks: ['facebook'],
        subfields: {
            owned: tableau.dataTypeEnum.int,
            shared: tableau.dataTypeEnum.int
        }
    },
    insights_video_view_time_by_post_attribution: {
        networks: ['facebook'],
        subfields: {
            organic: tableau.dataTypeEnum.int,
            paid: tableau.dataTypeEnum.int
        }
    },
    country: {
        networks: ['facebook'],
        type: tableau.dataTypeEnum.string
    },
    insights_video_view_time_by_country: {
        networks: ['facebook'],
        type: tableau.dataTypeEnum.int
    },
    gender_age: {
        networks: ['facebook'],
        type: tableau.dataTypeEnum.string
    },
    insights_video_view_time_by_gender_age_v2: {
        networks: ['facebook'],
        type: tableau.dataTypeEnum.int
    },
    insights_video_view_time_by_gender_age_v1: {
        networks: ['facebook'],
        subfields: {
            "U_55_64": tableau.dataTypeEnum.int,
            "M_55_64": tableau.dataTypeEnum.int,
            "U_35_44": tableau.dataTypeEnum.int,
            "F_45_54": tableau.dataTypeEnum.int,
            "M_35_44": tableau.dataTypeEnum.int,
            "M_18_24": tableau.dataTypeEnum.int,
            "F_25_34": tableau.dataTypeEnum.int,
            "U_65": tableau.dataTypeEnum.int,
            "M_25_34": tableau.dataTypeEnum.int,
            "U_18_24": tableau.dataTypeEnum.int,
            "F_65": tableau.dataTypeEnum.int,
            "U_45_54": tableau.dataTypeEnum.int,
            "F_13_17": tableau.dataTypeEnum.int,
            "F_55_64": tableau.dataTypeEnum.int,
            "M_65": tableau.dataTypeEnum.int,
            "F_35_44": tableau.dataTypeEnum.int,
            "M_13_17": tableau.dataTypeEnum.int,
            "U_13_17": tableau.dataTypeEnum.int,
            "U_25_34": tableau.dataTypeEnum.int,
            "M_45_54": tableau.dataTypeEnum.int,
            "F_18_24": tableau.dataTypeEnum.int,
        }
    },
    insights_video_views: {networks: ['facebook', 'instagram', 'linkedin', 'tiktok'], type: tableau.dataTypeEnum.int},
    insights_video_views_10s: {networks: ['facebook'], type: tableau.dataTypeEnum.int},
    insights_video_views_10s_by_play_type: {
        networks: ['facebook'],
        subfields: {
            autoplayed: tableau.dataTypeEnum.int,
            click_to_play: tableau.dataTypeEnum.int
        }
    },
    insights_video_views_10s_by_post_attribution: {
        networks: ['facebook'],
        subfields: {
            organic: tableau.dataTypeEnum.int,
            paid: tableau.dataTypeEnum.int
        }
    },
    insights_video_views_10s_by_sound: {
        networks: ['facebook'],
        subfields: {
            on: tableau.dataTypeEnum.int,
            off: tableau.dataTypeEnum.int
        }
    },
    insights_video_views_10s_unique: {networks: ['facebook'], type: tableau.dataTypeEnum.int},
    insights_video_views_30s: {networks: ['facebook'], type: tableau.dataTypeEnum.int},
    insights_video_views_30s_by_play_type: {
        networks: ['facebook'],
        subfields: {
            autoplayed: tableau.dataTypeEnum.int,
            click_to_play: tableau.dataTypeEnum.int
        }
    },
    insights_video_views_30s_by_post_attribution: {
        networks: ['facebook'],
        subfields: {
            organic: tableau.dataTypeEnum.int,
            paid: tableau.dataTypeEnum.int
        }
    },
    insights_video_views_30s_unique: {networks: ['facebook'], type: tableau.dataTypeEnum.int},
    insights_video_views_average_completion: {networks: ['facebook'], type: tableau.dataTypeEnum.float},
    insights_video_views_by_play_type: {
        networks: ['facebook'],
        subfields: {
            autoplayed: tableau.dataTypeEnum.int,
            click_to_play: tableau.dataTypeEnum.int
        }
    },
    insights_video_views_by_post_attribution: {
        networks: ['facebook'],
        subfields: {
            organic: tableau.dataTypeEnum.int,
            paid: tableau.dataTypeEnum.int
        }
    },
    insights_video_views_by_sound: {
        networks: ['facebook'],
        subfields: {
            on: tableau.dataTypeEnum.int,
            off: tableau.dataTypeEnum.int
        }
    },
    insights_video_views_complete: {networks: ['facebook'], type: tableau.dataTypeEnum.int},
    insights_video_views_complete_by_post_attribution: {
        networks: ['facebook'],
        subfields: {
            organic: tableau.dataTypeEnum.int,
            paid: tableau.dataTypeEnum.int
        }
    },
    insights_video_views_complete_unique: {networks: ['facebook'], type: tableau.dataTypeEnum.int},
    insights_video_views_complete_unique_by_post_attribution: {
        networks: ['facebook'],
        subfields: {
            organic: tableau.dataTypeEnum.int,
            paid: tableau.dataTypeEnum.int
        }
    },
    insights_video_views_distribution: {
        networks: ['facebook'],
        subfields: {
            owned: tableau.dataTypeEnum.int,
            shared: tableau.dataTypeEnum.int
        }
    },
    insights_video_views_unique: {networks: ['facebook', 'linkedin'], type: tableau.dataTypeEnum.int},
    insights_video_views_unique_by_post_attribution: {
        networks: ['facebook'],
        subfields: {
            organic: tableau.dataTypeEnum.int,
            paid: tableau.dataTypeEnum.int
        }
    }
}

// COMMUNITY METRICS
let COMMUNITY_DIMENSIONS = [
    'community_type', 'date', 'post_label', 'profile', 'profile_label', 'resolve_status', 'sentiment'
]
let COMMUNITY_METRICS = {
    'content_count': COMMUNITY_DIMENSIONS,
    'message_count': COMMUNITY_DIMENSIONS,
    'response_time': [
        'community_type', 'post_label', 'profile', 'profile_label', 'resolve_status', 'response_date', 'sentiment'
    ],
    'response_time_business_hours': [
        'community_type', 'post_label', 'profile', 'profile_label', 'resolve_status', 'response_date', 'sentiment'
    ]
}

let COMMUNITY_POSTS_FIELDS = {
    author: {
        subfields: ID_NAME_URL
    },
    community_type: {
        type: tableau.dataTypeEnum.string
    },
    content_type: {
        type: tableau.dataTypeEnum.string
    },
    created_time: {
        type: tableau.dataTypeEnum.datetime
    },
    id: {
        type: tableau.dataTypeEnum.string
    },
    message: {
        type: tableau.dataTypeEnum.string
    },
    messages: {
        array: true,
        subfields: {
            id: tableau.dataTypeEnum.string,
            message: tableau.dataTypeEnum.string,
            created_time: tableau.dataTypeEnum.datetime,
            origin: tableau.dataTypeEnum.string
        }
    },
    origin: {
        type: tableau.dataTypeEnum.string
    },
    parent_post: {
        subfields: {
            id: tableau.dataTypeEnum.string,
            message: tableau.dataTypeEnum.string
        }
    },
    platform: {
        type: tableau.dataTypeEnum.string
    },
    post_labels: {
        array: true,
        subfields: {
            id: tableau.dataTypeEnum.string,
            name: tableau.dataTypeEnum.string
        }
    },
    profileId: {
        type: tableau.dataTypeEnum.string
    },
    response_first: {
        subfields: {
            id: tableau.dataTypeEnum.string,
            message: tableau.dataTypeEnum.string,
            response_time: tableau.dataTypeEnum.int,
            response_time_real: tableau.dataTypeEnum.int,
            account_id: tableau.dataTypeEnum.string,
            user_id: tableau.dataTypeEnum.string,
            first_name: tableau.dataTypeEnum.string,
            last_name: tableau.dataTypeEnum.string
        }
    },
    sentiment: {
        type: tableau.dataTypeEnum.string
    },
    url: {
        type: tableau.dataTypeEnum.string
    }
}

let LISTENING_DIMENSIONS = [
    'content_type',
    'country',
    'hashtag',
    'keyword',
    'language',
    'location',
    'media_type',
    'organization',
    'person',
    'platform',
    'post_label',
    'profession',
    'sentiment',
    'topic',
    'url'
]

let LISTENING_METRICS = {
    'authors': LISTENING_DIMENSIONS,
    'comments': LISTENING_DIMENSIONS,
    'content_count': LISTENING_DIMENSIONS,
    'interactions': LISTENING_DIMENSIONS,
    'potential_impressions': LISTENING_DIMENSIONS,
    'shares': LISTENING_DIMENSIONS
}

let LISTENING_CONTENT_FIELDS = {
    attachments: {
        array: true,
        subfields: {
            title: tableau.dataTypeEnum.string,
            description: tableau.dataTypeEnum.string,
            url: tableau.dataTypeEnum.string,
            type: tableau.dataTypeEnum.string,
            image_url: tableau.dataTypeEnum.string,
            video_url: tableau.dataTypeEnum.string
        }
    },
    author: {
        subfields: ID_NAME_URL
    },
    comments: {
        type: tableau.dataTypeEnum.int
    },
    content_type: {
        type: tableau.dataTypeEnum.string
    },
    country: {
        type: tableau.dataTypeEnum.string
    },
    created_time: {
        type: tableau.dataTypeEnum.datetime
    },
    id: {
        type: tableau.dataTypeEnum.string
    },
    interactions: {
        type: tableau.dataTypeEnum.int
    },
    language: {
        type: tableau.dataTypeEnum.string
    },
    listening_queries: {
        type: tableau.dataTypeEnum.string
    },
    mentions: {
        type: tableau.dataTypeEnum.string
    },
    message: {
        type: tableau.dataTypeEnum.string
    },
    platform: {
        type: tableau.dataTypeEnum.string
    },
    post_labels: {
        array: true,
        subfields: {
            id: tableau.dataTypeEnum.string,
            name: tableau.dataTypeEnum.string
        }
    },
    potential_impressions: {
        type: tableau.dataTypeEnum.int
    },
    profileId: {
        type: tableau.dataTypeEnum.string
    },
    sentiment: {
        type: tableau.dataTypeEnum.string
    },
    shares: {
        type: tableau.dataTypeEnum.int
    },
    site: {
        type: tableau.dataTypeEnum.string
    },
    url: {
        type: tableau.dataTypeEnum.string
    }
}

const facebookAdsMetrics = [
    'impressions',
    'spend',
    'clicks',
    'cpc',
    'ctr',
    'cpm',
    'page_engagement',
    'page_like',
    'comment_count',
    'post_engagement',
    'like_count',
    'interaction_count',
    'reaction_anger',
    'reaction_like',
    'reaction_love',
    'reaction_haha',
    'reaction_wow',
    'reaction_sorry',
    'reaction_pride',
    'reaction_thankful',
    'reaction_care',
    'onsite_conversion_post_save',
    'share_count',
    'photo_view',
    'video_view',
    'rsvp',
    'checkin',
    'full_view_impressions',
    'cost_per_page_engagement',
    'cost_per_page_like',
    'cost_per_post_engagement',
    'cost_per_rsvp',
    'video_thruplay_watched',
    'video_p25_watched',
    'video_p50_watched',
    'video_p75_watched',
    'video_p95_watched',
    'video_p100_watched',
    'video_avg_time_watched',
    'video_play_view',
    'canvas_avg_view_time',
    'canvas_avg_view_percent',
    'cost_per_thruplay',
    'inline_link_clicks',
    'outbound_clicks',
    'inline_link_click_ctr',
    'outbound_clicks_ctr',
    'instant_experience_clicks_to_open',
    'instant_experience_clicks_to_start',
    'instant_experience_outbound_clicks',
    'cost_per_inline_link_click',
    'cost_per_outbound_click',
    'omni_achievement_unlocked',
    'add_payment_info',
    'omni_add_to_cart',
    'add_to_wishlist',
    'omni_activate_app',
    'omni_app_install',
    'omni_initiated_checkout',
    'omni_view_content',
    'omni_spend_credits',
    'app_custom_event',
    'app_engagement',
    'app_story',
    'app_use',
    'games_plays',
    'landing_page_view',
    'lead',
    'omni_level_achieved',
    'onsite_conversion_flow_complete',
    'purchase_roas_omni_purchase',
    'purchase_conversion_value',
    'omni_purchase',
    'omni_rate',
    'omni_complete_registration',
    'omni_search',
    'store_visit_with_dwell',
    'subscribe',
    'omni_tutorial_completion'
]

const facebookAdsDimensions = [
    'ad_account',
    'age',
    'campaign',
    'country',
    'date.day',
    'date.month',
    'date.quarter',
    'date.week',
    'gender',
    'objective',
    'placement',
    'publisher_platform'
]

const FACEBOOK_ADS_AD_FIELDS = {
    ad_account_id: { type: tableau.dataTypeEnum.string },
    ad_account_name: { type: tableau.dataTypeEnum.string },
    ad_campaign_id: { type: tableau.dataTypeEnum.string },
    ad_campaign_name: { type: tableau.dataTypeEnum.string },
    ad_set_id: { type: tableau.dataTypeEnum.string },
    ad_set_name: { type: tableau.dataTypeEnum.string },
    ad_type: { type: tableau.dataTypeEnum.string },
    attachments: {
        array: true,
        subfields: {
            title: tableau.dataTypeEnum.string,
            description: tableau.dataTypeEnum.string,
            type: tableau.dataTypeEnum.string,
            url: tableau.dataTypeEnum.string,
            image_url: tableau.dataTypeEnum.string,
            link: tableau.dataTypeEnum.string,
            call_to_action: tableau.dataTypeEnum.string
        }
    },
    clicks: { type: tableau.dataTypeEnum.int },
    cost_per_post_engagement: { type: tableau.dataTypeEnum.float },
    cpc: { type: tableau.dataTypeEnum.float },
    cpm: { type: tableau.dataTypeEnum.float },
    created_time: { type: tableau.dataTypeEnum.datetime },
    ctr: { type: tableau.dataTypeEnum.float },
    engagement_rate: { type: tableau.dataTypeEnum.float },
    id: { type: tableau.dataTypeEnum.string },
    impressions: { type: tableau.dataTypeEnum.int },
    inline_link_clicks: { type: tableau.dataTypeEnum.int },
    interaction_count: { type: tableau.dataTypeEnum.int },
    landing_page_view: { type: tableau.dataTypeEnum.int },
    lead: { type: tableau.dataTypeEnum.int },
    message: { type: tableau.dataTypeEnum.string },
    name: { type: tableau.dataTypeEnum.string },
    objective: { type: tableau.dataTypeEnum.string },
    placements: {
        subfields: {
            instagram: tableau.dataTypeEnum.string,
            facebook: tableau.dataTypeEnum.string
        }
    },
    post_engagement: { type: tableau.dataTypeEnum.int },
    post_labels: {
        array: true,
        subfields: {
            id: tableau.dataTypeEnum.string,
            name: tableau.dataTypeEnum.string
        }
    },
    spend: { type: tableau.dataTypeEnum.float },
    status: { type: tableau.dataTypeEnum.string },
    video_play_view: { type: tableau.dataTypeEnum.int }
}

// FACEBOOK ADS
const facebookAdsSort = [
    'ad_account',
    'age',
    'campaign',
    'country',
    'date.day',
    'date.month',
    'date.quarter',
    'date.week',
    'date.year',
    'gender',
    'objective',
    'placement',
    'publisher_platform',
    'impressions',
    'spend',
    'clicks',
    'cpc',
    'ctr',
    'cpm',
    'page_engagement',
    'page_like',
    'comment_count',
    'post_engagement',
    'like_count',
    'interaction_count',
    'reaction_anger',
    'reaction_like',
    'reaction_love',
    'reaction_haha',
    'reaction_wow',
    'reaction_sorry',
    'reaction_pride',
    'reaction_thankful',
    'reaction_care',
    'onsite_conversion_post_save',
    'share_count',
    'photo_view',
    'video_view',
    'rsvp',
    'checkin',
    'full_view_impressions',
    'cost_per_page_engagement',
    'cost_per_page_like',
    'cost_per_post_engagement',
    'cost_per_rsvp',
    'video_thruplay_watched',
    'video_p25_watched',
    'video_p50_watched',
    'video_p75_watched',
    'video_p95_watched',
    'video_p100_watched',
    'video_avg_time_watched',
    'video_play_view',
    'canvas_avg_view_time',
    'canvas_avg_view_percent',
    'cost_per_thruplay',
    'inline_link_clicks',
    'outbound_clicks',
    'inline_link_click_ctr',
    'outbound_clicks_ctr',
    'instant_experience_clicks_to_open',
    'instant_experience_clicks_to_start',
    'instant_experience_outbound_clicks',
    'cost_per_inline_link_click',
    'cost_per_outbound_click',
    'omni_achievement_unlocked',
    'add_payment_info',
    'omni_add_to_cart',
    'add_to_wishlist',
    'omni_activate_app',
    'omni_app_install',
    'omni_initiated_checkout',
    'omni_view_content',
    'omni_spend_credits',
    'app_custom_event',
    'app_engagement',
    'app_story',
    'app_use',
    'games_plays',
    'landing_page_view',
    'lead',
    'omni_level_achieved',
    'onsite_conversion_flow_complete',
    'purchase_roas_omni_purchase',
    'purchase_conversion_value',
    'omni_purchase',
    'omni_rate',
    'omni_complete_registration',
    'omni_search',
    'store_visit_with_dwell',
    'subscribe',
    'omni_tutorial_completion'
]

const facebookAdsFilter = {
    gender: ['male', 'female'],
    age: [
        '13-17',
        '18-24',
        '25-34',
        '35-44',
        '45-54',
        '55-64',
        '65+'
    ],
    objectives: [
        'CONVERSIONS',
        'LINK_CLICKS',
        'APP_INSTALLS',
        'REACH',
        'POST_ENGAGEMENT',
        'PRODUCT_CATALOG_SALES',
        'LEAD_GENERATION',
        'VIDEO_VIEWS',
        'BRAND_AWARENESS',
        'PAGE_LIKES',
        'STORE_VISITS',
        'MESSAGES',
        'EVENT_RESPONSES',
        'MOBILE_APP_INSTALLS',
        'MOBILE_APP_ENGAGEMENT',
        'OFFER_CLAIMS',
        'OUTCOME_AWARENESS',
        'OUTCOME_ENGAGEMENT',
        'OUTCOME_LEADS',
        'OUTCOME_SALES',
        'OUTCOME_TRAFFIC',
        'OUTCOME_APP_PROMOTION'
    ],
    publisher_platform: [
        'facebook',
        'instagram',
        'audience_network',
        'messenger'
    ],
    placement: [
        'feed',
        'instagram_stories',
        'instagram_explore',
        'video_feeds',
        'marketplace',
        'facebook_stories',
        'search',
        'instream_video',
        'instant_article',
        'an_classic',
        'right_hand_column',
        'messenger_inbox',
        'messenger_stories',
        'rewarded_video',
        'facebook_groups_feed',
        'instagram_igtv',
        'instagram_reels',
        'all_placements'
    ],
    country: [
        {
            'name': 'Andorra',
            'country_code': 'AD',
        },
        {
            'name': 'United Arab Emirates',
            'country_code': 'AE',
        },
        {
            'name': 'Afghanistan',
            'country_code': 'AF',
        },
        {
            'name': 'Antigua',
            'country_code': 'AG',
        },
        {
            'name': 'Anguilla',
            'country_code': 'AI',
        },
        {
            'name': 'Albania',
            'country_code': 'AL',
        },
        {
            'name': 'Armenia',
            'country_code': 'AM',
        },
        {
            'name': 'Netherlands Antilles',
            'country_code': 'AN',
        },
        {
            'name': 'Angola',
            'country_code': 'AO',
        },
        {
            'name': 'Antarctica',
            'country_code': 'AQ',
        },
        {
            'name': 'Argentina',
            'country_code': 'AR',
        },
        {
            'name': 'American Samoa',
            'country_code': 'AS',
        },
        {
            'name': 'Austria',
            'country_code': 'AT',
        },
        {
            'name': 'Australia',
            'country_code': 'AU',
        },
        {
            'name': 'Aruba',
            'country_code': 'AW',
        },
        {
            'name': 'Aland Islands',
            'country_code': 'AX',
        },
        {
            'name': 'Azerbaijan',
            'country_code': 'AZ',
        },
        {
            'name': 'Bosnia and Herzegovina',
            'country_code': 'BA',
        },
        {
            'name': 'Barbados',
            'country_code': 'BB',
        },
        {
            'name': 'Bangladesh',
            'country_code': 'BD',
        },
        {
            'name': 'Belgium',
            'country_code': 'BE',
        },
        {
            'name': 'Burkina Faso',
            'country_code': 'BF',
        },
        {
            'name': 'Bulgaria',
            'country_code': 'BG',
        },
        {
            'name': 'Bahrain',
            'country_code': 'BH',
        },
        {
            'name': 'Burundi',
            'country_code': 'BI',
        },
        {
            'name': 'Benin',
            'country_code': 'BJ',
        },
        {
            'name': 'Saint Barthélemy',
            'country_code': 'BL',
        },
        {
            'name': 'Bermuda',
            'country_code': 'BM',
        },
        {
            'name': 'Brunei',
            'country_code': 'BN',
        },
        {
            'name': 'Bolivia',
            'country_code': 'BO',
        },
        {
            'name': 'Bonaire, Sint Eustatius and Saba',
            'country_code': 'BQ',
        },
        {
            'name': 'Brazil',
            'country_code': 'BR',
        },
        {
            'name': 'The Bahamas',
            'country_code': 'BS',
        },
        {
            'name': 'Bhutan',
            'country_code': 'BT',
        },
        {
            'name': 'Bouvet Island',
            'country_code': 'BV',
        },
        {
            'name': 'Botswana',
            'country_code': 'BW',
        },
        {
            'name': 'Belarus',
            'country_code': 'BY',
        },
        {
            'name': 'Belize',
            'country_code': 'BZ',
        },
        {
            'name': 'Canada',
            'country_code': 'CA',
        },
        {
            'name': 'Cocos (Keeling) Islands',
            'country_code': 'CC',
        },
        {
            'name': 'Democratic Republic of the Congo',
            'country_code': 'CD',
        },
        {
            'name': 'Central African Republic',
            'country_code': 'CF',
        },
        {
            'name': 'Republic of the Congo',
            'country_code': 'CG',
        },
        {
            'name': 'Switzerland',
            'country_code': 'CH',
        },
        {
            'name': "Côte d'Ivoire",
            'country_code': 'CI',
        },
        {
            'name': 'Cook Islands',
            'country_code': 'CK',
        },
        {
            'name': 'Chile',
            'country_code': 'CL',
        },
        {
            'name': 'Cameroon',
            'country_code': 'CM',
        },
        {
            'name': 'China',
            'country_code': 'CN',
        },
        {
            'name': 'Colombia',
            'country_code': 'CO',
        },
        {
            'name': 'Costa Rica',
            'country_code': 'CR',
        },
        {
            'name': 'Cape Verde',
            'country_code': 'CV',
        },
        {
            'name': 'Curaçao',
            'country_code': 'CW',
        },
        {
            'name': 'Christmas Island',
            'country_code': 'CX',
        },
        {
            'name': 'Cyprus',
            'country_code': 'CY',
        },
        {
            'name': 'Czech Republic',
            'country_code': 'CZ',
        },
        {
            'name': 'Germany',
            'country_code': 'DE',
        },
        {
            'name': 'Djibouti',
            'country_code': 'DJ',
        },
        {
            'name': 'Denmark',
            'country_code': 'DK',
        },
        {
            'name': 'Dominica',
            'country_code': 'DM',
        },
        {
            'name': 'Dominican Republic',
            'country_code': 'DO',
        },
        {
            'name': 'Algeria',
            'country_code': 'DZ',
        },
        {
            'name': 'Ecuador',
            'country_code': 'EC',
        },
        {
            'name': 'Estonia',
            'country_code': 'EE',
        },
        {
            'name': 'Egypt',
            'country_code': 'EG',
        },
        {
            'name': 'Western Sahara',
            'country_code': 'EH',
        },
        {
            'name': 'Eritrea',
            'country_code': 'ER',
        },
        {
            'name': 'Spain',
            'country_code': 'ES',
        },
        {
            'name': 'Ethiopia',
            'country_code': 'ET',
        },
        {
            'name': 'Finland',
            'country_code': 'FI',
        },
        {
            'name': 'Fiji',
            'country_code': 'FJ',
        },
        {
            'name': 'Falkland Islands',
            'country_code': 'FK',
        },
        {
            'name': 'Federated States of Micronesia',
            'country_code': 'FM',
        },
        {
            'name': 'Faroe Islands',
            'country_code': 'FO',
        },
        {
            'name': 'France',
            'country_code': 'FR',
        },
        {
            'name': 'Gabon',
            'country_code': 'GA',
        },
        {
            'name': 'United Kingdom',
            'country_code': 'GB',
        },
        {
            'name': 'Grenada',
            'country_code': 'GD',
        },
        {
            'name': 'Georgia',
            'country_code': 'GE',
        },
        {
            'name': 'French Guiana',
            'country_code': 'GF',
        },
        {
            'name': 'Guernsey',
            'country_code': 'GG',
        },
        {
            'name': 'Ghana',
            'country_code': 'GH',
        },
        {
            'name': 'Gibraltar',
            'country_code': 'GI',
        },
        {
            'name': 'Greenland',
            'country_code': 'GL',
        },
        {
            'name': 'The Gambia',
            'country_code': 'GM',
        },
        {
            'name': 'Guinea',
            'country_code': 'GN',
        },
        {
            'name': 'Guadeloupe',
            'country_code': 'GP',
        },
        {
            'name': 'Equatorial Guinea',
            'country_code': 'GQ',
        },
        {
            'name': 'Greece',
            'country_code': 'GR',
        },
        {
            'name': 'South Georgia and the South Sandwich Islands',
            'country_code': 'GS',
        },
        {
            'name': 'Guatemala',
            'country_code': 'GT',
        },
        {
            'name': 'Guam',
            'country_code': 'GU',
        },
        {
            'name': 'Guinea-Bissau',
            'country_code': 'GW',
        },
        {
            'name': 'Guyana',
            'country_code': 'GY',
        },
        {
            'name': 'Hong Kong',
            'country_code': 'HK',
        },
        {
            'name': 'Heard Island and McDonald Islands',
            'country_code': 'HM',
        },
        {
            'name': 'Honduras',
            'country_code': 'HN',
        },
        {
            'name': 'Croatia',
            'country_code': 'HR',
        },
        {
            'name': 'Haiti',
            'country_code': 'HT',
        },
        {
            'name': 'Hungary',
            'country_code': 'HU',
        },
        {
            'name': 'Indonesia',
            'country_code': 'ID',
        },
        {
            'name': 'Ireland',
            'country_code': 'IE',
        },
        {
            'name': 'Israel',
            'country_code': 'IL',
        },
        {
            'name': 'Isle Of Man',
            'country_code': 'IM',
        },
        {
            'name': 'India',
            'country_code': 'IN',
        },
        {
            'name': 'British Indian Ocean Territory',
            'country_code': 'IO',
        },
        {
            'name': 'Iraq',
            'country_code': 'IQ',
        },
        {
            'name': 'Iceland',
            'country_code': 'IS',
        },
        {
            'name': 'Italy',
            'country_code': 'IT',
        },
        {
            'name': 'Jersey',
            'country_code': 'JE',
        },
        {
            'name': 'Jamaica',
            'country_code': 'JM',
        },
        {
            'name': 'Jordan',
            'country_code': 'JO',
        },
        {
            'name': 'Japan',
            'country_code': 'JP',
        },
        {
            'name': 'Kenya',
            'country_code': 'KE',
        },
        {
            'name': 'Kyrgyzstan',
            'country_code': 'KG',
        },
        {
            'name': 'Cambodia',
            'country_code': 'KH',
        },
        {
            'name': 'Kiribati',
            'country_code': 'KI',
        },
        {
            'name': 'Comoros',
            'country_code': 'KM',
        },
        {
            'name': 'Saint Kitts and Nevis',
            'country_code': 'KN',
        },
        {
            'name': 'South Korea',
            'country_code': 'KR',
        },
        {
            'name': 'Kuwait',
            'country_code': 'KW',
        },
        {
            'name': 'Cayman Islands',
            'country_code': 'KY',
        },
        {
            'name': 'Kazakhstan',
            'country_code': 'KZ',
        },
        {
            'name': 'Laos',
            'country_code': 'LA',
        },
        {
            'name': 'Lebanon',
            'country_code': 'LB',
        },
        {
            'name': 'St. Lucia',
            'country_code': 'LC',
        },
        {
            'name': 'Liechtenstein',
            'country_code': 'LI',
        },
        {
            'name': 'Sri Lanka',
            'country_code': 'LK',
        },
        {
            'name': 'Liberia',
            'country_code': 'LR',
        },
        {
            'name': 'Lesotho',
            'country_code': 'LS',
        },
        {
            'name': 'Lithuania',
            'country_code': 'LT',
        },
        {
            'name': 'Luxembourg',
            'country_code': 'LU',
        },
        {
            'name': 'Latvia',
            'country_code': 'LV',
        },
        {
            'name': 'Libya',
            'country_code': 'LY',
        },
        {
            'name': 'Morocco',
            'country_code': 'MA',
        },
        {
            'name': 'Monaco',
            'country_code': 'MC',
        },
        {
            'name': 'Moldova',
            'country_code': 'MD',
        },
        {
            'name': 'Montenegro',
            'country_code': 'ME',
        },
        {
            'name': 'Saint Martin',
            'country_code': 'MF',
        },
        {
            'name': 'Madagascar',
            'country_code': 'MG',
        },
        {
            'name': 'Marshall Islands',
            'country_code': 'MH',
        },
        {
            'name': 'Macedonia',
            'country_code': 'MK',
        },
        {
            'name': 'Mali',
            'country_code': 'ML',
        },
        {
            'name': 'Myanmar',
            'country_code': 'MM',
        },
        {
            'name': 'Mongolia',
            'country_code': 'MN',
        },
        {
            'name': 'Macau',
            'country_code': 'MO',
        },
        {
            'name': 'Northern Mariana Islands',
            'country_code': 'MP',
        },
        {
            'name': 'Martinique',
            'country_code': 'MQ',
        },
        {
            'name': 'Mauritania',
            'country_code': 'MR',
        },
        {
            'name': 'Montserrat',
            'country_code': 'MS',
        },
        {
            'name': 'Malta',
            'country_code': 'MT',
        },
        {
            'name': 'Mauritius',
            'country_code': 'MU',
        },
        {
            'name': 'Maldives',
            'country_code': 'MV',
        },
        {
            'name': 'Malawi',
            'country_code': 'MW',
        },
        {
            'name': 'Mexico',
            'country_code': 'MX',
        },
        {
            'name': 'Malaysia',
            'country_code': 'MY',
        },
        {
            'name': 'Mozambique',
            'country_code': 'MZ',
        },
        {
            'name': 'Namibia',
            'country_code': 'NA',
        },
        {
            'name': 'New Caledonia',
            'country_code': 'NC',
        },
        {
            'name': 'Niger',
            'country_code': 'NE',
        },
        {
            'name': 'Norfolk Island',
            'country_code': 'NF',
        },
        {
            'name': 'Nigeria',
            'country_code': 'NG',
        },
        {
            'name': 'Nicaragua',
            'country_code': 'NI',
        },
        {
            'name': 'Netherlands',
            'country_code': 'NL',
        },
        {
            'name': 'Norway',
            'country_code': 'NO',
        },
        {
            'name': 'Nepal',
            'country_code': 'NP',
        },
        {
            'name': 'Nauru',
            'country_code': 'NR',
        },
        {
            'name': 'Niue',
            'country_code': 'NU',
        },
        {
            'name': 'New Zealand',
            'country_code': 'NZ',
        },
        {
            'name': 'Oman',
            'country_code': 'OM',
        },
        {
            'name': 'Panama',
            'country_code': 'PA',
        },
        {
            'name': 'Peru',
            'country_code': 'PE',
        },
        {
            'name': 'French Polynesia',
            'country_code': 'PF',
        },
        {
            'name': 'Papua New Guinea',
            'country_code': 'PG',
        },
        {
            'name': 'Philippines',
            'country_code': 'PH',
        },
        {
            'name': 'Pakistan',
            'country_code': 'PK',
        },
        {
            'name': 'Poland',
            'country_code': 'PL',
        },
        {
            'name': 'Saint Pierre and Miquelon',
            'country_code': 'PM',
        },
        {
            'name': 'Pitcairn',
            'country_code': 'PN',
        },
        {
            'name': 'Puerto Rico',
            'country_code': 'PR',
        },
        {
            'name': 'Palestine',
            'country_code': 'PS',
        },
        {
            'name': 'Portugal',
            'country_code': 'PT',
        },
        {
            'name': 'Palau',
            'country_code': 'PW',
        },
        {
            'name': 'Paraguay',
            'country_code': 'PY',
        },
        {
            'name': 'Qatar',
            'country_code': 'QA',
        },
        {
            'name': 'Réunion',
            'country_code': 'RE',
        },
        {
            'name': 'Romania',
            'country_code': 'RO',
        },
        {
            'name': 'Serbia',
            'country_code': 'RS',
        },
        {
            'name': 'Russia',
            'country_code': 'RU',
        },
        {
            'name': 'Rwanda',
            'country_code': 'RW',
        },
        {
            'name': 'Saudi Arabia',
            'country_code': 'SA',
        },
        {
            'name': 'Solomon Islands',
            'country_code': 'SB',
        },
        {
            'name': 'Seychelles',
            'country_code': 'SC',
        },
        {
            'name': 'Sweden',
            'country_code': 'SE',
        },
        {
            'name': 'Singapore',
            'country_code': 'SG',
        },
        {
            'name': 'Saint Helena',
            'country_code': 'SH',
        },
        {
            'name': 'Slovenia',
            'country_code': 'SI',
        },
        {
            'name': 'Svalbard and Jan Mayen',
            'country_code': 'SJ',
        },
        {
            'name': 'Slovakia',
            'country_code': 'SK',
        },
        {
            'name': 'Sierra Leone',
            'country_code': 'SL',
        },
        {
            'name': 'San Marino',
            'country_code': 'SM',
        },
        {
            'name': 'Senegal',
            'country_code': 'SN',
        },
        {
            'name': 'Somalia',
            'country_code': 'SO',
        },
        {
            'name': 'Suriname',
            'country_code': 'SR',
        },
        {
            'name': 'South Sudan',
            'country_code': 'SS',
        },
        {
            'name': 'Sao Tome and Principe',
            'country_code': 'ST',
        },
        {
            'name': 'El Salvador',
            'country_code': 'SV',
        },
        {
            'name': 'Sint Maarten',
            'country_code': 'SX',
        },
        {
            'name': 'Swaziland',
            'country_code': 'SZ',
        },
        {
            'name': 'Turks and Caicos Islands',
            'country_code': 'TC',
        },
        {
            'name': 'Chad',
            'country_code': 'TD',
        },
        {
            'name': 'French Southern Territories',
            'country_code': 'TF',
        },
        {
            'name': 'Togo',
            'country_code': 'TG',
        },
        {
            'name': 'Thailand',
            'country_code': 'TH',
        },
        {
            'name': 'Tajikistan',
            'country_code': 'TJ',
        },
        {
            'name': 'Tokelau',
            'country_code': 'TK',
        },
        {
            'name': 'Timor-Leste',
            'country_code': 'TL',
        },
        {
            'name': 'Turkmenistan',
            'country_code': 'TM',
        },
        {
            'name': 'Tunisia',
            'country_code': 'TN',
        },
        {
            'name': 'Tonga',
            'country_code': 'TO',
        },
        {
            'name': 'Turkey',
            'country_code': 'TR',
        },
        {
            'name': 'Trinidad and Tobago',
            'country_code': 'TT',
        },
        {
            'name': 'Tuvalu',
            'country_code': 'TV',
        },
        {
            'name': 'Taiwan',
            'country_code': 'TW',
        },
        {
            'name': 'Tanzania',
            'country_code': 'TZ',
        },
        {
            'name': 'Ukraine',
            'country_code': 'UA',
        },
        {
            'name': 'Uganda',
            'country_code': 'UG',
        },
        {
            'name': 'United States Minor Outlying Islands',
            'country_code': 'UM',
        },
        {
            'name': 'United States',
            'country_code': 'US',
        },
        {
            'name': 'Uruguay',
            'country_code': 'UY',
        },
        {
            'name': 'Uzbekistan',
            'country_code': 'UZ',
        },
        {
            'name': 'Vatican City',
            'country_code': 'VA',
        },
        {
            'name': 'Saint Vincent and the Grenadines',
            'country_code': 'VC',
        },
        {
            'name': 'Venezuela',
            'country_code': 'VE',
        },
        {
            'name': 'British Virgin Islands',
            'country_code': 'VG',
        },
        {
            'name': 'US Virgin Islands',
            'country_code': 'VI',
        },
        {
            'name': 'Vietnam',
            'country_code': 'VN',
        },
        {
            'name': 'Vanuatu',
            'country_code': 'VU',
        },
        {
            'name': 'Wallis and Futuna',
            'country_code': 'WF',
        },
        {
            'name': 'Samoa',
            'country_code': 'WS',
        },
        {
            'name': 'Kosovo',
            'country_code': 'XK',
        },
        {
            'name': 'Yemen',
            'country_code': 'YE',
        },
        {
            'name': 'Mayotte',
            'country_code': 'YT',
        },
        {
            'name': 'South Africa',
            'country_code': 'ZA',
        },
        {
            'name': 'Zambia',
            'country_code': 'ZM',
        },
        {
            'name': 'Zimbabwe',
            'country_code': 'ZW',
        }
    ]
}

const FACEBOOK_ADS_DIMENSION_FORBIDDEN_COMBINATIONS = {
    'ad_account': ['ad_account', 'campaign'],
    'campaign': ['ad_account', 'campaign'],
    'age': ['age', 'country', 'placement', 'publisher_platform'],
    'gender': ['gender', 'country', 'placement', 'publisher_platform'],
    'country': ['age', 'gender', 'country', 'placement', 'publisher_platform'],
    'objective': ['objective'],
    'placement': ['age', 'gender', 'country', 'placement', 'publisher_platform'],
    'publisher_platform': ['age', 'gender', 'country', 'publisher_platform']
}

const LANGUAGES = [
    {
        name: "Afar",
        code: "aa"
    },
    {
        name: "Abkhazian",
        code: "ab"
    },
    {
        name: "Avestan",
        code: "ae"
    },
    {
        name: "Afrikaans",
        code: "af"
    },
    {
        name: "Akan",
        code: "ak"
    },
    {
        name: "Amharic",
        code: "am"
    },
    {
        name: "Aragonese",
        code: "an"
    },
    {
        name: "Arabic",
        code: "ar"
    },
    {
        name: "Assamese",
        code: "as"
    },
    {
        name: "Avaric",
        code: "av"
    },
    {
        name: "Aymara",
        code: "ay"
    },
    {
        name: "Azerbaijani",
        code: "az"
    },
    {
        name: "Bashkir",
        code: "ba"
    },
    {
        name: "Belarusian",
        code: "be"
    },
    {
        name: "Bulgarian",
        code: "bg"
    },
    {
        name: "Bihari languages",
        code: "bh"
    },
    {
        name: "Bislama",
        code: "bi"
    },
    {
        name: "Bambara",
        code: "bm"
    },
    {
        name: "Bengali",
        code: "bn"
    },
    {
        name: "Tibetan",
        code: "bo"
    },
    {
        name: "Breton",
        code: "br"
    },
    {
        name: "Bosnian",
        code: "bs"
    },
    {
        name: "Catalan; Valencian",
        code: "ca"
    },
    {
        name: "Chechen",
        code: "ce"
    },
    {
        name: "Chamorro",
        code: "ch"
    },
    {
        name: "Corsican",
        code: "co"
    },
    {
        name: "Cree",
        code: "cr"
    },
    {
        name: "Czech",
        code: "cs"
    },
    {
        name: "Church Slavic; Old Slavonic; Church Slavonic; Old Bulgarian; Old Church Slavonic",
        code: "cu"
    },
    {
        name: "Chuvash",
        code: "cv"
    },
    {
        name: "Welsh",
        code: "cy"
    },
    {
        name: "Danish",
        code: "da"
    },
    {
        name: "German",
        code: "de"
    },
    {
        name: "Divehi; Dhivehi; Maldivian",
        code: "dv"
    },
    {
        name: "Dzongkha",
        code: "dz"
    },
    {
        name: "Ewe",
        code: "ee"
    },
    {
        name: "Greek, Modern (1453-)",
        code: "el"
    },
    {
        name: "English",
        code: "en"
    },
    {
        name: "Esperanto",
        code: "eo"
    },
    {
        name: "Spanish; Castilian",
        code: "es"
    },
    {
        name: "Estonian",
        code: "et"
    },
    {
        name: "Basque",
        code: "eu"
    },
    {
        name: "Persian",
        code: "fa"
    },
    {
        name: "Fulah",
        code: "ff"
    },
    {
        name: "Finnish",
        code: "fi"
    },
    {
        name: "Fijian",
        code: "fj"
    },
    {
        name: "Faroese",
        code: "fo"
    },
    {
        name: "French",
        code: "fr"
    },
    {
        name: "Western Frisian",
        code: "fy"
    },
    {
        name: "Irish",
        code: "ga"
    },
    {
        name: "Gaelic; Scottish Gaelic",
        code: "gd"
    },
    {
        name: "Galician",
        code: "gl"
    },
    {
        name: "Guarani",
        code: "gn"
    },
    {
        name: "Gujarati",
        code: "gu"
    },
    {
        name: "Manx",
        code: "gv"
    },
    {
        name: "Hausa",
        code: "ha"
    },
    {
        name: "Hebrew",
        code: "he"
    },
    {
        name: "Hindi",
        code: "hi"
    },
    {
        name: "Hiri Motu",
        code: "ho"
    },
    {
        name: "Croatian",
        code: "hr"
    },
    {
        name: "Haitian; Haitian Creole",
        code: "ht"
    },
    {
        name: "Hungarian",
        code: "hu"
    },
    {
        name: "Armenian",
        code: "hy"
    },
    {
        name: "Herero",
        code: "hz"
    },
    {
        name: "Interlingua (International Auxiliary Language Association)",
        code: "ia"
    },
    {
        name: "Indonesian",
        code: "id"
    },
    {
        name: "Interlingue; Occidental",
        code: "ie"
    },
    {
        name: "Igbo",
        code: "ig"
    },
    {
        name: "Sichuan Yi; Nuosu",
        code: "ii"
    },
    {
        name: "Inupiaq",
        code: "ik"
    },
    {
        name: "Ido",
        code: "io"
    },
    {
        name: "Icelandic",
        code: "is"
    },
    {
        name: "Italian",
        code: "it"
    },
    {
        name: "Inuktitut",
        code: "iu"
    },
    {
        name: "Japanese",
        code: "ja"
    },
    {
        name: "Javanese",
        code: "jv"
    },
    {
        name: "Georgian",
        code: "ka"
    },
    {
        name: "Kongo",
        code: "kg"
    },
    {
        name: "Kikuyu; Gikuyu",
        code: "ki"
    },
    {
        name: "Kuanyama; Kwanyama",
        code: "kj"
    },
    {
        name: "Kazakh",
        code: "kk"
    },
    {
        name: "Kalaallisut; Greenlandic",
        code: "kl"
    },
    {
        name: "Central Khmer",
        code: "km"
    },
    {
        name: "Kannada",
        code: "kn"
    },
    {
        name: "Korean",
        code: "ko"
    },
    {
        name: "Kanuri",
        code: "kr"
    },
    {
        name: "Kashmiri",
        code: "ks"
    },
    {
        name: "Kurdish",
        code: "ku"
    },
    {
        name: "Komi",
        code: "kv"
    },
    {
        name: "Cornish",
        code: "kw"
    },
    {
        name: "Kirghiz; Kyrgyz",
        code: "ky"
    },
    {
        name: "Latin",
        code: "la"
    },
    {
        name: "Luxembourgish; Letzeburgesch",
        code: "lb"
    },
    {
        name: "Ganda",
        code: "lg"
    },
    {
        name: "Limburgan; Limburger; Limburgish",
        code: "li"
    },
    {
        name: "Lingala",
        code: "ln"
    },
    {
        name: "Lao",
        code: "lo"
    },
    {
        name: "Lithuanian",
        code: "lt"
    },
    {
        name: "Luba-Katanga",
        code: "lu"
    },
    {
        name: "Latvian",
        code: "lv"
    },
    {
        name: "Malagasy",
        code: "mg"
    },
    {
        name: "Marshallese",
        code: "mh"
    },
    {
        name: "Maori",
        code: "mi"
    },
    {
        name: "Macedonian",
        code: "mk"
    },
    {
        name: "Malayalam",
        code: "ml"
    },
    {
        name: "Mongolian",
        code: "mn"
    },
    {
        name: "Marathi",
        code: "mr"
    },
    {
        name: "Malay",
        code: "ms"
    },
    {
        name: "Maltese",
        code: "mt"
    },
    {
        name: "Burmese",
        code: "my"
    },
    {
        name: "Nauru",
        code: "na"
    },
    {
        name: "Bokmål, Norwegian; Norwegian Bokmål",
        code: "nb"
    },
    {
        name: "Ndebele, North; North Ndebele",
        code: "nd"
    },
    {
        name: "Nepali",
        code: "ne"
    },
    {
        name: "Ndonga",
        code: "ng"
    },
    {
        name: "Dutch; Flemish",
        code: "nl"
    },
    {
        name: "Norwegian Nynorsk; Nynorsk, Norwegian",
        code: "nn"
    },
    {
        name: "Norwegian",
        code: "no"
    },
    {
        name: "Ndebele, South; South Ndebele",
        code: "nr"
    },
    {
        name: "Navajo; Navaho",
        code: "nv"
    },
    {
        name: "Chichewa; Chewa; Nyanja",
        code: "ny"
    },
    {
        name: "Occitan (post 1500)",
        code: "oc"
    },
    {
        name: "Ojibwa",
        code: "oj"
    },
    {
        name: "Oromo",
        code: "om"
    },
    {
        name: "Oriya",
        code: "or"
    },
    {
        name: "Ossetian; Ossetic",
        code: "os"
    },
    {
        name: "Panjabi; Punjabi",
        code: "pa"
    },
    {
        name: "Pali",
        code: "pi"
    },
    {
        name: "Polish",
        code: "pl"
    },
    {
        name: "Pushto; Pashto",
        code: "ps"
    },
    {
        name: "Portuguese",
        code: "pt"
    },
    {
        name: "Quechua",
        code: "qu"
    },
    {
        name: "Romansh",
        code: "rm"
    },
    {
        name: "Rundi",
        code: "rn"
    },
    {
        name: "Romanian; Moldavian; Moldovan",
        code: "ro"
    },
    {
        name: "Russian",
        code: "ru"
    },
    {
        name: "Kinyarwanda",
        code: "rw"
    },
    {
        name: "Sanskrit",
        code: "sa"
    },
    {
        name: "Sardinian",
        code: "sc"
    },
    {
        name: "Sindhi",
        code: "sd"
    },
    {
        name: "Northern Sami",
        code: "se"
    },
    {
        name: "Sango",
        code: "sg"
    },
    {
        name: "Sinhala; Sinhalese",
        code: "si"
    },
    {
        name: "Slovak",
        code: "sk"
    },
    {
        name: "Slovenian",
        code: "sl"
    },
    {
        name: "Samoan",
        code: "sm"
    },
    {
        name: "Shona",
        code: "sn"
    },
    {
        name: "Somali",
        code: "so"
    },
    {
        name: "Albanian",
        code: "sq"
    },
    {
        name: "Serbian",
        code: "sr"
    },
    {
        name: "Swati",
        code: "ss"
    },
    {
        name: "Sotho, Southern",
        code: "st"
    },
    {
        name: "Sundanese",
        code: "su"
    },
    {
        name: "Swedish",
        code: "sv"
    },
    {
        name: "Swahili",
        code: "sw"
    },
    {
        name: "Tamil",
        code: "ta"
    },
    {
        name: "Telugu",
        code: "te"
    },
    {
        name: "Tajik",
        code: "tg"
    },
    {
        name: "Thai",
        code: "th"
    },
    {
        name: "Tigrinya",
        code: "ti"
    },
    {
        name: "Turkmen",
        code: "tk"
    },
    {
        name: "Tagalog",
        code: "tl"
    },
    {
        name: "Tswana",
        code: "tn"
    },
    {
        name: "Tonga (Tonga Islands)",
        code: "to"
    },
    {
        name: "Turkish",
        code: "tr"
    },
    {
        name: "Tsonga",
        code: "ts"
    },
    {
        name: "Tatar",
        code: "tt"
    },
    {
        name: "Twi",
        code: "tw"
    },
    {
        name: "Tahitian",
        code: "ty"
    },
    {
        name: "Uighur; Uyghur",
        code: "ug"
    },
    {
        name: "Ukrainian",
        code: "uk"
    },
    {
        name: "Urdu",
        code: "ur"
    },
    {
        name: "Uzbek",
        code: "uz"
    },
    {
        name: "Venda",
        code: "ve"
    },
    {
        name: "Vietnamese",
        code: "vi"
    },
    {
        name: "Volapük",
        code: "vo"
    },
    {
        name: "Walloon",
        code: "wa"
    },
    {
        name: "Wolof",
        code: "wo"
    },
    {
        name: "Xhosa",
        code: "xh"
    },
    {
        name: "Yiddish",
        code: "yi"
    },
    {
        name: "Yoruba",
        code: "yo"
    },
    {
        name: "Zhuang; Chuang",
        code: "za"
    },
    {
        name: "Chinese",
        code: "zh"
    },
    {
        name: "Zulu",
        code: "zu"
    }
]