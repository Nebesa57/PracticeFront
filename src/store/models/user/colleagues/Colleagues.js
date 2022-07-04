export default class {
    id = null;

    name = '';

    position = '';

    description = '';

    direction = '';

    mapFromDto = function (viewModel) {
        let dto = viewModel;
        if (!dto) return this;

        this.id = dto.id;
        this.name = dto.name;
        this.position = dto.position;
        this.description = dto.description;
        this.direction = dto.direction;

        return this;
    };

    mapToDto = function () {
        let dto = JSON.parse(JSON.stringify(this));

        dto.name = dto.name;
        dto.position = dto.position;
        dto.description = dto.description;
        dto.direction = dto.direction;

        return dto;
    };

    // isInValid = () => {
    //     if (this.Name == '' || this.Position == '' || this.Description == '' || this.Direction == '') {
    //         return 1;
    //     } else return 0;
    // };
}
