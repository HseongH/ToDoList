function makeTwoString(str) {
    return `${str}`.length === 2 ? str : `0${str}`;
}

function findSibling(elem) {
    const siblings = [];
    let sibling = elem.parentNode.firstChild;

    while (sibling) {
        if (sibling.nodeType === 1 && sibling !== elem ) {
            siblings.push(sibling);
        }

        sibling = sibling.nextSibling;
    }

    return siblings;
}