import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-phone-mask',
  templateUrl: './phone-mask.component.html',
  styleUrls: ['./phone-mask.component.css']
})
export class PhoneMaskComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  phoneMask(){
    jQuery('.myPhone')
    .keydown(function (e) {
      const key = e.which || e.charCode || e.keyCode || 0;
      const jQueryphone = jQuery(this);
      // Don't let them remove the starting '('
      if (jQueryphone.val().length === 1 && (key === 8 || key === 46)) {
        jQueryphone.val('(');
        return false;
      } else if (jQueryphone.val().charAt(0) !== '(') {
        jQueryphone.val('(' + String.fromCharCode(e.keyCode) + ''); 
      }
      // Auto-format- do not expose the mask as the user begins to type
      if (key !== 8 && key !== 9) {
        if (jQueryphone.val().length === 4) {
          jQueryphone.val(jQueryphone.val() + ')');
        }
        if (jQueryphone.val().length === 5) {
          jQueryphone.val(jQueryphone.val() + ' ');
        }
        if (jQueryphone.val().length === 9) {
          jQueryphone.val(jQueryphone.val() + '-');
        }
      }
      // Allow numeric (and tab, backspace, delete) keys only
      return (key == 8 || 
          key == 9 ||
          key == 46 ||
          (key >= 48 && key <= 57) ||
          (key >= 96 && key <= 105));	
    })
    .bind('focus click', function () {
      const jQueryphone = jQuery(this);
      if (jQueryphone.val().length === 0) {
        jQueryphone.val('(');
      } else {
        const val = jQueryphone.val();
        jQueryphone.val('').val(val); // Ensure cursor remains at the end
      }
    })
    .blur(function () {
      const jQueryphone = jQuery(this);
      if (jQueryphone.val() === '(') {
        jQueryphone.val('');
      }
    });
  }


}
