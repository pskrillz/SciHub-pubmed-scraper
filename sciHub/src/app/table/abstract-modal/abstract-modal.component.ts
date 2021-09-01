import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppServiceService } from 'src/app/app-service.service';
import { tap } from 'rxjs/operators'; 

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


/*1 original attempt */  
  // abstractText: string 
  // getArticleAbstract(): void{
  //   console.log(this.data, this.data.articleId)
  //   this.appService.getAbstract(this.data.articleId).subscribe(res => {
  //     let result = res;
  //     console.log(result)
  //     this.abstractText = result.data.abstract;
  //     console.log(result.data.abstract)
  //   })
  // }

  /*2 attempting Observable pipe */
  // abstractText: string 
  // getArticleAbstract() {
  //   console.log(this.data, this.data.articleId)
  //   this.appService.getAbstract(this.data.articleId)
  //   .pipe(
  //     tap(item => console.log("tapconsole", item))
  //   ).subscribe(console.log)
  // }
    
/*3 original but with typescript types tweaked */
  // abstractText
  // getArticleAbstract(): void{
  //   console.log("abstComponent", this.data, this.data.articleId)
  //   this.appService.getAbstract(this.data.articleId).subscribe(item => {
  //     let result = item;
  //     console.log("res", result)
  //     this.abstractText = result
  //     console.log(this.abstractText)
  //   })
  // }    
    
  /*4 tweaks- gonna try observable again*/  
  abstractText 
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
      () => console.log("Completed")) 
  }    



}
