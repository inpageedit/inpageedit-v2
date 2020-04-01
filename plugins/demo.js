mw.hook('InPageEdit.quickEdit').add(function(){
  $('.editArea').before(
    $('<div>',{id: 'ipe-edit-toolbar'}).append(
      $('<button>',{id: 'custom-btn', text: 'Foo'}).click(function(){
        // Do sth.
        alert('Bar');
      })
    )
  );
});
