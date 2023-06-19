import {HomePage} from './pages/home-page.jsx'
import {Timeliness} from './pages/timeliness.jsx'
import {ResearchApp} from './pages/research-app.jsx'


export default [
    // {
    //     path:'/',
    //     component: HomePage,
    // },
    {
        path:'/',
        component: ResearchApp,
    },
    // {
    //     path:'/research',
    //     component: ResearchApp,
    // },
    {
        path:'/Timeliness',
        component: Timeliness,
    }
]