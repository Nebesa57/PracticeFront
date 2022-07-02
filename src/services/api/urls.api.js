export const BASE_URL = 'https://reqres.in';

export default {
    User: {
        Materials: {
            Lectures: {
                GetMaterials: BASE_URL + '/api/unknown',
                GetMaterial: BASE_URL + '/User/GetMaterial',
                PostMaterial: BASE_URL + '/User/PostMaterial',
            },
        },
    },
};
