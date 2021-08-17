const isVowel = function (character) {
    return character === "a" || character === "i" || character === "u" || character === "e" || character === "o";
}

const gConverter = function (requestedText) {
    let newText = "";
    requestedTextSplit = requestedText.split(" ");
    for (let root = 0; root < requestedTextSplit.length; root++) {
        const element = requestedTextSplit[root];
        for (var i = 0; i < element.length; i++) {
            newText += element.charAt(i);
            if (isVowel(element.charAt(i).toLowerCase())) {
                newText += "g";
                newText += element.charAt(i);
                continue;
            }

            if ((i + 2) <= element.length) {
                if (isVowel(element.charAt(i + 2))) {
                    continue;
                }

                const endWord = element.charAt(i) + element.charAt(i + 1);
                switch (endWord) {
                    case 'ng':
                        continue;
                    default:
                        break;
                }
            }

            if ((i + 1) <= element.length) {
                if (isVowel(element.charAt(i + 1))) {
                    continue;
                }
            }

            if ((i + 3) <= element.length) {
                const endWord = element.charAt(i + 1) + element.charAt(i + 2) + element.charAt(i + 3);
                switch (endWord) {
                    case 'nya':
                        continue;
                    case 'man':
                        continue;
                    case 'kan':
                        continue;
                    case 'wan':
                        continue;
                    default:
                        break;
                }
            }

            if (i !== element.length - 1) {
                newText += "ege";
            }
        }

        if (root === requestedTextSplit.length - 1) {
            return newText;
        }
        newText += " "
    }

    return newText;
}

module.exports = {
    gConverter,
}