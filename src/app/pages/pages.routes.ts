import { Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';
import { RazaComponent } from './razas/razas.component';
import { EspecieComponent } from './especies/especies.component';
import { PropietarioComponent } from './propietarios/propietarios.component';
import { PacienteComponent } from './pacientes/pacientes.component';
import { ConsultaComponent } from './consultas/consultas.component';

export const PagesRoutes: Routes = [
  {
    path: 'dashboard',
    component: StarterComponent,
    data: {
      title: 'Starter Page',
      urls: [
        { title: 'Dashboard', url: '/dashboards/dashboard1' },
        { title: 'Starter Page' },
      ],
    },
  },
  {
    path: 'razas',
    component: RazaComponent
  },
  {
    path: 'especies',
    component: EspecieComponent
  },
  {
    path: 'propietarios',
    component: PropietarioComponent
  },
  {
    path: 'pacientes',
    component: PacienteComponent
  },
  {
    path: 'consultas',
    component: ConsultaComponent
  }
];
