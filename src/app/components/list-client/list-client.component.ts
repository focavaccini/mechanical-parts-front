import { Component, OnInit } from '@angular/core';
import { ClientModel } from 'src/app/models/ClientModel';
import { ClientService } from 'src/app/services/client/client.service';
import { FormControl, FormGroup, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForOf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css'],
  imports: [ReactiveFormsModule, NgForOf]
})

export class ListClientComponent implements OnInit {

  client = {} as ClientModel;
  clients!: ClientModel[];
  clientForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
  })
  
  constructor(
    private clientService : ClientService,
    private router: Router,
    private route: ActivatedRoute
  ){};

  ngOnInit() {
    this.getClients();
  }

  getClients(){
    this.clientService.getClients().subscribe((clients: ClientModel[]) =>{
      this.clients = clients;
    });
  }

  editClient(id: number) {
    if(id) {
      this.router.navigate(['/edit-client/', id])
    } else {
      console.error('O id do cliente não foi informado.')
    }
  }

  cleanForm(form: NgForm){
    this.getClients();
    form.resetForm();
    this.client = {} as ClientModel;
  }

  title = 'list-client';
}
