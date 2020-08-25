export default class Table extends HTMLElement {
  constructor() {
    super();
    const table = document.createElement('table');
    table.id = 'table';
    this.appendChild(table);

    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }

  get table() {
    return this.querySelector('#table');
  }

  handleUpdateEvent(event) {
    this.updateTable(event.detail);
    this.addButtonListeners();
  }

  addButtonListeners() {
    const deleteBtn = this.table.querySelectorAll('.delete-btn');
    const editBtn = this.table.querySelectorAll('.edit-btn');

    deleteBtn.forEach(btn => btn.addEventListener('click', this.onDelete));
    editBtn.forEach(btn => btn.addEventListener('click', this.onEdit));
  }

  onDelete(e) {
    const id = e.target.getAttribute('data-id');
    const deleteEvent = new CustomEvent('character-deleted', {
      detail: id
    });
    this.dispatchEvent(deleteEvent);
  }

  onEdit(e) {
    const id = e.target.getAttribute('data-id');
    const editEvent = new CustomEvent('character-edited', {
      detail: id
    });
    this.dispatchEvent(editEvent);
  }

  updateTable(characters = []) {
    this.table.innerHTML = `
      <thead>
        <tr>
          <th>Name</th>
          <th>Job</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${characters
          .map((character, index) => {
            return `
            <tr>
              <td>${character.name}</td>
              <td>${character.job}</td>
              <td>
                <button data-id="${character.id}" class="delete-btn" >Delete</button>
                <button data-id="${character.id}" class="edit-btn" >Edit</button>
              </td>
          </tr>
          `;
          })
          .join('')}
      </tbody>
    `;
  }

  connectedCallback() {
    this.addEventListener('characters-updated', this.handleUpdateEvent);
  }
}

customElements.define('crud-table', Table);
