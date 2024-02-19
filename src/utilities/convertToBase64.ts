async function convertToBase64(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (event.target?.result) {
        resolve(event.target.result as string);
      } else {
        reject(new Error('Failed to read file'));
      }
    };

    reader.onerror = (error: ProgressEvent<FileReader>) => {
      reject(error.target?.error || new Error('Failed to read file'));
    };

    reader.readAsDataURL(file);
  });
}

export default convertToBase64;