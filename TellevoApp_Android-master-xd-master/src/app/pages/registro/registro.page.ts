import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  tUser: String= "";
  tPkey: String = "";
  tPass: string = "";
  tUser2: String = "";
  tMail: String = "";
  tDate: Date;

  alumno: any = {
    id:'',
    rut:'',
    nombre:'',
    apellido:'',
    contrasena:'',
    correo:'',
    fnacimiento:'',
}
  constructor(public serviciobd: ServicebdService,private router: Router,public alertController: AlertController) { }

  ngOnInit() {
    this.serviciobd.servicebdState().subscribe((res) =>{
      if(res){
        this.serviciobd.fetchalumno().subscribe(item => {
          this.alumno = item;
        })
      }
    });
  }
RegistrarUsuario(){
  if((this.tUser) == ""|| (this.tUser2)=="" ||(this.tPkey)=="" ||(this.tPass)=="" ||(this.tMail)==""){
    this.presentAlert()
  }
  else{
    let navigationExtras: NavigationExtras = {
      state: {pnombre:this.tUser,
        snombre:this.tUser2,
        rut:this.tPkey,
        contrasena:this.tPass,
        mail:this.tMail,
        fecha:this.tDate}
    }
    this.presentAlert2();
    this.router.navigate(['/login'],navigationExtras);}
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Falta Información',
      message: 'Hay que llenar el formulario para poder registrarse',
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentAlert3(text: string) {
    const alert = await this.alertController.create({
      header: 'Falta Información',
      message: text,
      buttons: ['OK']
    });
    await alert.present();
  }
  async presentAlert2() {
    const alert = await this.alertController.create({
      header: 'Bienvenido a Nuestra Aplicación "Te llevo app" '+this.tUser+' '+this.tUser2,
      message: 'Esperamos que esta aplicación sea de tu ayuda ;)',
      buttons: ['OK']
    });
    await alert.present();
  }

  guardar(){
    this.serviciobd.addAlumno(this.alumno.rut, this.alumno.nombre, this.alumno.apellido, this.alumno.contrasena, this.alumno.correo, this.alumno.fnacimiento);   
    this.router.navigate(['/login'])                        
  }

}
