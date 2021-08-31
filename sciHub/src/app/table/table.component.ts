import { Component, OnInit } from '@angular/core';
import { ExternalArticle } from '../interfaces/ExternalArticle'


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  articles: ExternalArticle[] =



}
