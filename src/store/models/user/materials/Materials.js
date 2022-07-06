export default class {
    Id = null;

    Name = '';

    Type = null;

    Description = '';

    date = null;

    mapFromDto = function (viewModel) {
        let dto = viewModel;
        if (!dto) return this;

        this.Id = dto.Id;
        this.Name = dto.Name;
        this.Type = dto.Type;
        this.Description = dto.Description;
        this.Date = new Date(dto.Date);

        return this;
    };

    mapToDto = function () {
        let dto = JSON.parse(JSON.stringify(this));

        dto.Name = dto.Name;
        dto.Type = dto.Type;
        dto.Description = dto.Description;
        dto.Date = dto.Date;

        return dto;
    };

    isInValid = () => {
        if (this.Name == '' || this.Type == null || this.Date == null) {
            return 1;
        } else return 0;
    };
}
