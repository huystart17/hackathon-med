import { ClientHelper } from '../../lib/client_helper.js';

const DefaultLocalData = {
    formData: new FormData(),
    data: {
        bb_path: '',
        mask_path: '',
        delta_time: 0,
    },
};

const LocalData = {
    ...DefaultLocalData,
};

const Action = {
    async upload() {
        let response = await m.request({
            method: 'POST',
            body: LocalData.formData,
            url: '/med/analyze/polyb',
        });
        LocalData.data = { ...response.data };
        return response;
    },
};

export const PagePolybAnalyze = {
    view(v) {
        return [
            m(
                'div',
                {
                    class: 'form-row',
                },
                m(
                    '.form-group.col-md-6',
                    m('input', {
                        oncreate({ dom }) {
                            $(dom).dropify({ minHeight: '300px' });
                        },
                        'data-height': '300',
                        onchange({ target }) {
                            LocalData.formData.delete('photo');
                            let file = target.files[0];
                            LocalData.formData.append('photo', file);
                        },
                        class: 'dropify',
                        type: 'file',
                    })
                ),
                m(
                    '.form-group.col-md-6',
                    LocalData.data.bb_path && [
                        m(
                            '',
                            { style: { height: '300px' } },
                            m('img', {
                                style: {
                                    height: '100%',
                                },
                                src: LocalData.data.bb_path,
                            })
                        ),
                        // m(
                        //     '',
                        //     { style: { height: '300px' } },
                        //     m('img', {
                        //         style: {
                        //             height: '100%',
                        //         },
                        //         src: LocalData.data.mask_path,
                        //     })
                        // ),
                        m('span', 'Thời gian: ', LocalData.data.delta_time / 10000, 's' ),
                    ]
                )
            ),
            m(
                'div.form-row',
                m(
                    '.form-group.col-md-12',
                    m(
                        'button',
                        {
                            class: 'btn btn-primary mr-auto text-nowrap d-none d-md-block',
                            onclick() {
                                ClientHelper.doAction(Action.upload);
                            },
                        },
                        'Upload và xử lý'
                    )
                )
            ),
        ];
    },
};
