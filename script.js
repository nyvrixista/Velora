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

    var rect = element.getBoundingClientRect();

    var maxTop = window.innerHeight - rect.height;
    var maxLeft = window.innerWidth - rect.width;

    var top = element.offsetTop;
    var left = element.offsetLeft;

    if (top < 50) {
        top = 50;
    }

    if (top > maxTop) {
        top = maxTop;
    }

    if (left < 0) {
        left = 0;
    }

    if (left > maxLeft) {
        left = maxLeft;
    }

    element.style.top = top + "px";
    element.style.left = left + "px";
}

function centerWindow(element) {
    element.style.top =
        (window.innerHeight - element.offsetHeight) / 2 + "px";

    element.style.left =
        (window.innerWidth - element.offsetWidth) / 2 + "px";
}

var welcomeScreenClose = document.querySelector("#welcomeclose");
var welcomeScreenOpen = document.querySelector("#welcomeopen");

welcomeScreenClose.addEventListener("click", function() {
    closeWindow(welcomeScreen);
});

welcomeScreenOpen.addEventListener("click", function() {
    openWindow(welcomeScreen);
    centerWindow(welcomeScreen);
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
initializeWindow("terminal");
initializeWindow("settings");
initializeWindow("notesWindow");

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
});

var settingsIcon = document.querySelector("#settingsIcon");
var settingsScreen = document.querySelector("#settings");

settingsIcon.addEventListener("click", function() {
    handleIconTap(settingsIcon);
});


settingsIcon.addEventListener("dblclick", function() {
    openWindow(settingsScreen);
});

var notesIcon = document.querySelector("#notesIcon");
var notesWindow = document.querySelector("#notesWindow");

notesIcon.addEventListener("click", function() {
    handleIconTap(notesIcon);
});

notesIcon.addEventListener("dblclick", function() {
    openWindow(notesWindow);
});

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
            echo [text] — Print text<br>
            notes - Open Notes
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
    command === "notes"
 ) {
    openWindow(notesWindow);
    output.textContent = "Opening Notes...";

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
            • Settings
            • Notes
        `;

    } else if (command === "ls") {

        output.innerHTML = `
            Desktop<br>
            Projects<br>
            Terminal<br>
            Settings<br>
            Notes
        `;

    } else if (command === "neofetch") {

        output.innerHTML = `
            <strong>VELORA</strong><br><br>
            OS: Velora WebOS<br>
            Version: 1.0<br>
            User: Catalin<br>
            Shell: Velora Terminal<br>
            Apps: 4<br>
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


var lightModeToggle = document.querySelector("#lightModeToggle");
var transparencyToggle = document.querySelector("#transparencyToggle");
var settingsStatus = document.querySelector("#settingsStatus");

lightModeToggle.checked =
    localStorage.getItem("velora-light-mode") === "true";

transparencyToggle.checked =
    localStorage.getItem("velora-transparency") !== "false";

function applyAppearanceSettings() {
    document.body.classList.toggle(
        "light-mode",
        lightModeToggle.checked
    );

    document.body.classList.toggle(
        "solid-windows",
        !transparencyToggle.checked
    );
}

function saveAppearanceSettings() {
    localStorage.setItem(
        "velora-light-mode",
        lightModeToggle.checked
    );

    localStorage.setItem(
        "velora-transparency",
        transparencyToggle.checked
    );

    applyAppearanceSettings();

    settingsStatus.textContent = "Settings saved successfully.";
}

lightModeToggle.addEventListener("change", saveAppearanceSettings);
transparencyToggle.addEventListener("change", saveAppearanceSettings);

applyAppearanceSettings();

var notesEditor = document.querySelector("#notesEditor");
var notesSaveStatus = document.querySelector("#notesSaveStatus");
var notesCharacterCount = document.querySelector("#notesCharacterCount");
var clearNotesButton = document.querySelector("#clearNotesButton");

var NOTES_STORAGE_KEY = "velora-notes";

function updateNotesCharacterCount() {
    var count = notesEditor.value.length;

    notesCharacterCount.textContent =
        count + (count === 1 ? " character" : " characters");
}

function loadNotes() {
    try {
        notesEditor.value =
            localStorage.getItem(NOTES_STORAGE_KEY) || "";

        notesSaveStatus.textContent = "Saved locally";
    } catch (error) {
        notesSaveStatus.textContent = "Local storage unavailable";
    }

    updateNotesCharacterCount();
}

function saveNotes() {
    try {
        localStorage.setItem(
            NOTES_STORAGE_KEY,
            notesEditor.value
        );

        notesSaveStatus.textContent = "Saved locally";
    } catch (error) {
        notesSaveStatus.textContent = "Could not save notes";
    }

    updateNotesCharacterCount();
}

notesEditor.addEventListener("input", saveNotes);

clearNotesButton.addEventListener("click", function() {
    if (notesEditor.value.length === 0) {
        return;
    }

    var confirmed = confirm("Clear all your saved notes?");

    if (!confirmed) {
        return;
    }

    notesEditor.value = "";
    saveNotes();
    notesEditor.focus();
});

loadNotes();

var taskbarApps = document.querySelector("#taskbarApps");
var taskbarClock = document.querySelector("#taskbarClock");

var taskbarAppList = [
    { id: "projects", name: "Projects", icon: "projectsIcon" },
    { id: "terminal", name: "Terminal", icon: "terminalIcon" },
    { id: "settings", name: "Settings", icon: "settingsIcon" },
    { id: "notesWindow", name: "Notes", icon: "notesIcon" }
];

var taskbarButtons = {};

taskbarAppList.forEach(function(app) {
    var button = document.createElement("button");
    button.type = "button";
    button.className = "taskbar-app";
    button.title = app.name;
    button.setAttribute("aria-label", app.name);

    var iconElement = document.querySelector(
        "#" + app.icon + " img"
    );

    if (iconElement) {
        var image = document.createElement("img");
        image.className = "taskbar-app-icon";
        image.src = iconElement.src;
        image.alt = "";
        button.appendChild(image);
    }

    var label = document.createElement("span");
    label.className = "taskbar-app-label";
    label.textContent = app.name;
    button.appendChild(label);

    button.addEventListener("click", function() {
        var targetWindow = document.getElementById(app.id);

        if (targetWindow) {
            openWindow(targetWindow);
            updateTaskbar();
        }
    });

    taskbarApps.appendChild(button);
    taskbarButtons[app.id] = button;
});

function updateTaskbar() {
    var visibleWindows = taskbarAppList
        .map(function(app) {
            return {
                app: app,
                element: document.getElementById(app.id)
            };
        })
        .filter(function(item) {
            return item.element &&
                getComputedStyle(item.element).display !== "none";
        });

    var activeWindow = null;
    var highestZIndex = -Infinity;

    visibleWindows.forEach(function(item) {
        var zIndex = parseInt(
            getComputedStyle(item.element).zIndex,
            10
        );

        if (!Number.isFinite(zIndex)) {
            zIndex = 0;
        }

        if (zIndex >= highestZIndex) {
            highestZIndex = zIndex;
            activeWindow = item.element;
        }
    });

    taskbarAppList.forEach(function(app) {
        var button = taskbarButtons[app.id];
        var targetWindow = document.getElementById(app.id);

        var isOpen = targetWindow &&
            getComputedStyle(targetWindow).display !== "none";

        button.hidden = !isOpen;
        button.classList.toggle(
            "active",
            Boolean(isOpen && targetWindow === activeWindow)
        );
    });
}

function updateTaskbarClock() {
    taskbarClock.textContent = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
}

var taskbarObserver = new MutationObserver(function() {
    updateTaskbar();
});

document.querySelectorAll(".window").forEach(function(win) {
    taskbarObserver.observe(win, {
        attributes: true,
        attributeFilter: ["style"]
    });

    win.addEventListener("mousedown", function() {
        requestAnimationFrame(updateTaskbar);
    });
});

updateTaskbar();
updateTaskbarClock();
setInterval(updateTaskbarClock, 1000);


