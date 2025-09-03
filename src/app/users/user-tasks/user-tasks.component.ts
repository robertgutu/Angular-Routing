import { Component, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import {  ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent {
  message = input.required<string>()
  userName = input.required<string>()
  // private activetedRoute = inject(ActivatedRoute)

  // ngOnInit(): void {
  //   this.activetedRoute.data.subscribe({
  //     next: data => {
  //       console.log(data)
  //     }
      
  //   })
  // }
}

export const resolveUserName: ResolveFn<string> = (
  activatedRoute:ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const usersService = inject(UsersService)
  const username = usersService.users.find(
    (u) => u.id === activatedRoute.paramMap.get('userId')
  )?.name || '';
  return username
}

export const resolveTitle: ResolveFn<string> = (
  activatedRoute,
  routerState
) => {
  return resolveUserName(activatedRoute,routerState) + '\'s Tasks'
}
