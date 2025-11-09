const student = {
    name: "Demo Student",
    isPlaced: true,
    placedCategory: 'Core',
    jobsOffered: 1,
    academicCGPA: 8.5,
    email: "demo@college.edu",
    dob: "2000-01-01",
    phone: "123-456-7890",
    gender: "Male",
    address: "Demo Address, City",
    branch: "CSE",
    year: 4,
    backlogs: 0,
    tenth: 90,
    twelfth: 85,
};

const offCampusJobs = [
    { company:"Google", role:"Software Engineer Intern", location:"Bangalore", applyBy:"30 Nov 2025", link:"https://careers.google.com/", description:"Work with world-class engineers on cutting-edge technologies. Strong coding skills required." },
    { company:"Microsoft", role:"Cloud Support Associate", location:"Hyderabad", applyBy:"25 Nov 2025", link:"https://careers.microsoft.com/", description:"Provide cloud support on Azure technologies. Good communication skills required." },
    { company:"Amazon", role:"SDE Intern", location:"Chennai", applyBy:"28 Nov 2025", link:"https://amazon.jobs/", description:"Build scalable systems and services. Strong DSA and problem-solving skills needed." },
    { company:"TCS NQT", role:"National Qualifier Trainee", location:"PAN India", applyBy:"5 Dec 2025", link:"https://www.tcs.com/careers", description:"Entry-level opportunity for freshers. Test includes Aptitude + Coding." }
];

const drivesData = [
    { company:"Tech Innovate",role:"Software Dev",category:"Core",date:"20 Nov",eligibility:7,status:"Not Applied"},
    { company:"Global Titans",role:"Data Scientist",category:"Dream",date:"15 Nov",eligibility:8.5,status:"Not Applied"},
    { company:"Future Services",role:"Engineer",category:"Mass",date:"25 Nov",eligibility:6,status:"Not Applied"},
    { company:"Infra Tech",role:"Network Eng",category:"Core",date:"30 Nov",eligibility:7.5,status:"Not Applied"},
    { company:"Robo Corp",role:"AI Intern",category:"Dream",date:"18 Nov",eligibility:8,status:"Not Applied"},
    { company:"FinTech Pro",role:"Analyst",category:"Core",date:"22 Nov",eligibility:7,status:"Not Applied"},
    { company:"Alpha Systems",role:"QA Tester",category:"Mass",date:"28 Nov",eligibility:6,status:"Not Applied"}
];

const myApplications = [];
let currentUser = null;
function toggleRegister(){ document.getElementById('login-form').style.display='none'; document.getElementById('register-form').style.display='block'; }
function toggleLogin(){ document.getElementById('login-form').style.display='block'; document.getElementById('register-form').style.display='none'; }

function register() {
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const dob = document.getElementById('reg-dob').value;
    const roll = document.getElementById('reg-roll').value;
    const pass = document.getElementById('reg-pass').value;
    const confirmPass = document.getElementById('reg-confirm-pass').value;

    if (!name || !email || !dob || !roll || !pass || !confirmPass) {
        alert("Please fill all fields.");
        return;
    }

    if (pass !== confirmPass) {
        alert("Passwords do not match!");
        return;
    }

    const newStudent = {
    name,
    email,
    dob,
    roll,
    pass,
    isPlaced: false,
    placedCategory: null,
    jobsOffered: 0,
    academicCGPA: 0,
    phone: "",
    gender: "",
    address: "",
    branch: "",
    year: 0,
    backlogs: 0,
    tenth: 0,
    twelfth: 0,
    myApplications: []
};


    localStorage.setItem('registeredStudent', JSON.stringify(newStudent));

    alert("Account created successfully! You can now login.");
    toggleLogin();
}


function login(){
    const loginName = document.getElementById('login-name').value;
    const loginPass = document.getElementById('login-pass').value;
    const storedStudentJSON = localStorage.getItem('registeredStudent');
    
    if (storedStudentJSON) {
        const registered = JSON.parse(storedStudentJSON);
        if (registered.name === loginName && registered.pass === loginPass) {
            currentUser = registered;
        }
    }
    if (!currentUser) {
    if (loginName === "Demo Student" && loginPass === "demo") {
        currentUser = student;
    } else {
        alert("Login Failed");
        return;
    }
}

localStorage.setItem("loggedInUser", JSON.stringify(currentUser));
localStorage.setItem("isLoggedIn", "true");

    document.getElementById('auth-section').classList.add('d-none');
    document.getElementById('dashboard-wrapper').classList.remove('d-none');
    document.querySelector('header h1 strong').innerText = currentUser.name;
    document.getElementById('placement-status').innerText = currentUser.isPlaced ? `Placed (${currentUser.placedCategory})` : 'Unplaced';
    document.getElementById('academic-gpa').innerText = `${currentUser.academicCGPA} CGPA`;
    document.getElementById('applied-count').innerText = drivesData.filter(d => d.status === "Applied").length;
    renderDriveTable();
    renderDrivesList();
    renderOffCampusJobs();
    populateProfile();
    renderApplications();
}
function populateProfile() {
    if (!currentUser) return;
    const setIf = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.innerText = value ?? 'N/A';
    };
    setIf('profile-name', currentUser.name);
    setIf('profile-email', currentUser.email);
    setIf('profile-dob', currentUser.dob);
    setIf('profile-status', currentUser.isPlaced ? `Placed (${currentUser.placedCategory})` : 'Unplaced');
    setIf('profile-cgpa', currentUser.academicCGPA || 'N/A');
    setIf('profile-jobs', currentUser.jobsOffered || 0);
    setIf('profile-phone', currentUser.phone);
    setIf('profile-gender', currentUser.gender);
    setIf('profile-address', currentUser.address);
    setIf('profile-branch', currentUser.branch);
    setIf('profile-year', currentUser.year);
    setIf('profile-backlogs', currentUser.backlogs || 0);
    setIf('profile-10th', currentUser.tenth);
    setIf('profile-12th', currentUser.twelfth);
    const setValIf = (id, val) => { const el = document.getElementById(id); if (el) el.value = val ?? ''; };
    setValIf('edit-name', currentUser.name);
    setValIf('edit-email', currentUser.email);
    setValIf('edit-dob', currentUser.dob);
    setValIf('edit-cgpa', currentUser.academicCGPA);
    setValIf('edit-phone', currentUser.phone);
    setValIf('edit-gender', currentUser.gender);
    setValIf('edit-address', currentUser.address);
    setValIf('edit-branch', currentUser.branch);
    setValIf('edit-year', currentUser.year);
    setValIf('edit-backlogs', currentUser.backlogs);
    setValIf('edit-10th', currentUser.tenth);
    setValIf('edit-12th', currentUser.twelfth);
}
function toggleEditMode(isEditing) {
    const displayDiv = document.getElementById('profile-details-display');
    const editDiv = document.getElementById('profile-details-edit');
    const editButton = document.getElementById('edit-profile-btn');
    if (isEditing) {
        populateProfile();
        displayDiv.style.display = 'none';
        editDiv.style.display = 'block';
        editButton.style.display = 'none';
    } else {
        displayDiv.style.display = 'block';
        editDiv.style.display = 'none';
        editButton.style.display = 'block';
    }
}
function saveProfile() {
    currentUser.name = document.getElementById('edit-name').value;
    currentUser.email = document.getElementById('edit-email').value;
    currentUser.dob = document.getElementById('edit-dob').value;
    currentUser.academicCGPA = parseFloat(document.getElementById('edit-cgpa').value);
    currentUser.phone = document.getElementById('edit-phone').value;
currentUser.gender = document.getElementById('edit-gender').value;
currentUser.address = document.getElementById('edit-address').value;

currentUser.branch = document.getElementById('edit-branch').value;
currentUser.year = document.getElementById('edit-year').value;
currentUser.backlogs = document.getElementById('edit-backlogs').value;
currentUser.tenth = document.getElementById('edit-10th').value;
currentUser.twelfth = document.getElementById('edit-12th').value;
    if (localStorage.getItem('registeredStudent')) {
        localStorage.setItem('registeredStudent', JSON.stringify(currentUser));
    }
    document.querySelector('header h1 strong').innerText = currentUser.name;
    localStorage.setItem("loggedInUser", JSON.stringify(currentUser));

    populateProfile();
    toggleEditMode(false);
    alert("Profile successfully updated!");
}
function logoutPopup(){ new bootstrap.Modal(document.getElementById('logoutModal')).show(); }
function logout() {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("isLoggedIn");
    location.reload();
}


function checkEligibility(drive) {
    if (!currentUser) return { eligible: false, reason: "Error: User not logged in." };

    if (currentUser.jobsOffered >= 2)
        return { eligible: false, reason: "Already placed in 2 companies." };

    const catOrder = { Mass: 1, Core: 2, Dream: 3 };

    if (currentUser.isPlaced && catOrder[currentUser.placedCategory] > catOrder[drive.category])
        return { eligible: false, reason: `Placed in ${currentUser.placedCategory}, cannot apply for ${drive.category}.` };

    if (currentUser.academicCGPA < parseFloat(drive.eligibility))
        return { eligible: false, reason: `CGPA below required ${drive.eligibility}` };

    return { eligible: true };
}

function renderDriveTable() {
    const body = document.getElementById('drive-table-body');
    body.innerHTML = '';

    drivesData.forEach((drive, index) => {
        const eligibility = checkEligibility(drive);
        const applied = drive.status === "Applied";

        let action = '';
        if (!eligibility.eligible) {
            action = `<button class='btn btn-sm btn-secondary' disabled title='${eligibility.reason}'>Ineligible</button>`;
        } else if (applied) {
            action = `
                <button class='btn btn-sm btn-secondary' disabled>Applied</button>
                <button class='btn btn-sm btn-outline-danger undo-btn' data-index='${index}'>
                    <i class='fas fa-undo'></i>
                </button>`;
        } else {
            action = `<button class='btn btn-sm btn-success apply-btn' data-index='${index}'>Apply</button>`;
        }

        const badgeClass = `badge-${drive.category.toLowerCase()}`;

        body.insertAdjacentHTML('beforeend', `
            <tr>
                <td>${drive.company}</td>
                <td>${drive.role}</td>
                <td><span class='category-badge ${badgeClass}'>${drive.category}</span></td>
                <td>${drive.date}</td>
                <td>${drive.eligibility}+ CGPA</td>
                <td>${action}</td>
            </tr>
        `);
    });

    attachEventListeners();
}

function renderDrivesList() {
    const body = document.getElementById("drives-list-body");
    body.innerHTML = "";

    drivesData.forEach((drive, index) => {
        const badgeClass = `badge-${drive.category.toLowerCase()}`;

        body.insertAdjacentHTML("beforeend", `
            <tr>
                <td>
                    <a href="#" class="company-link" data-index="${index}">
                        <strong class="text-primary">${drive.company}</strong>
                    </a>
                </td>
                <td>${drive.role}</td>
                <td><span class="category-badge ${badgeClass}">${drive.category}</span></td>
                <td>${drive.eligibility}+ CGPA</td>
                <td>${drive.date}</td>
            </tr>
        `);
    });

    attachCompanyDetailEvents();
}
function attachCompanyDetailEvents() {
    document.querySelectorAll(".company-link").forEach(link => {
        link.onclick = function(e) {
            e.preventDefault();

            const i = this.dataset.index;
            const d = drivesData[i];

            document.getElementById("companyTitle").innerText = d.company;
            document.getElementById("companyRole").innerText = d.role;
            document.getElementById("companyCategory").innerText = d.category;
            document.getElementById("companyEligibility").innerText = d.eligibility;
            document.getElementById("companyDate").innerText = d.date;
            document.getElementById("companyDescription").innerText =
                `${d.company} is hiring for the role of ${d.role} under the ${d.category} category. Students having minimum CGPA of ${d.eligibility} are eligible. Click apply in the dashboard to proceed.`;

            new bootstrap.Modal(document.getElementById("companyDetailsModal")).show();
        };
    });
}
function renderOffCampusJobs() {
    const body = document.getElementById("off-campus-body");
    body.innerHTML = "";

    offCampusJobs.forEach((job, index) => {
        const alreadyApplied = currentUser.myApplications?.some(app => 
            app.company === job.company && app.role === job.role
        );

        body.insertAdjacentHTML("beforeend", `
            <tr>
                <td><strong>${job.company}</strong></td>
                <td>${job.role}</td>
                <td>${job.location}</td>
                <td>${job.applyBy}</td>
                <td>
                    ${
                        alreadyApplied 
                        ? `<button class="btn btn-sm btn-secondary" disabled>Applied</button>`
                        : `<button class="btn btn-sm btn-success offcamp-apply-btn" data-index="${index}">Apply</button>`
                    }
                </td>
            </tr>
        `);
    });

    attachOffCampusApplyEvents();
}

function renderApplications() {
    const body = document.getElementById("applications-body");
    body.innerHTML = "";

    if (!currentUser.myApplications || currentUser.myApplications.length === 0) {
        body.innerHTML = `
            <tr>
                <td colspan="3" class="text-center text-muted py-4">
                    <i class="fas fa-folder-open fa-2x mb-2"></i><br>
                    No applications yet. Apply to a company to view your status here.
                </td>
            </tr>
        `;
        return;
    }

    currentUser.myApplications.forEach((app, index) => {
        body.insertAdjacentHTML("beforeend", `
            <tr>
                <td><a href="#" class="app-link text-primary fw-bold" data-index="${index}">${app.company}</a></td>
                <td>${app.role}</td>
                <td>${app.status}</td>
            </tr>
        `);
    });

    attachApplicationEvents();
}



function attachApplicationEvents() {
    document.querySelectorAll(".app-link").forEach(link => {
        link.onclick = function(e) {
            e.preventDefault();

            const i = this.dataset.index;
            const data = myApplications[i];

            document.getElementById("appCompany").innerText = data.company;
            document.getElementById("appRole").innerText = data.role;
            document.getElementById("appStatus").innerText = data.status;
            document.getElementById("appPackage").innerText = data.package;
            document.getElementById("appLocation").innerText = data.location;
            document.getElementById("appRoleDesc").innerText = data.roleDescription;
            document.getElementById("appCompanyDesc").innerText = data.companyDescription;

            new bootstrap.Modal(document.getElementById("applicationModal")).show();
        };
    });
}


function attachOffCampusEvents() {
    document.querySelectorAll(".off-campus-link").forEach(link => {
        link.onclick = function(e) {
            e.preventDefault();

            const i = this.dataset.index;
            const job = offCampusJobs[i];

            document.getElementById("offCampusTitle").innerText = job.company;
            document.getElementById("offCampusRole").innerText = job.role;
            document.getElementById("offCampusLocation").innerText = job.location;
            document.getElementById("offCampusApplyBy").innerText = job.applyBy;
            document.getElementById("offCampusDescription").innerText = job.description;
            document.getElementById("offCampusLink").href = job.link;

            new bootstrap.Modal(document.getElementById("offCampusModal")).show();
        };
    });
}
function attachOffCampusApplyEvents() {
    document.querySelectorAll(".offcamp-apply-btn").forEach(btn => {
        btn.onclick = function () {
            const i = this.dataset.index;
            const job = offCampusJobs[i];
            document.getElementById("offCampApplyTitle").innerText = job.company;
            document.getElementById("offCampApplyRole").innerText = job.role;
            document.getElementById("offCampApplyLocation").innerText = job.location;
            document.getElementById("offCampApplyDate").innerText = job.applyBy;
            document.getElementById("offCampApplyDesc").innerText = job.description;
            document.getElementById("offCampApplyLink").href = job.link;

            document.getElementById("confirmOffCampApplyBtn").onclick = function () {

                if (!currentUser.myApplications)
                    currentUser.myApplications = [];
                currentUser.myApplications.push({
                    company: job.company,
                    role: job.role,
                    status: "Applied (Off-Campus)",
                    package: "Varies by role",
                    location: job.location,
                    roleDescription: job.description,
                    companyDescription: `${job.company} off-campus hiring opportunity.`
                });

                localStorage.setItem("loggedInUser", JSON.stringify(currentUser));

                renderOffCampusJobs();
                renderApplications();

                bootstrap.Modal.getInstance(
                    document.getElementById("offCampusApplyModal")
                ).hide();
            };

            new bootstrap.Modal(document.getElementById("offCampusApplyModal")).show();
        };
    });
}


function attachEventListeners() {
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();

        const target = this.getAttribute("data-target");

        if (target === "logout") {
            logoutPopup();
            return;
        }
        document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
        this.classList.add("active");
        document.querySelectorAll(".content-section").forEach(sec => {
            sec.classList.remove("active");
        });
        const section = document.getElementById(target);
        if (section) {
            section.classList.add("active");
        }
    });
});

    document.querySelectorAll('.apply-btn').forEach(btn => {
    btn.onclick = function() {
        const index = this.dataset.index;
        const d = drivesData[index];
        document.getElementById("applyCompanyTitle").innerText = d.company;
        document.getElementById("applyRole").innerText = d.role;
        document.getElementById("applyCategory").innerText = d.category;
        document.getElementById("applyEligibility").innerText = d.eligibility;
        document.getElementById("applyPackage").innerText =
            d.category === "Dream" ? "12–20 LPA" :
            d.category === "Core" ? "6–12 LPA" :
            "3–5 LPA";

        document.getElementById("applyDescription").innerHTML = `
    <strong>About ${d.company}:</strong><br>
    ${d.company} is a leading organization known for innovation and high-quality engineering work.
    They specialize in cutting-edge technologies and offer excellent growth opportunities.<br><br>

    <strong>Role Responsibilities:</strong>
    <ul>
        <li>Work with senior developers on real-world projects.</li>
        <li>Write clean, scalable and maintainable code.</li>
        <li>Participate in code reviews and development sprints.</li>
        <li>Assist in design, testing, and documentation.</li>
    </ul>

    <strong>Requirements:</strong>
    <ul>
        <li>Minimum CGPA: ${d.eligibility}</li>
        <li>Strong fundamentals in programming.</li>
        <li>Good problem-solving and communication skills.</li>
    </ul>

    <strong>Why Join ${d.company}?</strong>
    <ul>
        <li>Excellent learning environment</li>
        <li>Competitive salary & growth potential</li>
        <li>Chance to work on cutting-edge technologies</li>
    </ul>
`;
        document.getElementById("confirmApplyBtn").onclick = function() {

            drivesData[index].status = "Applied";

            if (!currentUser.myApplications) currentUser.myApplications = [];

            currentUser.myApplications.push({
                company: d.company,
                role: d.role,
                status: "Applied",
                package: document.getElementById("applyPackage").innerText,
                location: "Bangalore / Hyderabad / Delhi (Varies)",
                roleDescription: `Role: ${d.role} in ${d.company}.`,
                companyDescription: `${d.company} hires under ${d.category} category.`
            });

            localStorage.setItem("loggedInUser", JSON.stringify(currentUser));
            document.getElementById('applied-count').innerText =
                drivesData.filter(x => x.status === "Applied").length;

            renderDriveTable();
            renderApplications();

            bootstrap.Modal.getInstance(document.getElementById("applyModal")).hide();
        };

        new bootstrap.Modal(document.getElementById('applyModal')).show();
    };
});
    document.querySelectorAll('.undo-btn').forEach(btn => btn.onclick = function() {
        const i = this.dataset.index;

        drivesData[i].status = "Not Applied";

        currentUser.myApplications = currentUser.myApplications.filter(app =>
            app.company !== drivesData[i].company
        );

        localStorage.setItem("loggedInUser", JSON.stringify(currentUser));

        document.getElementById('applied-count').innerText =
            drivesData.filter(d => d.status === "Applied").length;

        renderDriveTable();
        renderApplications();
    });

}
document.getElementById('mobile-menu-toggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('d-none');
});
document.addEventListener('DOMContentLoaded', () => {
const isLoggedIn = localStorage.getItem("isLoggedIn");

if (isLoggedIn === "true") {
    const stored = localStorage.getItem("loggedInUser");
    if (stored) {
        currentUser = JSON.parse(stored);
        document.getElementById('auth-section').classList.add('d-none');
        document.getElementById('dashboard-wrapper').classList.remove('d-none');
        document.querySelector('header h1 strong').innerText = currentUser.name;
        document.getElementById('placement-status').innerText = currentUser.isPlaced
            ? `Placed (${currentUser.placedCategory})` 
            : 'Unplaced';
        document.getElementById('academic-gpa').innerText = `${currentUser.academicCGPA} CGPA`;

        renderDriveTable();
        renderDrivesList();
        renderOffCampusJobs();
        renderApplications();
        populateProfile();
    }
}

});
function downloadPolicyPDF() {
    const text = `
Privacy Policy - College Placement System

1. Information We Collect
- Personal Details (Name, Phone, Email, Gender, Address)
- Academic Details (CGPA, Branch, Year, Backlogs)
- School Background (10th %, 12th %)
- Placement Activity Records
- Login Credentials (localStorage)

2. Purpose of Data Collection
- Determine eligibility for placements
- Personalize dashboard content
- Provide updates and notifications
- Help placement officers with decisions

3. Data Protection
- Stored locally in browser storage
- Not shared with third parties
- No cookies or external trackers used

4. Student Rights
- Update/edit your details anytime
- Delete your account and records
- Opt out from any placement activity

5. Data Retention
- Data stays until browser storage is cleared

6. Children’s Privacy
- Not for users below 17 years

7. Policy Updates
- Updated versions will be available on the policy page
`;

    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Privacy_Policy.txt";
    link.click();
}