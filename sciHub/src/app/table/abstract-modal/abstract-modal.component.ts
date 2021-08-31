import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppServiceService } from 'src/app/app-service.service';

export interface DialogData{
  articleId: string
}

@Component({
  selector: 'app-abstract-modal',
  templateUrl: './abstract-modal.component.html',
  styleUrls: ['./abstract-modal.component.css']
})
export class AbstractModalComponent implements OnInit {

  constructor(
    private dialog: MatDialogRef<AbstractModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private appService: AppServiceService
  ) { }



  ngOnInit(): void {
    this.getArticleAbstract()

  }

  onCloseClick(): void {
    this.dialog.close();
  }


  abstractText: string 
  getArticleAbstract(): void{
    console.log(this.data, this.data.articleId)
    this.appService.getAbstract(this.data.articleId).subscribe(res => {
      let result = res;
      console.log(result)
      this.abstractText = result.data.abstract;
      console.log(result.data.abstract)
    })
  }


}
