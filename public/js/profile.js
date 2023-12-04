document.addEventListener('DOMContentLoaded', function () {
  const addChildFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#child-name').value.trim();
    const country = document.querySelector('#child-country').value.trim();
    const listType = document.querySelector('input[name="child-list"]:checked');

    if (name && country && listType) {
      const response = await fetch('/api/children', {
        method: 'POST',
        body: JSON.stringify({ name, country, listType: listType.value }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        document.location.replace('/profile');
      } else {
        const errorMessage = await response.text();
        console.error(`Failed to add child. Error: ${errorMessage}`);
        alert('Failed to add child');
      }
    }
  };

  const deleteChildHandler = async (event) => {
    if (event.target.classList.contains('btn-danger')) {
      const id = event.target.getAttribute('data-id');

      const response = await fetch(`/api/children/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        document.location.replace('/profile');
      } else {
        const errorMessage = await response.text();
        console.error(`Failed to delete child. Error: ${errorMessage}`);
        alert('Failed to delete child');
      }
    }
  };

  const projectList = document.querySelector('.project-list');
  if (projectList) {
    projectList.addEventListener('click', deleteChildHandler);
  }

  document
    .querySelector('.new-child-form')
    .addEventListener('submit', addChildFormHandler);
});
