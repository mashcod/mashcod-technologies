# MashCod Technologies Website

Responsive company website for MashCod Technologies PVT. LTD., built with HTML, CSS, and vanilla JavaScript.

## Website sections

- Hero panels for software consulting and student training/internships
- About Us and expert profiles
- Services and featured projects
- Photo gallery (`css/photos/gallery1.jpg` through `gallery7.jpg`)
- Client review, contact options, and consultation/training request form

## Project files

- `index.html` — page content and structure
- `css/style.css` — theme, layout, and responsive styles
- `js/script.js` — modal behavior and EmailJS form submission
- `css/photos/` — project and gallery images

## Run locally

Open `index.html` in a browser, or serve the project folder with any static web server. The site loads Google Fonts, Font Awesome, and EmailJS from their hosted CDNs, so those features need an internet connection.

## EmailJS configuration

The request form is configured in `js/script.js` with an EmailJS public key, service ID, and template ID. The EmailJS account login email is `magadh.hind@gmail.com`. The form sends a request type in the template parameters so consultation requests and training registrations can be distinguished. Check the EmailJS template's subject and body settings to ensure they use the `title`, `request_type`, and `message` variables.

Do not store the EmailJS account password in this README or in website source files. Keep account credentials in a password manager and use EmailJS's dashboard to manage the service and template.
