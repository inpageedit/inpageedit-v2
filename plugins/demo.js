mw.hook('InPageEdit.quickEdit').add(function(){
  $('.editArea').prepend(
    $('<div>',{id: 'ipe-edit-toolbar'}).append(
      $('<button>',{id: 'custom-btn', text: 'Foo'}).click(function(){
        // Do sth.
        alert('Bar');
      })
    )
  );
});
