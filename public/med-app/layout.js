function getAttrs(v, key, defaultValue) {
    if (v.attrs[key]) {
        return v.attrs[key];
    }
    if (defaultValue) {
        return defaultValue;
    }
    let { defaultAttrs } = v.state;
    if (defaultAttrs[key]) {
        return defaultAttrs[key];
    }
    return null;
}

export const Layouts = {
    Header: {
        defaultAttrs: {
            title: 'Mặc định',
        },

        oninit(v) {
            console.log(v.attrs);
        },
        view(v) {
            return m(
                'div',
                m(
                    'div',
                    { class: 'air__layout__header' },
                    m(
                        'div',
                        { class: 'air__utils__header' },
                        m('div', { class: 'air__subbar' }, [
                            m('ul', { class: 'air__subbar__breadcrumbs mr-4' }, [
                                m(
                                    'li',
                                    { class: 'air__subbar__breadcrumb' },
                                    m('a', { class: 'air__subbar__breadcrumbLink', href: '#' }, 'Trang chủ')
                                ),
                                m(
                                    'li',
                                    { class: 'air__subbar__breadcrumb' },
                                    m(
                                        'a',
                                        {
                                            class: 'air__subbar__breadcrumbLink air__subbar__breadcrumbLink--current',
                                            href: '#',
                                        },
                                        getAttrs(v, 'title')
                                    )
                                ),
                            ]),
                            m('div', { class: 'air__subbar__divider mr-4 d-none d-xl-block' }),
                            getAttrs(v, 'record_id') &&
                                m(
                                    'p',
                                    { class: 'color-gray-4 text-uppercase font-size-18 mb-0 mr-4 d-none d-xl-block' },
                                    ' INV-00125 '
                                ),
                            // m(
                            //     'button',
                            //     { class: 'btn btn-primary btn-with-addon mr-auto text-nowrap d-none d-md-block' },
                            //     [
                            //         m(
                            //             'span',
                            //             { class: 'btn-addon' },
                            //             m('i', { class: 'btn-addon-icon fe fe-plus-circle' })
                            //         ),
                            //         ' New Request ',
                            //     ]
                            // ),
                        ])
                    )
                )
            );
        },
    },
};
