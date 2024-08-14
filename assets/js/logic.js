// Function to save links to local storage
function saveLinksToLocalStorage() {
    const links = Array.from(document.getElementById('user-links').children).map(linkItem => ({
        name: linkItem.querySelector('span').textContent,
        url: linkItem.querySelector('a').href,
        icon: linkItem.querySelector('img')?.src // Changed to optional chaining
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
function createLinkElement(name, url, icon = null) { // Added default parameter
    const linkItem = document.createElement('div');
    linkItem.className = 'link-item';

    const linkAnchor = document.createElement('a');
    linkAnchor.href = url;
    linkAnchor.target = '_blank';

    if (icon) { // Only create img element if icon is provided
        const linkIcon = document.createElement('img');
        linkIcon.src = icon;
        linkIcon.alt = name;
        linkAnchor.appendChild(linkIcon);
    }

    const linkName = document.createElement('span');
    linkName.textContent = name;
    linkAnchor.appendChild(linkName);

    const removeButton = document.createElement('button');
    removeButton.textContent = 'x';
    removeButton.className = 'remove-link';
    removeButton.addEventListener('click', function() {
        linkItem.remove();
        saveLinksToLocalStorage();
    });

    linkItem.appendChild(linkAnchor);
    linkItem.appendChild(removeButton);

    return linkItem;
}

// Load saved links when the page loads
document.addEventListener('DOMContentLoaded', function() {
    loadLinksFromLocalStorage();

    const addLinkButton = document.getElementById('add-link');
    const nameInput = document.getElementById('link-name');
    const urlInput = document.getElementById('link-url');
    const iconInput = document.getElementById('link-icon');

    const linkCreationModal = new bootstrap.Modal(document.getElementById('link-creation-modal'));
    const confirmLinkCreationButton = document.getElementById('confirmLinkCreation');

    // add link functionality
    addLinkButton.addEventListener('click', function() {
        const name = nameInput.value.trim();
        const url = urlInput.value.trim();
        const icon = iconInput.value.trim();

        if (!name || !url) {
            alert('Website Name and URL Required');
            return;
        }

        if (!icon) {
            linkCreationModal.show();
        } else {
            createAndAddLink(name, url, icon);
        }
    });

    confirmLinkCreationButton.addEventListener('click', function() {
        const name = nameInput.value.trim();
        const url = urlInput.value.trim();
        createAndAddLink(name, url);
        linkCreationModal.hide();
    });

    function createAndAddLink(name, url, icon = null) {
        const linkItem = createLinkElement(name, url, icon);
        document.getElementById('user-links').appendChild(linkItem);
        saveLinksToLocalStorage();

        // Clear input fields after creating the link
        nameInput.value = '';
        urlInput.value = '';
        iconInput.value = '';
    }
});
