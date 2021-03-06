import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppServiceService } from 'src/app/app-service.service';
import { tap } from 'rxjs/operators'; 

import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

export interface DialogData{
  articleId: string
}

@Component({
  selector: 'app-abstract-modal',
  templateUrl: './abstract-modal.component.html',
  styleUrls: ['./abstract-modal.component.css']
})
export class AbstractModalComponent implements OnInit {
  
  //spinner config
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';

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

  abstractText 
  gotAbstract
  getArticleAbstract(): void{
    console.log("abstComponent", this.data, this.data.articleId)
    this.appService.getAbstract(this.data.articleId).subscribe(
      res => { 
        console.log(res);
        if(res.hasOwnProperty("success") && typeof res.success == 'boolean'){

          if(res.success == false){
            if(res.hasOwnProperty("message"))
              this.abstractText = res.message;
            else
              this.abstractText = "Unavailable";
          }
          //successfully scraped abstract
          else if(res.success == true){
            this.abstractText = res.data.abstract;
          }

        }
        else
          this.abstractText = "Error"
      },
      error => {
        console.log("~~~~~~~~~~~~~~~~~~~~~~~");
        console.log(error)
      },
      () => {
        console.log("Completed")
        this.gotAbstract = true;
      }) 
  }    



}
