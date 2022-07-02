export default class {
    Id = null;

    Name = '';

    Position = '';

    Direction = '';

    CheckTask = {};

    mapFromDto = function (viewModel) {
        let dto = viewModel;
        if (!dto) return this;

        this.Id = dto.Id;
        this.Name = dto.Name;
        this.Position = dto.Position;
        this.Direction = dto.Direction;
        this.CheckTask = dto.CheckTask;

        return this;
    };

    mapToDto = function () {
        let dto = JSON.parse(JSON.stringify(this));

        dto.Name = dto.Name;
        dto.Position = dto.Position;
        dto.Direction = dto.Direction;
        dto.CheckTask = dto.CheckTask;

        return dto;
    };

    isInValid = () => {
        if (this.Name == '' || this.Position == null || this.Direction == null) {
            return 1;
        } else if (this.CheckTask.some(item => item == null || item.Id == '') || this.BlockIds.length == 0) {
            return 2;
        } else return 0;
    };
}
