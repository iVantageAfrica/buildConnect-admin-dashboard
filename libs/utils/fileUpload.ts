import { FileUploadResult } from "@/components/ui/Forms/FileUploadComponent";
import { UploadService } from "../services/UploadService";

export const uploadFile = async (
  file: FileUploadResult,
  fileType: string,
  description?: string,
  userId?: string,
  projectId?: string,
) => {
  try {
    // Step 1: Prepare
    const prepareData = {
      fileName:     file.name,
      fileSize:     file.size,
      mimeType:     file.type,
      type:         fileType,
      width:        file.width  || undefined,
      height:       file.height || undefined,
      description:  description || fileType,
      targetUserId: userId      || undefined,
      projectId:    projectId   || undefined,
    };

    const prepareResponse = await UploadService.prepareUpload(prepareData);
    const prepareResult   = prepareResponse.data;

    if (!prepareResult.success || !prepareResult.data) {
      throw new Error(prepareResult.message || "Failed to prepare upload");
    }

    const { uploadUrl, uploadParams, publicUrl, fileId } = prepareResult.data;

    if (!uploadUrl) throw new Error("Upload URL not received from server");

    // Step 2: Build FormData
    const formData = new FormData();

    if (file.file instanceof File) {
      formData.append("file", file.file);
    } else if (file.uri) {
      const res  = await fetch(file.uri);
      const blob = await res.blob();
      formData.append("file", new File([blob], file.name, { type: file.type }));
    } else {
      throw new Error("No valid file source found");
    }

    if (uploadParams) {
      Object.entries(uploadParams).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
    }

    // Step 3: Upload to Cloudinary
    const uploadResponse = await fetch(uploadUrl, {
      method: "POST",
      body:   formData,
    });

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      throw new Error(`Upload failed: ${uploadResponse.statusText} - ${errorText}`);
    }

    // Step 4: Confirm ✅ now includes projectId and targetUserId
    const cloudinaryPublicId  = uploadParams?.public_id;
    const cloudinarySecureUrl = publicUrl?.split("?")[0];

    if (!cloudinaryPublicId || !cloudinarySecureUrl || !fileId) {
      throw new Error("Missing required information for confirmation");
    }

    const confirmResponse = await UploadService.confirmUpload(fileId, {
      cloudinaryPublicId,
      cloudinarySecureUrl,
      actualFileSize: file.size,
      projectId:      projectId || undefined,
      targetUserId:   userId    || undefined,
    });

    return {
      success: true,
      data:    confirmResponse.data,
      fileId,
    };

  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message      ||
      error?.response?.data?.data?.message ||
      error?.message                       ||
      "Failed to upload file. Please try again.";

    throw new Error(errorMessage);
  }
};