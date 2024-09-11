import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent  implements OnInit {

  @Input() film: any; // Utilisé pour recevoir les données du film

  constructor(private modalController: ModalController) {}


  ngOnInit() {}

  closeModal() {
    this.modalController.dismiss(); // Ferme la modal
  }

}
