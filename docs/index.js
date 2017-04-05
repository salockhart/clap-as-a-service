'use strict';

$(function () {
    const phraseInput = $('#phrase');

    phraseInput.keyup(function (event) {
        const value = phraseInput.val();
        if (value.length === 0) {
            return;
        }

        const encoded = encodeURIComponent(value);

        $.get("https://clap-as-a-service.herokuapp.com/clap?phrase=" + encoded)
            .done(function (event) {
                $('#clap').html(event);
            });
    });

    $.urlParam = function (name) {
        const results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        return results && results[1];
    }

    const urlPhrase = $.urlParam('phrase');

    if (urlPhrase) {
        phraseInput.val(decodeURIComponent(urlPhrase));
        phraseInput.keyup();
    }
});