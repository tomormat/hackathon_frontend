import { Routes } from '@angular/router';
import { Personal } from './pages/personal/personal';
import { History } from './pages/history/history';
import { Home } from './pages/home/home';

export const routes: Routes = [
    {path: '', component: Home, pathMatch: 'full'},
    {path: 'personal/:id', component: Personal}, // seperate personal page for each stock (indexed by id)
    {path: 'history', component: History},
    
];
