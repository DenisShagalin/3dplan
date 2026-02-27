export async function sendEmail(data: {
  message: string;
  subject: string;
  files?: File[];
}) {
  const apiEndpoint = "/api/email";

  const formData = new FormData();
  formData.append("message", data.message);
  formData.append("subject", data.subject);

  if (data.files) {
    data.files.forEach((file) => {
      formData.append("files", file);
    });
  }

  return fetch(apiEndpoint, {
    method: "POST",
    body: formData,
  });
}
