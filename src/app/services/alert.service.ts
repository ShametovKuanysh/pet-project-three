import { Injectable } from '@angular/core';

export interface Toast {
	message: string;
	classname?: string;
	delay?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  toasts: Toast[] = [];

  constructor() { }

	show(toast: Toast) {
		this.toasts.push(toast);
	}

	remove(toast: Toast) {
		this.toasts = this.toasts.filter((t) => t !== toast);
	}

	clear() {
		this.toasts.splice(0, this.toasts.length);
	}
}
