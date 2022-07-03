export default class {
    Id = null;

    UserId = null;

    Name = '';

    Description = '';

    Column = '';

    mapFromDto = function (viewModel) {
        let dto = viewModel;
        if (!dto) return this;

        this.Id = dto.Id;
        this.UserId = dto.UserId;
        this.Name = dto.Name;
        this.Description = dto.Description;
        this.Column = dto.Column;

        return this;
    };

    mapToDto = function () {
        let dto = JSON.parse(JSON.stringify(this));

        dto.Name = dto.Name;
        dto.Description = dto.Description;
        dto.Column = dto.Column;

        return dto;
    };

    isInValid = () => {
        if (this.Name == '' || this.Description == null || this.Column == null) {
            return 1;
        } else return 0;
    };
}
