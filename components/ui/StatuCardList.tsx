function StatusCard({ title, subtitle, status }) {
  return (
    <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>
      
      <span className={`px-4 py-2 rounded-lg text-sm font-semibold ${
        status === 'Approved' 
          ? 'bg-green-100 text-green-700'
          : status === 'Rejected'
          ? 'bg-red-100 text-red-700'
          : 'bg-blue-100 text-blue-700'
      }`}>
        {status}
      </span>
    </div>
  );
}

export function StatusCardList({ title, items }) {
  return (
    <div className="bg-gray-50 ">
      <div className="max-w-7xl mx-auto">
        <div className=" rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
          
          <div className="space-y-4">
            {items.map((item) => (
              <StatusCard 
                key={item.id}
                title={item.title}
                subtitle={item.subtitle}
                status={item.status}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}