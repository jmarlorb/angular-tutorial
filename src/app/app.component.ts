import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { TasklistComponent } from "./components/task/tasklist/tasklist.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, TasklistComponent, FooterComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  imagenAleatoria:string = "";
  nombre: string = "";
  numero: number = 0;

  cargarImagenAleatoria(){
    this.imagenAleatoria = "https://picsum.photos/200/300?random=" + this.randomInt();
  }

  randomInt(): number{
    return Math.trunc((Math.random()*200) + 1);
  }
}
