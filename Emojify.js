(function() {

    var imgbase = "http://www.emoji-cheat-sheet.com/graphics/emojis/";

    // Inline styles to be added directly to our emoji images
    var styles = [
        "border: none",
        "box-shadow: none",
        "height: 24px",
        "width: 24px",
        "position: relative",
        "top: -2px",
        "left: -2px",
        "margin: 0",
        "padding: 0",
    ].join('; ');

    document.addEventListener("DOMNodeInserted", function(e) {
        var line = e.target;
        var lineType = line.getAttribute("type");
        var line_Type = line.getAttribute("_type");

        if (lineType == 'privmsg' || line_Type == 'privmsg') {
            var msg = line.getElementsByClassName('message').item(0);
            var html = msg.innerHTML, emoji;

            // Store the original html of this message
            var ogHtml = html;

            // Find everything that looks like an emoji
            var matches = html.match(/:([\d\w+-_]+):/g);
            for (var i in matches) {
                var match = matches[i];

                // If it looks like ':00:', skip it, it's probably the middle of time (1:45:03pm)
                if (match.match(/:\d\d:/)) {
                    continue;
                }
                var emoji = match.replace(/:/g, '');
                var icon = '<img class="inlineimage" src="' + imgbase + emoji + '.png' + '" title="' + emoji + '" style="' + styles +'">';
                html = html.replace(match, icon);
            }

            // If we've made any updates to the original HTML, update the dom node
            if (ogHtml !== html) {
                msg.innerHTML = html;
            }
        }

    }, false);
})();
