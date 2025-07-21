document.addEventListener('DOMContentLoaded', () => {
  const bugForm = document.getElementById('bugForm');
  const bugList = document.getElementById('bugList');

  let bugs = [];
//Backend change
  bugForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const severity = document.getElementById('severity').value;

    if (!title || !description) return;

    const bug = {
      id: Date.now(),
      title,
      description,
      severity,
      resolved: false,
    };

    bugs.push(bug);
    renderBugs();

    bugForm.reset();
  });

  function renderBugs() {
    bugList.innerHTML = '';

    bugs.forEach(bug => {
      const bugEl = document.createElement('div');
      bugEl.classList.add('bug');
      if (bug.resolved) bugEl.classList.add('resolved');

      bugEl.innerHTML = `
        <strong>${bug.title}</strong> <span>(${bug.severity})</span>
        <p>${bug.description}</p>
        <div class="actions">
          <button onclick="toggleResolved(${bug.id})">${bug.resolved ? 'Unresolve' : 'Resolve'}</button>
          <button onclick="deleteBug(${bug.id})">Delete</button>
        </div>
      `;

      bugList.appendChild(bugEl);
    });
  }

  window.toggleResolved = function (id) {
    bugs = bugs.map(bug =>
      bug.id === id ? { ...bug, resolved: !bug.resolved } : bug
    );
    renderBugs();
  };

  window.deleteBug = function (id) {
    bugs = bugs.filter(bug => bug.id !== id);
    renderBugs();
  };
});
