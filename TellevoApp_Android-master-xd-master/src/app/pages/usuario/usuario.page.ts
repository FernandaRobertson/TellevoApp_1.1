import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
  NombreRecibido:string;
  Nombre2Recibido: string;
  RutRecibido: string;
  ContrasenaRecibida: string;
  MailRecibido:string;
  FechaRecibido: Date;

  constructor(public router: Router,public activeroute: ActivatedRoute) {
    this.activeroute.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation().extras.state){
        this.NombreRecibido = this.router.getCurrentNavigation().extras.state.pnombre,
        this.Nombre2Recibido = this.router.getCurrentNavigation().extras.state.snombre;
        this.RutRecibido = this.router.getCurrentNavigation().extras.state.rut;
        this.ContrasenaRecibida = this.router.getCurrentNavigation().extras.state.contrasena;
        this.MailRecibido = this.router.getCurrentNavigation().extras.state.mail;
        this.FechaRecibido = this.router.getCurrentNavigation().extras.state.fecha;
      }
    });
    }

  ngOnInit() {
  }

}
