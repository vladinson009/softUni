window.addEventListener('load', solve);

function solve() {
  // <INPUT> ELEMENTS
  const snowmanNameInput = document.getElementById('snowman-name');
  const snowmanHeightInput = document.getElementById('snowman-height');
  const snowmanLocationInput = document.getElementById('location');
  const snowmanCreatorNameInput = document.getElementById('creator-name');
  const snowmanSpecialAttribute = document.getElementById('special-attribute');

  // SNOWMAN CONTAINERS
  const snowmanPreview = document.querySelector('.snowman-preview');
  const snowmanList = document.querySelector('.snow-list');
  const main = document.getElementById('hero');
  const body = document.querySelector('.body');
  const backImg = document.getElementById('back-img');

  // ADD <BUTTON> ELEMENT
  const addBtn = document.querySelector('.add-btn');
  addBtn.addEventListener('click', onAdd);

  // ADD EVENT LISTENER FUNCTION
  function onAdd(e) {
    e.preventDefault();
    const snowman = {
      name: snowmanNameInput.value.trim(),
      height: snowmanHeightInput.value.trim(),
      location: snowmanLocationInput.value.trim(),
      creatorName: snowmanCreatorNameInput.value.trim(),
      specialAttribute: snowmanSpecialAttribute.value.trim(),
    };
    if (
      !snowman.name ||
      !snowman.height ||
      !snowman.location ||
      !snowman.creatorName ||
      !snowman.specialAttribute
    ) {
      return;
    }
    // CREATE <LI> ELEMENT AND ADD CLASS TO IT
    const liInfo = document.createElement('li');
    liInfo.className = 'snowman-info';

    //CREATE <ARTICLE> AND <P> ELEMENTS
    const article = document.createElement('article');
    const pName = document.createElement('p');
    const pHeight = document.createElement('p');
    const pLocation = document.createElement('p');
    const pCreatorName = document.createElement('p');
    const pSpecialAttribute = document.createElement('p');

    // ADD TEXT CONTENT FOR ALL OF <P> ELEMENTS
    pName.textContent = `Name: ${snowman.name}`;
    pHeight.textContent = `Height: ${snowman.height}`;
    pLocation.textContent = `Location: ${snowman.location}`;
    pCreatorName.textContent = `Creator: ${snowman.creatorName}`;
    pSpecialAttribute.textContent = `Attribute: ${snowman.specialAttribute}`;

    // CREATE <DIV> CONTAINER AND ADD 2 <BUTTON> IN IT
    const btnContainer = document.createElement('div');
    const editBtn = document.createElement('button');
    const nextBtn = document.createElement('button');

    editBtn.className = 'edit-btn';
    editBtn.textContent = 'Edit';

    nextBtn.className = 'next-btn';
    nextBtn.textContent = 'Next';

    // APPEND CHILDREN IN CORRECT ORDER
    article.appendChild(pName);
    article.appendChild(pHeight);
    article.appendChild(pLocation);
    article.appendChild(pCreatorName);
    article.appendChild(pSpecialAttribute);

    btnContainer.appendChild(editBtn);
    btnContainer.appendChild(nextBtn);

    liInfo.appendChild(article);
    liInfo.appendChild(btnContainer);
    snowmanPreview.appendChild(liInfo);

    // CLEAR THE <INPUT> FIELDS AND DISABLE ADD <BUTTON>
    snowmanNameInput.value = '';
    snowmanHeightInput.value = '';
    snowmanLocationInput.value = '';
    snowmanCreatorNameInput.value = '';
    snowmanSpecialAttribute.value = '';
    addBtn.disabled = true;

    // ADD FUNCTIONALITY TO EDIT AND NEXT <BUTTON>
    editBtn.addEventListener('click', onEdit);
    nextBtn.addEventListener('click', onNext);

    function onEdit() {
      snowmanNameInput.value = snowman.name;
      snowmanHeightInput.value = snowman.height;
      snowmanLocationInput.value = snowman.location;
      snowmanCreatorNameInput.value = snowman.creatorName;
      snowmanSpecialAttribute.value = snowman.specialAttribute;
      addBtn.disabled = false;
      liInfo.remove();
    }
    function onNext() {
      const liContent = document.createElement('li');
      const sendBtn = document.createElement('button');

      liContent.className = 'snowman-content';
      sendBtn.className = 'send-btn';
      sendBtn.textContent = 'Send';

      liContent.appendChild(article);
      article.appendChild(sendBtn);
      snowmanList.appendChild(liContent);
      liInfo.remove();
      // END OF EDIT AND NEXT <BUTTON> FUNCTIONALITY

      sendBtn.addEventListener('click', onSend);

      function onSend() {
        main.remove();
        backImg.hidden = false;

        // CREATE BACK <BUTTON> AND APPEND IT TO <BODY>
        const backBtn = document.createElement('button');
        backBtn.className = 'back-btn';
        backBtn.textContent = 'Back';
        body.appendChild(backBtn);
        backBtn.addEventListener('click', onBack);

        function onBack() {
          window.location.reload();
        }
      }
    }
  }
}
