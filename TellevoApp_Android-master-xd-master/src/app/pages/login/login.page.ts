import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: any = [

   {
  tPkey: null,
  tPass: null
  
}
]
  NombreRecibido: string;
  Nombre2Recibido: string;
  RutRecibido: string;
  ContrasenaRecibida: string;
  EmailRecibido: string;
  FechaRecibida: string;

  rut:"20429365-1";
  passw:"1234";

  usurario: any =[]

  constructor(private router: Router,public activeroute: ActivatedRoute, public alertController: AlertController, public serviciobd: ServicebdService) {
    this.activeroute.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation().extras.state){
        this.NombreRecibido = this.router.getCurrentNavigation().extras.state.pnombre;
        this.Nombre2Recibido = this.router.getCurrentNavigation().extras.state.snombre;
        this.RutRecibido = this.router.getCurrentNavigation().extras.state.rut,
        this.ContrasenaRecibida = this.router.getCurrentNavigation().extras.state.contrasena;
        this.EmailRecibido = this.router.getCurrentNavigation().extras.state.mail;
        this.FechaRecibida = this.router.getCurrentNavigation().extras.state.fecha;
      }
    });
    }
  ngOnInit() {
    this.serviciobd.servicebdState().subscribe((res) =>{
      if(res){
        this.serviciobd.fetchingresouser().subscribe(item => {
          this.usurario = item;
        })
      }
    });
  }
  
  IniciarSesion(){
    this.serviciobd.agregarlumno(this.user.tPkey, this.user.tPass);
}
async presentAlert(mensaje:string) {
  const alert = await this.alertController.create({
    header: 'Error al Entrar',
    message: mensaje,
    buttons: ['OK']
  });
  await alert.present();
}

ingresar() {
  this.serviciobd.agregarlumno(this.user.tPkey, this.user.tPass);
  
}

field: string;
validateModel(model: any) {
  for (var [key, value] of Object.entries(model)) {
    if (value == "") {
      this.field = key;
      return false;
    }
  }
  return true;

}
}