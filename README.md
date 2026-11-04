# Northstar Tech – Portfolio Website

## Target Grade
**Grade 3**

## Project Description
Northstar Tech is a personal portfolio website showcasing my background, technical skills and development projects. The project also includes a newsletter and feedback form with JavaScript validation.

## Implemented Features
- Responsive portfolio layout with About Me, Tech Stack and Projects sections.
- Navigation menu linking to the different sections.
- Newsletter and feedback form with five fields:
  - Full Name
  - Email
  - Topic of Interest
  - Comments
  - Website (optional)
- JavaScript validation for required fields and input formats.
- Minimum 15-character requirement for comments.
- Live comments character counter.
- Visible error messages and field highlighting.
- Success message after valid form submission.
- Clear Form button to reset the form.
- Responsive styling for smaller screens.
- Accessible labels and feedback messages.

## Technologies Used
- HTML5 – page structure and form elements.
- CSS3 – styling, layout and responsive design.
- JavaScript – form validation and interactive behaviour.

## How to Run the Website
1. Download or clone the project repository.
2. Make sure the project files and folders remain in their original structure.
3. Open the project folder in Visual Studio Code or another code editor.
4. Open `index.html` in a web browser.

Alternatively, use the **Live Server** extension in Visual Studio Code and select **Open with Live Server**.

No additional installation or dependencies are required.

## Project Structure
```text
Northstar-Tech/
├── index.html
├── style.css
├── js/
│   └── feedback.js
├── images/
│   ├── workspace.jpeg
│   ├── portfolio1.png
│   └── portfolio2.png
├── README.md
└── .gitignore
```

## Limitations
The feedback form uses client-side JavaScript validation. It displays a success message but does not send or store submitted information on a server.