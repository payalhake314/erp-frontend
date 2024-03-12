import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { StudentsComponent } from './views/students/students.component';
import { StudentProfileComponent } from './views/student-profile/student-profile.component';
import { FacultiesComponent } from './views/faculties/faculties.component';
import { FacultyProfileComponent } from './views/faculty-profile/faculty-profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'students',
    children: [
      { path: '', component: StudentsComponent, pathMatch: 'full' },
      { path: ':name', component: StudentProfileComponent },
    ],
  },
  {
    path: 'faculties',
    children: [
      { path: '', component: FacultiesComponent, pathMatch: 'full' },
      {
        path: ':name',
        component: FacultyProfileComponent,
      },
    ],
  },
];
