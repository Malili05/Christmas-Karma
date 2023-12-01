const newFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#child-name').value.trim();
    const childLast = document.querySelector('#child-lastinital').value.trim();
    const naughtyNice = document.querySelector('#naughty-nice').value.trim();
  
    if (name && childLast && naughtyNice) {
      const response = await fetch(`/api/users/child`, {
        method: 'POST',
        body: JSON.stringify({ name, childLast, naughtyNice }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('failed to create child');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/users/child${id}`, {
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
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.child-list')
    .addEventListener('click', delButtonHandler);
  