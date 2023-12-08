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

        // Play a sound when a new child is added
        const addSound = new Audio('/media/newchild.wav');

        // Listen for the 'ended' event to delay the page refresh until the sound finishes playing
        addSound.addEventListener('ended', () => {
          // Redirect to the profile page
          document.location.replace('/profile');
        });

        // Start playing the sound
        addSound.play();
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

    // Play a sound when the Delete button is clicked
    const deleteSound = new Audio('/media/kickthebaby.mp3');

    // Listen for the 'ended' event to delay the page refresh until the sound finishes playing
    deleteSound.addEventListener('ended', async () => {
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
    });

    // Start playing the sound
    deleteSound.play();
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
