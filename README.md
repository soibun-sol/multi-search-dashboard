# Multi-Search Dashboard

[link](https://soibun-sol.github.io/multi-search-dashboard/)

## Description

### User Story

- **AS A** user who frequently uses multiple search engines and websites,
- **WHEN I** open my browser and see my homepage,
- **THEN I** want to see a list of search engines, useful links, and current weather information, all laid out in a visually pleasing manner. Additionally, I want the page to automatically detect my location to display relevant date, time, and weather information.

### Acceptance Criteria

- **IT IS DONE WHEN**:
  - I load the page and see a list of useful links.
  - I have the ability to toggle between light and dark modes.
  - My theme preference is saved in local storage for future visits.
  - The Geolocation API prompts for my location to display the current date, time, and weather.
  - I can refine the city by searching and have the option to save this location in local storage for future visits.
  - I can save and manage my bookmarks for easy access.

## Table of Contents

- [Multi-Search Dashboard](#multi-search-dashboard)
  - [Description](#description)
    - [User Story](#user-story)
    - [Acceptance Criteria](#acceptance-criteria)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Example](#example)
  - [Credits](#credits)
  - [License](#license)
  - [Features](#features)
  - [How to Contribute](#how-to-contribute)
  - [Tests](#tests)

## Installation

To install the Multi-Search Dashboard, follow these steps:

1. Clone the repository to your local machine using `git clone <repository-url>`.
2. Navigate to the project directory: `cd multi-search-dashboard`.
3. Open `index.html` in your preferred web browser to view the dashboard.

## Usage

The Multi-Search Dashboard offers several features to enhance your browsing experience:

- **Search Engines and Links**: Access a list of commonly used search engines and useful links directly from your homepage.
- **Theme Toggle**: Switch between light and dark modes to suit your preference. Your choice is saved in local storage for future visits.
- **Weather and Location Information**:
  - The Geolocation API prompts you to share your location, allowing the dashboard to display the current date, time, and weather relevant to your location.
  - You can refine the city by searching for a specific location, and this information is saved in local storage for future visits.
- **Bookmark Saving**: Save and manage your bookmarks for quick access to your favorite sites.

### Example

To see the dashboard in action, navigate to the homepage and explore the features. Here's a screenshot of the dashboard:

[Screenshot](./assets/images/screenshot_5.png)

## Credits

- Collaborators: [Your Collaborator's Name](https://github.com/your-collaborator)
- Weather API: [Weather API Provider](https://weatherapi.com)
- Geolocation API: [Geolocation API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
- Tutorials: [Tutorial Name](https://tutorial-link.com)

## License

This project is licensed under the MIT License. For more details, see the [LICENSE](LICENSE) file.

## Features

- Display a list of commonly used search engines and useful links.
- Toggle between light and dark modes.
- Save theme preference in local storage.
- Use Geolocation API to display current date, time, and weather based on user location.
- Allow users to refine and save location preferences in local storage.
- Responsive design for various screen sizes.
- Save and manage bookmarks.

## How to Contribute

We welcome contributions from the community! To contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`.
3. Make your changes and commit them: `git commit -m 'Add your feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Submit a pull request.

For more detailed guidelines, refer to the [Contributor Covenant](https://www.contributor-covenant.org/).

## Tests

To test the functionality of the Multi-Search Dashboard, explore the following scenarios:

- Verify that the theme toggle saves the user's preference.
- Check that the Geolocation API correctly prompts for location and displays relevant date, time, and weather information.
- Test the ability to refine the city by searching and saving the location in local storage.
- Test the bookmark saving feature by adding and removing bookmarks.

Feel free to report any issues or suggest improvements via the project's GitHub repository.
