export const TableNav = {
    view(v) {
        return m(
            'div',
            { class: 'd-flex align-items-stretch' },
            m(
                'ul',
                {
                    class: 'nav nav-tabs nav-tabs-line nav-tabs-line-bold nav-tabs-noborder nav-tabs-stretched',
                },
                [
                    m(
                        'li',
                        { class: 'nav-item' },
                        m('a', { class: 'nav-link active', href: '#', 'data-toggle': 'tab' }, 'History')
                    ),
                    m('li', { class: 'nav-item dropdown' }, [
                        m(
                            'a',
                            {
                                class: 'nav-link dropdown-toggle',
                                'data-toggle': 'dropdown',
                                href: '#',
                                role: 'button',
                                'aria-haspopup': 'true',
                                'aria-expanded': 'false',
                            },
                            'Dropdown'
                        ),
                        m('div', { class: 'dropdown-menu' }, [
                            m('a', { class: 'dropdown-item', href: '#' }, 'Action'),
                            m('a', { class: 'dropdown-item', href: '#' }, 'Another action'),
                            m('a', { class: 'dropdown-item', href: '#' }, 'Something else here'),
                            m('div', { class: 'dropdown-divider' }),
                            m('a', { class: 'dropdown-item', href: '#' }, 'Separated link'),
                        ]),
                    ]),
                    m(
                        'li',
                        { class: 'nav-item' },
                        m('a', { class: 'nav-link', href: '#', 'data-toggle': 'tab' }, 'Actions')
                    ),
                ]
            )
        );
    },
};
