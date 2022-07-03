export const BASE_URL = 'https://localhost:7294/api/';

export default {
    User: {
        Users: {
            GetUsers: BASE_URL + 'users',
            PostUser: BASE_URL + 'users',
            PutUser: BASE_URL + 'users',
            DeleteUser: BASE_URL + 'users',
            GetUser: BASE_URL + 'users',
        },

        Cards: {
            GetCards: BASE_URL + 'cards',
            PostCard: BASE_URL + 'cards',
            PutCard: BASE_URL + 'cards',
            DeleteCard: BASE_URL + 'cards',
            GetCard: BASE_URL + 'cards',
        },

        Tasks: {
            GetTasks: BASE_URL + 'tasks',
            PostTask: BASE_URL + 'tasks',
            PutTask: BASE_URL + 'tasks',
            DeleteTask: BASE_URL + 'tasks',
            GetTask: BASE_URL + 'tasks',
        },

        Materials: {
            GetMaterials: BASE_URL + 'materials',
            PostMaterial: BASE_URL + 'materials',
            PutMaterial: BASE_URL + 'materials',
            DeleteMaterial: BASE_URL + 'materials',
            GetMaterial: BASE_URL + 'materials',
        },
    },
};
