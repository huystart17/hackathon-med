import { PagePolybAnalyze } from './pages/page_analyzed.js';
import { PageVictimList } from './pages/page_victim_list.js';
import { PagePolybVideoAnalyze } from './pages/page_analyzed_video.js';
import { Layouts } from './layout.js';

const AppData = {};
const App = {
    view(v) {
        return [
            m(Layouts.Header, { ...v.attrs }),
            m('div.air__layout__content', m('div.air__utils__content', m('div.row', m('div.col-lg-12', v.children)))),
        ];
    },
};

m.route(document.getElementById('App'), '/', {
    '/': {
        view() {
            return m(App, { title: 'Kiểm tra polyb - Ảnh' }, m(PagePolybAnalyze));
        },
    },
    '/analyze-polyb': {
        view() {
            return m(App, { title: 'Kiểm tra polyb - Video' }, m(PagePolybVideoAnalyze));
        },
    },
    '/victim': {
        view() {
            return m(App, { title: 'Người bệnh' }, m(PageVictimList));
        },
    },
});
