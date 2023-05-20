export const baseUrl = 'https://northwind.vercel.app/api/products';

export const fetchProducts = async () => {
  const response = await fetch(baseUrl);
  const data = await response.json();
  return data;
};

export const addProduct = async ({name, unitPrice}: any) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({name, unitPrice}),
  });
  if (!response.ok) {
    throw new Error('Failed to add product');
  }
};

export const deleteProduct = async (id: number) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete product');
  }
};
