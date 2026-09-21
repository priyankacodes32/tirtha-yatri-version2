import api from './axios.js';

// Both endpoints take multipart/form-data under the "file" field and return
// { success, data: { url } } — url is already fully-qualified and ready to
// drop straight into an image/video field.

export function uploadImage(file, onProgress) {
  const formData = new FormData();
  formData.append('file', file);
  return api
    .post('/uploads/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: onProgress
        ? (evt) => onProgress(evt.total ? Math.round((evt.loaded / evt.total) * 100) : 0)
        : undefined,
    })
    .then((res) => res.data);
}

export function uploadVideo(file, onProgress) {
  const formData = new FormData();
  formData.append('file', file);
  return api
    .post('/uploads/video', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: onProgress
        ? (evt) => onProgress(evt.total ? Math.round((evt.loaded / evt.total) * 100) : 0)
        : undefined,
    })
    .then((res) => res.data);
}
