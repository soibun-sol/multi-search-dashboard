// Function to save links to local storage
function saveLinksToLocalStorage() {
    const links = Array.from(document.getElementById('user-links').children).map(linkItem => ({
        name: linkItem.querySelector('span').textContent,
        url: linkItem.querySelector('a').href,
        icon: linkItem.querySelector('img').src
    }));
    localStorage.setItem('userLinks', JSON.stringify(links));
}

// Function to load links from local storage
function loadLinksFromLocalStorage() {
    const links = localStorage.getItem('userLinks');
    if (links) {
        JSON.parse(links).forEach(link => {
            const linkItem = createLinkElement(link.name, link.url, link.icon);
            document.getElementById('user-links').appendChild(linkItem);
        });
    }
}

// Function to create a link element
function createLinkElement(name, url, icon) {
    const linkItem = document.createElement('div');
    linkItem.className = 'link-item';

    const linkAnchor = document.createElement('a');
    linkAnchor.href = url;
    linkAnchor.target = '_blank';

    const linkIcon = document.createElement('img');
    linkIcon.src = icon;
    linkIcon.alt = name;
    linkAnchor.appendChild(linkIcon);

    const linkName = document.createElement('span');
    linkName.textContent = name;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'x';
    removeButton.className = 'remove-link';
    removeButton.addEventListener('click', function() {
        linkItem.remove();
        saveLinksToLocalStorage();
    });

    linkItem.appendChild(linkAnchor);
    linkItem.appendChild(linkName);
    linkItem.appendChild(removeButton);

    return linkItem;
}


// Load saved links when the page loads
document.addEventListener('DOMContentLoaded', loadLinksFromLocalStorage);

// Add link functionality
document.getElementById('add-link').addEventListener('click', function() {
    const name = document.getElementById('link-name').value.trim();
    const url = document.getElementById('link-url').value.trim();
    const icon = document.getElementById('link-icon').value.trim();

    if (!name || !url || !icon) {
        alert('Please fill in all fields.');
        return;
    }

    const linkItem = createLinkElement(name, url, icon);
    document.getElementById('user-links').appendChild(linkItem);

    // Saves links to local storage after adding a new one
    saveLinksToLocalStorage();

    // Clear input fields after creating the link
    document.getElementById('link-name').value = '';
    document.getElementById('link-url').value = '';
    document.getElementById('link-icon').value = '';
});