const MAP_SIZE = 300;
const TILE_SIZE = 20;
const TILE_GAP = 2;
const GRID_PADDING = 10;
const MAX_LEVEL = 4;
const FOREST_PATCH_COUNT = 160;
const ROCK_PATCH_COUNT = 130;
const MEADOW_PATCH_COUNT = 320;
const MIN_ZOOM_COVER = 1.01;
const MAX_ZOOM = 2.35;
const CELEBRATION_CLOSE_MS = 180;

const stage = document.querySelector("#worldStage");
const grid = document.querySelector("#worldGrid");
const courseList = document.querySelector("#courseList");
const mapHud = document.querySelector("#mapHud");
const collapseHudButton = document.querySelector("#collapseHudButton");
const expandHudButton = document.querySelector("#expandHudButton");
const modeHint = document.querySelector("#modeHint");
const buildingStat = document.querySelector("#buildingStat");
const taskStat = document.querySelector("#taskStat");
const levelStat = document.querySelector("#levelStat");

const createBackdrop = document.querySelector("#createBackdrop");
const createModal = document.querySelector("#createModal");
const closeCreateButton = document.querySelector("#closeCreateButton");

const taskBackdrop = document.querySelector("#taskBackdrop");
const taskModal = document.querySelector("#taskModal");
const closeTaskButton = document.querySelector("#closeTaskButton");
const taskSubject = document.querySelector("#taskSubject");
const taskTitle = document.querySelector("#taskTitle");
const taskBody = document.querySelector("#taskBody");

const celebrationBackdrop = document.querySelector("#celebrationBackdrop");
const celebrationModal = document.querySelector("#celebrationModal");
const closeCelebrationButton = document.querySelector("#closeCelebrationButton");
const celebrationTitle = document.querySelector("#celebrationTitle");
const celebrationBody = document.querySelector("#celebrationBody");

const overviewBackdrop = document.querySelector("#overviewBackdrop");
const overviewModal = document.querySelector("#overviewModal");
const closeOverviewButton = document.querySelector("#closeOverviewButton");
const overviewBody = document.querySelector("#overviewBody");

const settingsButton = document.querySelector("#settingsButton");
const settingsBackdrop = document.querySelector("#settingsBackdrop");
const settingsModal = document.querySelector("#settingsModal");
const closeSettingsButton = document.querySelector("#closeSettingsButton");
const settingsTitle = document.querySelector("#settingsTitle");
const settingsNav = document.querySelector("#settingsNav");
const settingsPanel = document.querySelector("#settingsPanel");

const resourceBackdrop = document.querySelector("#resourceBackdrop");
const resourceModal = document.querySelector("#resourceModal");
const closeResourceButton = document.querySelector("#closeResourceButton");
const resourceType = document.querySelector("#resourceType");
const resourceTitle = document.querySelector("#resourceTitle");
const resourceBody = document.querySelector("#resourceBody");

const buildingInfoModal = document.querySelector("#buildingInfoModal");
const closeBuildingInfoButton = document.querySelector("#closeBuildingInfoButton");
const buildingInfoType = document.querySelector("#buildingInfoType");
const buildingInfoTitle = document.querySelector("#buildingInfoTitle");
const buildingInfoBody = document.querySelector("#buildingInfoBody");

const placementBar = document.querySelector("#placementBar");
const placementTitle = document.querySelector("#placementTitle");
const placementHint = document.querySelector("#placementHint");
const cancelPlacementButton = document.querySelector("#cancelPlacementButton");
const confirmPlacementButton = document.querySelector("#confirmPlacementButton");

const quizPage = document.querySelector("#quizPage");
const closeQuizButton = document.querySelector("#closeQuizButton");
const quizSubject = document.querySelector("#quizSubject");
const quizTitle = document.querySelector("#quizTitle");
const quizBody = document.querySelector("#quizBody");

const defaultHint = "Drag the map to explore. Click resources for details, or build a course from the lower-right button.";
const levelStyles = ["level-brown", "level-silver", "level-gold", "level-cyan", "level-red"];
const levelNames = ["Bronze Base", "Silver Wall", "Gold Roof", "Cyan Tower", "Red Landmark"];
const buildingStatusNames = {
  building: "Building",
  complete: "Complete",
};

const settingsSections = [
  {
    id: "sound",
    label: "Sound",
    title: "Sound Settings",
    items: [
      { type: "range", label: "Master Volume", value: 70 },
      { type: "range", label: "Sound Effects", value: 80 },
      { type: "range", label: "Music", value: 60 },
    ],
  },
  {
    id: "display",
    label: "Display",
    title: "Display Settings",
    items: [
      { type: "select", label: "Screen Mode", value: "Windowed", options: ["Windowed", "Fullscreen"] },
      { type: "toggle", label: "Reduced Motion", value: false },
      { type: "range", label: "Map Brightness", value: 80 },
    ],
  },
  {
    id: "privacy",
    label: "Privacy",
    title: "Privacy Settings",
    items: [
      { type: "toggle", label: "Save Learning Progress", value: true },
      { type: "toggle", label: "Share Class Progress", value: false },
      { type: "select", label: "Profile Visibility", value: "Teacher Only", options: ["Private", "Teacher Only", "Class"] },
    ],
  },
  {
    id: "account",
    label: "Account",
    title: "Login Information",
    items: [
      { type: "info", label: "Player", value: "Guest Learner" },
      { type: "info", label: "Login Status", value: "Not connected" },
      { type: "button", label: "Account Action", value: "Connect Account" },
    ],
  },
  {
    id: "other",
    label: "Other",
    title: "Other",
    items: [{ type: "button", label: "Credits", value: "Production Team", className: "settings-credits-button" }],
  },
];

const courses = [
  {
    id: "math",
    name: "Fraction Adventure",
    subject: "Math",
    buildingName: "Math Tower",
    icon: "M",
    footprint: { w: 4, h: 4 },
    reward: "Tower grows taller and unlocks stone paths",
    taskSets: [
      ["Learn fraction basics", "Finish 5 practice questions", "Pass the quick check"],
      ["Compare fraction sizes", "Correct missed questions", "Explain one worked example"],
      ["Practice fraction addition", "Finish mixed practice", "Clear the stage challenge"],
      ["Solve fraction word problems", "Complete a project task", "Get teacher feedback"],
      ["Write a final reflection", "Organize a knowledge card", "Unlock the showcase"],
    ],
  },
  {
    id: "reading",
    name: "Story Reading Grove",
    subject: "Reading",
    buildingName: "Reading Hall",
    icon: "R",
    footprint: { w: 3, h: 8 },
    reward: "Shelves expand and unlock flower fields",
    taskSets: [
      ["Read a short passage", "Mark key words", "Write one summary sentence"],
      ["Retell one paragraph", "Collect strong phrases", "Answer comprehension questions"],
      ["Read a long chapter", "Map character relationships", "Write reading notes"],
      ["Discuss the theme", "Create an opinion card", "Submit a reader response"],
      ["Review the full work", "Make a reading map", "Unlock the achievement hall"],
    ],
  },
  {
    id: "science",
    name: "Water Cycle Lab",
    subject: "Science",
    buildingName: "Science Lab",
    icon: "S",
    footprint: { w: 5, h: 4 },
    reward: "Lab bench upgrades and unlocks small bridges",
    taskSets: [
      ["Observe the diagram", "Complete lab notes", "Explain evaporation"],
      ["Compare rainfall patterns", "Order the process steps", "Draw the cycle"],
      ["Design a mini experiment", "Record changes", "Explain the result"],
      ["Read the extension text", "Answer application questions", "Submit an observation report"],
      ["Review the unit", "Create a concept card", "Unlock the lab exhibit"],
    ],
  },
  {
    id: "english",
    name: "Vocabulary Camp",
    subject: "English",
    buildingName: "Language Camp",
    icon: "E",
    footprint: { w: 4, h: 3 },
    reward: "Camp expands and unlocks banners",
    taskSets: [
      ["Learn 8 new words", "Finish listening matches", "Read one short paragraph aloud"],
      ["Complete spelling drills", "Dictate key words", "Finish speaking practice"],
      ["Learn phrase patterns", "Complete a dialogue", "Submit a reading recording"],
      ["Read a short article", "Answer comprehension questions", "Retell the main idea"],
      ["Review the unit", "Make vocabulary cards", "Unlock the language plaza"],
    ],
  },
  {
    id: "project",
    name: "Cross-Subject Project",
    subject: "Project",
    buildingName: "Project Workshop",
    icon: "P",
    footprint: { w: 6, h: 5 },
    reward: "Workshop expands and unlocks a display stage",
    taskSets: [
      ["Choose a project topic", "Break down project steps", "Submit a plan"],
      ["Collect resources", "Finish a draft", "Hold one discussion"],
      ["Create the project work", "Complete a mid-point check", "Record revision notes"],
      ["Finish the final work", "Prepare display notes", "Run a rehearsal"],
      ["Present the result", "Collect feedback", "Write a reflection"],
    ],
  },
];

const terrainInfo = {
  grass: {
    title: "Grass",
    type: "Buildable Land",
    icon: ".",
    description: "The basic buildable area for course buildings and future decorations.",
  },
  "grass-alt": {
    title: "Light Grass",
    type: "Buildable Land",
    icon: ".",
    description: "Flat learning ground that can hold new course buildings.",
  },
  meadow: {
    title: "Meadow",
    type: "Decorative Terrain",
    icon: "*",
    description: "A naturally generated decorative patch. It cannot be built on directly, but gives the town a cared-for feeling.",
  },
  dirt: {
    title: "Dirt",
    type: "Buildable Land",
    icon: "#",
    description: "A practical area suited to workshops, labs, and project buildings.",
  },
  sand: {
    title: "Sand",
    type: "Buildable Land",
    icon: ":",
    description: "Land near water. Later it could support bridges, docks, or exploration courses.",
  },
  water: {
    title: "Water",
    type: "Natural Resource",
    icon: "~",
    description: "Water cannot be built on directly. It adds boundaries and exploration, and could later unlock bridges or waterside buildings.",
  },
  forest: {
    title: "Forest",
    type: "Natural Resource",
    icon: "T",
    description: "Each tree occupies a 2 by 2 area. Forest blocks construction and can become a future collection or decoration resource.",
  },
  hill: {
    title: "Hill",
    type: "Natural Resource",
    icon: "^",
    description: "High ground that cannot be built on. It could later hold challenges, milestones, or map expansion gates.",
  },
  rock: {
    title: "Rock",
    type: "Natural Resource",
    icon: "o",
    description: "A hard resource that blocks construction. Later it could be cleared, unlocked, or converted into materials.",
  },
};

let terrainMap = [];
let tileCache = [];
let placedBuildings = [];
let selectedCourse = null;
let activeBuildingId = null;
let previewCells = [];
let placementDraftCells = [];
let selectedResourceCells = [];
let placementDraft = null;
let pan = { x: 0, y: 0 };
let zoom = 1;
let dragState = null;
let pinchState = null;
let activePointers = new Map();
let suppressNextTileClick = false;
let panFrame = null;
let pendingCelebrationBuildingId = null;
let celebrationClosing = false;
let activeQuiz = null;
let activeSettingsSection = settingsSections[0].id;
let placementErrorTimer = null;

function init() {
  terrainMap = buildTerrainMap();
  renderGrid();
  renderCourses();
  bindControls();
  centerMap();
  updateHud();
}

function bindControls() {
  document.querySelector("#createBuildingButton").addEventListener("click", openCreateModal);
  document.querySelector("#taskOverviewButton").addEventListener("click", openOverviewModal);
  collapseHudButton.addEventListener("click", collapseMapHud);
  expandHudButton.addEventListener("click", expandMapHud);
  closeCreateButton.addEventListener("click", closeCreateModal);
  createBackdrop.addEventListener("click", closeCreateModal);
  closeTaskButton.addEventListener("click", closeTaskModal);
  taskBackdrop.addEventListener("click", closeTaskModal);
  closeCelebrationButton.addEventListener("click", closeCelebrationModal);
  celebrationBackdrop.addEventListener("click", closeCelebrationModal);
  closeOverviewButton.addEventListener("click", closeOverviewModal);
  overviewBackdrop.addEventListener("click", closeOverviewModal);
  settingsButton.addEventListener("click", openSettingsModal);
  closeSettingsButton.addEventListener("click", closeSettingsModal);
  settingsBackdrop.addEventListener("click", closeSettingsModal);
  closeResourceButton.addEventListener("click", closeResourceModal);
  resourceBackdrop.addEventListener("click", closeResourceModal);
  closeBuildingInfoButton.addEventListener("click", closeBuildingInfoModal);
  cancelPlacementButton.addEventListener("click", cancelPlacement);
  confirmPlacementButton.addEventListener("click", confirmPlacement);
  closeQuizButton.addEventListener("click", closeQuizPage);

  stage.addEventListener("pointerdown", startMapDrag);
  stage.addEventListener("pointermove", moveMapDrag);
  stage.addEventListener("pointerup", endMapDrag);
  stage.addEventListener("pointercancel", endMapDrag);
  stage.addEventListener("wheel", handleWheelZoom, { passive: false });
  grid.addEventListener("pointerover", handleGridPointerOver);
  grid.addEventListener("pointerout", handleGridPointerOut);
  grid.addEventListener("click", handleGridClick);
  window.addEventListener("resize", clampAndApplyPan);

  window.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    closeCreateModal();
    closeTaskModal();
    closeCelebrationModal();
    closeOverviewModal();
    closeSettingsModal();
    closeResourceModal();
    closeBuildingInfoModal();
    closeQuizPage();
    cancelPlacement();
  });
}

function collapseMapHud() {
  mapHud.classList.add("is-collapsed");
  expandHudButton.hidden = false;
}

function expandMapHud() {
  mapHud.classList.remove("is-collapsed");
  expandHudButton.hidden = true;
}

function openCreateModal() {
  closeBuildingInfoModal();
  renderCourses();
  createBackdrop.hidden = false;
  createModal.hidden = false;
}

function closeCreateModal() {
  createBackdrop.hidden = true;
  createModal.hidden = true;
}

function openTaskModal(building) {
  activeBuildingId = building.id;
  taskBackdrop.hidden = false;
  taskModal.hidden = false;
  renderTaskModal(building);
}

function closeTaskModal() {
  taskBackdrop.hidden = true;
  taskModal.hidden = true;
}

function openCelebrationModal(building, completedLevel, wasInitialBuild) {
  pendingCelebrationBuildingId = building.id;
  celebrationClosing = false;
  celebrationModal.classList.remove("closing");
  celebrationBackdrop.classList.remove("closing");
  celebrationTitle.textContent = wasInitialBuild ? "Build Complete" : "Upgrade Complete";
  celebrationBody.innerHTML = `
    <section class="celebration-body">
      <div class="celebration-badge ${levelStyles[completedLevel]}">${building.course.icon}</div>
      <div>
        <h3>${building.course.buildingName} L${completedLevel + 1}</h3>
        <p class="quiet">${wasInitialBuild ? "You finished the first learning tasks. The building is now complete." : "You finished the upgrade tasks. The building has reached its next level."}</p>
      </div>
      <div class="celebration-actions">
        <button class="primary-button confirm-button" id="celebrationContinueButton" type="button">View Building</button>
      </div>
    </section>
  `;
  celebrationBackdrop.hidden = false;
  celebrationModal.hidden = false;
  celebrationBody.querySelector("#celebrationContinueButton").addEventListener("click", closeCelebrationModal);
}

function closeCelebrationModal() {
  if (celebrationModal.hidden || celebrationClosing) return;
  celebrationClosing = true;
  celebrationModal.classList.add("closing");
  celebrationBackdrop.classList.add("closing");

  setTimeout(() => {
    celebrationBackdrop.hidden = true;
    celebrationModal.hidden = true;
    celebrationModal.classList.remove("closing");
    celebrationBackdrop.classList.remove("closing");
    celebrationClosing = false;

    const building = pendingCelebrationBuildingId ? getBuilding(pendingCelebrationBuildingId) : null;
    pendingCelebrationBuildingId = null;
    if (building) openBuildingInfoModal(building);
  }, CELEBRATION_CLOSE_MS);
}

function openOverviewModal() {
  overviewBackdrop.hidden = false;
  overviewModal.hidden = false;
  renderOverviewModal();
}

function closeOverviewModal() {
  overviewBackdrop.hidden = true;
  overviewModal.hidden = true;
}

function openSettingsModal() {
  closeCreateModal();
  closeTaskModal();
  closeOverviewModal();
  closeResourceModal();
  closeBuildingInfoModal();
  closeQuizPage();
  renderSettingsModal();
  settingsBackdrop.hidden = false;
  settingsModal.hidden = false;
}

function closeSettingsModal() {
  settingsBackdrop.hidden = true;
  settingsModal.hidden = true;
}

function renderSettingsModal() {
  const section = settingsSections.find((item) => item.id === activeSettingsSection) || settingsSections[0];
  settingsTitle.textContent = section.title;
  settingsNav.innerHTML = settingsSections
    .map(
      (item) => `
        <button class="settings-tab ${item.id === section.id ? "active" : ""}" type="button" data-settings-section="${item.id}">
          ${item.label}
        </button>
      `,
    )
    .join("");
  settingsPanel.innerHTML = `
    <div class="settings-list">
      ${section.items.map((item) => renderSettingsItem(item)).join("")}
    </div>
  `;

  settingsNav.querySelectorAll(".settings-tab").forEach((button) => {
    button.addEventListener("click", () => {
      activeSettingsSection = button.dataset.settingsSection;
      renderSettingsModal();
    });
  });
  settingsPanel.querySelectorAll(".settings-range").forEach((input) => {
    input.addEventListener("input", () => {
      input.closest(".settings-row")?.querySelector("[data-setting-label]")?.replaceChildren(`${input.dataset.label}: ${input.value}`);
    });
  });
}

function renderSettingsItem(item) {
  if (item.type === "toggle") {
    return `
      <label class="settings-row">
        <span>${item.label}</span>
        <input class="settings-toggle" type="checkbox" ${item.value ? "checked" : ""} />
      </label>
    `;
  }

  if (item.type === "range") {
    const value = item.value;
    return `
      <label class="settings-row settings-row-stack">
        <span data-setting-label>${item.label}: ${value}</span>
        <input class="settings-range" type="range" min="0" max="100" value="${value}" data-label="${item.label}" />
      </label>
    `;
  }

  if (item.type === "select") {
    return `
      <label class="settings-row">
        <span>${item.label}</span>
        <select class="settings-select">
          ${item.options.map((option) => `<option ${option === item.value ? "selected" : ""}>${option}</option>`).join("")}
        </select>
      </label>
    `;
  }

  if (item.type === "button") {
    return `
      <div class="settings-row">
        <span>${item.label}</span>
        <button class="${item.className || "primary-button"}" type="button">${item.value}</button>
      </div>
    `;
  }

  return `
    <div class="settings-row">
      <span>${item.label}</span>
      <strong>${item.value}</strong>
    </div>
  `;
}

function openResourceModal(row, col) {
  const terrain = terrainMap[indexFor(row, col)];
  const info = terrainInfo[terrain] || terrainInfo.grass;
  closeBuildingInfoModal();
  selectedResourceCells = getResourceSelectionCells(row, col, terrain);
  updateResourceSelection();

  resourceType.textContent = info.type;
  resourceTitle.textContent = info.title;
  resourceBody.innerHTML = `
    <section class="resource-summary">
      <div class="resource-preview ${terrain}">${info.icon}</div>
      <div>
        <h3>${info.title}</h3>
        <p class="quiet">Location: row ${row + 1}, column ${col + 1}</p>
        <p class="quiet">${info.description}</p>
      </div>
    </section>
  `;

  resourceBackdrop.hidden = true;
  resourceModal.hidden = false;
}

function closeResourceModal() {
  resourceBackdrop.hidden = true;
  resourceModal.hidden = true;
  selectedResourceCells = [];
  updateResourceSelection();
}

function openBuildingInfoModal(building) {
  activeBuildingId = building.id;
  closeResourceModal();
  closeTaskModal();
  renderBuildingInfoModal(building);
  buildingInfoModal.hidden = false;
  renderBuildings();
}

function closeBuildingInfoModal() {
  buildingInfoModal.hidden = true;
  clearActiveBuildingSelection();
}

function clearActiveBuildingSelection() {
  if (!activeBuildingId) return;
  activeBuildingId = null;
  renderBuildings();
}

function renderBuildingInfoModal(building) {
  const displayLevel = getActiveLevel(building);
  const canUpgrade = building.status === "complete" && building.level < MAX_LEVEL;
  const isMaxLevel = building.status === "complete" && building.level === MAX_LEVEL;

  buildingInfoType.textContent = `${building.course.subject} Course Building`;
  buildingInfoTitle.textContent = building.course.buildingName;
  buildingInfoBody.innerHTML = `
    <section class="building-info-summary">
      <div class="building-info-preview ${levelStyles[displayLevel]}">${building.course.icon}</div>
      <div>
        <h3>L${displayLevel + 1} - ${levelNames[displayLevel]}</h3>
        <p class="quiet">Status: ${buildingStatusNames[building.status]}. Footprint: ${building.course.footprint.w}x${building.course.footprint.h}</p>
        <p class="quiet">${isMaxLevel ? "This building has reached the maximum level." : `Next upgrade reward: ${building.course.reward}`}</p>
      </div>
    </section>
    <section class="building-info-actions">
      <button class="upgrade-button" id="buildingInfoUpgradeButton" type="button" ${canUpgrade ? "" : "disabled"}>
        ${isMaxLevel ? "Max Level" : "Upgrade"}
      </button>
    </section>
  `;

  buildingInfoBody.querySelector("#buildingInfoUpgradeButton").addEventListener("click", () => upgradeBuilding(building.id));
}

function getResourceSelectionCells(row, col, terrain) {
  const cells = [];
  const visited = new Set();
  const queue = [{ row, col }];

  while (queue.length) {
    const current = queue.shift();
    const key = `${current.row}:${current.col}`;
    if (visited.has(key)) continue;
    visited.add(key);
    if (!isInsideMap(current.row, current.col)) continue;
    if (terrainMap[indexFor(current.row, current.col)] !== terrain) continue;

    cells.push(current);
    [
      { row: current.row - 1, col: current.col },
      { row: current.row + 1, col: current.col },
      { row: current.row, col: current.col - 1 },
      { row: current.row, col: current.col + 1 },
    ].forEach((next) => queue.push(next));
  }

  return cells;
}

function updateResourceSelection() {
  grid.querySelectorAll(".resource-outline-segment").forEach((segment) => segment.remove());
  if (!selectedResourceCells.length) return;

  const selected = new Set(selectedResourceCells.map((cell) => `${cell.row}:${cell.col}`));
  selectedResourceCells.forEach((cell) => {
    addResourceEdgeIfExposed(cell, selected, "top", cell.row - 1, cell.col);
    addResourceEdgeIfExposed(cell, selected, "right", cell.row, cell.col + 1);
    addResourceEdgeIfExposed(cell, selected, "bottom", cell.row + 1, cell.col);
    addResourceEdgeIfExposed(cell, selected, "left", cell.row, cell.col - 1);
  });
}

function addResourceEdgeIfExposed(cell, selected, side, neighborRow, neighborCol) {
  if (selected.has(`${neighborRow}:${neighborCol}`)) return;

  const segment = document.createElement("div");
  segment.className = "resource-outline-segment";
  const x = GRID_PADDING + cell.col * (TILE_SIZE + TILE_GAP);
  const y = GRID_PADDING + cell.row * (TILE_SIZE + TILE_GAP);
  const edgeSize = 4;
  const gapOffset = TILE_GAP / 2;

  if (side === "top") {
    segment.style.left = `${x - gapOffset}px`;
    segment.style.top = `${y - edgeSize / 2}px`;
    segment.style.width = `${TILE_SIZE + TILE_GAP}px`;
    segment.style.height = `${edgeSize}px`;
  }
  if (side === "right") {
    segment.style.left = `${x + TILE_SIZE - edgeSize / 2}px`;
    segment.style.top = `${y - gapOffset}px`;
    segment.style.width = `${edgeSize}px`;
    segment.style.height = `${TILE_SIZE + TILE_GAP}px`;
  }
  if (side === "bottom") {
    segment.style.left = `${x - gapOffset}px`;
    segment.style.top = `${y + TILE_SIZE - edgeSize / 2}px`;
    segment.style.width = `${TILE_SIZE + TILE_GAP}px`;
    segment.style.height = `${edgeSize}px`;
  }
  if (side === "left") {
    segment.style.left = `${x - edgeSize / 2}px`;
    segment.style.top = `${y - gapOffset}px`;
    segment.style.width = `${edgeSize}px`;
    segment.style.height = `${TILE_SIZE + TILE_GAP}px`;
  }

  grid.appendChild(segment);
}

function startMapDrag(event) {
  if (event.target.closest(".building") || event.target.closest(".modal") || event.target.closest(".fab-stack") || event.target.closest(".map-hud")) return;

  const startTile = event.target.closest(".tile");
  activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
  stage.classList.add("dragging");
  stage.setPointerCapture(event.pointerId);

  if (activePointers.size === 2) {
    startPinchZoom();
    dragState = null;
    return;
  }

  dragState = {
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    panX: pan.x,
    panY: pan.y,
    moved: false,
    tile: startTile ? { row: Number(startTile.dataset.row), col: Number(startTile.dataset.col) } : null,
  };
}

function moveMapDrag(event) {
  if (!activePointers.has(event.pointerId)) return;
  activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

  if (activePointers.size >= 2 && pinchState) {
    movePinchZoom();
    return;
  }
  if (!dragState || event.pointerId !== dragState.pointerId) return;

  const deltaX = event.clientX - dragState.startX;
  const deltaY = event.clientY - dragState.startY;
  if (Math.abs(deltaX) + Math.abs(deltaY) > 5) {
    dragState.moved = true;
    suppressNextTileClick = true;
  }

  pan.x = dragState.panX + deltaX;
  pan.y = dragState.panY + deltaY;
  scheduleApplyPan();
}

function endMapDrag(event) {
  activePointers.delete(event.pointerId);
  if (activePointers.size < 2) pinchState = null;

  if (dragState && event.pointerId === dragState.pointerId) {
    if (dragState.moved) {
      setTimeout(() => {
        suppressNextTileClick = false;
      }, 0);
    } else if (dragState.tile) {
      suppressNextTileClick = true;
      processTileAction(dragState.tile.row, dragState.tile.col);
      setTimeout(() => {
        suppressNextTileClick = false;
      }, 0);
    }
  }

  if (activePointers.size === 1) {
    const [pointerId, pointer] = activePointers.entries().next().value;
    dragState = { pointerId, startX: pointer.x, startY: pointer.y, panX: pan.x, panY: pan.y, moved: false };
    return;
  }

  if (suppressNextTileClick) {
    setTimeout(() => {
      suppressNextTileClick = false;
    }, 0);
  }
  dragState = null;
  stage.classList.remove("dragging");
}

function centerMap() {
  const rect = stage.getBoundingClientRect();
  zoom = getMinZoom();
  const mapWidth = getMapPixelSize() * zoom;
  const mapHeight = getMapPixelSize() * zoom;
  pan.x = (rect.width - mapWidth) / 2;
  pan.y = (rect.height - mapHeight) / 2;
  applyPan();
}

function clampAndApplyPan() {
  zoom = clampZoom(zoom);
  applyPan();
}

function applyPan() {
  const rect = stage.getBoundingClientRect();
  const mapWidth = getMapPixelSize() * zoom;
  const mapHeight = getMapPixelSize() * zoom;
  const minX = Math.min(0, rect.width - mapWidth);
  const minY = Math.min(0, rect.height - mapHeight);
  const maxX = Math.max(0, rect.width - mapWidth);
  const maxY = Math.max(0, rect.height - mapHeight);

  pan.x = Math.max(minX, Math.min(maxX, pan.x));
  pan.y = Math.max(minY, Math.min(maxY, pan.y));
  grid.style.transform = `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`;
}

function scheduleApplyPan() {
  if (panFrame) return;
  panFrame = requestAnimationFrame(() => {
    panFrame = null;
    applyPan();
  });
}

function getMapPixelSize() {
  return GRID_PADDING * 2 + MAP_SIZE * TILE_SIZE + (MAP_SIZE - 1) * TILE_GAP;
}

function startPinchZoom() {
  const points = [...activePointers.values()];
  const center = getPointCenter(points[0], points[1]);
  pinchState = {
    distance: getPointDistance(points[0], points[1]),
    zoom,
    worldX: (center.x - pan.x) / zoom,
    worldY: (center.y - pan.y) / zoom,
  };
  suppressNextTileClick = true;
}

function movePinchZoom() {
  const points = [...activePointers.values()];
  const center = getPointCenter(points[0], points[1]);
  const distance = getPointDistance(points[0], points[1]);
  const nextZoom = clampZoom(pinchState.zoom * (distance / pinchState.distance));
  zoomAt(center.x, center.y, nextZoom, pinchState.worldX, pinchState.worldY);
}

function handleWheelZoom(event) {
  event.preventDefault();
  const nextZoom = clampZoom(zoom * (event.deltaY > 0 ? 0.9 : 1.1));
  zoomAt(event.clientX, event.clientY, nextZoom);
}

function zoomAt(screenX, screenY, nextZoom, fixedWorldX = (screenX - pan.x) / zoom, fixedWorldY = (screenY - pan.y) / zoom) {
  zoom = nextZoom;
  pan.x = screenX - fixedWorldX * zoom;
  pan.y = screenY - fixedWorldY * zoom;
  applyPan();
}

function clampZoom(value) {
  const minZoom = getMinZoom();
  const maxZoom = Math.max(MAX_ZOOM, minZoom);
  return Math.max(minZoom, Math.min(maxZoom, value));
}

function getMinZoom() {
  const rect = stage.getBoundingClientRect();
  const mapSize = getMapPixelSize();
  return Math.max(rect.width / mapSize, rect.height / mapSize) * MIN_ZOOM_COVER;
}

function getPointCenter(a, b) {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

function getPointDistance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function buildTerrainMap() {
  const map = [];
  for (let row = 0; row < MAP_SIZE; row += 1) {
    for (let col = 0; col < MAP_SIZE; col += 1) {
      map[indexFor(row, col)] = getBaseTerrain(row, col);
    }
  }
  addRockPatches(map);
  addForestPatches(map);
  addWaterEdgeSand(map);
  addMeadowPatches(map);
  return map;
}

function getBaseTerrain(row, col) {
  const rough = terrainNoise(row, col, 0.09);
  const broad = terrainNoise(row, col, 0.032);
  const westBay =
    isNoisyEllipse(row, col, 70, 55, 42, 48, 0.18) ||
    isNoisyEllipse(row, col, 112, 70, 40, 34, 0.2) ||
    (col < 28 + Math.sin(row * 0.09) * 10 + rough * 14 && row > 32 + broad * 8 && row < 158 + Math.sin(col * 0.22) * 12 + rough * 10);
  const inlandLake = false;
  const southLagoon = isNoisyEllipse(row, col, 230, 96, 24, 34, 0.22);
  const southEastSea =
    (col > 236 + Math.sin(row * 0.06) * 15 + rough * 16 && row > 172 + broad * 12) ||
    (row > 238 + Math.sin(col * 0.05) * 14 + terrainNoise(row, col, 0.07) * 14 && col > 146 + broad * 12);
  const westRiverCol = 66 + Math.floor(Math.sin(row * 0.05 + 0.8) * 11) + Math.floor(row * 0.035) + Math.floor(terrainNoise(row, 7, 0.13) * 5);
  const centerRiverCol = 142 + Math.floor(Math.sin(row * 0.044 + 2.1) * 18) + Math.floor(row * 0.22) + Math.floor(terrainNoise(row, 19, 0.11) * 7);
  const riverToSea = row > 152 && row < 256 && Math.abs(col - centerRiverCol) <= 1 + Math.max(0, Math.floor(terrainNoise(row, col, 0.17) * 2));
  const bayRiver = row > 82 && row < 235 && Math.abs(col - westRiverCol) <= 2 + Math.max(0, Math.floor(terrainNoise(row, col, 0.15) * 2));

  if (westBay || inlandLake || southLagoon || southEastSea || riverToSea || bayRiver) return "water";
  if (isHillCountry(row, col)) return "hill";
  if (isForestCountry(row, col)) return "forest";
  if (isDirtCountry(row, col)) return "dirt";
  return (row + col) % 2 === 0 ? "grass" : "grass-alt";
}

function isEllipse(row, col, centerRow, centerCol, radiusRow, radiusCol) {
  return Math.pow((row - centerRow) / radiusRow, 2) + Math.pow((col - centerCol) / radiusCol, 2) < 1;
}

function isNoisyEllipse(row, col, centerRow, centerCol, radiusRow, radiusCol, roughness) {
  const shape = Math.pow((row - centerRow) / radiusRow, 2) + Math.pow((col - centerCol) / radiusCol, 2);
  return shape < 1 + terrainNoise(row, col, 0.075) * roughness;
}

function isHillCountry(row, col) {
  const rough = terrainNoise(row, col, 0.08);
  if (row < 24 + Math.sin(col * 0.055) * 10 + rough * 12 && col > 118 + rough * 8 && col < 258 + rough * 7) return true;
  if (row < 66 + Math.sin(col * 0.08) * 8 + rough * 10 && col > 232 + rough * 8) return true;
  if (row > 248 + Math.sin(col * 0.09) * 12 + rough * 12 && col < 72 + rough * 10) return true;
  if (row > 266 + Math.sin(col * 0.07) * 10 + rough * 10 && col < 120 + rough * 8) return true;
  return isNoisyEllipse(row, col, 68, 238, 35, 38, 0.2) || isNoisyEllipse(row, col, 252, 52, 36, 46, 0.2) || isNoisyEllipse(row, col, 24, 188, 22, 50, 0.18);
}

function isDirtCountry(row, col) {
  const rough = terrainNoise(row, col, 0.07);
  if (isNoisyEllipse(row, col, 110, 172, 30, 48, 0.24)) return true;
  if (isNoisyEllipse(row, col, 116, 214, 22, 42, 0.24)) return true;
  if (row > 206 + rough * 9 && row < 252 + rough * 7 && col > 88 + rough * 10 && col < 164 + rough * 11) return true;
  return isNoisyEllipse(row, col, 214, 126, 28, 46, 0.2) || isNoisyEllipse(row, col, 148, 198, 18, 30, 0.22);
}

function isForestCountry(row, col) {
  const rough = terrainNoise(row, col, 0.1);
  if (row > 132 + Math.sin(col * 0.12) * 8 + rough * 10 && row < 202 - Math.sin(col * 0.09) * 10 + rough * 8 && col > 18 + rough * 8 && col < 92 + rough * 10) return true;
  return isNoisyEllipse(row, col, 168, 68, 34, 46, 0.26) || isNoisyEllipse(row, col, 188, 108, 22, 28, 0.24);
}

function terrainNoise(row, col, scale) {
  const wave = Math.sin(row * scale + Math.sin(col * scale * 1.7) * 2.1) + Math.cos(col * scale * 1.3 + Math.sin(row * scale * 0.9) * 1.8);
  const speckle = Math.sin((row * 12.9898 + col * 78.233) * 0.11) * 0.35;
  return (wave + speckle) / 2.35;
}

function addMeadowPatches(map) {
  let attempts = 0;
  let patches = 0;
  while (patches < MEADOW_PATCH_COUNT && attempts < 3600) {
    attempts += 1;
    const size = Math.random() < 0.72 ? 1 : 2;
    const footprint = { w: size, h: size };
    const row = randomInt(2, MAP_SIZE - size - 2);
    const col = randomInt(2, MAP_SIZE - size - 2);
    const cells = getFootprintCells(row, col, footprint);
    if (cells.length !== size * size) continue;
    if (!cells.every((cell) => isMeadowBaseTerrain(map[indexFor(cell.row, cell.col)]))) continue;
    cells.forEach((cell) => {
      map[indexFor(cell.row, cell.col)] = "meadow";
    });
    patches += 1;
  }
}

function addRockPatches(map) {
  let attempts = 0;
  let patches = 0;
  while (patches < ROCK_PATCH_COUNT && attempts < 2600) {
    attempts += 1;
    const footprint = { w: randomInt(2, 7), h: randomInt(2, 7) };
    const row = randomInt(2, MAP_SIZE - footprint.h - 2);
    const col = randomInt(2, MAP_SIZE - footprint.w - 2);
    const cells = createConnectedPatchCells(row, col, footprint);
    if (!cells.length) continue;
    if (!cells.every((cell) => isRockBaseTerrain(map[indexFor(cell.row, cell.col)]))) continue;
    cells.forEach((cell) => {
      map[indexFor(cell.row, cell.col)] = "rock";
    });
    patches += 1;
  }
}

function createConnectedPatchCells(row, col, footprint) {
  const area = footprint.w * footprint.h;
  const targetSize = area <= 2 ? area : randomInt(2, Math.max(2, Math.ceil(area * 0.7)));
  const start = { row: row + randomInt(0, footprint.h - 1), col: col + randomInt(0, footprint.w - 1) };
  const cells = [start];
  const selected = new Set([`${start.row}:${start.col}`]);
  let attempts = 0;

  while (cells.length < targetSize && attempts < 120) {
    attempts += 1;
    const base = cells[randomInt(0, cells.length - 1)];
    const candidates = [
      { row: base.row - 1, col: base.col },
      { row: base.row + 1, col: base.col },
      { row: base.row, col: base.col - 1 },
      { row: base.row, col: base.col + 1 },
    ].filter((cell) => {
      if (cell.row < row || cell.row >= row + footprint.h) return false;
      if (cell.col < col || cell.col >= col + footprint.w) return false;
      return !selected.has(`${cell.row}:${cell.col}`);
    });
    if (!candidates.length) continue;
    const next = candidates[randomInt(0, candidates.length - 1)];
    selected.add(`${next.row}:${next.col}`);
    cells.push(next);
  }

  return cells;
}

function addForestPatches(map) {
  let attempts = 0;
  let patches = 0;
  while (patches < FOREST_PATCH_COUNT && attempts < 2600) {
    attempts += 1;
    const footprint = Math.random() < 0.68 ? { w: 2, h: 2 } : { w: 3, h: 3 };
    const row = randomInt(2, MAP_SIZE - footprint.h - 2);
    const col = randomInt(2, MAP_SIZE - footprint.w - 2);
    const cells = getFootprintCells(row, col, footprint);
    if (cells.length !== footprint.w * footprint.h) continue;
    if (!cells.every((cell) => isTreeBaseTerrain(map[indexFor(cell.row, cell.col)]))) continue;
    cells.forEach((cell) => {
      map[indexFor(cell.row, cell.col)] = "forest";
    });
    patches += 1;
  }
}

function addWaterEdgeSand(map) {
  for (let row = 0; row < MAP_SIZE; row += 1) {
    for (let col = 0; col < MAP_SIZE; col += 1) {
      const index = indexFor(row, col);
      if (["water", "forest", "hill", "rock"].includes(map[index])) continue;
      if (hasNeighborTerrain(row, col, "water", map)) map[index] = "sand";
    }
  }
}

function isTreeBaseTerrain(terrain) {
  return ["grass", "grass-alt", "dirt"].includes(terrain);
}

function isRockBaseTerrain(terrain) {
  return ["grass", "grass-alt", "dirt", "sand"].includes(terrain);
}

function isMeadowBaseTerrain(terrain) {
  return terrain === "grass" || terrain === "grass-alt";
}

function hasNeighborTerrain(row, col, terrain, map = terrainMap) {
  return [
    [row - 1, col],
    [row + 1, col],
    [row, col - 1],
    [row, col + 1],
  ].some(([nextRow, nextCol]) => isInsideMap(nextRow, nextCol) && map[indexFor(nextRow, nextCol)] === terrain);
}

function renderGrid() {
  grid.innerHTML = "";
  tileCache = new Array(MAP_SIZE * MAP_SIZE);
  grid.style.setProperty("--map-size", MAP_SIZE);
  const fragment = document.createDocumentFragment();
  for (let row = 0; row < MAP_SIZE; row += 1) {
    for (let col = 0; col < MAP_SIZE; col += 1) {
      const terrain = terrainMap[indexFor(row, col)];
      const tile = document.createElement("div");
      tile.className = `tile ${terrain}${isBuildableTerrain(terrain) ? "" : " blocked"}`;
      tile.dataset.row = String(row);
      tile.dataset.col = String(col);
      tileCache[indexFor(row, col)] = tile;
      fragment.appendChild(tile);
    }
  }
  grid.appendChild(fragment);
  renderBuildings();
}

function renderCourses() {
  courseList.innerHTML = courses
    .map((course) => {
      const taken = isCourseSubjectTaken(course);
      return `
        <button class="course-card ${taken ? "disabled" : ""}" type="button" data-course="${course.id}" ${taken ? "disabled" : ""}>
          <span class="course-icon">${course.icon}</span>
          <span>
            <h3>${course.buildingName}</h3>
            <p class="quiet">${course.name}</p>
            <span class="course-meta">
              <span class="tag">${course.subject}</span>
              <span class="tag">${course.footprint.w}x${course.footprint.h}</span>
              ${taken ? `<span class="tag">Built</span>` : ""}
            </span>
          </span>
        </button>
      `;
    })
    .join("");

  courseList.querySelectorAll(".course-card").forEach((card) => {
    card.addEventListener("click", () => {
      if (card.disabled) return;
      selectedCourse = courses.find((item) => item.id === card.dataset.course);
      placementDraft = null;
      closeResourceModal();
      closeBuildingInfoModal();
      closeCreateModal();
      modeHint.textContent = `Placing ${selectedCourse.buildingName}, ${selectedCourse.footprint.w}x${selectedCourse.footprint.h}.`;
      updatePlacementDraftHighlight();
      updatePlacementBar();
      updatePlacementAnchors();
    });
  });
}

function handleGridPointerOver(event) {
  const tile = event.target.closest(".tile");
  if (!tile || !grid.contains(tile) || tile.contains(event.relatedTarget)) return;
  if (activePointers.size > 0) return;
  previewPlacement(Number(tile.dataset.row), Number(tile.dataset.col));
}

function handleGridPointerOut(event) {
  const tile = event.target.closest(".tile");
  if (!tile || !grid.contains(tile) || tile.contains(event.relatedTarget)) return;
  clearPreview();
}

function handleGridClick(event) {
  const tile = event.target.closest(".tile");
  if (!tile || !grid.contains(tile)) return;
  handleTileClick(Number(tile.dataset.row), Number(tile.dataset.col));
}

function isCourseSubjectTaken(course) {
  return placedBuildings.some((building) => building.course.subject === course.subject);
}

function updatePlacementAnchors() {
  clearPreview();
}

function updatePlacementBar() {
  if (!selectedCourse) {
    placementBar.hidden = true;
    confirmPlacementButton.disabled = true;
    confirmPlacementButton.classList.remove("is-invalid");
    clearPlacementError();
    return;
  }

  placementBar.hidden = false;
  placementTitle.textContent = `${selectedCourse.buildingName} - ${selectedCourse.footprint.w}x${selectedCourse.footprint.h}`;

  if (!placementDraft) {
    placementHint.textContent = "Click a buildable area. You can still drag the map to adjust the view.";
    confirmPlacementButton.disabled = true;
    confirmPlacementButton.classList.remove("is-invalid");
    clearPlacementError();
    return;
  }

  placementHint.textContent = placementDraft.valid
    ? `Selected row ${placementDraft.row + 1}, column ${placementDraft.col + 1}. Ready to build.`
    : "This spot is not buildable. Choose a larger empty area.";
  confirmPlacementButton.disabled = false;
  confirmPlacementButton.classList.toggle("is-invalid", !placementDraft.valid);
  if (placementDraft.valid) clearPlacementError();
}

function updatePlacementDraftHighlight() {
  placementDraftCells.forEach((cell) => {
    getTile(cell.row, cell.col)?.classList.remove("draft-place", "draft-invalid");
  });
  placementDraftCells = [];
  if (!selectedCourse || !placementDraft) return;
  placementDraftCells = getFootprintCells(placementDraft.row, placementDraft.col, selectedCourse.footprint);
  placementDraftCells.forEach((cell) => {
    getTile(cell.row, cell.col)?.classList.add(placementDraft.valid ? "draft-place" : "draft-invalid");
  });
}

function previewPlacement(row, col) {
  clearPreview();
  if (!selectedCourse) return;
  const canPlace = canPlaceAt(row, col, selectedCourse);
  previewCells = getFootprintCells(row, col, selectedCourse.footprint);
  previewCells.forEach((cell) => {
    getTile(cell.row, cell.col)?.classList.add(canPlace ? "can-place" : "cannot-place");
  });
}

function clearPreview() {
  previewCells.forEach((cell) => {
    getTile(cell.row, cell.col)?.classList.remove("can-place", "cannot-place");
  });
  previewCells = [];
}

function handleTileClick(row, col) {
  if (suppressNextTileClick) return;
  processTileAction(row, col);
}

function processTileAction(row, col) {
  if (selectedCourse) {
    selectPlacementDraft(row, col);
    return;
  }
  const terrain = terrainMap[indexFor(row, col)];
  if (isBaseGrassTerrain(terrain)) {
    closeResourceModal();
    closeTaskModal();
    closeBuildingInfoModal();
    clearActiveBuildingSelection();
    modeHint.textContent = defaultHint;
    return;
  }
  openResourceModal(row, col);
}

function selectPlacementDraft(row, col) {
  const valid = canPlaceAt(row, col, selectedCourse);
  placementDraft = { row, col, valid };
  previewPlacement(row, col);
  modeHint.textContent = valid
    ? `Selected row ${row + 1}, column ${col + 1}. Confirm to begin construction.`
    : "This area is too small, occupied, or contains blocked terrain.";
  updatePlacementDraftHighlight();
  updatePlacementBar();
}

function confirmPlacement() {
  if (!selectedCourse || !placementDraft) return;
  if (!placementDraft.valid) {
    showPlacementError("This terrain cannot hold that building.");
    return;
  }

  clearPlacementError();
  const building = {
    id: `${selectedCourse.id}-${Date.now()}`,
    row: placementDraft.row,
    col: placementDraft.col,
    course: selectedCourse,
    level: -1,
    targetLevel: 0,
    status: "building",
    taskDone: createTaskState(selectedCourse, 0),
  };

  placedBuildings.push(building);
  selectedCourse = null;
  placementDraft = null;
  activeBuildingId = building.id;
  clearPreview();
  updatePlacementAnchors();
  updatePlacementDraftHighlight();
  updatePlacementBar();
  renderBuildings();
  renderCourses();
  updateHud();
  modeHint.textContent = "The foundation is placed. Finish the L1 learning tasks to complete the building.";
}

function renderBuildings() {
  grid.querySelectorAll(".building").forEach((node) => node.remove());
  placedBuildings.forEach((building) => {
    const node = document.createElement("button");
    const footprint = building.course.footprint;
    const displayLevel = getActiveLevel(building);
    node.type = "button";
    node.className = `building ${levelStyles[displayLevel]} ${building.status === "building" ? "constructing" : "complete-display"}${activeBuildingId === building.id ? " selected" : ""}`;
    node.style.left = `${GRID_PADDING + building.col * (TILE_SIZE + TILE_GAP)}px`;
    node.style.top = `${GRID_PADDING + building.row * (TILE_SIZE + TILE_GAP)}px`;
    node.style.width = `${footprint.w * TILE_SIZE + (footprint.w - 1) * TILE_GAP}px`;
    node.style.height = `${footprint.h * TILE_SIZE + (footprint.h - 1) * TILE_GAP}px`;
    node.setAttribute("aria-label", `${building.course.buildingName}, ${levelNames[displayLevel]}, ${buildingStatusNames[building.status]}`);
    node.innerHTML =
      building.status === "complete"
        ? `<span class="building-label">${building.course.buildingName}</span>`
        : `
          <span class="building-level">L${displayLevel + 1}</span>
          <span class="building-icon">${building.course.icon}</span>
          <span class="building-label">${building.course.buildingName}</span>
          <span class="building-status">${buildingStatusNames[building.status]}</span>
        `;
    node.addEventListener("click", (event) => {
      event.stopPropagation();
      if (suppressNextTileClick) return;
      selectedCourse = null;
      activeBuildingId = building.id;
      clearPreview();
      updatePlacementAnchors();
      if (building.status === "complete") {
        openBuildingInfoModal(building);
      } else {
        closeBuildingInfoModal();
        openTaskModal(building);
      }
      renderBuildings();
    });
    grid.appendChild(node);
  });
}

function renderTaskModal(building) {
  const tasks = getCurrentTasks(building);
  const doneCount = building.taskDone.filter(Boolean).length;
  const activeLevel = getActiveLevel(building);
  const canUpgrade = building.status === "complete" && building.level < MAX_LEVEL;
  const isMaxLevel = building.status === "complete" && building.level === MAX_LEVEL;
  const canEditTasks = building.status === "building";

  taskSubject.textContent = `${building.course.subject} Course Building`;
  taskTitle.textContent = building.course.buildingName;
  taskBody.innerHTML = `
    <section class="task-summary">
      <div class="task-building-preview ${levelStyles[activeLevel]} ${building.status === "building" ? "constructing" : ""}">${building.course.icon}</div>
      <div>
        <h3>L${activeLevel + 1} - ${levelNames[activeLevel]} - ${buildingStatusNames[building.status]}</h3>
        <p class="quiet">Footprint: ${building.course.footprint.w}x${building.course.footprint.h}. Tasks: ${doneCount}/${tasks.length}</p>
        <p class="quiet">${building.status === "building" ? "Finish every learning task to complete this level." : `Upgrade reward: ${building.course.reward}`}</p>
      </div>
    </section>
    <section class="task-list">
      ${tasks
        .map(
          (task, index) => `
            <button class="task-item task-entry ${building.taskDone[index] ? "done" : ""}" type="button" data-task-index="${index}" ${canEditTasks && !building.taskDone[index] ? "" : "disabled"}>
              <span class="star-button ${building.taskDone[index] ? "done" : ""}" aria-hidden="true">
                *
              </span>
              <span>
                <h3>${task}</h3>
                <p class="quiet">${building.taskDone[index] ? "Done" : canEditTasks ? "Open quiz to complete" : "Archived"}</p>
              </span>
            </button>
          `,
        )
        .join("")}
    </section>
    <section class="upgrade-row">
      <p class="quiet">${building.status === "building" ? "This level is under construction. Complete the learning tasks to finish it." : isMaxLevel ? "This building has reached the maximum level." : "Upgrade starts a new construction level with a new task set."}</p>
      <button class="upgrade-button" id="upgradeButton" type="button" ${canUpgrade ? "" : "disabled"}>
        ${building.status === "building" ? "Building" : isMaxLevel ? "Max Level" : "Upgrade Building"}
      </button>
    </section>
  `;

  taskBody.querySelectorAll(".task-entry").forEach((button) => {
    if (!canEditTasks) return;
    button.addEventListener("click", () => openQuizPage(building.id, Number(button.dataset.taskIndex)));
  });
  taskBody.querySelector("#upgradeButton").addEventListener("click", () => upgradeBuilding(building.id));
}

function renderOverviewModal() {
  const pendingTasks = getPendingTaskRows();
  overviewBody.innerHTML = `
    <section class="overview-hint">
      <div>
        <h3>Learning World Hints</h3>
        <p class="quiet">Drag open map space to move the view. Click a building to view its current tasks. When every task star is marked, the current build level completes. Complete buildings can be upgraded.</p>
      </div>
    </section>
    <section class="overview-list">
      ${
        pendingTasks.length
          ? pendingTasks
              .map(
                (item) => `
                  <button class="overview-item overview-task-entry" type="button" data-building-id="${item.building.id}" data-task-index="${item.index}">
                    <div>
                      <h3>${item.building.course.buildingName} - ${item.task}</h3>
                      <p class="quiet">L${getActiveLevel(item.building) + 1} building, ${item.building.course.subject}</p>
                    </div>
                    <span class="star-mark">*</span>
                  </button>
                `,
              )
              .join("")
          : `<div class="overview-item"><div><h3>No Pending Tasks</h3><p class="quiet">Build a new course, or upgrade a completed building.</p></div><span class="star-mark done">*</span></div>`
      }
    </section>
  `;

  overviewBody.querySelectorAll(".overview-task-entry").forEach((button) => {
    button.addEventListener("click", () => openQuizPage(button.dataset.buildingId, Number(button.dataset.taskIndex)));
  });
}

function getPendingTaskRows() {
  return placedBuildings.flatMap((building) => {
    if (building.status !== "building") return [];
    return getCurrentTasks(building)
      .map((task, index) => ({ building, task, index }))
      .filter((item) => !building.taskDone[item.index]);
  });
}

function openQuizPage(buildingId, taskIndex) {
  const building = getBuilding(buildingId);
  if (!building || building.status !== "building") return;
  if (building.taskDone[taskIndex]) return;

  const task = getCurrentTasks(building)[taskIndex];
  activeQuiz = {
    buildingId,
    taskIndex,
    answers: new Array(3).fill(null),
    questions: createQuizQuestions(building, task, taskIndex),
  };

  closeTaskModal();
  closeOverviewModal();
  closeResourceModal();
  closeBuildingInfoModal();
  quizPage.hidden = false;
  renderQuizPage();
}

function closeQuizPage() {
  quizPage.hidden = true;
  activeQuiz = null;
}

function renderQuizPage(result = null) {
  if (!activeQuiz) return;
  const building = getBuilding(activeQuiz.buildingId);
  if (!building) {
    closeQuizPage();
    return;
  }

  const task = getCurrentTasks(building)[activeQuiz.taskIndex];
  quizSubject.textContent = `${building.course.subject} Quiz`;
  quizTitle.textContent = task;
  quizBody.innerHTML = `
    <section class="quiz-summary">
      <div class="task-building-preview ${levelStyles[getActiveLevel(building)]}">${building.course.icon}</div>
      <div>
        <h3>${building.course.buildingName} - L${getActiveLevel(building) + 1}</h3>
        <p class="quiet">Score at least 2 of 3 to complete this task automatically.</p>
        ${result ? `<p class="quiz-result ${result.passed ? "passed" : "failed"}">${result.message}</p>` : ""}
      </div>
    </section>
    <form class="quiz-form" id="quizForm">
      ${activeQuiz.questions
        .map(
          (question, questionIndex) => `
            <fieldset class="quiz-question">
              <legend>${questionIndex + 1}. ${question.prompt}</legend>
              <div class="quiz-options">
                ${question.options
                  .map(
                    (option, optionIndex) => `
                      <label class="quiz-option ${activeQuiz.answers[questionIndex] === optionIndex ? "selected" : ""}">
                        <input type="radio" name="question-${questionIndex}" value="${optionIndex}" ${activeQuiz.answers[questionIndex] === optionIndex ? "checked" : ""} />
                        <span>${option}</span>
                      </label>
                    `,
                  )
                  .join("")}
              </div>
            </fieldset>
          `,
        )
        .join("")}
      <div class="quiz-actions">
        <button class="danger-button" id="quizBackButton" type="button">Back to Tasks</button>
        <button class="primary-button confirm-button" type="submit" ${activeQuiz.answers.includes(null) ? "disabled" : ""}>Submit Quiz</button>
      </div>
    </form>
  `;

  quizBody.querySelectorAll("input[type='radio']").forEach((input) => {
    input.addEventListener("change", () => {
      const questionIndex = Number(input.name.replace("question-", ""));
      activeQuiz.answers[questionIndex] = Number(input.value);
      renderQuizPage();
    });
  });
  quizBody.querySelector("#quizBackButton").addEventListener("click", () => {
    closeQuizPage();
    openTaskModal(building);
  });
  quizBody.querySelector("#quizForm").addEventListener("submit", (event) => {
    event.preventDefault();
    submitQuiz();
  });
}

function createQuizQuestions(building, task, taskIndex) {
  const level = getActiveLevel(building) + 1;
  const subject = building.course.subject;
  const courseName = building.course.name;
  return [
    {
      prompt: `Which course does this task belong to?`,
      options: [courseName, "Map Decoration", "Town Storage"],
      answer: 0,
    },
    {
      prompt: `What should you focus on for "${task}"?`,
      options: ["Finish the learning action", "Place more terrain", "Skip the task"],
      answer: 0,
    },
    {
      prompt: `What happens when all ${subject} tasks for L${level} are complete?`,
      options: ["The building level completes", "The map resets", "The building is deleted"],
      answer: 0,
    },
  ].map((question, index) => rotateQuestionOptions(question, taskIndex + level + index));
}

function rotateQuestionOptions(question, offset) {
  const shift = offset % question.options.length;
  const options = question.options.slice(shift).concat(question.options.slice(0, shift));
  const correctText = question.options[question.answer];
  return {
    prompt: question.prompt,
    options,
    answer: options.indexOf(correctText),
  };
}

function submitQuiz() {
  if (!activeQuiz || activeQuiz.answers.includes(null)) return;
  const score = activeQuiz.questions.reduce((sum, question, index) => sum + (activeQuiz.answers[index] === question.answer ? 1 : 0), 0);
  const passed = score >= 2;
  const buildingId = activeQuiz.buildingId;
  const taskIndex = activeQuiz.taskIndex;

  if (!passed) {
    activeQuiz.answers = new Array(activeQuiz.questions.length).fill(null);
    renderQuizPage({ passed: false, message: `Score: ${score}/3. Try again to complete this task.` });
    return;
  }

  closeQuizPage();
  completeTask(buildingId, taskIndex, score);
}

function completeTask(buildingId, taskIndex, score = null) {
  const building = getBuilding(buildingId);
  if (!building || building.status !== "building") return;
  building.taskDone[taskIndex] = true;
  const completedNow = areCurrentTasksComplete(building);
  const completedLevel = building.targetLevel;
  const wasInitialBuild = building.level < 0;
  if (completedNow) completeConstruction(building);
  renderBuildings();
  updateHud();
  modeHint.textContent = score === null ? "Task complete." : `Quiz passed with ${score}/3. Task complete.`;
  if (completedNow) {
    closeTaskModal();
    openCelebrationModal(building, completedLevel, wasInitialBuild);
    return;
  }
  openTaskModal(building);
}

function upgradeBuilding(buildingId) {
  const building = getBuilding(buildingId);
  if (!building) return;
  const canUpgrade = building.status === "complete" && building.level < MAX_LEVEL;
  if (!canUpgrade) return;

  building.status = "building";
  building.targetLevel = building.level + 1;
  building.taskDone = createTaskState(building.course, building.targetLevel);
  modeHint.textContent = `${building.course.buildingName} upgrade started. Finish L${building.targetLevel + 1} tasks to complete it.`;
  closeBuildingInfoModal();
  renderBuildings();
  openTaskModal(building);
  updateHud();
}

function createTaskState(course, level) {
  return new Array(course.taskSets[level].length).fill(false);
}

function getCurrentTasks(building) {
  return building.course.taskSets[getActiveLevel(building)];
}

function getActiveLevel(building) {
  return building.status === "building" ? building.targetLevel : building.level;
}

function areCurrentTasksComplete(building) {
  const tasks = getCurrentTasks(building);
  return building.taskDone.length === tasks.length && building.taskDone.every(Boolean);
}

function completeConstruction(building) {
  building.level = building.targetLevel;
  building.status = "complete";
  building.targetLevel = null;
  modeHint.textContent = `${building.course.buildingName} L${building.level + 1} is complete. Keep learning or upgrade it.`;
}

function canPlaceAt(row, col, course) {
  const cells = getFootprintCells(row, col, course.footprint);
  if (cells.length !== course.footprint.w * course.footprint.h) return false;
  return cells.every((cell) => {
    const terrain = terrainMap[indexFor(cell.row, cell.col)];
    return isBuildableTerrain(terrain) && !isOccupied(cell.row, cell.col);
  });
}

function getFootprintCells(row, col, footprint) {
  const cells = [];
  for (let nextRow = row; nextRow < row + footprint.h; nextRow += 1) {
    for (let nextCol = col; nextCol < col + footprint.w; nextCol += 1) {
      if (isInsideMap(nextRow, nextCol)) cells.push({ row: nextRow, col: nextCol });
    }
  }
  return cells;
}

function isOccupied(row, col) {
  return placedBuildings.some((building) => {
    const footprint = building.course.footprint;
    return row >= building.row && row < building.row + footprint.h && col >= building.col && col < building.col + footprint.w;
  });
}

function isBuildableTerrain(terrain) {
  return ["grass", "grass-alt", "dirt", "sand"].includes(terrain);
}

function isBaseGrassTerrain(terrain) {
  return terrain === "grass" || terrain === "grass-alt";
}

function getTile(row, col) {
  if (!isInsideMap(row, col)) return null;
  return tileCache[indexFor(row, col)];
}

function getBuilding(buildingId) {
  return placedBuildings.find((building) => building.id === buildingId);
}

function isInsideMap(row, col) {
  return row >= 0 && row < MAP_SIZE && col >= 0 && col < MAP_SIZE;
}

function indexFor(row, col) {
  return row * MAP_SIZE + col;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function cancelPlacement() {
  selectedCourse = null;
  placementDraft = null;
  clearPlacementError();
  clearPreview();
  updatePlacementAnchors();
  updatePlacementDraftHighlight();
  updatePlacementBar();
  modeHint.textContent = "Drag the map to explore. Use the lower-right button to build a course.";
}

function showPlacementError(message) {
  clearPlacementError();
  const toast = document.createElement("p");
  toast.className = "placement-error-toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  placementErrorTimer = setTimeout(() => {
    toast.remove();
    placementErrorTimer = null;
  }, 3000);
}

function clearPlacementError() {
  if (placementErrorTimer) {
    clearTimeout(placementErrorTimer);
    placementErrorTimer = null;
  }
  document.querySelector(".placement-error-toast")?.remove();
}

function updateHud() {
  const totalLevels = placedBuildings.reduce((sum, building) => sum + Math.max(0, building.level), 0);
  const taskDone = placedBuildings.reduce((sum, building) => sum + building.taskDone.filter(Boolean).length, 0);
  buildingStat.textContent = `${placedBuildings.length} Buildings`;
  taskStat.textContent = `${taskDone} Tasks Done`;
  levelStat.textContent = `${totalLevels} Upgrades`;
}

init();
