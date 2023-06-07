let currentEditor = null; // Track the currently open editor instance
let company_id = null
let filename = null

document.addEventListener('DOMContentLoaded', function() {
    fetch(`/api/staticdata?filename=company_id`)
    .then(response => response.json())
    .then(data => {
      company_id = data.company_id
    })
    .catch(error => {
      console.log('Error:', error);
    });

    
    const url = new URL(window.location.href);
    const editMode = url.searchParams.get('edit');
  
    if (editMode !== 'true') {
      console.log('Edit mode is enabled.');
      return;
    }

    setTimeout(() => {
      const editableComponents = document.getElementsByClassName('editable-component');
  
      for (let i = 0; i < editableComponents.length; i++) {
        const element = editableComponents[i];
        const editButton = createEditButton();
        element.appendChild(editButton);
  
        editButton.addEventListener('click', function() {
          const parentComponent = editButton.parentElement;
          const dataValue = parentComponent.getAttribute('data-json');
  
          filename = dataValue

          fetch(`/api/staticdata?filename=${encodeURIComponent(dataValue)}`)
            .then(response => response.json())
            .then(data => {
              renderEditingInterface(data);
              console.log(data);
            })
            .catch(error => {
              console.log('Error:', error);
            });
  
          console.log(dataValue);
        });
      }
    }, 1000);
  });
  
  function createEditButton() {
    const editButton = document.createElement('button');
    editButton.innerText = 'Edit';
  
    editButton.style.position = 'absolute';
    editButton.style.top = '5px';
    editButton.style.left = '50%';
    editButton.style.transform = 'translateX(-50%)';
  
    editButton.style.backgroundImage = 'linear-gradient(45deg, #00c4ff, #2f75ff, #ff2b58)';
    editButton.style.backgroundSize = '200% 200%';
    editButton.style.animation = 'gradientAnimation 4s ease infinite';
  
    editButton.style.color = '#FFFFFF';
    editButton.style.border = 'none';
    editButton.style.borderRadius = '4px';
    editButton.style.padding = '8px 16px';
    editButton.style.fontSize = '14px';
  
    return editButton;
  }
  
  function renderEditingInterface(data, level = 0) {
    closeEditingInterface(); // Close any previously open editor

    const sidebar = createSidebar();
    const closeButton = createCloseButton();
    const saveButton = createSaveButton();
    currentEditor = sidebar; // Set the current editor to the newly rendered one

  
    document.body.appendChild(sidebar);
    sidebar.appendChild(closeButton);
    sidebar.appendChild(saveButton);
  
    for (const key in data) {
      const value = data[key];
      const inputContainer = createInputContainer(level);
  
      if (Array.isArray(value)) {
        // Handle arrays
        inputContainer.appendChild(createLabel(key));

        for (let i = 0; i < value.length; i++) {
            const arrayValue = value[i];
        
            const arrayInputContainer = createArrayInputContainer((level + 1) * 20);

            if (typeof arrayValue === 'object' && arrayValue !== null) {
                for (const nestedKey in arrayValue) {
                    const value = arrayValue[nestedKey];

                    const arrayIndexLabel = createArrayIndexLabel(i);

                    
                    const inputContainer = createInputContainer(level);       
                    arrayInputContainer.appendChild(arrayIndexLabel);
        
                    const textarea = createTextarea(value);
                    inputContainer.appendChild(createLabel(key + '.' + i + '.' + nestedKey));
                    inputContainer.appendChild(textarea);
                    arrayInputContainer.appendChild(inputContainer);
            
                }
            } else {
                const arrayValueInput = document.createElement('input');
                arrayValueInput.type = 'text';
                arrayValueInput.value = value;
                arrayInputContainer.appendChild(arrayValueInput);
            }
            
            inputContainer.appendChild(arrayInputContainer);
            
        }
      } else if (typeof value === 'object' && value !== null) {
        const nestedInputContainer = createNestedInputContainer();
        const nestedLabel = createNestedLabel(key);
  
        nestedInputContainer.appendChild(nestedLabel);
        inputContainer.appendChild(nestedInputContainer);
  
        renderEditingInterface(value, level + 1);
      } else {
        const textarea = createTextarea(value);
        inputContainer.appendChild(createLabel(key));
        inputContainer.appendChild(textarea);
      }
  
      sidebar.appendChild(inputContainer);
    }
  
    closeButton.addEventListener('click', function() {
      sidebar.remove();
    });
  }
  
  function createSidebar() {
    const sidebar = document.createElement('div');
    sidebar.classList.add('editing-interface');
  
    sidebar.style.position = 'fixed';
    sidebar.style.top = '0';
    sidebar.style.right = '0';
    sidebar.style.width = '600px';
    sidebar.style.height = '100%';
    sidebar.style.backgroundColor = '#F5F5F7';
    sidebar.style.zIndex = '9999';
    sidebar.style.overflowY = 'scroll';
    sidebar.style.padding = '20px';
    sidebar.style.fontFamily = "'Helvetica', sans-serif";
    sidebar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
  
    return sidebar;
  }
  
  function createCloseButton() {
    const closeButton = document.createElement('button');
    closeButton.innerText = '✕';
  
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.style.fontSize = '24px';
    closeButton.style.backgroundColor = 'transparent';
    closeButton.style.border = 'none';
    closeButton.style.cursor = 'pointer';
  
    return closeButton;
  }
  
  function createSaveButton() {
    const saveButton = document.createElement('button');
    saveButton.innerText = 'Save';
    saveButton.style.backgroundColor = '#007AFF';
    saveButton.style.color = '#FFFFFF';
    saveButton.style.border = 'none';
    saveButton.style.borderRadius = '4px';
    saveButton.style.padding = '8px 16px';
    saveButton.style.marginTop = '20px';
    saveButton.style.cursor = 'pointer';
  
    saveButton.addEventListener('click', saveChanges);
  
    return saveButton;
  }
  
  function createInputContainer(level) {
    const inputContainer = document.createElement('div');
  
    inputContainer.style.marginBottom = '16px';
    inputContainer.style.paddingLeft = `${level}px`;
  
    return inputContainer;
  }
  
  function createArrayInputContainer(paddingLeft) {
    const arrayInputContainer = document.createElement('div');
    arrayInputContainer.style.display = 'flex';
    arrayInputContainer.style.marginBottom = '16px';
    arrayInputContainer.style.paddingLeft = `${paddingLeft}px`; // Indent nested array values
  
    return arrayInputContainer;
  }

  function createNestedInputContainer() {
    const nestedInputContainer = document.createElement('div');
    nestedInputContainer.style.marginBottom = '16px';
  
    return nestedInputContainer;
  }
  
  function createArrayValueInput(data, sidebar, level) {
    if (typeof data === 'object' && data !== null) {
        for (const key in data) {
            const value = data[key];
            const inputContainer = createInputContainer(level);       

            const textarea = createTextarea(value);
            inputContainer.appendChild(createLabel(key));
            inputContainer.appendChild(textarea);
    
            sidebar.appendChild(inputContainer);
        }
    } else {
        const arrayValueInput = document.createElement('input');
        arrayValueInput.type = 'text';
        arrayValueInput.value = value;
      
        return arrayValueInput;
    }
  }
  
  function createArrayIndexLabel(index) {
    const arrayIndexLabel = document.createElement('label');
    arrayIndexLabel.innerText = `${index}:`;
    arrayIndexLabel.style.marginRight = '8px';
  
    return arrayIndexLabel;
  }
  
  function createArrayTextarea(value) {
    const arrayTextarea = document.createElement('textarea');
    arrayTextarea.value = value;
    arrayTextarea.style.width = '100%';
    arrayTextarea.style.height = '80px';
    arrayTextarea.style.padding = '8px';
    arrayTextarea.style.border = '1px solid #D9D9DC';
    arrayTextarea.style.borderRadius = '4px';
    arrayTextarea.style.resize = 'vertical';
  
    return arrayTextarea;
  }

  
  function createNestedLabel(key) {
    const nestedLabel = document.createElement('label');
    nestedLabel.innerText = `${key}:`;
    nestedLabel.style.fontWeight = 'bold';
  
    return nestedLabel;
  }
  
  function createTextarea(value) {
    const textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.style.width = '100%';
    textarea.style.height = '80px';
    textarea.style.padding = '8px';
    textarea.style.border = '1px solid #D9D9DC';
    textarea.style.borderRadius = '4px';
    textarea.style.resize = 'vertical';
  
    return textarea;
  }
  
  function createLabel(key) {
    const label = document.createElement('label');
    label.innerText = `${key}:`;
    label.style.fontWeight = 'bold';
  
    return label;
  }
  
  function closeEditingInterface() {
    if (currentEditor) {
      currentEditor.remove();
      currentEditor = null;
    }
  }
  
  function saveChanges() {
  const sidebar = document.querySelector('.editing-interface');
  const inputs = sidebar.querySelectorAll('input, textarea');

  const updatedData = {};

  inputs.forEach(input => {
    const keyElement = input.previousElementSibling;
    if (keyElement) {
      const key = keyElement.innerText.slice(0, -1);
      const value = input.value;

      // Handle nested objects or arrays
      const path = key.split('.');
      
      let obj = updatedData;

      for (let i = 0; i < path.length; i++) {
        const pathKey = path[i];
        if (i === path.length - 1) {
          obj[pathKey] = value;
        } else {
          if (!obj[pathKey]) {
            obj[pathKey] = !isNaN(path[i + 1]) ? [] : {};
          }
          console.log('hi');
          
          obj = obj[pathKey];
        }
      }
    }
  });

  // Send the response to the server
  fetch('http://localhost:8080/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        company_id: company_id,
        filename: filename,
        data: updatedData
    }),
  })
  .then(response => response.json())
  .then(data => {
    // Handle the response from the server
    console.log('Server response:', data);
  })
  .catch(error => {
    // Handle any errors during the request
    console.log('Error:', error);
  });
}
  