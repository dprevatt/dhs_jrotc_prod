import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-titlecase',
  templateUrl: './text-titlecase.component.html',
  styleUrls: ['./text-titlecase.component.css']
})
export class TextTitlecaseComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  textTitleCase(){
    jQuery('.titleCaseMask').keyup(function(event) {
      const textBox = event.target;
      const start = textBox.selectionStart;
      const end = textBox.selectionEnd;
      textBox.value = textBox.value.charAt(0).toUpperCase() + textBox.value.slice(1);
      textBox.setSelectionRange(start, end);
    });
  }

}
