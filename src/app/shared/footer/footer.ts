import { Component } from '@angular/core';
import { ToolbarClasses, ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-footer',
  imports: [ToolbarModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
    currentYear: number = new Date().getFullYear();
  version: string = 'v1.0.0'; // Optional: app version
}
