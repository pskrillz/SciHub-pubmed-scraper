import { Component, OnInit } from '@angular/core';
import { ExternalArticle } from '../interfaces/ExternalArticle'
import { AppServiceService } from '../app-service.service'


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(private appService: AppServiceService) { }

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


}
