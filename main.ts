// Hide the resume template initially
(document.getElementById("resumetemplate") as HTMLElement).style.display = "none";

function generateResume(): void {
    const button = document.getElementById("downloadbutton") as HTMLButtonElement;

    // Event listener for the download button
    button.addEventListener("click", () => {
        // Retrieve the HTML content of the resume template
        const resumeContent = document.getElementById("resumetemplate")?.outerHTML || "<p>Resume content not available.</p>";
    
        // External CSS link (ensure this path is correct, whether it's relative or absolute)
        const externalCssLink = "<link rel='stylesheet' href='styles.css'>"; // Adjust the path as needed
    
        // Create the full HTML content with the external CSS reference
        const fullHtmlContent = `
            <html>
                <head>
                    ${"https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"}  <!-- Include the external CSS link -->
                </head>
                <body>
                    ${resumeContent} <!-- Include the resume content -->
                </body>
            </html>
        `;
    
        // Create a Blob object with the complete HTML content
        const blob = new Blob([fullHtmlContent], { type: "text/html" });
    
        // Create a temporary link element to trigger the download
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "resume.html";  // Download as an HTML file
    
        // Append the link to the body, trigger the download, and remove the link afterward
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
    

    const nameInput = document.getElementById("name") as HTMLInputElement;
    const name = nameInput?.value;
    const nameElement = document.querySelector("#namet h1") as HTMLElement;
    nameElement.textContent = name || "WRITE NAME HERE...";

    (document.getElementById("emailt") as HTMLElement).innerHTML = (document.getElementById("email") as HTMLInputElement).value;
    (document.getElementById("professiont") as HTMLElement).innerHTML = (document.getElementById("profession") as HTMLInputElement).value;
    (document.getElementById("contactt") as HTMLElement).innerHTML = (document.getElementById("contact") as HTMLInputElement).value;
    (document.getElementById("locationt") as HTMLElement).innerHTML = (document.getElementById("location") as HTMLInputElement).value;

    // Links
    const facebookLinkInput = document.getElementById("facebook-link") as HTMLInputElement;
    const linkedinLinkInput = document.getElementById("linkedin-link") as HTMLInputElement;

    const facebookLink = facebookLinkInput?.value;
    const linkedinLink = linkedinLinkInput?.value;

    const facebookElement = document.getElementById("facebooklink") as HTMLAnchorElement;
    facebookElement.innerHTML = facebookLink;
    facebookElement.href = facebookLink;

    const linkedinElement = document.getElementById("linkedinlink") as HTMLAnchorElement;
    linkedinElement.innerHTML = linkedinLink;
    linkedinElement.href = linkedinLink;

    // About Me
    const about = (document.getElementById("aboutarea") as HTMLTextAreaElement).value;
    (document.getElementById("aboutmet") as HTMLElement).innerHTML = about;

    // Skills
    const skills = (document.getElementById("skillsarea") as HTMLTextAreaElement).value;
    (document.getElementById("skillst") as HTMLElement).innerHTML = skills.replace(/\n/g, "<br>");

    // Education
    const school = (document.getElementById("school") as HTMLInputElement).value;
    const schoolYear = (document.getElementById("school-year") as HTMLInputElement).value;
    const schoolCertificate = (document.getElementById("school-certificate") as HTMLInputElement).value;

    const highschool = (document.getElementById("highschool") as HTMLInputElement).value;
    const highschoolYear = (document.getElementById("highschool-year") as HTMLInputElement).value;
    const highschoolCertificate = (document.getElementById("highschool-certificate") as HTMLInputElement).value;

    const university = (document.getElementById("university") as HTMLInputElement).value;
    const universityYear = (document.getElementById("university-year") as HTMLInputElement).value;
    const universityCertificate = (document.getElementById("university-certificate") as HTMLInputElement).value;

    const educationHTML = `
        <b>${school || "School Name Not Provided"}</b><br>
        ${schoolCertificate || "Certificate Not Provided"}<br>
        ${schoolYear || "Year Not Provided"}<br><br>
        
        <b>${highschool || "Higher School Name Not Provided"}</b><br>
        ${highschoolCertificate || "Certificate Not Provided"}<br>
        ${highschoolYear || "Year Not Provided"}<br><br>
        
        <b>${university || "University Name Not Provided"}</b><br>
        ${universityCertificate || "Certificate Not Provided"}<br>
        ${universityYear || "Year Not Provided"}
    `;

    (document.getElementById("educationContent") as HTMLElement).innerHTML = educationHTML;

    // Experience
    const experience = (document.getElementById("experiencearea") as HTMLTextAreaElement).value;
    (document.getElementById("experiencet") as HTMLElement).innerHTML = experience.replace(/\n/g, "<br>");

    // Projects
    const projects = (document.getElementById("projectsarea") as HTMLTextAreaElement).value;
    (document.getElementById("projectst") as HTMLElement).innerHTML = projects.replace(/\n/g, "<br>");

    // Hide the form and display the resume
    (document.getElementById("resumeform") as HTMLElement).style.display = "none";
    (document.getElementById("resumetemplate") as HTMLElement).style.display = "";
}

// Handle file input for image preview
(document.getElementById("fileInput") as HTMLInputElement).addEventListener("change", function (this: HTMLInputElement): void {
    const file = this.files?.[0];

    if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function () {
            (document.getElementById("imagePreview") as HTMLImageElement).src = reader.result as string;
        };

        reader.onerror = function () {
            console.error("Error reading the file:", reader.error);
        };
    } else {
        console.error("No file selected");
    }
});

// Enable in-place editing and save content
function saveContent(): void {
    const editableElements = document.querySelectorAll('[contenteditable="true"]');

    editableElements.forEach((element) => {
        const id = element.id;
        const content = element.innerHTML;

        // Save content to localStorage
        localStorage.setItem(id, content);
    });

    alert("Content saved successfully!");
}

// Load saved content on page load
function loadContent(): void {
    const editableElements = document.querySelectorAll('[contenteditable="true"]');

    editableElements.forEach((element) => {
        const id = element.id;
        const savedContent = localStorage.getItem(id);

        if (savedContent) {
            element.innerHTML = savedContent;
        }
    });
}

window.onload = loadContent;
