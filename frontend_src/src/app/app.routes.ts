import { Routes } from '@angular/router';
import { Personal } from './pages/personal/personal';
import { History } from './pages/history/history';
import { App } from './app';

export const routes: Routes = [
    {path: 'personal', component: Personal},
    {path: 'history', component: History},
];
