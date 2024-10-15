import { Component } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgbToastModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
  constructor (public alertService: AlertService){}
}
