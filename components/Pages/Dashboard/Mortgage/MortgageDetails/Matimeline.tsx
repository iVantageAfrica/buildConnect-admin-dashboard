const formatDate = (dateString: string | null | undefined) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

const TimelineRow = ({ label, value }: { label: string; value: string }) => (
  <li className="flex items-start gap-3">
    <span className="mt-1 h-2 w-2 rounded-full bg-blue-500 shrink-0" />
    <div>
      <p className="text-sm font-medium text-gray-800">{label}</p>
      <p className="text-sm text-gray-500">{value}</p>
    </div>
  </li>
)

const MATimeline = ({ application }: any) => (
  <div>
    <h1 className="text-3xl font-bold mb-6">Timeline</h1>
    <div className="grid grid-cols-2 gap-12">
      <div>
        <h2 className="text-xl font-bold mb-4">Key Dates</h2>
        <ul className="space-y-4">
          <TimelineRow label="Submitted At" value={formatDate(application?.createdAt)} />
          <TimelineRow label="Last Updated" value={formatDate(application?.updatedAt)} />
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4">Decision</h2>
        <ul className="space-y-4">
          <TimelineRow
            label="Decision Outcome"
            value={application?.decisionOutcome?.replace(/\b\w/g, (c: string) => c.toUpperCase()) ?? 'Pending'}
          />
          <TimelineRow label="Decision Date" value={formatDate(application?.decisionAt)} />
          <TimelineRow label="Decision Notes" value={application?.decisionNotes ?? 'No notes yet.'} />
        </ul>
      </div>
    </div>
  </div>
)

export default MATimeline