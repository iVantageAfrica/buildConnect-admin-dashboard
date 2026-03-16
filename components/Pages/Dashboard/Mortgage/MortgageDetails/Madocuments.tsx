import { FileText, Download } from 'lucide-react'

const MADocuments = ({ application }: any) => {
  const documents = application?.documents ?? []

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Documents</h1>

      {documents.length === 0 ? (
        <p className="text-gray-500 text-sm">No documents attached to this application.</p>
      ) : (
        <div className="space-y-2">
          {documents.map((doc: any) => (
            <div
              key={doc.id}
              className="flex items-center justify-between border border-gray-200 rounded-lg px-4 py-3"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">{doc.fileName}</p>
                  {doc.type && (
                    <p className="text-xs text-gray-400 capitalize">{doc.type.replace(/_/g, ' ')}</p>
                  )}
                </div>
              </div>
              <a
                href={doc.publicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-600 text-sm font-medium hover:underline"
              >
                <Download className="w-4 h-4" />
                Download
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MADocuments