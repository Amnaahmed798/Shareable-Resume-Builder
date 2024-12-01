// Hide the resume template initially
document.getElementById("resumetemplate").style.display = "none";
document.getElementById("btn-container").style.display = "none";

function generateResume() {
  document
    .getElementById("downloadbutton")
    .addEventListener("click", function () {
      console.log("Button clicked");
      const { jsPDF } = window.jspdf;
      const resumeElement = document.getElementById("resumetemplate");

      html2canvas(resumeElement, { scale: 2 })
        .then((canvas) => {
          console.log("Canvas rendered");
          const pdf = new jsPDF("p", "mm", "a4");
          const imgData = canvas.toDataURL("image/png");
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

          pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
          pdf.save("Resume.pdf");
          console.log("PDF generated successfully");
        })
        .catch((error) => {
          console.error("Error generating PDF:", error);
        });
    });
  document
    .getElementById("generateUrlButton")
    .addEventListener("click", function () {
      const usernameInput = document.getElementById("username").value.trim();

      if (!usernameInput) {
        alert("Please enter your name.");
        return;
      }

      // Generate a user-friendly URL
      const sanitizedUsername = usernameInput.replace(/\s+/g, "").toLowerCase(); // Remove spaces and lowercase
      const userUrl = `${window.location.origin}/view?user=${encodeURIComponent(
        sanitizedUsername
      )}`;

      // Display the generated URL
      const outputElement = document.getElementById("output");
      outputElement.innerHTML = `Your custom URL is: <a href="${userUrl}" target="_blank">${userUrl}</a>`;
    });

  // Populate Resume Fields
  var nameInput = document.getElementById("username");
  var name = nameInput ? nameInput.value : "";
  var nameElement = document.querySelector("#namet h1");
  nameElement.textContent = name || "WRITE NAME HERE...";
  document.getElementById("emailt").innerHTML =
    document.getElementById("email").value || "";
  document.getElementById("professiont").innerHTML =
    document.getElementById("profession").value || "";
  document.getElementById("contactt").innerHTML =
    document.getElementById("contact").value || "";
  document.getElementById("locationt").innerHTML =
    document.getElementById("location").value || "";

  // Links
  var facebookLink = document.getElementById("facebook-link")?.value || "";
  var linkedinLink = document.getElementById("linkedin-link")?.value || "";
  var facebookElement = document.getElementById("facebooklink");
  var linkedinElement = document.getElementById("linkedinlink");

  facebookElement.innerHTML = facebookLink;
  facebookElement.href = facebookLink;
  linkedinElement.innerHTML = linkedinLink;
  linkedinElement.href = linkedinLink;

  // About Me
  document.getElementById("aboutmet").innerHTML =
    document.getElementById("aboutarea").value || "";

  // Skills
  var skills = document.getElementById("skillsarea").value || "";
  document.getElementById("skillst").innerHTML = skills.replace(/\n/g, "<br>");

  // Education
  var educationHTML = `
        <b>${
          document.getElementById("school").value || "School Name Not Provided"
        }</b><br>
        ${
          document.getElementById("school-certificate").value ||
          "Certificate Not Provided"
        }<br>
        ${
          document.getElementById("school-year").value || "Year Not Provided"
        }<br><br>
        <b>${
          document.getElementById("highschool").value ||
          "High School Name Not Provided"
        }</b><br>
        ${
          document.getElementById("highschool-certificate").value ||
          "Certificate Not Provided"
        }<br>
        ${
          document.getElementById("highschool-year").value ||
          "Year Not Provided"
        }<br><br>
        <b>${
          document.getElementById("university").value ||
          "University Name Not Provided"
        }</b><br>
        ${
          document.getElementById("university-certificate").value ||
          "Certificate Not Provided"
        }<br>
        ${
          document.getElementById("university-year").value ||
          "Year Not Provided"
        }<br>
    `;
  document.getElementById("educationContent").innerHTML = educationHTML;

  // Experience
  document.getElementById("experiencet").innerHTML = document
    .getElementById("experiencearea")
    .value.replace(/\n/g, "<br>");

  // Projects
  document.getElementById("projectst").innerHTML = document
    .getElementById("projectsarea")
    .value.replace(/\n/g, "<br>");

  // Show Resume
  document.getElementById("resumeform").style.display = "none";
  document.getElementById("resumetemplate").style.display = "";
  document.getElementById("btn-container").style.display = "";
}

// Handle file input for image preview
document.getElementById("fileInput").addEventListener("change", function () {
  var file = this.files?.[0];
  if (file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      document.getElementById("imagePreview").src = reader.result;
    };
  }
});

// Enable in-place editing and save content
function saveContent() {
  document
    .querySelectorAll('[contenteditable="true"]')
    .forEach(function (element) {
      localStorage.setItem(element.id, element.innerHTML);
    });
  alert("Content saved successfully!");
}

// Load saved content on page load
function loadContent() {
  document
    .querySelectorAll('[contenteditable="true"]')
    .forEach(function (element) {
      var savedContent = localStorage.getItem(element.id);
      if (savedContent) {
        element.innerHTML = savedContent;
      }
    });
}
window.onload = loadContent;
