import { Routes} from '@angular/router';

import { MenuComponent } from '../menu/menu.component';
import { DishdetailComponent } from '../dishdetail/dishdetail.component';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { AuthguardGuard } from '../authguard.guard';

export const routes: Routes=[
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent },
    {path: 'menu', component: MenuComponent, canActivate: [AuthguardGuard] },
    {path: 'dishdetail/:id', component: DishdetailComponent, canActivate: [AuthguardGuard]},
    {path: 'contact', component: ContactComponent},
    {path: 'about', component: AboutComponent, canActivate: [AuthguardGuard] }
]