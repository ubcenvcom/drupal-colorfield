/**
 * @file
 * Javascript for Farbtastic colorfield widget.
 */

/**
 * Provides a farbtastic colorpicker for the widget.
 */
(function ($) {
  Drupal.behaviors.field_example_colorpicker = {
    attach: function (context) {
      $(".edit-colorfield-colorpicker", context).bind("focus", function (event) {
        var edit_field = this;
        var picker = $(this).closest('div').parent().find(".colorfield-colorpicker");

        // Hide all color pickers except this one.                                                                              
        $(".colorfield-colorpicker").hide();
        $(picker).show();

        var updateBackground = function () {
          // Catch errors caused by invalid hex codes.                                                                          
          var unpacked = farb.unpack(this.value);
          if (!unpacked) {
            return;
          }
          // If a valid color, set background/foreground colors.                                                                
          $(this).css({
            backgroundColor: this.value,
            'color': farb.RGBToHSL(unpacked)[2] > 0.5 ? '#000' : '#fff'
          });
        }

        var updatePicker = function () {
          farb.setColor(this.value);
        }

        // Adjust the background color on keyup and onload.                                                                     
        $(edit_field)
            .unbind('keyup.colorfield')
            .bind('keyup.colorfield', updateBackground)
            .bind('keyup.colorfield', updatePicker);

        // Attach Farbtastic.                                                                                                   
        var farb = $.farbtastic(picker);
        farb.setColor(edit_field.value);
        farb.linkTo(function (color) {
          edit_field.value = color;
          updateBackground.apply(edit_field);
        });
      });
    }
  }
})(jQuery);                                                                                                                     
