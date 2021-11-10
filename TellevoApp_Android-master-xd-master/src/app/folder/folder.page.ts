import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  
  RutRecibido: string;
  ContrasenaRecibida: string;

  constructor(private router: Router,private activeroute: ActivatedRoute,public alertController: AlertController) {}

  ngOnInit() {
    
  }
  
  mostrar(){
    this.presentAlert();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'No Disponible',
      message: 'El Auto ya se lleno, no se puede reservar ningún espacio en él',
      buttons: ['OK']
    });

    await alert.present();
  }
}
