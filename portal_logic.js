/**
 * portal_logic.js
 *
 * This script provides client-side interactivity for the JobConnect Portal.
 * It handles dynamic job listing, search filtering, and application simulations.
 */

// --- 1. MOCK JOB DATA ---
// In a real application, this data would be fetched from a server API.
const JOB_DATA = [
    { id: 1, title: "Principal Software Architect", company: "Innovate Solutions", location: "San Francisco, CA", type: "Full-time", description: "Lead the architectural design and implementation of our next-generation cloud platform using Golang and AWS.", keywords: "Architect, Cloud, AWS, Golang, Senior" },
    { id: 2, title: "Digital Marketing Manager", company: "Global Brands Co.", location: "Remote (Europe)", type: "Full-time", description: "Develop and execute comprehensive marketing strategies across paid social, SEO, and email channels.", keywords: "Marketing, SEO, Social, Remote" },
    { id: 3, title: "UX/UI Design Intern", company: "Startup Hub", location: "Austin, TX", type: "Internship", description: "Collaborate with product teams to create wireframes, prototypes, and user flows for mobile and web apps.", keywords: "Design, UX, UI, Intern, Prototype" },
    { id: 4, title: "Senior Data Scientist", company: "Data Metrics Inc.", location: "New York, NY", type: "Full-time", description: "Utilize machine learning and statistical modeling to drive business insights from large datasets.", keywords: "Data, ML, Python, Scientist" },
    { id: 5, title: "Customer Success Associate", company: "Service First", location: "Remote (US)", type: "Full-time", description: "Manage client relationships and ensure positive adoption of our SaaS product.", keywords: "Customer, Service, Remote, Associate" },
];


// --- 2. CORE DOM ELEMENTS ---
const jobSectionContainer = document.querySelector('.job-section .container');
const searchForm = document.querySelector('.search-form');
const jobListingsNode = document.createElement('div');
jobListingsNode.classList.add('job-listings-dynamic');
jobSectionContainer.appendChild(jobListingsNode);


// --- 3. RENDERING FUNCTIONS ---

/**
 * Creates the HTML markup for a single job card.
 * @param {Object} job - The job data object.
 * @returns {string} The HTML string for the job card.
 */
const createJobCardMarkup = (job) => {
    return `
        <article class="job-card" data-job-id="${job.id}">
            <h3>${job.title}</h3>
            <div class="job-meta">
                <p><strong>Company:</strong> ${job.company}</p>
                <p><strong>Location:</strong> ${job.location}</p>
                <p><strong>Type:</strong> ${job.type}</p>
            </div>
            <p>${job.description}</p>
            <button class="btn-apply-js" data-title="${job.title}">Apply Now</button>
        </article>
    `;
};

/**
 * Renders a list of jobs to the DOM.
 * @param {Array} jobsToRender - The array of job objects to display.
 */
const renderJobs = (jobsToRender) => {
    // Clear previous listings
    jobListingsNode.innerHTML = '';

    if (jobsToRender.length === 0) {
        jobListingsNode.innerHTML = '<p class="text-center" style="padding: 20px;">No jobs match your search criteria. Try a different term!</p>';
        return;
    }

    const jobCardsHTML = jobsToRender.map(createJobCardMarkup).join('');
    jobListingsNode.insertAdjacentHTML('beforeend', jobCardsHTML);
};


// --- 4. EVENT HANDLERS ---

/**
 * Handles the search form submission, filters data, and re-renders jobs.
 * @param {Event} event - The form submission event.
 */
const handleSearch = (event) => {
    event.preventDefault(); // Stop the browser from submitting the form

    const keywordInput = document.querySelector('input[name="keyword"]').value.toLowerCase().trim();
    const locationInput = document.querySelector('input[name="location"]').value.toLowerCase().trim();

    // The filtering logic
    const filteredJobs = JOB_DATA.filter(job => {
        const matchesKeyword = !keywordInput || 
                                job.keywords.toLowerCase().includes(keywordInput) || 
                                job.title.toLowerCase().includes(keywordInput) ||
                                job.company.toLowerCase().includes(keywordInput);
        
        const matchesLocation = !locationInput || job.location.toLowerCase().includes(locationInput);
        
        return matchesKeyword && matchesLocation;
    });

    renderJobs(filteredJobs);
};

/**
 * Handles clicks within the job listings area (Event Delegation).
 * @param {Event} event - The click event.
 */
const handleJobAction = (event) => {
    const target = event.target;

    if (target.classList.contains('btn-apply-js')) {
        const jobTitle = target.dataset.title;
        // In a real app, this would show a dedicated application modal or redirect.
        alert(`Thank you for your interest in the "${jobTitle}" position! This is a simulation, you would now proceed to an application page.`);
    }
};

// --- 5. INITIALIZATION ---

/**
 * Sets up initial state and attaches event listeners.
 */
const initializePortal = () => {
    // 1. Initial Job Render (Remove hardcoded jobs from HTML if you use this)
    // To use this, you need to manually remove the hardcoded job cards from the HTML.
    renderJobs(JOB_DATA);

    // 2. Attach Listeners
    if (searchForm) {
        searchForm.addEventListener('submit', handleSearch);
    }
    
    // Attach listener to the container for delegated clicks (e.g., Apply button)
    if (jobListingsNode) {
        jobListingsNode.addEventListener('click', handleJobAction);
    }
};

// Start the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializePortal);