import { Routes } from '@angular/router';
import { Personal } from './pages/personal/personal';
import { History } from './pages/history/history';
import { Home } from './pages/home/home';

export const routes: Routes = [
    {path: 'personal', component: Personal},
    {path: 'history', component: History},
    {path: '', component: Home, pathMatch: 'full'},
];
