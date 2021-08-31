import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-abstract-modal',
  templateUrl: './abstract-modal.component.html',
  styleUrls: ['./abstract-modal.component.css']
})
export class AbstractModalComponent implements OnInit {

  constructor(
    private dialog: MatDialogRef<AbstractModalComponent>
  ) { }

  ngOnInit(): void {
  }

  onCloseClick(): void {
    this.dialog.close();
  }

}
