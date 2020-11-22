export const ClientHelper = {
    doAction(handle, params) {
        Promise.resolve(handle(params))
            .then(({ message = {} }) => {
                if (message) {
                    $.notify({ message }, { type: 'primary' });
                }
                return data;
            })
            .catch((err) => {
                if (err.response) {
                    $.notify({ title: '<strong>Có lỗi!</strong>', message: err.message }, { type: 'danger' });
                }
            });
    },
    async wait(milisecond) {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, milisecond);
        });
    },
};
