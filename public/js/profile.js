// Function to handle form submission
const newFormHandler = async (event) => {
  event.preventDefault();

  // Get values from form inputs
  const childName = document.querySelector('#childName').value.trim();
  const childCountry = document.querySelector('#childCountry').value.trim();
  const childNiceness = document.querySelector('#childNiceness').checked;

  // Check if name and country are provided
  if (childName && childCountry) {
    console.log('Submitting form with values:', { childName, childCountry, childNiceness });

    // Make a POST request to create a new child
    try {
      const response = await fetch(`/api/children`, {
        method: 'POST',
        body: JSON.stringify({ childName, childCountry, childNiceness }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Check if the request was successful
      if (response.ok) {
        console.log('Child created successfully');
        document.location.replace('/profile');
      } else {
        console.error('Failed to create child:', response);
        alert('Failed to create child');
      }
    } catch (error) {
      console.error('Error creating child:', error);
      alert('Failed to create child');
    }
  }
};

// Function to handle delete button click
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    // Make a DELETE request to delete a child
    const response = await fetch(`/api/children/${id}`, {
      method: 'DELETE',
    });

    // Check if the request was successful
    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete child');
    }
  }
};

// Add event listeners after the DOM has loaded
document.addEventListener('DOMContentLoaded', function () {
  const newChildForm = document.querySelector('.new-child-form');
  const childList = document.querySelector('.child-list');

  if (newChildForm) {
    newChildForm.addEventListener('submit', newFormHandler);
  }

  if (childList) {
    childList.addEventListener('click', delButtonHandler);
  }
});

