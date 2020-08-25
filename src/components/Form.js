export default class Form extends HTMLElement {
  constructor() {
    super();
    const form = document.createElement('form');
    form.id = 'submitForm';
    form.innerHTML = this.formTemplate();
    this.appendChild(form);
  }

  connectedCallback() {
    this.addEventListener('submit', this.onSubmit);
    this.addEventListener('edit-character', this.onEdit);
  }

  get form() {
    return this.querySelector('#submitForm');
  }

  onSubmit(event) {
    event.preventDefault();
    const id = this.querySelector('#id');
    const name = this.querySelector('#name');
    const job = this.querySelector('#job');
    if (!name.value || !job.value) return;

    const submitEvent = new CustomEvent('form-submitted', {
      detail: {
        id: id.value,
        name: name.value,
        job: job.value
      }
    });
    this.dispatchEvent(submitEvent);
    id.value = '';
    name.value = '';
    job.value = '';
  }

  onEdit(event) {
    this.form.innerHTML = this.formTemplate(
      event.detail.id,
      event.detail.name,
      event.detail.job
    );
  }

  formTemplate(id = '', name = '', job = '') {
    return `
      <input
        type="text"
        name="id"
        id="id"
        value="${id}"
        style="display: none"
      />
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        value="${name}"
        />
        <label htmlFor="job">Job</label>
        <input
        type="text"
        name="job"
        id="job"
        value="${job}"
      />
      <input id="submit" type="submit" value="Submit" />
    `;
  }
}

customElements.define('crud-form', Form);
