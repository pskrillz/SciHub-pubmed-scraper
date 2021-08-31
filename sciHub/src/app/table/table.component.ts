import { Component, OnInit } from '@angular/core';
import { ExternalArticle } from '../interfaces/ExternalArticle'
import { AppServiceService } from '../app-service.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
 import { AbstractModalComponent } from '../table/abstract-modal/abstract-modal.component'


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(
    private appService: AppServiceService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.getArticles()
  }

  articles: ExternalArticle[] = [];


  



  getArticles(){
    this.appService.getArticles().subscribe(res => { 
      this.articles = res.data
      console.log("getArticles() ran", res)
    });
  }


  test(){
    console.log("test")
  }

  openAbstractModal(id: string): void{
    const dialogRef = this.dialog.open(AbstractModalComponent, {
      width: '500px',
      height: '600px'
    });
  }

}
