import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ViewChild, ElementRef } from '@angular/core';


import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { NavController } from '@ionic/angular';

declare var google: any;


@Component({
  selector: 'app-auto2',
  templateUrl: './auto2.component.html',
  styleUrls: ['./auto2.component.scss'],
})
export class Auto2Component implements OnInit {

  resultado:string="0";
  num1:string="0";
  num2:string="2400"
  public Show: Boolean = false;
  public buttonName:any ='Show';
  map: any;
  infoWindows: any;

  constructor(public alertController: AlertController,public navCtrl:NavController) { }

  ngOnInit() {
  }

  toogle(){
    this.Show =! this.Show;
  }

  CalcPasaje(){
    this.resultado=(parseInt(this.num1)*parseInt(this.num2)).toString();
    if(parseInt(this.num1) != 0){
      this.toogle();
    }
    
    
  }
  alerta(){
    if(parseInt(this.num1) != 0)
    this.presentAlert();
    else{
    this.presentAlert2();
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Asiento Reservado',
      message: 'Se reservo Perfectamente el asiento, por favor esperar fuera de su cede // Valor: '+ this.resultado+'$',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlert2() {
    const alert = await this.alertController.create({
      header: 'No Has reservado Ningun Asiento',
      message: 'Debes LLenar el Formulario para reservar un asiento',
      buttons: ['OK']
    });

    await alert.present();
  }

  ////////////////////////////maps////////////////////////////


  // addMarkersToMap(markers){
  //   for (let marker of markers){
  //     let position = new google.maps.LatLng(marker. latitude, marker.longitude);
  //     let mapMarker = new google.maps.Marker({
  //       position: position,
  //       title: marker.title,
  //       latitude: marker.latitude,
  //       longitude: marker.longitude

  //     });
  //     mapMarker.setMap(this.map);
  //     this.addInfoWindowToMarker(mapMarker);
  //   }
  // }

  // addInfoWindowToMarker(marker){
  //   let infoWindowContent =  '<div id="content">'+
  //                             'h2 id = "firstHeading" class"firstHeading" >' + marker.title + '</h2>' +  
  //                             '<p>Latitude:' + marker.latitude + '</p>' +
  //                             '<p>Longitude: ' + marker.longitude + '</p>' +
  //                             '</div>';

  //   let infoWindow = new google.maps.infoWindow({
  //     content: infoWindowContent
  //   });
  //   marker.addListener('click', () =>{
  //     this.closeAllInfoWindows();
  //     infoWindow.open(this.map, marker);
  //   });
  //   this.infoWindows.push(infoWindow);
  // }
  // closeAllInfoWindows(){
  //   for(let window of this.infoWindows){
  //     window.close(); 
  //   }


  // }
  // -->


}

