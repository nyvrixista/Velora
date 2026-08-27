var biggestIndex = 1;
var topBar = document.querySelector("#top");

function updateTime() {
    var currentTime = new Date().toLocaleString();
    var timeText = document.querySelector("#timeElement");
    timeText.innerHTML = currentTime;
}

updateTime();
setInterval(updateTime, 1000);

dragElement(document.getElementById("welcome"));

function dragElement(element) {
    var initialX = 0;
    var initialY = 0;
    var currentX = 0;
    var currentY = 0;

    if (document.getElementById(element.id + "header")) {
        document.getElementById(element.id + "header").onmousedown = startDragging;
    } else {
        element.onmousedown = startDragging;
    }

    function startDragging(e) {
        e = e || window.event;
        e.preventDefault();

        initialX = e.clientX;
        initialY = e.clientY;

        document.onmouseup = stopDragging;
        document.onmousemove = dragElement;
    }

    function dragElement(e) {
        e = e || window.event;
        e.preventDefault();

        currentX = initialX - e.clientX;
        currentY = initialY - e.clientY;

        initialX = e.clientX;
        initialY = e.clientY;

        element.style.top = (element.offsetTop - currentY) + "px";
        element.style.left = (element.offsetLeft - currentX) + "px";
    }

    function stopDragging() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

var welcomeScreen = document.querySelector("#welcome");

function closeWindow(element) {
    element.style.display = "none";
}

function openWindow(element) {
    element.style.display = "flex";

    biggestIndex++;
    element.style.zIndex = biggestIndex;

    topBar.style.zIndex = biggestIndex + 1;

    if (selectedIcon) {
        deselectIcon(selectedIcon);
    }
}

var welcomeScreenClose = document.querySelector("#welcomeclose");
var welcomeScreenOpen = document.querySelector("#welcomeopen");

welcomeScreenClose.addEventListener("click", function() {
    closeWindow(welcomeScreen);
});

welcomeScreenOpen.addEventListener("click", function() {
    openWindow(welcomeScreen);
});

var selectedIcon = undefined;

function selectIcon(element) {
    element.classList.add("selected");
    selectedIcon = element;
}

function deselectIcon(element) {
    if (element) {
        element.classList.remove("selected");
        selectedIcon = undefined;
    }  
}

function handleIconTap(element) {
    if (element.classList.contains("selected")) {
        deselectIcon(element);
    } else {
        if (selectedIcon) {
            deselectIcon(selectedIcon);
        }

        selectIcon(element);
    }
}

function initializeWindow(windowId) {
    var window = document.querySelector("#" + windowId);

    dragElement(window);
    addWindowTapHandling(window);

    var closeButton = document.querySelector("#" + windowId + "close");

    closeButton.addEventListener("click", function() {
        closeWindow(window);
    });
}

var projectsScreen = document.querySelector("#projects");

function handleWindowTap(element) {
    biggestIndex++;
    element.style.zIndex = biggestIndex;
    topBar.style.zIndex = biggestIndex + 1;

    deselectIcon(selectedIcon);
}

function addWindowTapHandling(element) {
    element.addEventListener("mousedown", function() {
        handleWindowTap(element);
    });
}

initializeWindow("welcome");
initializeWindow("projects");
initializeWindow("terminal")

var projectsIcon = document.querySelector("#projectsIcon");

projectsIcon.addEventListener("click", function() {
    handleIconTap(projectsIcon);
});

projectsIcon.addEventListener("dblclick", function() {
    openWindow(projectsScreen);
});

var terminalScreen = document.querySelector("#terminal");
var terminalIcon = document.querySelector("#terminalIcon");

terminalIcon.addEventListener("click", function() {
    handleIconTap(terminalIcon);
});

terminalIcon.addEventListener("dblclick", function() {
    openWindow(terminalScreen);
})

var projects = [
    {
        title: "Quotify",
        description: "A quote collecting game.",
        date: "2026",
        link: "https://nyvrixista.github.io/Quotify/",
        image: "./assets/quotify-logo.png"
    },
    {
        title: "Velora",
        description: "The OS you're currently using.",
        date: "2026",
        link: "#",
        image: "./assets/velora-logo.jpg"
    }
];

function setProjectContent(index) {
    var project = projects[index];
    var projectsContent = document.querySelector("#projectsContent");

    projectsContent.innerHTML = `
        <div class = "project-card">
            <img class = "project-image" src = "${project.image}" alt = "${project.title}">
            <h2>${project.title}</h2>
            <p>${project.description}</p>
            <p class = "project-date">${project.date}</p>
            <a href = "${project.link}" target = "_blank">Open Project </a>
        </div>
    `;
}

setProjectContent(0);

function addToProjectsSidebar(index) {
    var sidebar = document.querySelector("#projectsSidebar");
    var project = projects[index];

    var newDiv = document.createElement("div");

    newDiv.innerHTML = `
        <p>${project.title}</p>
        <p>${project.date}</p>
    `;

    newDiv.addEventListener("click", function() {
        setProjectContent(index);

        var selected = sidebar.querySelector(".selected-project");

        if (selected) {
            selected.classList.remove("selected-project");
        }

        newDiv.classList.add("selected-project");
    });

    sidebar.appendChild(newDiv);
}

for (let i = 0; i < projects.length; i++) {
    addToProjectsSidebar(i);
}

document.querySelector("#projectsSidebar div").classList.add("selected-project");

var terminalInput = document.querySelector("#terminalInput");
var terminalContent = document.querySelector("#terminalContent");

var commandHistory = [];
var historyIndex = -1;

function handleTerminalInput(event) {

    if (event.key === "ArrowUp") {
        event.preventDefault();

        if (commandHistory.length === 0) {
            return;
        }

        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
        }

        terminalInput.value =
            commandHistory[commandHistory.length - 1 - historyIndex];

        return;
    }

    if (event.key === "ArrowDown") {
        event.preventDefault();

        if (historyIndex > 0) {
            historyIndex--;

            terminalInput.value =
                commandHistory[commandHistory.length - 1 - historyIndex];

        } else {
            historyIndex = -1;
            terminalInput.value = "";
        }

        return;
    }

    if (event.key !== "Enter") {
        return;
    }

    var command = terminalInput.value.trim().toLowerCase();

    if (command === "") {
        return;
    }

    commandHistory.push(command);
    historyIndex = -1;

    var commandLine = document.createElement("p");
    commandLine.innerHTML = `velora&gt; ${command}`;

    terminalContent.insertBefore(
        commandLine,
        terminalInput.parentElement
    );

    var output = document.createElement("p");

    if (command === "help") {

        output.innerHTML = `
            Available commands:<br><br>
            help — Show available commands<br>
            clear — Clear the terminal<br>
            about — About Catalin<br>
            projects — Open Projects<br>
            open projects — Open Projects<br>
            date — Show current date and time<br>
            whoami — Show current user<br>
            version — Show Velora version<br>
            apps — Show installed apps<br>
            ls — List files and apps<br>
            neofetch — Show system information<br>
            echo [text] — Print text
        `;

    } else if (command === "about") {

        output.innerHTML = `
            Velora is a personal web-based operating system.<br>
            Built by Catalin.
        `;

   } else if (
    command === "projects" ||
    command === "open projects"
) {

    openWindow(projectsScreen);
    output.textContent = "Opening Projects...";

} else if (
    command === "terminal" ||
    command === "open terminal"
) {

    openWindow(document.querySelector("#terminal"));
    output.textContent = "Terminal is already open.";

} else if (command === "exit") {

    closeWindow(document.querySelector("#terminal"));
    return;
} else if (command === "date") {

        output.textContent = new Date().toLocaleString();

    } else if (command === "whoami") {

        output.textContent =
            "Catalin — Developer, gamer & footballer from Moldova.";

    } else if (command === "version") {

        output.textContent = "Velora v1.0";

    } else if (command === "apps") {

        output.innerHTML = `
            Installed applications:<br><br>
            • Projects<br>
            • Terminal
        `;

    } else if (command === "ls") {

        output.innerHTML = `
            Desktop<br>
            Projects<br>
            Terminal<br>
            Settings<br>
            Games
        `;

    } else if (command === "neofetch") {

        output.innerHTML = `
            <strong>VELORA</strong><br><br>
            OS: Velora WebOS<br>
            Version: 1.0<br>
            User: Catalin<br>
            Shell: Velora Terminal<br>
            Apps: 2<br>
            Status: Online
        `;

    } else if (command.startsWith("echo ")) {

        output.textContent = command.substring(5);

    } else if (command === "clear") {

        terminalContent.innerHTML = `
            <div class="terminal-input-line">
                <span>velora&gt;</span>
                <input
                    type="text"
                    id="terminalInput"
                    autocomplete="off"
                >
            </div>
        `;

        terminalInput = document.querySelector("#terminalInput");

        terminalInput.addEventListener(
            "keydown",
            handleTerminalInput
        );

        terminalInput.focus();

        return;

    } else {

        output.textContent =
            `Command not found: ${command}`;
    }

    terminalContent.insertBefore(
        output,
        terminalInput.parentElement
    );

    terminalInput.value = "";
    terminalInput.focus();
}

terminalInput.addEventListener(
    "keydown",
    handleTerminalInput
);