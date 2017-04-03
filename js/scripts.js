function Contact(first, last) {
  this.firstName = first;
  this.lastName = last;
  this.adresses = [];
};

function Address(street, city, state) {
  this.street = street;
  this.city = city;
  this.state = state;
};

Contact.prototype.fullName = function () {
  return `${this.firstName} ${this.lastName}`;
};

var inputter = function(name, ordinal) {
  outerDiv = $('<div>').addClass('form-group');
  label = $('<label>', {'for' : name + '_' + ordinal}).text(name);
  input = $('<input>', {'type' : 'text', 'id' : name + '_' + ordinal}).addClass('form-control new-' + name.toLowerCase());
  return outerDiv.append(label, input);
}

var generateNewAddressBlock = function(ordinal) {
  var inputs = [];
  $.each(['Street', 'City', 'State'], function(idx, propertyName) {
    inputs.push(inputter(propertyName, ordinal));
  })
  return $('<div>').addClass('new-address').append(inputs);
}

var grabAllInputs = function() {
  return $.map($('input'), function(input) {
    return {'name' : $(input).prop('id'), 'value': $(input).val() }
  });
}

var contactShower = function(contact) {
  $("#show-contact").show();
  $("#show-contact h2").text(contact.firstName);
  $(".first-name").text(contact.firstName);
  $(".last-name").text(contact.lastName);
}

$(document).ready(function() {
  $("form#new-contact").submit(function() {
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();

    var newContact = new Contact(inputtedFirstName, inputtedLastName);

    $("ul#contacts").append("<li><span class='contact'>" + newContact.firstName + "</span></li>");
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $(".contact").last().click(contactShower);

    $('<li>').append('<span>', {'class' : 'contact'})
      .text(newContact.fullName())
      .click(function() {
        $("#show-contact").show();
        $("#show-contact h2").text(newContact.firstName);
        $(".first-name").text(newContact.firstName);
        $(".last-name").text(newContact.lastName);
      })
      .appendTo('ul#contacts');
    return false;
  });
  $('#add-address').click(function() {
    var numberOfExistingAddresses = $('.new-address').length;
    generateNewAddressBlock(numberOfExistingAddresses).appendTo("#new-addresses");
  });
});
