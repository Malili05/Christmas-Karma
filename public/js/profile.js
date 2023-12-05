document.addEventListener('DOMContentLoaded', function () {
  const addChildFormHandler = async (event) => {
    event.preventDefault();

    const child_name = document.querySelector('#child-name').value.trim();
    const country = document.querySelector('#child-country').value.trim();
    const listType = document.querySelector('input[name="child-list"]:checked');

    console.log('Form Data:', { child_name, country, listType });

    if (child_name && country && listType) {
      try {
        const response = await fetch('/api/child', {
          method: 'POST',
          body: JSON.stringify({ child_name, country, naughtyNice: listType.value === 'nice' }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('Response:', response);

        if (response.ok) {
          document.location.replace('/profile');
        } else {
          const errorMessage = await response.text();
          console.error(`Failed to add child. Error: ${errorMessage}`);
          alert('Failed to add child');
        }
      } catch (error) {
        console.error('Error during fetch:', error);
        alert('Failed to add child');
      }
    }
  };

  const deleteChildHandler = async (event) => {
    if (event.target.classList.contains('btn-danger')) {
      const id = event.target.getAttribute('data-id');

      console.log('Deleting Child with ID:', id);

      try {
        const response = await fetch(`/api/child/${id}`, {
          method: 'DELETE',
        });

        console.log('Delete Response:', response);

        if (response.ok) {
          document.location.replace('/profile');
        } else {
          const errorMessage = await response.text();
          console.error(`Failed to delete child. Error: ${errorMessage}`);
          alert('Failed to delete child');
        }
      } catch (error) {
        console.error('Error during fetch:', error);
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
