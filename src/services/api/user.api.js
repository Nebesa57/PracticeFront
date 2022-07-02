import BaseApi from './base.api';
import ApiUrls from './urls.api';

export default {
    Materials: {
        Lectures: {
            GetMaterial: function (materialId) {
                return BaseApi.get(`${ApiUrls.User.Materials.Lectures.GetMaterial}?id=${materialId}`);
            },
            GetMaterials: function () {
                return BaseApi.get(ApiUrls.User.Materials.Lectures.Get);
            },
            PostEdit: function (materialDto) {
                return BaseApi.post(ApiUrls.User.Materials.Lectures.PostMaterial, materialDto);
            },
        },
    },
};
