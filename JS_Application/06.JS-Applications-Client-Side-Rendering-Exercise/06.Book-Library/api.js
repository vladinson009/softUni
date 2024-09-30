export async function getData() {
  const response = await fetch(
    'http://localhost:3030/jsonstore/collections/books'
  );
  const data = Object.entries(await response.json());
  return data;
}
export async function postData(author, title) {
  await fetch('http://localhost:3030/jsonstore/collections/books', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ author, title }),
  });
}
export async function deleteData(id) {
  await fetch('http://localhost:3030/jsonstore/collections/books/' + id, {
    method: 'delete',
  });
}
export async function editData(id, title, author) {
  const response = await fetch(
    'http://localhost:3030/jsonstore/collections/books/' + id,
    {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, author }),
    }
  );
  return await response.json();
}
