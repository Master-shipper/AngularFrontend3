import { Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth.guard';
import { CategoriesComponent } from './pages/admin/categories/categories.component';
import { LayoutComponent } from './pages/admin/layout/layout.component';
import { ProductsComponent } from './pages/admin/products/products.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/website/dashboard/dashboard.component';

export const routes: Routes = [
    { path: '',   redirectTo: '/login', pathMatch: 'full' },
    {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'admin-dashboard',
        component: LayoutComponent,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                component: ProductsComponent,
                title: 'Products'
            },
          {
            path: 'products',
            component: ProductsComponent,
            title: 'Products'
          },
          {
            path: 'category',
            component: CategoriesComponent,
            title: 'Category'
          }
        ]
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      }
];
