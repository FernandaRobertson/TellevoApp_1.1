import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Alumno } from './alumno';

@Injectable({
  providedIn: 'root'
})
export class ServicebdService {

  public database: SQLiteObject;

  tablaAlumno: string ="CREATE TABLE IF NOT EXISTS ALUMNO(id INTEGER PRIMARY KEY autoincrement, rut VARCHAR(10) NOT NULL, nombre VARCHAR(20) NOT NULL, apellido VARCHAR(20) NOT NULL, contrasena VARCHAR(20) NOT NULL, correo VARCHAR(30) NOT NULL);";

  registroalumno: string ="INSERT or IGNORE INTO ALUMNO(id, rut, nombre, apellido, contrasena, correo) VALUES (1, '20429365-1', 'jean', 'Grasset', '12345', 'jean@gmail.com');";
  
  tablaconductor: string= "CREATE TABLE IF NOT EXISTS CONDUCTOR(id INTEGER, nombre VARCHAR(20) NOT NULL, apellido VARCHAR(20) NOT NULL, destino VARCHAR(30) NOT NULL, rut VARCHAR(10) NOT NULL, valor NUMBER);";

  registroconductor: string ="INSERT OR IGNORE INTO CONDUCTOR(id, nombre, apellido, destino, rut, valor) VALUES (1, 'jean', 'Grasset', 'Quilicura', '20857667-4', 1900);";

  listaalumno = new BehaviorSubject([]);

  listaconductor = new BehaviorSubject([]);
  

  private isDbReady: BehaviorSubject<boolean> =new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, public alertcontroller: AlertController, private router: Router) {
    this.crearBD();
   }


   servicebdState() {
    return this.isDbReady.asObservable();
  }
   crearBD() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'noticias3.db',
        location: 'default'

      }).then((db: SQLiteObject) => {
        this.database = db;
        //this.presentAlert("BD Creada");
        //llamamos a la creación de tablas
        this.crearTablas();
      }).catch(e => this.presentAlert(e));
    })
  }

  
  
  async crearTablas() {
    try {
      await this.database.executeSql(this.tablaAlumno, []);
      await this.database.executeSql(this.registroalumno, []);
      //this.presentAlert("Creo la Tabla");
      this.buscaralumno();
      this.isDbReady.next(true);
    
    } catch (e) {
      this.presentAlert("error creartabla " + e);
    }
  }
  async presentAlert(mensaje: string) {
    const alert = await this.alertcontroller.create({
      header: 'Alert',
      message: mensaje,
      buttons: ['Cancel']
    });

    await alert.present();
  }

  buscaralumno() {
    //this.presentAlert("a");
    return this.database.executeSql('SELECT * FROM alumno', []).then(res => {
      let items: Alumno[] = [];
      //this.presentAlert("b");
      if (res.rows.length > 0) {
        //this.presentAlert("c");
        for (var i = 0; i < res.rows.length; i++) { 
          //this.presentAlert("d");
          items.push({ 
            id: res.rows.item(i).id,
            rut: res.rows.item(i).rut,
            nombre: res.rows.item(i).nombre,  
            apellido: res.rows.item(i).apellido,
            contrasena: res.rows.item(i).contrasena,
            correo: res.rows.item(i).correo
           });
        }
      }
      //this.presentAlert("d");
      this.listaalumno.next(items);
    });
  }
  dbState() {
    return this.isDbReady.asObservable();
  }
  fetchalumno(): Observable<Alumno[]> {
    return this.listaalumno.asObservable();
  }
  addAlumno(rut, nombre, apellido, contrasena, correo, fnacimiento) {
    
    let data = [rut, nombre, apellido, contrasena, correo, fnacimiento];
    
    return this.database.executeSql('INSERT INTO ALUMNO (rut, nombre, apellido, contrasena, correo, fnacimiento) VALUES (? , ?, ?, ?, ?, ?)', data)
      .then(res => {
        this.buscaralumno();
      });
  }

  consultarDato(tPkey, tPass){
     let data = [tPkey, tPass];
    return this.database.executeSql('SELECT * FROM ALUMNO WHERE rut = ? and contrasena = ? ', data)
     this.buscaralumno();
      this.router.navigate(['/folder/Inbox']);
    
} 
agregarlumno(tPkey, tPass) {
  let data =[tPkey, tPass]
  return this.database.executeSql('SELECT * FROM ALUMNO WHERE rut = ? and contrasena = ? ', [data[0],data[1]]).then(res => {
    let items: Alumno[] = [];
    //this.presentAlert("b");
    if (res.rows.length > 0) {
      //this.presentAlert("c");
      for (var i = 0; i < res.rows.length; i++) { 
        //this.presentAlert("d");
        items.push({ 
          id: res.rows.item(i).id,
          rut: res.rows.item(i).rut,
          nombre: res.rows.item(i).nombre,  
          apellido: res.rows.item(i).apellido,
          contrasena: res.rows.item(i).contrasena,
          correo: res.rows.item(i).correo
         });
      }
    }
    //this.presentAlert("d");
    this.listaalumno.next(items);
  });
}
fetchingresouser():Observable<Alumno[]>{
  return this.listaalumno.asObservable();
}



}