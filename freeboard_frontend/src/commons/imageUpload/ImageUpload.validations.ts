import { Modal } from "antd";
function ImageUploadValidations(file: File) {
  if (!file.size) {
    Modal.error({ content: "파일이 없습니다" });
    return false;
  }

  if (file.size > 5 * 1024 * 1024) {
    // 5MB
    Modal.error({ content: "파일 용량은 5MB를 넘을 수 없습니다." });
    return false;
  }

  if (!file.type.includes("png") && !file.type.includes("jpg")) {
    Modal.error({ content: "png 또는 jpg 파일 형식만 가능합니다." });
    return false;
  }

  return true;
}

export default ImageUploadValidations;
