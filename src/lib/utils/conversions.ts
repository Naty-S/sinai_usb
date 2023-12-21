
/** 
 * 
*/
export const file_to_base64 = async function(file: File): Promise<string> {
  
  const result = await (new Promise((resolve, reject) => {
    
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  }));

  if (typeof result == "string") {
    return result.replace('data:', '').replace(/^.+,/, '');
  };

  return '';
};

/**
 * 
*/
export const base64_to_blob = function(file?: string | null): Blob {
  
  const bin_str = atob(file || '');
  const bin_str_len = bin_str.length;
  const bytes = new Uint8Array(bin_str_len);

  for (var i = 0; i < bin_str_len; i++) { bytes[i] = bin_str.charCodeAt(i) };

  return new Blob([bytes], { type: "application/pdf" });
};
