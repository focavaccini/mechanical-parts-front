import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  carouselOptions: OwlOptions = {
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000, // Mudar a cada 5 segundos
    autoplayHoverPause: true,
    nav: true,
  }

  carouselImages = [
    { id: '1', url: '/assets/images/mecanica1.jpg' },
    { id: '2', url: '/assets/images/mecanica2.png' },
    { id: '3', url: '/assets/images/mecanica3.jpg' },
    // Adicione mais imagens aqui
  ];
}
