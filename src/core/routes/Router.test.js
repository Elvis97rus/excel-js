import {Router} from './Router';
import {Page} from '../page/Page';

class DashboardPage extends Page {
    getRoot() {
        // const root = document.createElement('div')
        // root.innerHTML = '<div>dashboard</div>'
        return 'dashboard'
    }
}
class ExcelPage extends Page {}

describe('Router', () => {
    let router
    let $root

    beforeEach(() => {
        $root = document.createElement('div')
        router = new Router($root, {
            dashboard: DashboardPage,
            excel: ExcelPage
        })
    })

    test('should be defined', () => {
        expect(router).toBeDefined()
    })

    test('should render Dashboard Page', () => {
        router.changePageHandler()
        expect($root.innerHTML).toBe('dashboard')
    })
})