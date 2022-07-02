export const BASE_URL = 'https://api.devs-evolution.ru';

export default {
    User: {
        Materials: {
            Lectures: {
                GetMaterials: BASE_URL + '/User/GetMaterials',
                GetMaterial: BASE_URL + '/User/GetMaterial',
                PostMaterial: BASE_URL + '/User/PostMaterial',
            },
        },
    },
};
