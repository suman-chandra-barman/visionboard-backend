// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formDataConverter = (data: any) => {
  const obj = { ...data };
  const file = obj["file"];
  delete obj["file"];
  const jsonData = JSON.stringify(obj);
  const formData = new FormData();

  formData.append("data", jsonData);
  formData.append("file", file as Blob);

  return formData;
};

export default formDataConverter;
