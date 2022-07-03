export default class {
    Id = null;

    CardId = null;

    Name = '';

    Done = false;

    mapFromDto = function (viewModel) {
        let dto = viewModel;
        if (!dto) return this;

        this.Id = dto.Id;
        this.CardId = this.CardId;
        this.Name = dto.Name;
        this.Done = dto.Done;

        return this;
    };

    mapToDto = function () {
        let dto = JSON.parse(JSON.stringify(this));

        dto.Name = dto.Name;
        dto.Done = dto.Done;

        return dto;
    };

    isInValid = () => {
        if (this.Name == '') {
            return 1;
        } else return 0;
    };
}
