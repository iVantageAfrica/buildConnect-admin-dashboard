import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from './usetoast';
import { DocumentService } from '../services/DocumentService';
import { FileUploadResult } from '@/components/ui/Forms/FileUploadComponent';
import { uploadFile } from '../utils/fileUpload';

export interface DocumentPayload {
  userId?: string;
  type: string;
  originalName: string;
  fileName: string;
  filePath: string;
  fileSize: number;
  mimeType: string;
  description?: string;
  status: 'pending' | 'active';
  publicUrl: string;
  uploadUrl: string;
  width?: number;
  height?: number;
  projectId?: string;
  metadata?: Record<string, any>;
}

export const useDocuments = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const getDocumentsQuery = (params: object) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useQuery({
      queryKey: ['getDocuments', params],
      queryFn: () => DocumentService.getDocuments(params),
    });
  };

  const addDocumentMutation = useMutation({
    mutationFn: async ({
      file,
      formValues,
    }: {
      file: FileUploadResult;
      formValues: Omit<          // ✅ missing < was here
        DocumentPayload,
        'fileName' | 'filePath' | 'fileSize' | 'mimeType' | 'publicUrl' | 'uploadUrl' | 'status'
      >;
    }) => {
      const uploadResult = await uploadFile(
        file,
        formValues.type,
        formValues.description,
        formValues.userId,
        formValues.projectId,
      );

      const payload: DocumentPayload = {
        ...formValues,
        fileName:     file.name,
        originalName: file.name,
        filePath:     uploadResult.data?.data?.filePath || '',
        fileSize:     file.size,
        mimeType:     file.type,
        publicUrl:    uploadResult.data?.data?.publicUrl || '',
        uploadUrl:    uploadResult.data?.data?.uploadUrl || '',
        width:        file.width,
        height:       file.height,
        status:       'pending',
      };

      return DocumentService.createDocuments(payload);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getDocuments'] });
      toast.success('Success', 'Document uploaded successfully!');
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message || error?.message || 'Failed to upload document.';
      toast.error('Error', message);
    },
  });

  return {
    getDocumentsQuery,
    addDocumentMutation,
  };
};