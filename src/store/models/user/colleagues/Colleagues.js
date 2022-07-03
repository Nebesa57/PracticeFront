export default class {
    Id = null;

    Name = '';

    Position = '';

    Description = '';

    CardId = null;

    mapFromDto = function (viewModel) {
        let dto = viewModel;
        if (!dto) return this;

        this.Id = dto.Id;
        this.Name = dto.Name;
        this.Position = dto.Position;
        this.Description = dto.Description;
        this.CardId = dto.CardId;

        return this;
    };

    mapToDto = function () {
        let dto = JSON.parse(JSON.stringify(this));

        dto.Name = dto.Name;
        dto.Position = dto.Position;
        dto.Description = dto.Description;

        return dto;
    };

    isInValid = () => {
        if (this.Name == '' || this.Position == '' || this.Description == null) {
            return 1;
        } else return 0;
    };
}
