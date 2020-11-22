import { Components } from '../components/components.js';

const LocalDefaultData = {

};
const LocalData = {
    ...LocalDefaultData,
};

export const PageVictimList = {
    view(v) {
        return m('div', [
            m('h2', { class: 'badge-example' }, 'Table / 3'),
            m('div', { class: 'card' }, [
                m('div', { class: 'card-header card-header-flex card-header-borderless' }, m(Components.TableNav)),
                m(
                    'div',
                    { class: 'card-body pt-4' },
                    m(
                        'div',
                        { class: 'table-responsive' },
                        m(
                            'table',
                            { class: 'table table-borderless' },
                            m('tbody', [
                                m('tr', [
                                    m('th', { style: { width: '70px' } }),
                                    m(
                                        'th',
                                        { class: 'border-bottom-0 font-weight-normal text-gray-6 text-uppercase' },
                                        'Action name'
                                    ),
                                    m(
                                        'th',
                                        { class: 'border-bottom-0 font-weight-normal text-gray-6 text-uppercase' },
                                        'Location'
                                    ),
                                    m('th', { style: { width: '115px' } }),
                                ]),
                                m('tr', [
                                    m(
                                        'td',
                                        { style: { width: '70px' } },
                                        m(
                                            'div',
                                            { class: 'kit__utils__avatar' },
                                            m('img', {
                                                src: '../../components/kit/core/img/avatars/5.jpg',
                                                alt: 'Mary Stanform',
                                            })
                                        )
                                    ),
                                    m('td', [
                                        m('div', 'New Users'),
                                        m('div', { class: 'text-gray-4' }, 'Administrator'),
                                    ]),
                                    m('td', { class: 'text-blue' }, ' New York '),
                                    m('td', { class: 'text-nowrap', style: { width: '115px' } }, [
                                        m(
                                            'button',
                                            { class: 'btn btn-primary mr-2' },
                                            m('i', { class: 'fe fe-plus-circle' })
                                        ),
                                        m(
                                            'button',
                                            { class: 'btn btn-light' },
                                            m('i', { class: 'fe fe-settings text-blue' })
                                        ),
                                    ]),
                                ]),
                                m('tr', [
                                    m(
                                        'td',
                                        { style: { width: '70px' } },
                                        m(
                                            'div',
                                            { class: 'kit__utils__avatar' },
                                            m('img', {
                                                src: '../../components/kit/core/img/avatars/4.jpg',
                                                alt: 'Jamie Rockstar',
                                            })
                                        )
                                    ),
                                    m('td', [m('div', 'New Reports'), m('div', { class: 'text-gray-4' }, 'Support')]),
                                    m('td', { class: 'text-blue' }, ' Palo Alto '),
                                    m('td', { class: 'text-nowrap', style: { width: '115px' } }, [
                                        m(
                                            'button',
                                            { class: 'btn btn-primary mr-2' },
                                            m('i', { class: 'fe fe-plus-circle' })
                                        ),
                                        m(
                                            'button',
                                            { class: 'btn btn-light' },
                                            m('i', { class: 'fe fe-settings text-blue' })
                                        ),
                                    ]),
                                ]),
                                m('tr', [
                                    m(
                                        'td',
                                        { style: { width: '70px' } },
                                        m(
                                            'div',
                                            { class: 'kit__utils__avatar' },
                                            m('img', {
                                                src: '../../components/kit/core/img/avatars/3.jpg',
                                                alt: 'Mary Stanform',
                                            })
                                        )
                                    ),
                                    m('td', [
                                        m('div', 'Quote Submits'),
                                        m('div', { class: 'text-gray-4' }, 'Developer'),
                                    ]),
                                    m('td', { class: 'text-blue' }, ' Las Vegas '),
                                    m('td', { class: 'text-nowrap', style: { width: '115px' } }, [
                                        m(
                                            'button',
                                            { class: 'btn btn-primary mr-2' },
                                            m('i', { class: 'fe fe-plus-circle' })
                                        ),
                                        m(
                                            'button',
                                            { class: 'btn btn-light' },
                                            m('i', { class: 'fe fe-settings text-blue' })
                                        ),
                                    ]),
                                ]),
                            ])
                        )
                    )
                ),
            ]),
        ]);
    },
};
