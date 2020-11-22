import { ClientHelper } from '../../lib/client_helper.js';

const DefaultLocalData = {
    formData: new FormData(),
    data: {
        videos: {
            original_video_path: '',
            bb_video_path: '',
            mask_video_path: '',
        },
    },
    videoDom: null,
    canvasDom: null,
};

const LocalData = {
    ...DefaultLocalData,
};

const Action = {
    async upload() {
        let response = await m.request({
            method: 'POST',
            body: LocalData.formData,
            url: '/med/analyze/polyb-video',
        });
        LocalData.data = { ...response.data };
        m.redraw();
        await ClientHelper.wait(1000);
        return response;
    },
};

export const PagePolybVideoAnalyze = {
    view(v) {
        return m(
            'div.row',
            m(
                '.col-md-6',
                m(
                    'div.card.video-container',
                    m(
                        'div.card-header.card-header-flex',
                        m('div.d-flex.flex-column.justify-content-center', m('h5.mb-0', 'Video'))
                    ),
                    m(
                        'div.card-body',
                        LocalData.data.videos.original_video_path &&
                            m('video', {
                                muted: true,
                                loop: true,
                                src: LocalData.data.videos.original_video_path,
                                // controls: 'controls',
                                autoplay: 'autoplay',
                            }),

                        !LocalData.data.videos.original_video_path &&
                            m(
                                '',
                                m('input', {
                                    type: 'file',
                                    onchange(e) {
                                        LocalData.formData.delete('video');
                                        let file = e.target.files[0];
                                        LocalData.formData.append('video', file);
                                        ClientHelper.doAction(Action.upload);
                                    },
                                    accept: 'video/*',
                                })
                            )
                    )
                )
            ),
            m(
                '.col-md-6',
                m(
                    'div.card.video-container',
                    m(
                        'div.card-header.card-header-flex',
                        m('div.d-flex.flex-column.justify-content-center', m('h5.mb-0', 'Kết quả xử lý'))
                    ),
                    m(
                        'div.card-body',

                        LocalData.data.videos.mask_video_path &&
                            m(
                                '',
                                m('video', {
                                    loop: true,
                                    autoplay: 'autoplay',
                                    src: LocalData.data.videos.bb_video_path,
                                })
                            )
                    )
                )
            )
        );
    },
};
