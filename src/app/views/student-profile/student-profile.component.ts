import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.css',
})
export class StudentProfileComponent implements OnInit {
  constructor(private _actRoute: ActivatedRoute) {}
  name: string | null = null;
  ngOnInit(): void {
    this._actRoute.paramMap.subscribe((params) => {
      this.name = params.get('name');
    });
  }
}
