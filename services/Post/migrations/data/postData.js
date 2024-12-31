module.exports = {
    users : [
    {
      id:1,
      last_name:'Doe',
      first_name: 'John',
      profile_picture: 'https://via.placeholder.com/150',
    },
    {
      id:2,
      last_name:'Sylvan',
      first_name: 'Donatello',
      profile_picture: 'https://via.placeholder.com/150',
    }
  ],
    posts : [
          {
      id: 1,
      post_text: "This is a post",
      privacy_type: "public",
      locked: false,
      community_id: null,
      user_id: 1,
      post_id: null},

          {
      id: 2,
      post_text: "This is a second post",
      privacy_type: "public",
      locked: false,
      community_id: null,
      user_id: 1,
      post_id: null},
          {
      id: 3,
      post_text: "This is a third post",
      privacy_type: "public",
      locked: false,
      community_id: null,
      user_id: 1,
      post_id: null}
    ],

    medias: [
        {
            id: 1,
            original: 'https://via.placeholder.com/150',
            medium: 'https://via.placeholder.com/150',
            large: 'https://via.placeholder.com/150',
            small: 'https://via.placeholder.com/150',
            tiny: 'https://via.placeholder.com/150',
            user_id: 1,
            created_at: new Date(),
        },
        {
            id: 2,
            original: 'https://via.placeholder.com/150',
            medium: 'https://via.placeholder.com/150',
            large: 'https://via.placeholder.com/150',
            small: 'https://via.placeholder.com/150',
            tiny: 'https://via.placeholder.com/150',
            user_id: 1,
            created_at: new Date(),
        },
        {
            id: 3,
            original: 'https://via.placeholder.com/150',
            medium: 'https://via.placeholder.com/150',
            large: 'https://via.placeholder.com/150',
            small: 'https://via.placeholder.com/150',
            tiny: 'https://via.placeholder.com/150',
            user_id: 1,
            created_at: new Date(),
        },
    ],
    post_medias: [
        {
            post_id: 1,
            media_id: 1,
        },
        {
            post_id: 1,
            media_id: 2,
        },
        {
            post_id: 1,
            media_id: 3,
        },
    ],


}