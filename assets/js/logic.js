// Add link functionality
document.getElementById('add-link').addEventListener('click', function() {
    const name = document.getElementById('link-name').value.trim();
    const url = document.getElementById('link-url').value.trim();
    const icon = document.getElementById('link-icon').value.trim();

    if (!name || !url || !icon) {
        alert('Please fill in all fields.');
        return;
    }

    const linkItem = document.createElement('div');
    linkItem.className = 'link-item';

    const linkIcon = document.createElement('img');
    linkIcon.src = icon;
    linkIcon.alt = name;

    const linkAnchor = document.createElement('a');
    linkAnchor.href = url;
    linkAnchor.target = '_blank';
    linkAnchor.textContent = name;

    linkItem.appendChild(linkIcon);
    linkItem.appendChild(linkAnchor);
    document.getElementById('user-links').appendChild(linkItem);

    document.getElementById('link-name').value = '';
    document.getElementById('link-url').value = '';
    document.getElementById('link-icon').value = '';
});
