import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-gallary',
  templateUrl: './ui-gallary.component.html'
})
export class UiGallaryComponent implements OnInit {
  @Input() selectedImageURL=""
  @Input() images:string[]=[]


  ngOnInit(): void {
    if(this.images?.length){
      this.selectedImageURL = this.images[0]
    }
  }
  changeImage(imageURL:string){
    this.selectedImageURL = imageURL
  }

  get hasImages(){
    return this.images?.length > 0;
  }
}
