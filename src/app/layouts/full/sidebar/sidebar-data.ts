import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-grid-add',
    route: '/dashboard',
  },
  {
    navCap: 'Consultorio',
  },
  {
    displayName: 'Propietarios',
    iconName: 'user-heart',
    route: '/propietarios',
  },
  {
    displayName: 'Pacientes',
    iconName: 'dog',
    route: '/pacientes',
  },
  {
    displayName: 'Consultas',
    iconName: 'clipboard-list',
    route: '/consultas',
  },
  {
    navCap: 'Configuraciones',
  },
  {
    displayName: 'Especies',
    iconName: 'dna-2',
    route: '/especies',
  },
  {
    displayName: 'Razas',
    iconName: 'paw',
    route: '/razas',
  },  
]