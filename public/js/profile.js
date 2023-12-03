const addChildFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#child-name').value.trim();
  const country = document.querySelector('#child-country').value.trim();
  const listType = document.querySelector('input[name="child-list"]:checked').value;

  if (name && country && listType) {
    const response = await fetch('/api/children', {
      method: 'POST',
      body: JSON.stringify({ name, country, listType }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to add child');
    }
  }
};

const deleteChildHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/children/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete child');
    }
  }
};

document
  .querySelector('.new-child-form')
  .addEventListener('submit', addChildFormHandler);

document
  .querySelector('.project-list') // Make sure this selector matches your HTML structure
  .addEventListener('click', deleteChildHandler);
